// Reto 32 - Importador de registros
// Autor: Xander González
// Fecha: 2026-06-29

const registros = [
  { nombre: "Ana", correo: "ana@mail.com", edad: 25 },
  { nombre: "", correo: "invalido", edad: 17 }, // nombre vacío, correo malo
  { nombre: "Luis", correo: "luis@mail.com", edad: 40 },
  { nombre: "María", correo: "maria@mail.com", edad: -5 }, // edad negativa
];

function validarRegistro(registro, indice) {
  const { nombre, correo, edad } = registro;
  if (!nombre || nombre.trim() === "") {
    throw new Error(`Índice ${indice}: nombre vacío.`);
  }
  if (!correo.includes("@")) {
    throw new Error(`Índice ${indice}: correo inválido "${correo}".`);
  }
  if (typeof edad !== "number" || edad < 0 || edad > 120) {
    throw new Error(`Índice ${indice}: edad fuera de rango (${edad}).`);
  }
  return { ...registro, nombre: nombre.trim().toLowerCase(), correo: correo.trim().toLowerCase() };
}

const validos = [];
const errores = [];

registros.forEach((reg, i) => {
  try {
    validos.push(validarRegistro(reg, i));
  } catch (error) {
    errores.push({ indice: i, mensaje: error.message, original: reg });
  }
});

const porcentajeExito = (validos.length / registros.length) * 100;

console.log("📥 IMPORTADOR DE REGISTROS");
console.log(`Válidos: ${validos.length}, Errores: ${errores.length}`);
console.log(`Porcentaje de éxito: ${porcentajeExito.toFixed(1)}%`);
console.log("\n✅ Registros válidos:", validos);
console.log("❌ Errores:", errores);