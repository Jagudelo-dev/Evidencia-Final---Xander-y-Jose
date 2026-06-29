/*
 * Reto 55 - Predicción del orden de ejecución
 * Autor: Xander González
 * Fecha: 2026-06-29
 * Ejecutar: node Reto55.js
 */

console.log("1. Inicio síncrono");

setTimeout(() => console.log("2. setTimeout 0"), 0);

Promise.resolve().then(() => console.log("3. Microtarea (Promise.then)"));

setTimeout(() => console.log("4. setTimeout 0 segunda"), 0);

(async () => {
  await Promise.resolve();
  console.log("5. async/await (microtarea)");
})();

queueMicrotask(() => console.log("6. queueMicrotask"));

Promise.resolve().then(() => {
  console.log("7. Otra microtarea encadenada");
  return Promise.resolve();
}).then(() => console.log("8. Encadenada segunda parte"));

console.log("9. Final síncrono");

/*
 * 📈 Línea temporal esperada (predicción antes de ejecutar):
 * - Se ejecuta el código síncrono: 1, 9
 * - Luego se vacían las microtareas: 3, 5, 6, 7, 8
 * - Finalmente los temporizadores: 2, 4
 *
 * Orden real (confirmado al ejecutar): 1, 9, 3, 5, 6, 7, 8, 2, 4
 */