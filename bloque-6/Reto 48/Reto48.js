/*
 * Reto 48 - Cadena de reserva con Promise
 * Autor: Xander González
 * Fecha: 2026-06-29
 */

function validarCupo(datos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => datos.cupo ? resolve("Cupo validado") : reject("Sin cupo"), 500);
  });
}

function registrarPago() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Pago registrado"), 700);
  });
}

function emitirConfirmacion() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Confirmación enviada"), 300);
  });
}

// Reserva exitosa
console.log("=== Reserva exitosa ===");
validarCupo({ cupo: true })
  .then(msg => { console.log(msg); return registrarPago(); })
  .then(msg => { console.log(msg); return emitirConfirmacion(); })
  .then(msg => console.log(msg))
  .catch(err => console.error("❌ " + err))
  .finally(() => console.log("[Proceso terminado]"));

// Reserva fallida
setTimeout(() => {
  console.log("\n=== Reserva fallida ===");
  validarCupo({ cupo: false })
    .then(msg => { console.log(msg); return registrarPago(); })
    .then(msg => { console.log(msg); return emitirConfirmacion(); })
    .then(msg => console.log(msg))
    .catch(err => console.error("❌ " + err))
    .finally(() => console.log("[Proceso terminado]"));
}, 1500);