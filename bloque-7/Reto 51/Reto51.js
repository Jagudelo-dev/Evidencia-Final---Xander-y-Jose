/*
 * Reto 51 - Buscador de usuarios remoto
 * Autor: Xander González
 * Fecha: 2026-06-29
 */

const form = document.getElementById("form-busqueda");
const input = document.getElementById("busqueda");
const estado = document.getElementById("estado");
const resultados = document.getElementById("resultados");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = input.value.trim();
  if (!nombre) return;

  estado.textContent = "⏳ Cargando...";
  resultados.innerHTML = "";

  try {
    const url = new URL("https://api.github.com/search/users");
    url.searchParams.set("q", nombre);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Error HTTP " + resp.status);
    const data = await resp.json();
    if (data.items.length === 0) {
      estado.textContent = "🔍 Sin resultados.";
      return;
    }
    estado.textContent = "";
    data.items.forEach(user => {
      const div = document.createElement("div");
      div.innerHTML = `<img src="${user.avatar_url}" width="50"> <a href="${user.html_url}" target="_blank">${user.login}</a>`;
      resultados.appendChild(div);
    });
  } catch (err) {
    estado.textContent = "❌ Error: " + err.message;
  }
});