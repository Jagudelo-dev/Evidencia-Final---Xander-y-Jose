// Reto 28 - Compositor de equipos
// Autor: Xander González
// Fecha: 2026-06-29

// 1. Dos arrays de integrantes
const equipoA = ["Laura", "Carlos"];
const equipoB = ["Diana", "Pedro"];

// Unir sin mutar
const equipoCompleto = [...equipoA, ...equipoB];

// 2. Objetos base de perfil y sobrescribir rol
const perfilBase = { activo: true, horas: 40 };
const perfil1 = { ...perfilBase, rol: "Líder" };
const perfil2 = { ...perfilBase, rol: "Desarrollador" };

// 3. Función con parámetros rest para habilidades
function registrarHabilidades(nombre, ...habilidades) {
  // Eliminar duplicados
  const unicas = [...new Set(habilidades)];
  return { nombre, habilidades: unicas };
}

const perfilConHabilidades = registrarHabilidades("Laura", "JS", "React", "JS", "Node");

// 4. Copia del equipo y agregar un integrante solo a la copia
const copiaEquipo = [...equipoCompleto, "Mario"];

console.log("🧩 COMPOSITOR DE EQUIPOS");
console.log("Equipo original:", equipoCompleto);
console.log("Copia con nuevo integrante:", copiaEquipo);
console.log("¿Original intacto?", equipoCompleto.length === 4);
console.log("\nPerfiles:", perfil1, perfil2);
console.log("Perfil con habilidades:", perfilConHabilidades);