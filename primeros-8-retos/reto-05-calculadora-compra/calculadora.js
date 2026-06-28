/*
 * Reto 05 - Calculadora de compra inteligente
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const precioUnitario = 49.99;
const cantidad = 3;
const porcentajeDescuento = 15;
const porcentajeImpuesto = 16;

const subtotal = precioUnitario * cantidad;
const valorDescuento = (subtotal * porcentajeDescuento) / 100;
const baseGravable = subtotal - valorDescuento;
const impuesto = (baseGravable * porcentajeImpuesto) / 100;
const total = baseGravable + impuesto;

let puntosCliente = 200;
puntosCliente += Math.floor(total / 10);

const beneficioPremium = (subtotal > 100) && (total > 150);
const envioGratis = total >= 100;

console.log("🧾 RECIBO DE COMPRA");
console.log("=".repeat(40));
console.log(`Precio unitario: $${precioUnitario}`);
console.log(`Cantidad: ${cantidad}`);
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Descuento (${porcentajeDescuento}%): -$${valorDescuento.toFixed(2)}`);
console.log(`Base gravable: $${baseGravable.toFixed(2)}`);
console.log(`Impuesto (${porcentajeImpuesto}%): +$${impuesto.toFixed(2)}`);
console.log(`TOTAL: $${total.toFixed(2)}`);

console.log("\n🎁 BENEFICIOS");
console.log(`Envío gratis: ${envioGratis ? "Sí 🚚" : "No"}`);
console.log(`Beneficio premium: ${beneficioPremium ? "Activado ⭐" : "No cumple requisitos"}`);
console.log(`Puntos actuales: ${puntosCliente}`);