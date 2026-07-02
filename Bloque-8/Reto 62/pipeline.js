// Reto 62 - Composición funcional de validadores encadenados (Higher-Order Functions)
"use strict";

const elConsola = document.querySelector("#consola-pipeline");
function logPipeline(msg) { if (elConsola) elConsola.textContent += `\n${msg}`; }

// 1 y 2. Crea funciones de orden superior que generen funciones validadoras configuradas
// Regla técnica: La configuración original debe quedar protegida y aislada en closures
const requerido = (mensajeError) => (valor) => {
    if (valor === undefined || valor === null || valor.toString().trim() === "") {
        return mensajeError;
    }
    return null; // Retorna null si pasa de forma limpia
};

const longitudMinima = (min, mensajeError) => (valor) => {
    if (!valor || valor.toString().length < min) {
        return mensajeError;
    }
    return null;
};

const cumplePatron = (regex, mensajeError) => (valor) => {
    if (!regex.test(valor)) {
        return mensajeError;
    }
    return null;
};

// 5. Crea una función componerValidadores(...validadores)
// Regla técnica: La función combinadora debe aceptar una cantidad variable de argumentos (Rest parameters)
function componerValidadores(...listaValidadores) {
    return function(valorInicial) {
        // Regla técnica: Los validadores no deben modificar la entrada cruda
        // Reducimos acumulando exclusivamente los hilos de strings de errores detectados
        return listaValidadores.reduce((erroresAcumulados, validadorActual) => {
            const errorDetectado = validadorActual(valorInicial);
            if (errorDetectado) {
                erroresAcumulados.push(errorDetectado);
            }
            return erroresAcumulados;
        }, []);
    };
}

// Extensión obligatoria: Añade validadores asíncronos sin romper la API pública
const esUnicoEnBaseDatosAsinc = (mensajeError) => async (valor) => {
    // Simulación de latencia de red I/O contra el servidor corporativo
    return new Promise((resolve) => {
        setTimeout(() => {
            const listadoNombresOcupados = ["juan", "pedro", "carlos"];
            if (listadoNombresOcupados.includes(valor.toLowerCase().trim())) {
                resolve(mensajeError);
            }
            resolve(null);
        }, 300);
    });
};

// Pipeline asíncrono robusto para manejar combinaciones híbridas
async function procesarPipelineHibrido(valor, ...validadores) {
    let errores = [];
    for (const v of validadores) {
        const res = v(valor);
        if (res instanceof Promise) {
            const errorAsinc = await res;
            if (errorAsinc) errores.push(errorAsinc);
        } else if (res) {
            errores.push(res);
        }
    }
    return errores;
}

// 3 y 4. Construye pipelines y ejecuta validaciones reuniendo mensajes de error
async function ejecutarLaboratorioValidacion() {
    if (elConsola) elConsola.textContent = "--- Evaluando Motores Funcionales de Validación ---";

    // Reglas de negocio declarativas
    const pipelineNombre = [
        requerido("El nombre de usuario es un campo obligatorio."),
        longitudMinima(4, "El nombre de usuario debe contener al menos 4 caracteres.")
    ];

    const pipelineCorreo = [
        requerido("El correo electrónico es un requisito indispensable."),
        cumplePatron(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El formato del correo ingresado es inválido.")
    ];

    // 6. Prueba datos válidos e inválidos sin cambiar los validadores base
    logPipeline("\n=== Prueba Escenario 1: Trama Completamente Inválida ===");
    const erroresNombreMal = componerValidadores(...pipelineNombre)("an");
    const erroresCorreoMal = componerValidadores(...pipelineCorreo)("correo-invalido.com");
    
    logPipeline(`Errores en Campo Nombre ('an'): ${JSON.stringify(erroresNombreMal)}`);
    logPipeline(`Errores en Campo Correo: ${JSON.stringify(erroresCorreoMal)}`);

    logPipeline("\n=== Prueba Escenario 2: Trama Válida ===");
    const erroresNombreBien = componerValidadores(...pipelineNombre)("JuanADSO");
    logPipeline(`Errores en Campo Nombre ('JuanADSO'): ${JSON.stringify(erroresNombreBien)} (Vacío = Aprobado)`);

    // Probando la Extensión Asíncrona
    logPipeline("\n=== 🌟 Prueba Escenario 3: Validación Híbrida Asíncrona ===");
    const pipelineHibridoUsuario = [
        ...pipelineNombre,
        esUnicoEnBaseDatosAsinc("Error de Disponibilidad: El nombre ingresado ya se encuentra registrado.")
    ];

    logPipeline("[PROCESANDO...] Consultando unicidad en base de datos externa...");
    const erroresAsincronos = await procesarPipelineHibrido("Juan", ...pipelineHibridoUsuario);
    logPipeline(`Resultado final del Pipeline Asíncrono para 'Juan': ${JSON.stringify(erroresAsincronos)}`);
}

window.addEventListener("DOMContentLoaded", ejecutarLaboratorioValidacion);