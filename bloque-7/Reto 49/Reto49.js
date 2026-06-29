/*
 * Reto 49 - Flujo de matrícula asíncrono
 * Autor: Xander González
 * Fecha: 2026-06-29
 */

async function consultarEstudiante(id) {
  if (!id) throw new Error("ID inválido");
  return { id, nombre: "Estudiante " + id };
}

async function validarDeuda(estudiante) {
  if (estudiante.id === "123") throw new Error("Deuda pendiente");
  return "Sin deuda";
}

async function registrarAsignaturas(estudiante) {
  return ["Matemáticas", "Física"];
}

async function matricularEstudiante(id) {
  try {
    const estudiante = await consultarEstudiante(id);
    console.log("Estudiante consultado:", estudiante.nombre);
    const estadoDeuda = await validarDeuda(estudiante);
    console.log("Estado deuda:", estadoDeuda);
    const asignaturas = await registrarAsignaturas(estudiante);
    return { estudiante: estudiante.nombre, asignaturas };
  } catch (error) {
    console.error("❌ Fallo en etapa:", error.message);
    throw error;
  } finally {
    console.log("🔚 Operación finalizada.");
  }
}

// Pruebas
(async () => {
  console.log("--- Caso exitoso ---");
  console.log(await matricularEstudiante("456"));
  console.log("\n--- Caso fallido ---");
  try {
    await matricularEstudiante("123");
  } catch (e) {}
})();