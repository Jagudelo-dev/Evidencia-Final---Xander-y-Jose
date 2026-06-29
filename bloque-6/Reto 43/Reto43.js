/*
 * Reto 43 - Notas persistentes
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <form id="form-nota"><input id="texto-nota"><button>Agregar</button></form>
 * <ul id="lista-notas"></ul>
 * <button id="borrar-todo">Borrar todas</button>
 */

const claveStorage = "notasApp";
const formNota = document.getElementById("form-nota");
const textoInput = document.getElementById("texto-nota");
const lista = document.getElementById("lista-notas");
const btnBorrar = document.getElementById("borrar-todo");

function leerNotas() {
  try {
    const raw = localStorage.getItem(claveStorage);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function guardarNotas(notas) {
  localStorage.setItem(claveStorage, JSON.stringify(notas));
}

function renderizar() {
  const notas = leerNotas();
  lista.innerHTML = "";
  notas.forEach((nota) => {
    const li = document.createElement("li");
    li.textContent = nota.texto + " (" + new Date(nota.fecha).toLocaleDateString() + ")";
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✓";
    btnCompletar.addEventListener("click", () => {
      const todas = leerNotas().filter(n => n.id !== nota.id);
      guardarNotas(todas);
      renderizar();
    });
    li.appendChild(btnCompletar);
    lista.appendChild(li);
  });
}

formNota.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = textoInput.value.trim();
  if (!texto) return;
  const notas = leerNotas();
  notas.push({ id: Date.now(), texto, fecha: Date.now() });
  guardarNotas(notas);
  renderizar();
  textoInput.value = "";
});

btnBorrar.addEventListener("click", () => {
  if (confirm("¿Borrar todas las notas?")) {
    localStorage.removeItem(claveStorage);
    renderizar();
  }
});

renderizar();