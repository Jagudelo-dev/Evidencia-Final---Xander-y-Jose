/*
 * Reto 02 - Ficha digital de presentación
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const nombre = "Jose Miguel Agudelo Torres";
const ciudad = "Pereira";               // cámbialo por tu ciudad real
const programa = "Desarrollo de Software";
const meta = "Dominar JavaScript y construir aplicaciones web completas";

const tecnologias = ["JavaScript", "React", "Node.js"];

console.log("🎓 FICHA DE PRESENTACIÓN");
console.log("=".repeat(40));
console.log(`Nombre: ${nombre}`);
console.log(`Ciudad: ${ciudad}`);
console.log(`Programa: ${programa}`);
console.log(`Meta de aprendizaje: ${meta}`);

console.log("\n📊 DATOS PRINCIPALES");
console.table({
  Nombre: nombre,
  Ciudad: ciudad,
  Programa: programa,
  Meta: meta
});

console.log("\n💻 TECNOLOGÍAS DE INTERÉS");
console.table(tecnologias);

console.warn("⚠️ Recuerda actualizar tu perfil cada semestre.");
console.info("ℹ️ Esta ficha es solo una prueba de consola.");

/*
 * Diferencias observadas:
 * - console.log: mensaje estándar sin formato especial.
 * - console.info: similar a log, pero en algunos navegadores muestra un icono de información.
 * - console.warn: resalta con fondo amarillo y símbolo de advertencia.
 * - console.table: presenta datos estructurados en tabla, ideal para arreglos y objetos.
 */