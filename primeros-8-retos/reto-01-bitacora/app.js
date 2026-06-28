/*
 * Reto 01 - Bitácora del primer programa
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

// Mensaje que incluye tabulación y salto de línea
const mensajeInicio = "\t🟢 SESIÓN INICIADA\n" + "Bienvenido al entorno de pruebas";
const objetivo = "Verificar que la consola funciona correctamente";
const estado = "Estado: OK";

console.time("Tiempo de ejecución");

console.group("📋 BITÁCORA DEL PROGRAMA");

console.log("📌 INICIO:");
console.log(mensajeInicio);
console.log("\n📌 OBJETIVO:");
console.log(objetivo);
console.log("\n📌 ESTADO:");
console.log(estado);

console.log("\n✅ La ejecución terminó sin errores.");

console.groupEnd();
console.timeEnd("Tiempo de ejecución");