/*
 * Reto 36 - Indicador de progreso accesible
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <div id="barra"><div id="relleno"></div></div><p id="porcentaje"></p>
 */

const relleno = document.getElementById("relleno");
const porcentajeTexto = document.getElementById("porcentaje");

function actualizarProgreso(valor) {
  const normalizado = Math.max(0, Math.min(100, valor));
  relleno.style.width = normalizado + "%";
  relleno.setAttribute("aria-valuenow", normalizado);
  relleno.setAttribute("aria-valuemin", 0);
  relleno.setAttribute("aria-valuemax", 100);
  porcentajeTexto.textContent = normalizado + "%";

  relleno.className = "";
  if (normalizado === 0) relleno.classList.add("inicial");
  else if (normalizado === 100) relleno.classList.add("completo");
  else relleno.classList.add("activo");
}

actualizarProgreso(45);