// Reto 24 - Auditor de pedidos
// Autor: Xander González
// Fecha: 2026-06-29

const pedidos = [
  { id: 1, total: 150, pagado: true, direccion: "Calle 123", productos: 4 },
  { id: 2, total: 0, pagado: false, direccion: "", productos: 2 },
  { id: 3, total: 200, pagado: false, direccion: "Av. Principal", productos: 6 },
  { id: 4, total: 75, pagado: true, direccion: "Calle 456", productos: 1 },
  { id: 5, total: 300, pagado: true, direccion: "Carrera 7", productos: 8 },
];

// 1. every: todos tienen dirección completa (no vacía)
const todasDireccion = pedidos.every(p => p.direccion.trim() !== "");

// 2. some: detectar pedidos sin pagar o con total cero
const hayPendientes = pedidos.some(p => !p.pagado || p.total === 0);

// 3. find: primer pedido que supere 250 para revisión manual
const pedidoRevision = pedidos.find(p => p.total > 250);

// 4. Copia ordenada por número de productos y luego por total (desc)
const copiaOrdenada = [...pedidos].sort((a, b) => {
  if (b.productos !== a.productos) return b.productos - a.productos;
  return b.total - a.total;
});

// 5. Decisión final
let decision;
if (!todasDireccion) {
  decision = "Rechazar: faltan direcciones completas";
} else if (hayPendientes) {
  decision = "Revisar: hay pedidos sin pagar o con total cero";
} else if (pedidoRevision) {
  decision = `Revisar: pedido ID ${pedidoRevision.id} supera revisión manual`;
} else {
  decision = "Aprobar lote";
}

console.log("🔍 AUDITOR DE PEDIDOS");
console.log(`¿Todas las direcciones? ${todasDireccion}`);
console.log(`¿Hay pendientes? ${hayPendientes}`);
console.log("Pedido para revisión:", pedidoRevision ?? "Ninguno");
console.log("\n📋 Pedidos ordenados (copia):", copiaOrdenada);
console.log(`\n✅ Decisión final: ${decision}`);