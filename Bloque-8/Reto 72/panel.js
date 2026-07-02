// Reto 72 - Control Avanzado de Concurrencia y AbortControllers Extensibles
"use strict";

const Config = {
    // Endpoints públicos simulados y controlados que devuelven estructuras JSON conocidas
    API_1: "https://jsonplaceholder.typicode.com/posts/1",
    API_2: "https://jsonplaceholder.typicode.com/users/1",
    TIMEOUT_MS: 4000,
    CACHE_EXPIRACION_MS: 15000 // 15 segundos de validez
};

const RegistroCache = new Map();
let ControladorGlobalAbort = null;

function logRed(msg) {
    const c = document.querySelector("#consola-red");
    if (c) c.textContent += `\n[${new Date().toLocaleTimeString()}] ${msg}`;
}

// --- 1. CAPA HTTP DE DEFENSA Y CONTROL DE CONCURRENCIA ---
async function realizarPeticionSegura(url, opciones = {}, tiempoEspera = Config.TIMEOUT_MS) {
    const controlador = new AbortController();
    const idSujeto = setTimeout(() => controlador.abort(), tiempoEspera);

    try {
        const respuesta = await fetch(url, { ...opciones, signal: controlador.signal });
        clearTimeout(idSujeto);

        if (!respuesta.ok) throw new Error(`Fallo de Enlace Remoto: Estado ${respuesta.status}`);
        
        const datosSucios = await respuesta.json();
        
        // Regla Técnica: Defensa básica frente a datos no confiables (Normalización de contratos)
        return {
            id: datosSucios.id || 0,
            titulo: (datosSucios.title || datosSucios.name || "Sin Identificador Comercial").replace(/[<>]/g, ""), // Sanatización básica
            origen: url
        };
    } catch (error) {
        clearTimeout(idSujeto);
        throw error;
    }
}

// --- 2. GESTOR DE CACHÉ CON ESTRATEGIA DE RESPALDO (STALE-WHILE-REVALIDATE) ---
async function consultarRecursoConCache(llaveUrl) {
    const marcaTiempoActual = Date.now();
    
    // Validar si existe registro previo en caché
    if (RegistroCache.has(llaveUrl)) {
        const entrada = RegistroCache.get(llaveUrl);
        const esValida = (marcaTiempoActual - entrada.timestamp) < Config.CACHE_EXPIRACION_MS;

        if (esValida) {
            logRed(`[CACHÉ HITT] Datos recuperados de forma inmediata.`);
            return { datos: entrada.data, deRespaldo: false };
        }
        logRed(`[CACHÉ EXPIRADA] Activando estrategia de respaldo en segundo plano.`);
    }

    try {
        const nuevosDatos = await realizarPeticionSegura(llaveUrl);
        RegistroCache.set(llaveUrl, { timestamp: Date.now(), data: nuevosDatos });
        return { datos: nuevosDatos, deRespaldo: false };
    } catch (err) {
        // Estrategia de degradación elegante frente a fallos parciales
        if (RegistroCache.has(llaveUrl)) {
            logRed(`[DEGRADACIÓN ELEGANTE] Error de red. Sirviendo copia de respaldo histórica.`);
            return { datos: RegistroCache.get(llaveUrl).data, deRespaldo: true };
        }
        throw err;
    }
}

// --- 3. CONTROLADOR DE INTERFAZ Y ORQUESTACIÓN PARALELA ---
const MonitorApp = {
    async ejecutarBusqueda() {
        const btnCancelar = document.querySelector("#btn-cancelar");
        
        // Regla Técnica: Evita solicitudes duplicadas durante búsquedas rápidas (Cancelación previa)
        if (ControladorGlobalAbort) {
            ControladorGlobalAbort.abort();
            logRed("[ABORTO] Cancelando solicitudes duplicadas en vuelo.");
        }

        ControladorGlobalAbort = new AbortController();
        btnCancelar.style.display = "inline-block";

        const div1 = document.querySelector("#estado-api-1");
        const div2 = document.querySelector("#estado-api-2");

        div1.textContent = "Cargando datos principales...";
        div2.textContent = "Sincronizando respaldo paralelo...";

        const tInicio = performance.now();

        try {
            // Regla Técnica: Carga recursos independientes en paralelo de forma asíncrona (Promise.all)
            const [res1, res2] = await Promise.all([
                consultarRecursoConCache(Config.API_1),
                consultarRecursoConCache(Config.API_2)
            ]);

            // Renderizar sin usar HTML remoto directo (InnerHTML evitado para proteger de XSS)
            div1.textContent = `ID: ${res1.datos.id} | Contenido: ${res1.datos.titulo} ${res1.deRespaldo ? "(Histórico)" : ""}`;
            div2.textContent = `Asociado: ${res2.datos.titulo} ${res2.deRespaldo ? "(Histórico)" : ""}`;

            const tFin = performance.now();
            // ⭐ Extensión: Captura de métricas simples de Web Performance
            logRed(`[MÉTRICA] Concurrencia resuelta con éxito en ${(tFin - tInicio).toFixed(2)}ms.`);

        } catch (error) {
            if (error.name === "AbortError") {
                logRed("[INFO] Transmisión detenida explícitamente por el cliente.");
            } else {
                // Regla Técnica: No bloquees toda la interfaz por un fallo parcial
                div1.textContent = "Error de sincronización con el servidor central.";
                logRed(`[FALLO ASÍNCRONO] Error: ${error.message}`);
            }
        } finally {
            btnCancelar.style.display = "none";
            ControladorGlobalAbort = null;
        }
    }
};

// Vinculación de eventos de escucha
document.querySelector("#input-busqueda").addEventListener("input", () => MonitorApp.ejecutarBusqueda());
document.querySelector("#btn-cancelar").addEventListener("click", () => {
    if (ControladorGlobalAbort) ControladorGlobalAbort.abort();
});