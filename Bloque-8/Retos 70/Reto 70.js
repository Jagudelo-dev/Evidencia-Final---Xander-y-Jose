/**
 * descuentos.js
 * =======================================================================
 * Módulo de descuentos — versión corregida (entregable final).
 *
 * Historial de depuración: esta versión partió de descuentos.buggy.js,
 * que contenía 2 errores introducidos a propósito. Ambos fueron
 * detectados por descuentos.test.js y corregidos aquí sin modificar
 * ningún resultado esperado de las pruebas. Ver README.md y
 * bitacora_depuracion.txt para el detalle completo.
 */

"use strict";

function redondear2(numero) {
  return Math.round((numero + Number.EPSILON) * 100) / 100;
}

/**
 * calcularDescuento(precio, porcentaje)
 *
 * Reglas de negocio:
 *  - precio: número finito >= 0. Si no cumple, lanza RangeError.
 *  - porcentaje: número finito entre 0 y 100, AMBOS extremos incluidos.
 *    Si no cumple, lanza RangeError.
 *  - Devuelve el monto de descuento (no el precio final), redondeado a
 *    2 decimales.
 *  - Casos límite: 0% de descuento devuelve 0; 100% de descuento
 *    devuelve exactamente el precio recibido.
 *
 * @param {number} precio
 * @param {number} porcentaje
 * @returns {number}
 */
function calcularDescuento(precio, porcentaje) {
  if (typeof precio !== "number" || !Number.isFinite(precio) || precio < 0) {
    throw new RangeError("El precio debe ser un número finito mayor o igual a 0.");
  }

  // ✅ Corrección del BUG A: el límite superior es <= 100 (inclusive),
  // no < 100. Antes se usaba `porcentaje >= 100`, lo que rechazaba por
  // error el caso límite válido de un 100% de descuento.
  if (typeof porcentaje !== "number" || !Number.isFinite(porcentaje) || porcentaje < 0 || porcentaje > 100) {
    throw new RangeError("El porcentaje de descuento debe estar entre 0 y 100.");
  }

  const bruto = precio * (porcentaje / 100);
  return redondear2(bruto);
}

/**
 * calcularTotal(precio, cantidad, porcentaje, descuentoFijo = 0)
 *
 * Reglas de negocio:
 *  - cantidad: entero >= 1. Si no cumple, lanza RangeError.
 *  - descuentoFijo: número finito >= 0 (monto fijo adicional, opcional)
 *    que se resta DESPUÉS del descuento porcentual.
 *  - subtotal = precio * cantidad.
 *  - Se aplica primero el descuento porcentual sobre el subtotal.
 *  - Luego se aplica el descuento fijo, pero SIN dejar el total por
 *    debajo de 0: si el descuento fijo es mayor que lo que queda, se
 *    limita a ese remanente (invariante: el total nunca es negativo).
 *  - Devuelve el total redondeado a 2 decimales.
 *
 * @param {number} precio
 * @param {number} cantidad
 * @param {number} porcentaje
 * @param {number} [descuentoFijo=0]
 * @returns {number}
 */
function calcularTotal(precio, cantidad, porcentaje, descuentoFijo = 0) {
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new RangeError("La cantidad debe ser un entero mayor o igual a 1.");
  }
  if (typeof descuentoFijo !== "number" || !Number.isFinite(descuentoFijo) || descuentoFijo < 0) {
    throw new RangeError("El descuento fijo debe ser un número finito mayor o igual a 0.");
  }

  const subtotal = redondear2(precio * cantidad);
  const descuentoPorcentual = calcularDescuento(subtotal, porcentaje);
  const baseTrasPorcentual = redondear2(subtotal - descuentoPorcentual);

  // ✅ Corrección del BUG B: se limita el descuento fijo con Math.min
  // para que nunca supere lo que queda por cobrar. Así se garantiza la
  // invariante "el total nunca es negativo" (ver prueba de propiedad).
  const descuentoFijoAplicado = Math.min(descuentoFijo, baseTrasPorcentual);
  const total = redondear2(baseTrasPorcentual - descuentoFijoAplicado);

  return total;
}

module.exports = { calcularDescuento, calcularTotal, redondear2 };
