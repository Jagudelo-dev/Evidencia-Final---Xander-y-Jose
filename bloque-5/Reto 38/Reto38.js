/*
 * Reto 38 - Lista de compras con delegación
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <form id="form"><input id="item"><button>Agregar</button></form>
 * <ul id="lista"></ul><p>Pendientes: <span id="pendientes">0</span></p>
 */

const form = document.getElementById("form");
const input = document.getElementById("input-item");
const lista = document.getElementById("lista");
const pendientesSpan = document.getElementById("pendientes");
let pendientes = 0;

function actualizarContador() {
  pendientesSpan.textContent = lista.querySelectorAll("li:not(.completado)").length;
}

lista.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const li = btn.closest("li");
  if (btn.dataset.action === "completar") {
    li.classList.toggle("completado");
  } else if (btn.dataset.action === "eliminar") {
    li.remove();
  }
  actualizarContador();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.innerHTML = `${texto} <button data-action="completar">✓</button> <button data-action="eliminar">X</button>`;
  lista.appendChild(li);
  input.value = "";
  actualizarContador();
});