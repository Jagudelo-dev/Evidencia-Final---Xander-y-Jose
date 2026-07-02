'use strict';

const { Habitacion, Huesped, GestorReservas } = require('./reservas');

function separador(titulo) {
  console.log('\n' + '='.repeat(70));
  console.log(titulo);
  console.log('='.repeat(70));
}

const gestor = new GestorReservas();

const hab101 = new Habitacion(101, 2, 80);
const hab102 = new Habitacion(102, 4, 120);
const hab201 = new Habitacion(201, 1, 60);

const carla = new Huesped('Carla Gómez', '1094556789', 'carla@correo.com');
const juan = new Huesped('Juan Pérez', '1098765432');
const marta = new Huesped('Marta Ruiz', '1023456789');

// ---------------------------------------------------------------------------
separador('Escenario 1: reserva válida y su resumen');
// ---------------------------------------------------------------------------
const reserva1 = gestor.crearReserva(hab101, carla, '2026-08-10', '2026-08-15', 2);
console.log(reserva1.resumen());

// ---------------------------------------------------------------------------
separador('Escenario 2: capacidad insuficiente (debe fallar)');
// ---------------------------------------------------------------------------
try {
  gestor.crearReserva(hab201, juan, '2026-08-10', '2026-08-12', 3);
} catch (err) {
  console.log('Error esperado ->', err.message);
}

// ---------------------------------------------------------------------------
separador('Escenario 3: fechas inválidas, salida antes que entrada (debe fallar)');
// ---------------------------------------------------------------------------
try {
  gestor.crearReserva(hab102, juan, '2026-09-05', '2026-09-01', 2);
} catch (err) {
  console.log('Error esperado ->', err.message);
}

// ---------------------------------------------------------------------------
separador('Escenario 4: solapamiento de fechas en la misma habitación (debe fallar)');
// ---------------------------------------------------------------------------
try {
  // hab101 ya está ocupada del 10 al 15 de agosto (reserva1); esto se solapa.
  gestor.crearReserva(hab101, juan, '2026-08-13', '2026-08-18', 1);
} catch (err) {
  console.log('Error esperado ->', err.message);
}

// ---------------------------------------------------------------------------
separador('Escenario 5: fechas consecutivas (sin solapamiento) SÍ deben permitirse');
// ---------------------------------------------------------------------------
const reserva5 = gestor.crearReserva(hab101, juan, '2026-08-15', '2026-08-18', 1);
console.log('Reserva creada correctamente:');
console.log(reserva5.resumen());

// ---------------------------------------------------------------------------
separador('Escenario 6: costo total según noches y precio');
// ---------------------------------------------------------------------------
const reserva6 = gestor.crearReserva(hab102, marta, '2026-10-01', '2026-10-04', 3);
console.log(
  `${reserva6.calcularNoches()} noches x $${hab102.precioPorNoche} = $${reserva6.calcularCostoTotal().toFixed(2)}`
);

// ---------------------------------------------------------------------------
separador('Escenario 7 (extensión): cancelación con distintas anticipaciones');
// ---------------------------------------------------------------------------

// 7a. Cancelación con más de 7 días de anticipación -> sin cargo
const rA = gestor.crearReserva(hab201, carla, '2026-12-20', '2026-12-23', 1);
const cargoA = gestor.cancelarReserva(rA, '2026-12-10'); // 10 días antes
console.log('7a) Cancelación con 10 días de anticipación:');
console.log(rA.resumen());
console.log(`   -> Cargo aplicado: $${cargoA.toFixed(2)}`);

// 7b. Cancelación entre 3 y 6 días -> 50% de cargo
const rB = gestor.crearReserva(hab201, juan, '2027-01-05', '2027-01-08', 1);
const cargoB = gestor.cancelarReserva(rB, '2027-01-01'); // 4 días antes
console.log('\n7b) Cancelación con 4 días de anticipación:');
console.log(rB.resumen());
console.log(`   -> Cargo aplicado: $${cargoB.toFixed(2)}`);

// 7c. Cancelación con menos de 3 días -> 100% de cargo
const rC = gestor.crearReserva(hab102, marta, '2027-02-10', '2027-02-12', 2);
const cargoC = gestor.cancelarReserva(rC, '2027-02-09'); // 1 día antes
console.log('\n7c) Cancelación con 1 día de anticipación:');
console.log(rC.resumen());
console.log(`   -> Cargo aplicado: $${cargoC.toFixed(2)}`);

// 7d. Tras cancelar rA, la habitación 201 vuelve a estar libre en esas fechas.
const rD = gestor.crearReserva(hab201, marta, '2026-12-20', '2026-12-23', 1);
console.log('\n7d) La habitación cancelada vuelve a estar disponible:');
console.log(rD.resumen());

// ---------------------------------------------------------------------------
separador('Resumen final: todas las reservas del gestor');
// ---------------------------------------------------------------------------
gestor.reservas.forEach((r) => {
  console.log('-'.repeat(70));
  console.log(r.resumen());
});
