/*
 * Reto 35 - Selector de tema visual
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere botones: <button data-tema="claro">Claro</button> etc., y <p id="tema-activo"></p>
 */

const botones = document.querySelectorAll("[data-tema]");
const temaActivo = document.getElementById("tema-activo");

function cambiarTema(tema) {
  document.body.classList.remove("claro", "oscuro", "alto-contraste");
  document.body.classList.add(tema);
  temaActivo.textContent = `Tema: ${tema}`;

  botones.forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.tema === tema ? "true" : "false");
  });
}

botones.forEach(btn => {
  btn.addEventListener("click", () => cambiarTema(btn.dataset.tema));
});