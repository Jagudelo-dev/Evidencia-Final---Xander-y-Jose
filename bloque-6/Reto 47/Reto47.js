/*
 * Reto 47 - Procesador de pedidos con callback
 * Autor: Xander González
 * Fecha: 2026-06-29
 * Ejecutar con Node.js: node Reto47.js
 */

function procesarPedido(pedido, onSuccess, onError) {
  const { productos, total } = pedido;
  if (!Array.isArray(productos) || productos.length === 0) {
    return onError("Pedido sin productos.");
  }
  if (typeof total !== "number" || total <= 0) {
    return onError("Total inválido.");
  }

  setTimeout(() => {
    onSuccess(`Pedido procesado: ${productos.length} producto(s), total $${total}`);
  }, 1000);
}

// Pruebas
const pedidos = [
  { productos: ["libro"], total: 45 },
  { productos: [], total: 10 },
  { productos: ["lápiz"], total: -5 },
];

pedidos.forEach((p, i) => {
  console.log(`\nProcesando pedido ${i+1}...`);
  procesarPedido(p,
    (msg) => console.log(`✅ ${msg}`),
    (err) => console.log(`❌ Error: ${err}`)
  );
});

// Reflexión: el anidamiento se vuelve complejo al encadenar múltiples tareas con callbacks.