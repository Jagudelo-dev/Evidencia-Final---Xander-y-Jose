// Reto 31 - Cajero seguro
// Autor: Xander González
// Fecha: 2026-06-29

function retirar(saldo, monto) {
  // Validar tipos y rangos
  if (typeof monto !== "number" || isNaN(monto)) {
    throw new Error("Monto no numérico: debe ser un número válido.");
  }
  if (monto <= 0) {
    throw new Error("Monto no positivo: solo se permiten retiros mayores a cero.");
  }
  if (monto > saldo) {
    throw new Error("Fondos insuficientes: el saldo actual es menor que el monto solicitado.");
  }
  return saldo - monto;
}

// Pruebas
const escenarios = [
  { saldo: 1000, monto: 200, desc: "Retiro válido" },
  { saldo: 1000, monto: "abc", desc: "Monto no numérico" },
  { saldo: 1000, monto: -50, desc: "Monto negativo" },
  { saldo: 100, monto: 500, desc: "Fondos insuficientes" },
];

let exitos = 0, fallos = 0;

escenarios.forEach(({ saldo, monto, desc }) => {
  try {
    const nuevoSaldo = retirar(saldo, monto);
    console.log(`✅ ${desc}: Nuevo saldo $${nuevoSaldo}`);
    exitos++;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`❌ ${desc}: ${error.message}`);
    } else {
      console.log(`❌ ${desc}: Error desconocido`);
    }
    fallos++;
  } finally {
    console.log("   [Operación terminada]");
  }
});

console.log(`\n📊 Resumen: ${exitos} exitosas, ${fallos} fallidas`);