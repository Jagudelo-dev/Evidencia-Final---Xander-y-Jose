/**
 * Generador de facturas modular
 * Tema 08 · Funciones y funciones flecha
 */

// ---------- 1. FUNCIÓN DECLARADA: subtotal ----------
function calcularSubtotal(precio, cantidad) {
  if (!Number.isFinite(precio) || !Number.isFinite(cantidad) || precio < 0 || cantidad < 0) {
    return 0;
  }
  return precio * cantidad;
}

// ---------- 2. EXPRESIÓN DE FUNCIÓN: descuento ----------
const calcularDescuento = function (subtotal, porcentajeDescuento = 0) {
  if (!Number.isFinite(subtotal) || !Number.isFinite(porcentajeDescuento) || porcentajeDescuento < 0) {
    return 0;
  }
  return subtotal * (porcentajeDescuento / 100);
};

// ---------- 3. FUNCIÓN FLECHA: impuesto ----------
const calcularImpuesto = (baseGravable, porcentajeImpuesto = 19) => {
  if (!Number.isFinite(baseGravable) || !Number.isFinite(porcentajeImpuesto) || porcentajeImpuesto < 0) {
    return 0;
  }
  return baseGravable * (porcentajeImpuesto / 100);
};

// ---------- 4. FUNCIÓN PRINCIPAL: compone las demás, no conoce las fórmulas ----------
// ⭐ EXTENSIÓN: acepta una función de descuento como callback (por defecto usa calcularDescuento)
function generarFactura(
  { precio, cantidad, porcentajeDescuento = 0, porcentajeImpuesto = 19 },
  funcionDescuento = calcularDescuento
) {
  const subtotal = calcularSubtotal(precio, cantidad);
  const descuento = funcionDescuento(subtotal, porcentajeDescuento);
  const baseGravable = subtotal - descuento; // el impuesto se calcula sobre el valor ya descontado
  const impuesto = calcularImpuesto(baseGravable, porcentajeImpuesto);
  const total = baseGravable + impuesto;

  return {
    producto: precio !== undefined ? `Precio unitario: $${precio}` : "N/A",
    cantidad,
    subtotal,
    descuento,
    impuesto,
    total
  };
}

// ⭐ Callback de descuento alternativo: descuento fijo en vez de porcentual
const descuentoFijo = (subtotal, montoFijo = 0) => {
  if (!Number.isFinite(subtotal) || !Number.isFinite(montoFijo) || montoFijo < 0) return 0;
  return Math.min(montoFijo, subtotal); // nunca descuenta más que el propio subtotal
};

// ---------- 6. PRUEBAS: tres facturas + tabla comparativa ----------
const factura1 = generarFactura({ precio: 50000, cantidad: 3, porcentajeDescuento: 10, porcentajeImpuesto: 19 });
const factura2 = generarFactura({ precio: 120000, cantidad: 1 }); // usa valores por defecto (0% desc, 19% imp)
const factura3 = generarFactura(
  { precio: 30000, cantidad: 5, porcentajeImpuesto: 5 },
  descuentoFijo // usa el callback alternativo en lugar del porcentual
);
// Nota: factura3 usa descuentoFijo, así que el "porcentajeDescuento" no se usó;
// para que el callback reciba un monto fijo, lo pasamos directamente:
const factura3Corregida = generarFactura(
  { precio: 30000, cantidad: 5, porcentajeImpuesto: 5 },
  (subtotal) => descuentoFijo(subtotal, 20000) // descuento fijo de $20.000
);

console.log("Factura 1:", factura1);
console.log("Factura 2:", factura2);
console.log("Factura 3 (con descuento fijo):", factura3Corregida);

console.table([
  { Factura: "1", Subtotal: factura1.subtotal, Descuento: factura1.descuento, Impuesto: factura1.impuesto, Total: factura1.total },
  { Factura: "2", Subtotal: factura2.subtotal, Descuento: factura2.descuento, Impuesto: factura2.impuesto, Total: factura2.total },
  { Factura: "3", Subtotal: factura3Corregida.subtotal, Descuento: factura3Corregida.descuento, Impuesto: factura3Corregida.impuesto, Total: factura3Corregida.total },
]);