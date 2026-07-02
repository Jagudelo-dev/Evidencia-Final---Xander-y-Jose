// Reto 69 - Expresiones Regulares con Retroalimentación Detallada
"use strict";

const elLog = document.querySelector("#consola-validador");
function trazarVerificacion(m) { if (elLog) elLog.textContent += `\n${m}`; }

// Pista sin solución: Divide patrones complejos en fragmentos con nombres antes de construir RegExp
const fragmentoPais = "(\\+57)?";
const fragmentoEspacio = "\\s?";
const fragmentoCelular = "(3\\d{2})";
const fragmentoCuerpo = "[- ]?\\d{3}[- ]?\\d{4}";

// 1 y 2. Define reglas exactas y crea una expresión regular por formato
// Regla técnica: Ancla los patrones cuando deba coincidir toda la cadena (^ y $)
const REGEX_REGISTRO = {
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    codigoInterno: /^ABC-2026-\d{3}$/,
    telefonoNacional: new RegExp(`^${fragmentoPais}${fragmentoEspacio}${fragmentoCelular}${fragmentoCuerpo}$`)
};

// 3. Escribe funciones que devuelvan resultado y motivo de rechazo
function validarEntradaFiltro(tipo, cadena) {
    const regex = REGEX_REGISTRO[tipo];
    if (!regex) return { aprobado: false, motivo: "Categoría de inspección no identificada." };

    const esValido = regex.test(cadena);
    
    let motivo = "Cadena estructurada correctamente.";
    if (!esValido) {
        if (tipo === "correo") motivo = "Formato de e-mail inválido (Debe cumplir: usuario@dominio.com).";
        if (tipo === "codigoInterno") motivo = "El código de inventario debe coincidir exactamente con el año en curso 'ABC-2026-XXX'.";
        if (tipo === "telefonoNacional") motivo = "Debe corresponder a un número celular de Colombia de 10 dígitos (opcional +57).";
    }

    return { aprobado: esValido, motivo };
}

// ⭐ Extensión: Añade pruebas generativas simples con datos aleatorios válidos
function generarCelularValidoAleatorio() {
    const prefijos = ["310", "315", "320", "300"];
    const elegido = prefijos[Math.floor(Math.random() * prefijos.length)];
    const resto = Math.floor(1000000 + Math.random() * 9000000);
    return `+57 ${elegido}${resto}`;
}

function procesarValidaciones() {
    if (elLog) elLog.textContent = "--- Evaluando Seguridad de Expresiones Regulares ---";

    // 4. Prepara una tabla de casos válidos e inválidos
    const bancoPruebas = [
        { tipo: "codigoInterno", valor: "ABC-2026-001", esperado: true },
        { tipo: "codigoInterno", valor: "ABC-2025-001", esperado: false }, // Año incorrecto
        { tipo: "codigoInterno", valor: "ABC-2026-001A", esperado: false }, // Longitud excedida
        { tipo: "telefonoNacional", valor: "3124567890", esperado: true },
        { tipo: "telefonoNacional", valor: "+57 3001234567", esperado: true },
        { tipo: "telefonoNacional", valor: "12345", esperado: false }, // Límite inferior fallido
        { tipo: "correo", valor: "contacto@elorecreaciones.com", esperado: true },
        { tipo: "correo", valor: "invalido@", esperado: false }
    ];

    // 5. Ejecuta todas las pruebas y cuenta aprobadas
    let pruebasPasadas = 0;

    bancoPruebas.forEach((item, idx) => {
        const resultado = validarEntradaFiltro(item.tipo, item.valor);
        const pasoTest = resultado.aprobado === item.esperado;
        if (pasoTest) pruebasPasadas++;
        
        trazarVerificacion(`[Test ${idx + 1}] Tipo: ${item.tipo} | Valor: "${item.valor}" -> Resultado: ${resultado.aprobado ? "VALIDADO" : "RECHAZADO"} | ${resultado.motivo}`);
    });

    trazarVerificacion(`\nEstadísticas: ${pruebasPasadas}/${bancoPruebas.length} pruebas asertivas ejecutadas con éxito.`);

    // Ejecución de la extensión
    trazarVerificacion("\n=== 🌟 Ejecución de Pruebas Generativas Aleatorias ===");
    for(let i=0; i<3; i++) {
        const celGenerado = generarCelularValidoAleatorio();
        const evalCel = validarEntradaFiltro("telefonoNacional", celGenerado);
        trazarVerificacion(`Generando Dinámico: "${celGenerado}" -> Aprobado: ${evalCel.aprobado}`);
    }
}

window.addEventListener("DOMContentLoaded", procesarValidaciones);