/*
 * Reto 50 - Carga paralela de panel
 * Autor: Xander González
 * Fecha: 2026-06-29
 */

function cargarPerfil() {
  return new Promise(resolve => setTimeout(() => resolve("Perfil cargado"), 400));
}
function cargarNotificaciones() {
  return new Promise(resolve => setTimeout(() => resolve("Notificaciones listas"), 600));
}
function cargarMetricas() {
  return new Promise((resolve, reject) => setTimeout(() => reject("Error métricas"), 500));
}

// 1. Secuencial
async function cargaSecuencial() {
  console.time("Secuencial");
  const p = await cargarPerfil();
  const n = await cargarNotificaciones();
  let m;
  try { m = await cargarMetricas(); } catch (e) { m = e; }
  console.timeEnd("Secuencial");
  console.log({ p, n, m });
}

// 2. Promise.all (falla si una falla)
async function cargaParalelaAll() {
  console.time("Promise.all");
  try {
    const [p, n, m] = await Promise.all([cargarPerfil(), cargarNotificaciones(), cargarMetricas()]);
    console.timeEnd("Promise.all");
    console.log({ p, n, m });
  } catch (e) {
    console.timeEnd("Promise.all");
    console.error("Falló Promise.all:", e);
  }
}

// 3. Promise.allSettled
async function cargaAllSettled() {
  console.time("allSettled");
  const resultados = await Promise.allSettled([cargarPerfil(), cargarNotificaciones(), cargarMetricas()]);
  console.timeEnd("allSettled");
  console.log(resultados.map(r => r.status === "fulfilled" ? r.value : r.reason));
}

// Ejecutar comparación
(async () => {
  console.log("=== Carga secuencial ===");
  await cargaSecuencial();
  console.log("\n=== Promise.all ===");
  await cargaParalelaAll();
  console.log("\n=== Promise.allSettled ===");
  await cargaAllSettled();
})();