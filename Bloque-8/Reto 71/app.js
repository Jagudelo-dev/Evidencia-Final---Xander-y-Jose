// Reto 71 - Arquitectura de Módulos Separados Emulada mediante Capas de Abstracción
"use strict";

// --- 1. CAPA DE DATOS Y ALMACENAMIENTO (Offline-First con Control de Esquema) ---
const AlmacenamientoManejador = {
    CLAVE: "SISTEMA_ACADEMICO_DATA",
    VERSION_ESQUEMA: 2,

    obtener() {
        const raw = localStorage.getItem(this.CLAVE);
        if (!raw) return { version: this.VERSION_ESQUEMA, estudiantes: [] };
        
        const data = JSON.parse(raw);
        // Regla Técnica: Maneja migración de versión del esquema
        if (data.version < this.VERSION_ESQUEMA) {
            console.log("[MIGRACIÓN] Detectada versión antigua del esquema. Normalizando datos...");
            data.estudiantes = data.estudiantes.map(e => ({
                ...e,
                nota: parseFloat(e.nota) || 0.0,
                fechaRegistro: e.fechaRegistro || new Date().toISOString()
            }));
            data.version = this.VERSION_ESQUEMA;
            this.guardar(data.estudiantes);
        }
        return data;
    },

    guardar(estudiantes) {
        // Regla Técnica: No mezcles acceso a almacenamiento dentro de cada evento del DOM
        localStorage.setItem(this.CLAVE, JSON.stringify({
            version: this.VERSION_ESQUEMA,
            estudiantes
        }));
    }
};

// --- 2. CAPA DE DOMINIO Y FUNCIONES PURAS (Lógica Matemática e Inmutabilidad) ---
const LogicaAcademica = {
    calcularEstado: (nota) => nota >= 3.0 ? "Aprobado" : "Reprobado",
    
    filtrarYCalcularMapeo: (estudiantes) => {
        return estudiantes.map(est => ({
            ...est,
            estado: LogicaAcademica.calcularEstado(est.nota)
        }));
    }
};

// --- 3. CAPA DE CONTROLADOR, ACCESIBILIDAD Y RENDIMIENTO ---
const AppCore = {
    estado: { estudiantes: [], paginaActual: 1, elementosPorPagina: 3 },

    inicializar() {
        this.estado.estudiantes = AlmacenamientoManejador.obtener().estudiantes;
        this.registrarEventos();
        this.renderizar();
        this.ejecutarSuitePruebas();
    },

    registrarEventos() {
        document.querySelector("#btn-guardar").addEventListener("click", () => this.agregarRegistro());
        
        // ⭐ Extensión: Paginación y Herramientas JSON Import/Export
        document.querySelector("#btn-exportar").addEventListener("click", () => this.exportarJSON());
        const inputArchivo = document.querySelector("#archivo-importar");
        document.querySelector("#btn-importar").addEventListener("click", () => inputArchivo.click());
        inputArchivo.addEventListener("change", (e) => this.importarJSON(e));
    },

    agregarRegistro() {
        const inputNombre = document.querySelector("#input-nombre");
        const inputNota = document.querySelector("#input-nota");
        
        // Regla Técnica: Escapa o inserta como texto cualquier dato del usuario para mitigar XSS
        const nombreLimpio = inputNombre.value.trim();
        const notaValor = parseFloat(inputNota.value);

        if (!nombreLimpio || isNaN(notaValor) || notaValor < 0 || notaValor > 5) {
            alert("Por favor, introduce datos de entrada válidos.");
            return;
        }

        // Operación inmutable
        this.estado.estudiantes = [...this.estado.estudiantes, { nombre: nombreLimpio, nota: notaValor, fechaRegistro: new Date().toISOString() }];
        AlmacenamientoManejador.guardar(this.estado.estudiantes);
        
        inputNombre.value = "";
        inputNota.value = "";
        this.renderizar();
    },

    renderizar() {
        // Regla Técnica: Mide al menos una operación de renderizado o filtrado
        const t0 = performance.now();

        const tablaCuerpo = document.querySelector("#tabla-cuerpo");
        const contenedorPag = document.querySelector("#controles-paginacion");
        tablaCuerpo.innerHTML = "";

        const datosProcesados = LogicaAcademica.filtrarYCalcularMapeo(this.estado.estudiantes);

        // Lógica de Paginación Avanzada
        const inicio = (this.estado.paginaActual - 1) * this.estado.elementosPorPagina;
        const fin = inicio + this.estado.elementosPorPagina;
        const subconjuntoPaginado = datosProcesados.slice(inicio, fin);

        subconjuntoPaginado.forEach(est => {
            const fila = document.createElement("tr");
            
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = est.nombre; // Inyección segura contra XSS
            
            const celdaNota = document.createElement("td");
            celdaNota.textContent = est.nota.toFixed(1);
            
            const celdaEstado = document.createElement("td");
            celdaEstado.textContent = est.estado;
            celdaEstado.style.color = est.estado === "Aprobado" ? "#4ade80" : "#f87171";

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaNota);
            fila.appendChild(celdaEstado);
            tablaCuerpo.appendChild(fila);
        });

        // ⭐ Extensión: Construcción de Botones con Accesibilidad de Teclado Completa
        contenedorPag.innerHTML = "";
        const totalPaginas = Math.ceil(datosProcesados.length / this.estado.elementosPorPagina) || 1;
        
        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = this.estado.paginaActual === i ? "" : "secundario";
            btn.setAttribute("aria-label", `Ir a la página académica número ${i}`);
            btn.addEventListener("click", () => {
                this.estado.paginaActual = i;
                this.renderizar();
            });
            contenedorPag.appendChild(btn);
        }

        const t1 = performance.now();
        document.querySelector("#metricas-rendimiento").textContent = `Rendimiento Render: ${(t1 - t0).toFixed(2)}ms`;
    },

    exportarJSON() {
        const blob = new Blob([JSON.stringify(this.estado.estudiantes, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup_academico_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importarJSON(evento) {
        const archivo = evento.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = (e) => {
            try {
                const parseados = JSON.parse(e.target.result);
                if (Array.isArray(parseados)) {
                    this.estado.estudiantes = parseados;
                    AlmacenamientoManejador.guardar(this.estado.estudiantes);
                    this.estado.paginaActual = 1;
                    this.renderizar();
                    alert("Copia de seguridad restaurada con éxito.");
                }
            } catch (err) {
                alert("El archivo cargado no contiene un formato estructural válido.");
            }
        };
        lector.readAsText(archivo);
    },

    ejecutarSuitePruebas() {
        const logger = document.querySelector("#log-pruebas");
        logger.textContent = "=== RUNNER UNITARIO INTEGRADO ===\n";
        
        // Aserción simple de lógica pura
        const t1 = LogicaAcademica.calcularEstado(4.5) === "Aprobado";
        const t2 = LogicaAcademica.calcularEstado(2.1) === "Reprobado";

        logger.textContent += `Prueba Cálculo Aprobado: ${t1 ? "PASSED ✅" : "FAILED ❌"}\n`;
        logger.textContent += `Prueba Cálculo Reprobado: ${t2 ? "PASSED ✅" : "FAILED ❌"}\n`;
    }
};

window.addEventListener("DOMContentLoaded", () => AppCore.inicializar());