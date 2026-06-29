// Reto 27 - Normalizador de respuestas API
// Autor: Xander González
// Fecha: 2026-06-29

const respuestaAPI = {
  id: 987,
  nombre: "Ana Martínez",
  correo: "ana@example.com",
  ubicacion: {
    ciudad: "Bogotá",
    pais: "Colombia",
  },
  roles: ["editor", "moderador"],
  metadatos: {
    creado: "2026-01-15",
    actualizado: "2026-06-20",
  },
};

// 1. Desestructurar y renombrar
const {
  id: usuarioId,
  nombre,
  correo,
  ubicacion: { ciudad },
  roles,
  ...resto
} = respuestaAPI;

// 2. Valor por defecto para teléfono (no existe)
const { telefono = "No registrado" } = respuestaAPI;

// 3. Construir objeto listo para interfaz
const perfilUI = {
  usuarioId,
  nombre,
  correo,
  ciudad,
  telefono,
  rolPrincipal: roles[0],
};

console.log("📱 RESPUESTA NORMALIZADA");
console.log(perfilUI);
console.log("\n📦 Metadatos y resto:", resto);