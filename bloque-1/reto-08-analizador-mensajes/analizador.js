/*
 * Reto 08 - Analizador de mensajes
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const mensajeOriginal = "  Este  producto es  spam! SPAM es  molesto y ofensivo. ";

const mensajeLimpio = mensajeOriginal.trim().replace(/\s+/g, " ");

console.log("📏 LONGITUD");
console.log(`Original: ${mensajeOriginal.length} caracteres`);
console.log(`Limpio: ${mensajeLimpio.length} caracteres`);

const palabras = mensajeLimpio.split(" ");
const numeroPalabras = palabras.length;
console.log(`Palabras: ${numeroPalabras}`);

const prohibidas = ["spam", "ofensivo"];
let contieneProhibida = false;
let mensajeCensurado = mensajeLimpio;

prohibidas.forEach((mala) => {
  const regex = new RegExp(mala, "gi");
  if (regex.test(mensajeLimpio)) {
    contieneProhibida = true;
    mensajeCensurado = mensajeCensurado.replace(regex, "***");
  }
});

const vistaPrevia = mensajeCensurado.length > 30 
  ? mensajeCensurado.substring(0, 30) + "..." 
  : mensajeCensurado;

console.log("\n🚦 MODERACIÓN");
console.log(`¿Contiene palabras prohibidas? ${contieneProhibida ? "Sí" : "No"}`);
console.log(`Versión censurada: "${mensajeCensurado}"`);
console.log(`Vista previa: "${vistaPrevia}"`);

const estado = contieneProhibida ? "REVISADO (contenido inapropiado)" : "APROBADO";
console.log(`Estado: ${estado}`);