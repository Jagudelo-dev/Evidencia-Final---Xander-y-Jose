/*
 * Reto 44 - Asistente de formulario por sesión
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: formulario con campos nombre, email, telefono, password, documento, etc.
 * <p id="aviso-privacidad"></p>
 * Se excluyen password y documento del guardado.
 */

const camposPermitidos = ["nombre", "email", "telefono"];
const camposSensibles = ["password", "documento"];
const claveSesion = "formularioSesion";

const form = document.getElementById("form-sesion");
const aviso = document.getElementById("aviso-privacidad");

function guardarEstado() {
  const data = {};
  camposPermitidos.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  sessionStorage.setItem(claveSesion, JSON.stringify(data));
  aviso.textContent = "ℹ️ Se guardó tu avance (datos no sensibles).";
}

function restaurarEstado() {
  try {
    const raw = sessionStorage.getItem(claveSesion);
    if (!raw) return;
    const data = JSON.parse(raw);
    camposPermitidos.forEach(id => {
      const el = document.getElementById(id);
      if (el && data[id] !== undefined) el.value = data[id];
    });
    aviso.textContent = "♻️ Se restauró tu sesión anterior.";
  } catch (e) {}
}

// Guardar al cambiar cualquier campo permitido
camposPermitidos.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", guardarEstado);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sessionStorage.removeItem(claveSesion);
  aviso.textContent = "✅ Formulario enviado. Borrador eliminado.";
  form.reset();
});

restaurarEstado();