// Reto 64 - Pipeline de funciones puras e Inmutabilidad
"use strict";

const elLog = document.querySelector("#consola-pipeline");
function auditar(msg) { if (elLog) elLog.textContent += `\n${msg}`; }

// 1. Define funciones puras para validar, normalizar, filtrar y calcular subtotal
const validarVenta = (venta) => venta.id && venta.amount && venta.amount > 0 && venta.seller && venta.category;

const normalizarVenta = (venta) => ({
    ...venta,
    seller: venta.seller.trim().toLowerCase(),
    category: venta.category.trim().toLowerCase()
});

const filtrarPorMontoMinimo = (min) => (ventas) => ventas.filter(v => v.amount >= min);

const calcularImpuestosYSubtotales = (ventas) => ventas.map(v => ({
    ...v,
    iva: v.amount * 0.19,
    total: v.amount * 1.19
}));

// 2. Crea una función pipe que aplique transformaciones de izquierda a derecha
const pipe = (...funciones) => (valorInicial) => funciones.reduce((acc, fn) => fn(acc), valorInicial);

// 4. Obtén un resumen por vendedor y categoría
const agruparResumen = (ventas) => {
    return ventas.reduce((acc, v) => {
        const llave = `${v.seller}-${v.category}`;
        if (!acc[llave]) {
            acc[llave] = { vendedor: v.seller, categoria: v.category, totalAcumulado: 0, transacciones: 0 };
        }
        acc[llave].totalAcumulado += v.amount;
        acc[llave].transacciones += 1;
        return acc;
    }, {});
};

// ⭐ Extensión: Añade memoización para una transformación costosa y mide el efecto
const memoizarTransaccion = (fn) => {
    const cache = new Map();
    return (datos) => {
        const llaveLlave = JSON.stringify(datos);
        if (cache.has(llaveLlave)) {
            auditar("[MEMOIZACIÓN] Datos recuperados instantáneamente de la caché interna.");
            return cache.get(llaveLlave);
        }
        const resultado = fn(datos);
        cache.set(llaveLlave, resultado);
        return resultado;
    };
};

// Construcción del pipeline compuesto
const pipelineCompleto = pipe(
    (ventas) => ventas.filter(validarVenta),
    (ventas) => ventas.map(normalizarVenta),
    filtrarPorMontoMinimo(15),
    calcularImpuestosYSubtotales,
    agruparResumen
);

const pipelineOptimizado = memoizarTransaccion(pipelineCompleto);

// 3. Procesa un array de ventas sin modificarlo
function ejecutarPruebasPipeline() {
    if (elLog) elLog.textContent = "--- Inicializando Auditoría Funcional ---";

    const loteVentasOriginal = [
        { id: 101, seller: "  Elo Recreaciones ", category: " Inflables ", amount: 150000 },
        { id: 102, seller: "elorecreaciones", category: "inflables", amount: 200000 },
        { id: 103, seller: "Carlos ", category: "Sonido", amount: 5000 }, // Filtrado por monto mínimo
        { id: 104, seller: "Admin", category: "Snacks", amount: -4000 } // Inválido
    ];

    // Clon de seguridad conceptual para probar la no-mutación
    const snapshotOriginal = JSON.stringify(loteVentasOriginal);

    // Primera ejecución (Cálculo real)
    const tiempoInicio1 = performance.now();
    const reporte1 = pipelineOptimizado(loteVentasOriginal);
    const tiempoFin1 = performance.now();

    // 5. Verifica que ejecutar dos veces produzca el mismo resultado (Determinismo)
    const tiempoInicio2 = performance.now();
    const reporte2 = pipelineOptimizado(loteVentasOriginal);
    const tiempoFin2 = performance.now();

    auditar(`\n¿Los resultados son deterministas e idénticos?: ${JSON.stringify(reporte1) === JSON.stringify(reporte2) ? "SÍ" : "NO"}`);
    auditar(`¿Los datos originales permanecen intactos?: ${JSON.stringify(loteVentasOriginal) === snapshotOriginal ? "SÍ (Inmutabilidad preservada)" : "NO"}`);
    auditar(`Tiempo Ejecución 1 (Procesamiento): ${(tiempoFin1 - tiempoInicio1).toFixed(4)} ms`);
    auditar(`Tiempo Ejecución 2 (Caché Memoizada): ${(tiempoFin2 - tiempoInicio2).toFixed(4)} ms`);
    
    // 6. Pruebas simples escritas para funciones individuales (Entradas límite)
    auditar(`\n--- Pruebas Unitarias de Límites ---`);
    auditar(`Prueba validarVenta con monto negativo (Debe ser false): ${validarVenta({id:1, seller:"A", category:"B", amount:-10})}`);
    auditar(`Prueba normalizarVenta espacios extremos: ${JSON.stringify(normalizarVenta({seller:"  A ", category:" B "}))}`);
}

window.addEventListener("DOMContentLoaded", ejecutarPruebasPipeline);