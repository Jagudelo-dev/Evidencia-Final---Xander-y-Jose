/*
 * Reto 56 - Cola de descargas limitada
 * Autor: Xander González
 * Fecha: 2026-06-29
 * Ejecutar: node Reto56.js
 */

function ejecutarConLimite(tareas, limite) {
  const resultados = new Array(tareas.length);
  let indice = 0;          // cuál es la siguiente tarea por lanzar
  let completadas = 0;     // cuántas terminaron (bien o mal)
  let enEjecucion = 0;     // cuántas se están ejecutando ahora

  return new Promise((resolve) => {
    function iniciarSiguiente() {
      // Mientras haya tareas pendientes y no estemos al límite, lanzamos una nueva
      while (indice < tareas.length && enEjecucion < limite) {
        const i = indice++;
        enEjecucion++;

        tareas[i]().then(
          (val) => { resultados[i] = val; },
          (err) => { resultados[i] = { error: err.message }; }
        ).finally(() => {
          completadas++;
          enEjecucion--;
          // Al terminar una, intentamos lanzar la siguiente
          if (completadas === tareas.length) {
            resolve(resultados);
          } else {
            iniciarSiguiente();
          }
        });
      }
    }

    // Arrancar las primeras 'limite' tareas
    for (let j = 0; j < limite && j < tareas.length; j++) {
      const i = indice++;
      enEjecucion++;
      tareas[i]().then(
        (val) => { resultados[i] = val; },
        (err) => { resultados[i] = { error: err.message }; }
      ).finally(() => {
        completadas++;
        enEjecucion--;
        if (completadas === tareas.length) {
          resolve(resultados);
        } else {
          iniciarSiguiente();
        }
      });
    }

    if (tareas.length === 0) resolve([]);
  });
}

// Simulación de 10 tareas con tiempos distintos
const tareas = Array.from({ length: 10 }, (_, i) => () =>
  new Promise((resolve, reject) => {
    const tiempo = Math.floor(Math.random() * 1000) + 500;
    console.log(`[Inicio] Tarea ${i+1} (duración ${tiempo}ms)`);
    setTimeout(() => {
      if (i === 3) {
        console.log(`[Error] Tarea 4 falló`);
        reject(new Error("Fallo en tarea 4"));
      } else {
        console.log(`[Fin] Tarea ${i+1} completada`);
        resolve(`Tarea ${i+1} completada en ${tiempo}ms`);
      }
    }, tiempo);
  })
);

(async () => {
  console.log("Procesando con límite 3...\n");
  console.time("Total");
  const resultados = await ejecutarConLimite(tareas, 3);
  console.timeEnd("Total");
  console.log("\nResultados finales:");
  resultados.forEach((r, i) => console.log(`Tarea ${i+1}: `, r));
})();