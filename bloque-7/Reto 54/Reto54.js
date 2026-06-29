/*
 * Reto 54 - Adaptador de datos para gráficos
 * Autor: Xander González
 * Fecha: 2026-06-29
 * Ejecutar: node Reto54.js
 */

const transacciones = [
  { fecha: "2026-01-15", categoria: "Electrónica", valor: 200 },
  { fecha: "2026-01-20", categoria: "Hogar", valor: 150 },
  { fecha: "2026-02-10", categoria: "Electrónica", valor: 300 },
  { fecha: "2026-02-15", categoria: "Hogar", valor: 100 },
  { fecha: "2026-03-05", categoria: "Juguetes", valor: 50 },
  { fecha: "2026-03-08", categoria: null, valor: 120 }, // inválido
];

// Filtrar inválidos (categoria debe ser string, valor > 0)
const validas = transacciones.filter(t => typeof t.categoria === "string" && t.categoria.trim() !== "" && t.valor > 0);

// Normalizar fechas (extraer mes como YYYY-MM)
const normalizadas = validas.map(t => ({
  ...t,
  mes: t.fecha.substring(0, 7)
}));

// Agrupar por mes y categoría
const agrupado = normalizadas.reduce((acc, t) => {
  if (!acc[t.mes]) acc[t.mes] = {};
  acc[t.mes][t.categoria] = (acc[t.mes][t.categoria] || 0) + t.valor;
  return acc;
}, {});

// Convertir a array ordenado
const resultado = Object.entries(agrupado)
  .sort(([mesA], [mesB]) => mesA.localeCompare(mesB))
  .map(([mes, cats]) => ({ mes, categorias: cats }));

console.log("📊 Datos adaptados para gráfico:");
console.log(JSON.stringify(resultado, null, 2));