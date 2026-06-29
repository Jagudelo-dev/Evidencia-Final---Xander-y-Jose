// Reto 23 - Resumen financiero mensual
// Autor: Xander González
// Fecha: 2026-06-29

const movimientos = [
  { fecha: "2026-06-01", tipo: "ingreso", categoria: "Salario", valor: 2500 },
  { fecha: "2026-06-03", tipo: "gasto", categoria: "Comida", valor: 45 },
  { fecha: "2026-06-05", tipo: "gasto", categoria: "Transporte", valor: 30 },
  { fecha: "2026-06-07", tipo: "ingreso", categoria: "Freelance", valor: 600 },
  { fecha: "2026-06-10", tipo: "gasto", categoria: "Comida", valor: 70 },
  { fecha: "2026-06-12", tipo: "gasto", categoria: "Ocio", valor: 120 },
  { fecha: "2026-06-15", tipo: "ingreso", categoria: "Salario", valor: 2500 },
  { fecha: "2026-06-18", tipo: "gasto", categoria: "Transporte", valor: 25 },
];

// 1. Calcular ingresos, gastos y balance con reduce
const ingresos = movimientos
  .filter(m => m.tipo === "ingreso")
  .reduce((acc, m) => acc + m.valor, 0);

const gastos = movimientos
  .filter(m => m.tipo === "gasto")
  .reduce((acc, m) => acc + m.valor, 0);

const balance = ingresos - gastos;

// 2. Agrupar gastos por categoría
const gastosPorCategoria = movimientos
  .filter(m => m.tipo === "gasto")
  .reduce((acc, m) => {
    acc[m.categoria] = (acc[m.categoria] || 0) + m.valor;
    return acc;
  }, {});

// 3. Encontrar el primer gasto superior a 50
const primerGastoAlto = movimientos.find(m => m.tipo === "gasto" && m.valor > 50);

// 4. Copia ordenada de mayor a menor valor
const copiaOrdenada = [...movimientos].sort((a, b) => b.valor - a.valor);

// 5. Mostrar los tres movimientos más altos y resumen
console.log("📊 RESUMEN FINANCIERO");
console.log(`Ingresos: $${ingresos} | Gastos: $${gastos} | Balance: $${balance}`);
console.log("\n📦 Gastos por categoría:", gastosPorCategoria);
console.log("\n🔍 Primer gasto > $50:", primerGastoAlto ?? "No encontrado");
console.log("\n🏆 Top 3 movimientos (por valor):");
copiaOrdenada.slice(0, 3).forEach((m, i) => console.log(`${i+1}. ${m.categoria} - $${m.valor}`));

// Extensión: porcentaje de cada categoría sobre el gasto total
console.log("\n📈 Porcentaje por categoría:");
Object.entries(gastosPorCategoria).forEach(([cat, val]) => {
  console.log(`${cat}: ${((val / gastos) * 100).toFixed(1)}%`);
});