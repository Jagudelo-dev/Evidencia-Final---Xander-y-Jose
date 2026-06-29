/*
 * Reto 41 - Temporizador Pomodoro
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <p id="tiempo">25:00</p>
 * <button id="iniciar">Iniciar</button>
 * <button id="pausar">Pausar</button>
 * <button id="reiniciar">Reiniciar</button>
 * <p id="fase">Trabajo</p>
 */

const tiempoElem = document.getElementById("tiempo");
const faseElem = document.getElementById("fase");
let tiempoRestante = 25 * 60; // segundos
let intervalo = null;
let fase = "Trabajo";

function formatear(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const sec = String(segundos % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function actualizarPantalla() {
  tiempoElem.textContent = formatear(tiempoRestante);
  faseElem.textContent = fase;
}

function detenerIntervalo() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }
}

function cambiarFase() {
  if (fase === "Trabajo") {
    fase = "Descanso";
    tiempoRestante = 5 * 60;
  } else {
    fase = "Trabajo";
    tiempoRestante = 25 * 60;
  }
  actualizarPantalla();
}

document.getElementById("iniciar").addEventListener("click", () => {
  if (intervalo) return; // ya está corriendo
  intervalo = setInterval(() => {
    if (tiempoRestante > 0) {
      tiempoRestante--;
      actualizarPantalla();
    } else {
      detenerIntervalo();
      cambiarFase();
      // Opcional: iniciar automáticamente la siguiente fase
      // pero la indicación es cambiar fase sin iniciar automáticamente
    }
  }, 1000);
});

document.getElementById("pausar").addEventListener("click", () => {
  detenerIntervalo();
});

document.getElementById("reiniciar").addEventListener("click", () => {
  detenerIntervalo();
  fase = "Trabajo";
  tiempoRestante = 25 * 60;
  actualizarPantalla();
});

actualizarPantalla();