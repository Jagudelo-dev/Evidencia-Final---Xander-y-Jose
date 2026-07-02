/**
 * Panel de estudiantes
 * Tema 11 · map, filter y forEach
 */

// ---------- 1. Datos originales ----------
const estudiantes = [
  { nombre: "Ana",     nota: 55, asistencia: 60, entregasPendientes: 3 },
  { nombre: "Luis",    nota: 90, asistencia: 95, entregasPendientes: 0 },
  { nombre: "Marcela", nota: 65, asistencia: 50, entregasPendientes: 2 },
  { nombre: "Pedro",   nota: 40, asistencia: 45, entregasPendientes: 4 },
  { nombre: "Sofía",   nota: 78, asistencia: 88, entregasPendientes: 1 },
  { nombre: "Jorge",   nota: 58, asistencia: 70, entregasPendientes: 3 },
  { nombre: "Valeria", nota: 95, asistencia: 92, entregasPendientes: 0 },
];

// ---------- Condición de riesgo en función con nombre (regla técnica) ----------
// Combina al menos tres indicadores: nota baja, asistencia baja, entregas pendientes altas.
// Se cuentan las señales verdaderas convirtiendo cada condición en 1/0 y sumándolas (pista del reto).
function contarSenalesDeRiesgo(estudiante) {
  const notaBaja = estudiante.nota < 60 ? 1 : 0;
  const asistenciaBaja = estudiante.asistencia < 75 ? 1 : 0;
  const entregasAltas = estudiante.entregasPendientes >= 2 ? 1 : 0;

  return notaBaja + asistenciaBaja + entregasAltas;
}

function esEstudianteEnRiesgo(estudiante) {
  // Riesgo si tiene dos o más señales activas (paso 2 del reto)
  return contarSenalesDeRiesgo(estudiante) >= 2;
}

// ⭐ Extensión: condición de estudiante destacado (función con nombre, separada)
function esEstudianteDestacado(estudiante) {
  return estudiante.nota >= 85 && estudiante.asistencia >= 90 && estudiante.entregasPendientes === 0;
}

// ---------- 2. FILTER: decide quiénes entran al grupo de riesgo ----------
// Se usa filter porque su responsabilidad natural es seleccionar elementos según una condición,
// sin transformarlos ni producir efectos secundarios.
const estudiantesEnRiesgo = estudiantes.filter(esEstudianteEnRiesgo);

// ⭐ Extensión: filter también para destacados, misma justificación
const estudiantesDestacados = estudiantes.filter(esEstudianteDestacado);

// ---------- 3. MAP: construye el nuevo array con nivel y mensaje ----------
// Se usa map (no forEach) porque la regla técnica exige NO usar forEach para construir arrays:
// map siempre retorna un nuevo array del mismo tamaño que la entrada, ideal para transformar
// cada estudiante en un objeto de alerta sin mutar el original (se usa spread).
function clasificarNivelDeRiesgo(estudiante) {
  const senales = contarSenalesDeRiesgo(estudiante);
  if (senales === 3) return "Crítico";
  return "Moderado"; // ya filtrado: aquí siempre es >= 2
}

function construirMensajePersonalizado(estudiante) {
  const motivos = [];
  if (estudiante.nota < 60) motivos.push("nota baja");
  if (estudiante.asistencia < 75) motivos.push("asistencia insuficiente");
  if (estudiante.entregasPendientes >= 2) motivos.push("entregas pendientes acumuladas");

  return `${estudiante.nombre} requiere atención por: ${motivos.join(", ")}.`;
}

const alertasDeRiesgo = estudiantesEnRiesgo.map((estudiante) => ({
  ...estudiante, // copia sin mutar el original
  nivel: clasificarNivelDeRiesgo(estudiante),
  mensaje: construirMensajePersonalizado(estudiante),
}));

// ---------- 4. FOREACH: solo para registrar/imprimir alertas (efecto secundario) ----------
// Se usa forEach porque aquí no se necesita un array nuevo, solo "hacer algo" (imprimir)
// por cada elemento ya transformado. Usar map para esto sería incorrecto, ya que su valor
// de retorno no se usaría.
console.log("===== ALERTAS DE RIESGO =====");
alertasDeRiesgo.forEach((alerta) => {
  console.log(`[${alerta.nivel}] ${alerta.mensaje}`);
});

// ---------- 5. Cálculo de totales ----------
const totalEnRiesgo = estudiantesEnRiesgo.length;
const totalFueraDeRiesgo = estudiantes.length - totalEnRiesgo;

console.log("\n===== RESUMEN =====");
console.log("Total de estudiantes:", estudiantes.length);
console.log("Total en riesgo:", totalEnRiesgo);
console.log("Total fuera de riesgo:", totalFueraDeRiesgo);

// ---------- ⭐ EXTENSIÓN: lista de estudiantes destacados ----------
console.log("\n===== ESTUDIANTES DESTACADOS =====");
estudiantesDestacados.forEach((estudiante) => {
  console.log(`🌟 ${estudiante.nombre} - Nota: ${estudiante.nota}, Asistencia: ${estudiante.asistencia}%`);
});
console.log("Total destacados:", estudiantesDestacados.length);

// ---------- Verificación: los registros originales no fueron modificados ----------
console.log("\n===== VERIFICACIÓN DEL ORIGINAL =====");
console.log("¿Ana original tiene 'mensaje'?:", "mensaje" in estudiantes[0]);
console.log("Registro original de Ana:", estudiantes[0]);