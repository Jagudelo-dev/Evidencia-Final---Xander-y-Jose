/*
 * Reto 53 - Importador de configuración JSON
 * Autor: Xander González
 * Fecha: 2026-06-29
 */

const textarea = document.getElementById("json-input");
const btn = document.getElementById("procesar");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", () => {
  const raw = textarea.value;
  resultado.textContent = "";
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    resultado.textContent = "❌ Error de sintaxis JSON: " + e.message;
    return;
  }
  // Validar estructura
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    resultado.textContent = "❌ Se esperaba un objeto JSON con propiedades tema, idioma y notificaciones.";
    return;
  }
  const defecto = { tema: "claro", idioma: "es", notificaciones: true };
  const final = { ...defecto, ...obj };
  if (typeof final.tema !== "string" || typeof final.idioma !== "string" || typeof final.notificaciones !== "boolean") {
    resultado.textContent = "❌ Tipos incorrectos: tema e idioma deben ser texto, notificaciones debe ser booleano.";
    return;
  }
  resultado.innerHTML = `<pre>${JSON.stringify(final, null, 2)}</pre>`;
});