// Reto 26 - Comparador de configuraciones
// Autor: Xander González
// Fecha: 2026-06-29

"use strict";

const configDefecto = {
  tema: "claro",
  idioma: "es",
  notificaciones: true,
  sonido: true,
  volumen: 50,
};

const preferenciasUsuario = {
  tema: "oscuro",
  notificaciones: false,
  volumen: 80,
};

// 1. Combinar objetos: preferencias sobreescriben defecto (sin mutar)
const configFinal = { ...configDefecto, ...preferenciasUsuario };

// 2. Detectar propiedades desconocidas (claves que no existen en defecto)
const clavesDefecto = Object.keys(configDefecto);
const desconocidas = Object.keys(preferenciasUsuario).filter(k => !clavesDefecto.includes(k));

// 3. Listar claves, valores y entradas
console.log("🔧 CONFIGURACIÓN FINAL");
console.log("Claves:", Object.keys(configFinal));
console.log("Valores:", Object.values(configFinal));
console.log("Entradas:", Object.entries(configFinal));

// 4. Congelar la configuración final
Object.freeze(configFinal);

try {
  configFinal.tema = "alto contraste";
} catch (e) {
  console.log("💡 No se puede modificar un objeto congelado (modo estricto)");
}

console.log(`\n⚠️ Propiedades desconocidas: ${desconocidas.length ? desconocidas.join(", ") : "Ninguna"}`);