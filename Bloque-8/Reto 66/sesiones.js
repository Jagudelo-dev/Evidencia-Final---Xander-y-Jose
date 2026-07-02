// Reto 66 - Colecciones Débiles para el manejo de Ciclo de Vida
"use strict";

const elLog = document.querySelector("#consola-sesiones");
function registrarSesion(m) { if (elLog) elLog.textContent += `\n${m}`; }

// ⭐ Extensión: Crea una API que oculte completamente el WeakMap mediante closure
const crearAdministradorSesionesPrivado = () => {
    // 1. Usa Set para mantener identificadores únicos de sesiones activas (Primitivos)
    const tokensActivos = new Set();
    
    // 3. Asocia metadatos privados a cada objeto mediante WeakMap
    const metadatosDebiles = new WeakMap();
    
    // 4. Marca componentes inicializados con WeakSet
    const componentesInicializados = new WeakSet();

    return {
        // 5. Impide inicializar dos veces el mismo objeto
        registrarAcceso(componenteObjeto, tokenID, metadata) {
            if (componentesInicializados.has(componenteObjeto)) {
                registrarSesion(`[DENEGADO] Intento de reinicialización duplicada detectado para el objeto.`);
                return false;
            }

            tokensActivos.add(tokenID);
            metadatosDebiles.set(componenteObjeto, metadata);
            componentesInicializados.add(componenteObjeto);
            registrarSesion(`[ÉXITO] Componente de sesión [${tokenID}] inicializado de manera segura.`);
            return true;
        },
        obtenerMetadatos(componenteObjeto) {
            return metadatosDebiles.get(componenteObjeto);
        },
        destruirSesion(componenteObjeto, tokenID) {
            tokensActivos.delete(tokenID);
            // Al quitar las referencias fuertes, se eliminan del WeakMap/WeakSet de manera automática.
        }
    };
};

// 2. Crea objetos de componentes simulados
function probarCicloDeVidaComponentes() {
    if (elLog) elLog.textContent = "--- Inicializando Suite de Sesiones ---";

    const admin = crearAdministradorSesionesPrivado();

    // Referencias fuertes iniciales
    let componenteUsuario = { nombre: "Juan Perez", rol: "SuperAdministrador" };
    let componenteVista = { nodoDOM: "DashboardVentas", renderizado: true };

    admin.registrarAcceso(componenteUsuario, "TOKEN-9686", { expiracion: "2026-12-31", ip: "192.168.1.5" });
    admin.registrarAcceso(componenteVista, "TOKEN-VIEW", { cacheSize: "10MB" });

    // Intento de duplicación (Debe bloquearse)
    admin.registrarAcceso(componenteUsuario, "TOKEN-HACK", { expiracion: "NULA" });

    // Recuperar metadatos
    registrarSesion(`\nMetadatos del usuario recuperados: ${JSON.stringify(admin.obtenerMetadatos(componenteUsuario))}`);

    // Demostrar recolección de basura rompiendo la referencia fuerte
    componenteUsuario = null; 
    registrarSesion("\n[AVISO] Referencia de 'componenteUsuario' destruida en el hilo principal. El motor V8 la desalojará de la memoria en el siguiente ciclo del Recolector de Basura.");
}

window.addEventListener("DOMContentLoaded", probarCicloDeVidaComponentes);