'use strict';

const assert = require('node:assert');
const { performance } = require('node:perf_hooks');

/**
 * RETO 64 · Compositor de reportes funcional
 * ---------------------------------------------
 * Pipeline: validar -> normalizar -> filtrar -> calcular subtotal -> resumir.
 * Todas las funciones de transformación son puras: misma entrada -> misma
 * salida, sin mutar sus argumentos y sin imprimir nada. Los únicos
 * `console.log` del archivo viven en la capa final (sección "Demostración").
 */

// ===========================================================================
// Funciones puras pequeñas
// ===========================================================================

/**
 * Valida que una venta tenga los campos mínimos y con tipos coherentes.
 * Entrada: objeto venta (posiblemente "sucio"). Salida: boolean.
 */
function validarVenta(venta) {
  if (!venta || typeof venta !== 'object') return false;
  const { vendedor, categoria, cantidad, precioUnitario } = venta;
  const cantidadNum = Number(cantidad);
  const precioNum = Number(precioUnitario);
  return (
    typeof vendedor === 'string' &&
    vendedor.trim() !== '' &&
    typeof categoria === 'string' &&
    categoria.trim() !== '' &&
    Number.isFinite(cantidadNum) &&
    cantidadNum > 0 &&
    Number.isFinite(precioNum) &&
    precioNum >= 0
  );
}

/**
 * Normaliza una venta: recorta espacios, homogeniza mayúsculas/minúsculas
 * y convierte cantidad/precio a number. Devuelve un objeto NUEVO;
 * nunca modifica `venta`.
 */
function normalizarVenta(venta) {
  return {
    ...venta,
    vendedor: String(venta.vendedor ?? '').trim(),
    categoria: String(venta.categoria ?? '').trim().toLowerCase(),
    cantidad: Number(venta.cantidad),
    precioUnitario: Number(venta.precioUnitario),
  };
}

/**
 * Calcula el subtotal de una venta (cantidad * precioUnitario) y devuelve
 * una NUEVA venta con el campo `subtotal` agregado.
 */
function calcularSubtotal(venta) {
  const subtotal = Number((venta.cantidad * venta.precioUnitario).toFixed(2));
  return { ...venta, subtotal };
}

// ---------------------------------------------------------------------------
// Transformaciones sobre arreglos completos (siguen siendo puras: devuelven
// arreglos nuevos, nunca mutan el arreglo/objetos recibidos)
// ---------------------------------------------------------------------------

function normalizarVentas(ventas) {
  return ventas.map(normalizarVenta);
}

function filtrarVentasValidas(ventas) {
  return ventas.filter(validarVenta);
}

function agregarSubtotales(ventas) {
  return ventas.map(calcularSubtotal);
}

/**
 * Resumen anidado { vendedor: { categoria: totalVendido } }.
 * Construido con reduce, sin mutar el acumulador previo "hacia afuera":
 * se generan objetos nuevos en cada paso (inmutabilidad estructural).
 */
function resumenPorVendedorYCategoria(ventas) {
  return ventas.reduce((resumen, venta) => {
    const porVendedor = resumen[venta.vendedor] ?? {};
    const totalPrevio = porVendedor[venta.categoria] ?? 0;
    return {
      ...resumen,
      [venta.vendedor]: {
        ...porVendedor,
        [venta.categoria]: Number((totalPrevio + venta.subtotal).toFixed(2)),
      },
    };
  }, {});
}

// ===========================================================================
// pipe: compone funciones de izquierda a derecha
// ===========================================================================

function pipe(...funciones) {
  return function ejecutarPipeline(entrada) {
    return funciones.reduce((valorActual, funcion) => funcion(valorActual), entrada);
  };
}

/** Pipeline completo: ventas "sucias" -> ventas normalizadas, válidas y con subtotal. */
const procesarVentas = pipe(normalizarVentas, filtrarVentasValidas, agregarSubtotales);

/** Pipeline de reporte: ventas procesadas -> resumen por vendedor y categoría. */
const generarReporte = pipe(procesarVentas, resumenPorVendedorYCategoria);

// ===========================================================================
// ⭐ Extensión: memoización de una transformación costosa + medición
// ===========================================================================

/**
 * Higher-order function genérica de memoización: cachea por clave
 * serializada de los argumentos. Pura en el sentido de que no cambia
 * el resultado para una misma entrada; solo evita recalcularlo.
 */
function memoizar(fn) {
  const cache = new Map();
  return function version_memoizada(arg) {
    const clave = JSON.stringify(arg);
    if (cache.has(clave)) {
      return cache.get(clave);
    }
    const resultado = fn(arg);
    cache.set(clave, resultado);
    return resultado;
  };
}

/**
 * Transformación deliberadamente costosa: para cada categoría, calcula
 * estadísticas (total, promedio, máximo) recorriendo repetidamente el
 * arreglo de ventas por cada categoría distinta (O(n * categorías) con
 * trabajo extra simulado) — representa un cálculo caro real (p. ej. un
 * informe estadístico detallado) sin depender de temporizadores.
 */
function calcularEstadisticasPorCategoria(ventas) {
  const categorias = [...new Set(ventas.map((v) => v.categoria))];

  return categorias.reduce((estadisticas, categoria) => {
    const deLaCategoria = ventas.filter((v) => v.categoria === categoria);

    // Trabajo extra intencional para simular un cálculo costoso
    // (por ejemplo, una normalización estadística repetida).
    let acumuladorCostoso = 0;
    for (let i = 0; i < 200000; i++) {
      acumuladorCostoso += Math.sqrt(i) % 7;
    }

    const total = Number(
      deLaCategoria.reduce((suma, v) => suma + v.subtotal, 0).toFixed(2)
    );
    const promedio = Number((total / deLaCategoria.length).toFixed(2));
    const maximo = Math.max(...deLaCategoria.map((v) => v.subtotal));

    return {
      ...estadisticas,
      [categoria]: { total, promedio, maximo, _ruido: acumuladorCostoso > -1 },
    };
  }, {});
}

const calcularEstadisticasMemoizado = memoizar(calcularEstadisticasPorCategoria);

// ===========================================================================
// Pruebas simples (assert) — al menos tres funciones cubiertas
// ===========================================================================

function ejecutarPruebas() {
  // validarVenta
  assert.strictEqual(
    validarVenta({ vendedor: 'Ana', categoria: 'ropa', cantidad: 2, precioUnitario: 10 }),
    true,
    'Una venta completa y coherente debe ser válida'
  );
  assert.strictEqual(
    validarVenta({ vendedor: '', categoria: 'ropa', cantidad: 2, precioUnitario: 10 }),
    false,
    'Un vendedor vacío debe invalidar la venta'
  );
  assert.strictEqual(
    validarVenta({ vendedor: 'Ana', categoria: 'ropa', cantidad: -1, precioUnitario: 10 }),
    false,
    'Una cantidad negativa (entrada límite) debe invalidar la venta'
  );
  assert.strictEqual(validarVenta(null), false, 'null debe invalidarse sin lanzar error');

  // normalizarVenta
  const normalizada = normalizarVenta({
    vendedor: '  Ana  ',
    categoria: 'ROPA',
    cantidad: '3',
    precioUnitario: '9.5',
  });
  assert.strictEqual(normalizada.vendedor, 'Ana');
  assert.strictEqual(normalizada.categoria, 'ropa');
  assert.strictEqual(normalizada.cantidad, 3);
  assert.strictEqual(normalizada.precioUnitario, 9.5);

  // calcularSubtotal
  const conSubtotal = calcularSubtotal({ cantidad: 3, precioUnitario: 9.5 });
  assert.strictEqual(conSubtotal.subtotal, 28.5, 'El subtotal debe ser cantidad * precio');
  assert.strictEqual(
    calcularSubtotal({ cantidad: 0, precioUnitario: 9.5 }).subtotal,
    0,
    'Cantidad 0 (entrada límite) debe dar subtotal 0'
  );

  // pipe
  const sumarUno = (n) => n + 1;
  const duplicar = (n) => n * 2;
  const combinada = pipe(sumarUno, duplicar);
  assert.strictEqual(combinada(3), 8, 'pipe debe aplicar de izquierda a derecha: (3+1)*2=8');

  // Determinismo del pipeline completo (misma entrada -> mismo resultado)
  const muestra = [
    { vendedor: 'Ana', categoria: 'Ropa', cantidad: 2, precioUnitario: 10 },
    { vendedor: 'Ana', categoria: 'ropa ', cantidad: 1, precioUnitario: 10 },
  ];
  const resultado1 = JSON.stringify(generarReporte(muestra));
  const resultado2 = JSON.stringify(generarReporte(muestra));
  assert.strictEqual(resultado1, resultado2, 'Ejecutar dos veces debe dar el mismo resultado');

  // El arreglo original no debe mutarse
  const original = [{ vendedor: 'Ana', categoria: 'ropa', cantidad: 2, precioUnitario: 10 }];
  const copiaJSON = JSON.stringify(original);
  procesarVentas(original);
  assert.strictEqual(JSON.stringify(original), copiaJSON, 'El arreglo original no debe mutarse');

  return true;
}

// ===========================================================================
// Demostración / capa de efectos (única parte del archivo con console.log)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));

  const ventasCrudas = [
    { vendedor: '  Ana  ', categoria: 'Ropa', cantidad: '2', precioUnitario: '25.5' },
    { vendedor: 'Luis', categoria: 'tecnología', cantidad: 1, precioUnitario: 300 },
    { vendedor: 'Ana', categoria: 'ropa ', cantidad: 3, precioUnitario: 25.5 },
    { vendedor: 'Luis', categoria: 'Tecnología', cantidad: 2, precioUnitario: 150 },
    { vendedor: '', categoria: 'ropa', cantidad: 5, precioUnitario: 10 }, // inválida: sin vendedor
    { vendedor: 'Marta', categoria: 'hogar', cantidad: -1, precioUnitario: 40 }, // inválida: cantidad negativa
    { vendedor: 'Marta', categoria: 'hogar', cantidad: 4, precioUnitario: 12 },
  ];

  separador('1) Pruebas simples (assert)');
  ejecutarPruebas();
  console.log('Todas las pruebas pasaron correctamente. ✅');

  separador('2) Pipeline: ventas crudas -> ventas procesadas');
  const ventasProcesadas = procesarVentas(ventasCrudas);
  console.log(ventasProcesadas);
  console.log(
    `Ventas originales: ${ventasCrudas.length}  |  Válidas tras el pipeline: ${ventasProcesadas.length}`
  );

  separador('3) Datos originales intactos');
  console.log('ventasCrudas[0] sigue con espacios/strings originales ->', ventasCrudas[0]);

  separador('4) Resumen por vendedor y categoría');
  const reporte = generarReporte(ventasCrudas);
  console.log(JSON.stringify(reporte, null, 2));

  separador('5) Determinismo: ejecutar dos veces produce el mismo resultado');
  const reporteA = JSON.stringify(generarReporte(ventasCrudas));
  const reporteB = JSON.stringify(generarReporte(ventasCrudas));
  console.log('reporteA === reporteB (contenido) ->', reporteA === reporteB);

  separador('6) Extensión: memoización + medición de una transformación costosa');
  const inicioSinCache = performance.now();
  calcularEstadisticasPorCategoria(ventasProcesadas);
  const duracionSinCache = performance.now() - inicioSinCache;

  const inicioPrimeraLlamadaMemo = performance.now();
  calcularEstadisticasMemoizado(ventasProcesadas);
  const duracionPrimeraLlamadaMemo = performance.now() - inicioPrimeraLlamadaMemo;

  const inicioSegundaLlamadaMemo = performance.now();
  const resultadoCacheado = calcularEstadisticasMemoizado(ventasProcesadas);
  const duracionSegundaLlamadaMemo = performance.now() - inicioSegundaLlamadaMemo;

  console.log(`Sin memoización              : ${duracionSinCache.toFixed(2)} ms`);
  console.log(`Memoizada (1ª llamada, calcula): ${duracionPrimeraLlamadaMemo.toFixed(2)} ms`);
  console.log(`Memoizada (2ª llamada, cache)   : ${duracionSegundaLlamadaMemo.toFixed(2)} ms`);
  console.log(
    `Aceleración de la 2ª llamada -> ${(duracionPrimeraLlamadaMemo / Math.max(duracionSegundaLlamadaMemo, 0.001)).toFixed(1)}x más rápida`
  );
  console.log('Resultado (desde caché):', resultadoCacheado);
}

module.exports = {
  validarVenta,
  normalizarVenta,
  calcularSubtotal,
  normalizarVentas,
  filtrarVentasValidas,
  agregarSubtotales,
  resumenPorVendedorYCategoria,
  pipe,
  procesarVentas,
  generarReporte,
  memoizar,
  calcularEstadisticasPorCategoria,
  calcularEstadisticasMemoizado,
  ejecutarPruebas,
};
