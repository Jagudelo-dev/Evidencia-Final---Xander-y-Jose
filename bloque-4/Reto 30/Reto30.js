// Reto 30 - Sorteo reproducible y estadísticas
// Autor: Xander González
// Fecha: 2026-06-29

const participantes = ["Ana", "Luis", "María", "Juan", "Elena"];
const puntajes = [85, 92, 78, 95, 88];

// 1. Seleccionar participante aleatorio con índice seguro
function indiceAleatorio(arr) {
  return Math.floor(Math.random() * arr.length); // nunca excede length-1
}
const ganador = participantes[indiceAleatorio(participantes)];

// 2. Generar 10 números aleatorios en rango 10-50
const min = 10, max = 50;
const aleatorios = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * (max - min + 1)) + min
);

// 3. Estadísticas
const minVal = Math.min(...aleatorios);
const maxVal = Math.max(...aleatorios);
const promedio = aleatorios.reduce((s, n) => s + n, 0) / aleatorios.length;

// 4. Verificar que todos están dentro del rango
const todosEnRango = aleatorios.every(n => n >= min && n <= max);

// 5. Formatear porcentaje y moneda con Intl
const formatoPorcentaje = new Intl.NumberFormat("es-CO", { style: "percent" });
const formatoMoneda = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });

console.log("🎲 SORTEO Y ESTADÍSTICAS");
console.log(`Ganador aleatorio: ${ganador}`);
console.log("Números generados:", aleatorios);
console.log(`Mín: ${minVal}, Máx: ${maxVal}, Promedio: ${promedio.toFixed(2)}`);
console.log(`¿Todos en rango? ${todosEnRango}`);
console.log("Formato moneda:", formatoMoneda.format(50000));
console.log("Formato porcentaje:", formatoPorcentaje.format(0.85));
console.log("\nℹ️ Math.random no es criptográficamente seguro.");