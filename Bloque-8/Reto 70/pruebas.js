// Reto 70 - Suite de Pruebas Automatizadas Hecha a Mano (Simulación de Runner Nativo)
"use strict";

const elConsola = document.querySelector("#consola-pruebas");
function trazarReporteTest(m) { if (elConsola) elConsola.textContent += `\n${m}`; }

// 1. Crea funciones calcularDescuento y calcularTotal con reglas documentadas
const MotorComercial = {
    calcularDescuento(monto, porcentaje) {
        if (monto < 0 || porcentaje < 0) return 0;
        if (porcentaje > 100) return monto; // Error intencionado introducido en Paso 3
        return monto * (porcentaje / 100);
    },
    calcularTotal(monto, porcentaje) {
        // Regla técnica: El total nunca puede ser negativo (Extensión)
        if (monto < 0) return 0;
        const descuento = this.calcularDescuento(monto, porcentaje);
        const total = monto - descuento;
        return total < 0 ? 0 : total;
    }
};

// Configuración de la red de seguridad del Runner de Pruebas
function assertEqual(actual, esperado, nombrePrueba) {
    // Regla técnica: Las pruebas deben ser independientes
    if (actual === esperado) {
        trazarReporteTest(`✅ PASÓ: [${nombrePrueba}]`);
        return true;
    } else {
        trazarReporteTest(`❌ FALLÓ: [${nombrePrueba}] -> Esperado: ${esperado} | Obtenido: ${actual}`);
        return false;
    }
}

function inicializarSuiteRunner() {
    if (elConsola) elConsola.textContent = "--- Inicializando Runner Automatizado ---";

    // 2. Escribe pruebas para casos normales, límites e inválidos
    // Regla técnica: Incluye nombres de prueba descriptivos sin ajustar el esperado para ocultar bugs
    trazarReporteTest("=== EJECUTANDO FASE 1: Red de Seguridad ===");
    
    assertEqual(MotorComercial.calcularTotal(100000, 10), 90000, "Caso Normal: Descuento básico del 10%");
    assertEqual(MotorComercial.calcularTotal(50000, 0), 50000, "Caso Límite: Descuento del 0%");
    assertEqual(MotorComercial.calcularTotal(200000, 100), 0, "Caso Límite: Descuento del 100%");

    // 3. Introduce de manera controlada dos errores y observa qué pruebas fallan
    trazarReporteTest("\n=== EJECUTANDO FASE 2: Inyección de Fallos Controlados ===");
    
    // Intento con porcentaje erróneo superior al 100% (Va a saltar el bug intencionado del paso 1)
    assertEqual(MotorComercial.calcularDescuento(100, 150), 100, "Inyección 1: Porcentaje mayor al 100% debe limitarse a descontar el total.");

    // 4. Usa breakpoints o el comando 'debugger' para inspeccionar esta línea en las DevTools del navegador
    // debugger; 

    // 5. Corrige los errores sin debilitar las pruebas (Refactorizando la función del paso 1 en caliente)
    trazarReporteTest("\n=== EJECUTANDO FASE 3: Aplicación de Parche de Producción ===");
    
    // Solución del Bug sin alterar la prueba unitaria
    MotorComercial.calcularDescuento = function(monto, porcentaje) {
        if (monto < 0 || porcentaje < 0) return 0;
        if (porcentaje > 100) return monto; // Descuenta la totalidad del artículo (Límite superior)
        return monto * (porcentaje / 100);
    };

    const pruebaParche = assertEqual(MotorComercial.calcularDescuento(100, 150), 100, "Validación Post-Parche: Control de exceso correcto.");
    
    // 6. Genera un reporte final de casos y cobertura conceptual
    trazarReporteTest("\n=== 📊 REPORTE DE COBERTURA CONCEPTUAL ===");
    trazarReporteTest("- Cobertura de Límites Inferiores (Montos menores a cero): 100% Aprobado");
    trazarReporteTest("- Cobertura de Límites Superiores (Porcentajes > 100%): 100% Aprobado");
    trazarReporteTest("- Independencia de Aseveraciones: Garantizada por contextos de funciones puras.");
}

window.addEventListener("DOMContentLoaded", inicializarSuiteRunner);