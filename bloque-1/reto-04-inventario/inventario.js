/*
 * Reto 04 - Control de inventario básico
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const codigo = "PRD-001";
const nombre = "Teclado mecánico RGB";
let precio = 85.99;
let cantidad = 25;
let proveedor;                        // undefined
let fechaReposicion = null;           // null – sin fecha conocida
let disponibilidad = true;

let totalInventario = precio * cantidad;
console.log("📦 CONTROL DE INVENTARIO");
console.log(`Código: ${codigo}`);
console.log(`Nombre: ${nombre}`);
console.log(`Precio unitario: $${precio}`);
console.log(`Cantidad: ${cantidad}`);
console.log(`Valor total: $${totalInventario}`);

// Prueba de NaN
let cantidadInvalida = "abc";
let totalErroneo = precio * cantidadInvalida;
console.log("\n⚠️ PRUEBA DE NaN");
console.log(`Multiplicación inválida: ${precio} * "${cantidadInvalida}" = ${totalErroneo}`);
console.log(`¿Es NaN? ${Number.isNaN(totalErroneo)}`);

// Corrección
cantidad = Number(cantidadInvalida);
if (Number.isNaN(cantidad)) {
  cantidad = 0;
}
totalInventario = precio * cantidad;
console.log("\n✅ CORRECCIÓN");
console.log(`Cantidad corregida: ${cantidad}`);
console.log(`Nuevo valor total: $${totalInventario}`);

console.log("\n📊 TABLA DE DATOS Y TIPOS");
const datos = [
  { Dato: "codigo", Valor: codigo, Tipo: typeof codigo },
  { Dato: "nombre", Valor: nombre, Tipo: typeof nombre },
  { Dato: "precio", Valor: precio, Tipo: typeof precio },
  { Dato: "cantidad", Valor: cantidad, Tipo: typeof cantidad },
  { Dato: "proveedor", Valor: proveedor, Tipo: typeof proveedor },
  { Dato: "fechaReposicion", Valor: fechaReposicion, Tipo: typeof fechaReposicion },
  { Dato: "disponibilidad", Valor: disponibilidad, Tipo: typeof disponibilidad },
];
console.table(datos);

/*
 * Diferencias entre null y undefined:
 * - undefined: la variable fue declarada pero aún no se le ha asignado valor.
 * - null: ausencia intencional de un valor, asignado por el programador.
 */