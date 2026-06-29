/*
 * Reto 39 - Registro de participante
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere formulario con campos: nombre, correo, edad, terminos; y div para errores y éxito.
 */

const formRegistro = document.getElementById("form-registro");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const edadInput = document.getElementById("edad");
const terminosCheck = document.getElementById("terminos");
const erroresDiv = document.getElementById("errores");
const exitoDiv = document.getElementById("exito");

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  erroresDiv.innerHTML = "";
  exitoDiv.textContent = "";
  let errores = [];

  const nombre = nombreInput.value.trim();
  const correo = correoInput.value.trim();
  const edad = parseInt(edadInput.value);
  const terminos = terminosCheck.checked;

  if (!nombre) errores.push("Nombre es obligatorio.");
  if (!correo.includes("@")) errores.push("Correo inválido.");
  if (isNaN(edad) || edad < 18) errores.push("Debes ser mayor de edad.");
  if (!terminos) errores.push("Acepta los términos.");

  if (errores.length > 0) {
    erroresDiv.innerHTML = errores.map(e => `<p>${e}</p>`).join("");
  } else {
    exitoDiv.textContent = `Registro exitoso: ${nombre} (${correo})`;
    formRegistro.reset();
  }
});