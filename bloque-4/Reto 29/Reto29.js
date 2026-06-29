// Reto 29 - Agenda de vencimientos
// Autor: Xander González
// Fecha: 2026-06-29

const hoy = new Date();
const vencimientos = [
  new Date("2026-07-10"), // próximo
  new Date("2026-06-25"), // vencido
  new Date("2026-07-05"), // urgente
];

// 1. Calcular días restantes (diferencia en ms)
function diasRestantes(fecha) {
  const diff = fecha.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// 2. Clasificar
function clasificar(dias) {
  if (dias < 0) return "Vencido";
  if (dias <= 3) return "Urgente";
  if (dias <= 7) return "Próximo";
  return "Estable";
}

// 3. Copia ordenada cronológicamente
const ordenado = [...vencimientos].sort((a, b) => a - b);

// 4. Formatear con Intl (es-CO)
const formateador = new Intl.DateTimeFormat("es-CO", { dateStyle: "full" });

console.log("📅 AGENDA DE VENCIMIENTOS");
ordenado.forEach((fecha, i) => {
  const dias = diasRestantes(fecha);
  console.log(`${i+1}. ${formateador.format(fecha)} → ${dias} días (${clasificar(dias)})`);
});