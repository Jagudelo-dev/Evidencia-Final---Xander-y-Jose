/*
 * Reto 03 - Perfil de usuario tipado
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const id = 2026001n;                        // bigint – identificador único
const nombreCompleto = "Jose Miguel Agudelo Torres";
const fechaRegistro = "2026-03-15";

let puntos = 1200;
let activo = true;
let ultimoAcceso;                           // undefined

// Simulamos nueva sesión
puntos += 150;
ultimoAcceso = "2026-06-27 10:30";

console.log("📋 PERFIL DE USUARIO (TIPOS)");
console.log("=".repeat(50));
console.log(`ID: ${id} → Tipo: ${typeof id}`);
console.log(`Nombre completo: ${nombreCompleto} → Tipo: ${typeof nombreCompleto}`);
console.log(`Fecha de registro: ${fechaRegistro} → Tipo: ${typeof fechaRegistro}`);
console.log(`Puntos: ${puntos} → Tipo: ${typeof puntos}`);
console.log(`Activo: ${activo} → Tipo: ${typeof activo}`);
console.log(`Último acceso: ${ultimoAcceso} → Tipo: ${typeof ultimoAcceso}`);

console.log("\n📌 RESUMEN ACTUALIZADO");
console.log(`ID: ${id}`);
console.log(`Nombre: ${nombreCompleto}`);
console.log(`Puntos acumulados: ${puntos}`);
console.log(`Estado activo: ${activo}`);
console.log(`Último acceso registrado: ${ultimoAcceso}`);

/*
 * Justificación del uso de const:
 * - id, nombreCompleto y fechaRegistro no se modifican después de su creación,
 *   por eso las declaramos como constantes.
 * - puntos, activo y ultimoAcceso sí requieren cambios durante la ejecución,
 *   por lo tanto se usó let.
 */