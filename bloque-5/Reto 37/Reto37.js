/*
 * Reto 37 - Contador de interacciones
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <button id="inc">+</button><button id="dec">-</button><button id="reset">Reset</button>
 * <p id="contador">0</p><p id="ultimo-evento"></p>
 */

let contador = 0;
const contElem = document.getElementById("contador");
const ultEvent = document.getElementById("ultimo-evento");
const btnInc = document.getElementById("inc");
const btnDec = document.getElementById("dec");
const btnReset = document.getElementById("reset");

function actualizar() {
  contElem.textContent = contador;
  btnDec.disabled = contador === 0;
}

function registrarEvento(tipo) {
  ultEvent.textContent = `Último evento: ${tipo}`;
}

btnInc.addEventListener("click", () => { contador++; actualizar(); registrarEvento("click +"); });
btnDec.addEventListener("click", () => { if (contador > 0) contador--; actualizar(); registrarEvento("click -"); });
btnReset.addEventListener("click", () => { contador = 0; actualizar(); registrarEvento("reset"); });

document.addEventListener("keydown", (e) => {
  if (e.key === "+") { contador++; actualizar(); registrarEvento("tecla +"); }
  else if (e.key === "-") { if (contador > 0) contador--; actualizar(); registrarEvento("tecla -"); }
  else if (e.key === "Escape") { contador = 0; actualizar(); registrarEvento("tecla Escape"); }
});