/*
 * Reto 52 - Cliente CRUD de tareas
 * Autor: Xander González
 * Fecha: 2026-06-29
 */

const API = "https://jsonplaceholder.typicode.com/todos"; // sin barra final
const lista = document.getElementById("lista");
const form = document.getElementById("form-agregar");
const textoInput = document.getElementById("texto");

async function request(url, options = {}) {
  const resp = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!resp.ok) throw new Error("Error " + resp.status);
  // Para DELETE, la API puede no devolver JSON; en ese caso devolvemos un objeto vacío
  const text = await resp.text();
  return text ? JSON.parse(text) : {};
}

async function listarTareas() {
  try {
    const tareas = await request(API + "?_limit=5");
    lista.innerHTML = "";
    tareas.forEach(t => {
      const div = document.createElement("div");
      div.className = "tarea";
      div.innerHTML = `<span>${t.title} (${t.completed ? "✓" : "✗"})</span>
        <button data-id="${t.id}" data-action="toggle">Cambiar estado</button>
        <button data-id="${t.id}" data-action="delete">Eliminar</button>`;
      lista.appendChild(div);
    });
  } catch (e) {
    lista.textContent = "Error al cargar tareas.";
  }
}

lista.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "toggle") {
    const tarea = await request(API + "/" + id);
    await request(API + "/" + id, { method: "PATCH", body: JSON.stringify({ completed: !tarea.completed }) });
  } else if (btn.dataset.action === "delete") {
    await request(API + "/" + id, { method: "DELETE" });
  }
  listarTareas();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const texto = textoInput.value.trim();
  if (!texto) return;
  await request(API, { method: "POST", body: JSON.stringify({ title: texto, completed: false }) });
  textoInput.value = "";
  listarTareas();
});

listarTareas();