/*
 * Reto 42 - Ubicación con alternativa
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <button id="btn-ubicacion">Obtener ubicación</button>
 * <p id="estado"></p>
 * <input id="ciudad-manual" placeholder="Ciudad">
 * <p id="coordenadas"></p>
 */

const btn = document.getElementById("btn-ubicacion");
const estado = document.getElementById("estado");
const ciudadManual = document.getElementById("ciudad-manual");
const coord = document.getElementById("coordenadas");

function mostrarCarga(activo) {
  estado.textContent = activo ? "⏳ Obteniendo ubicación..." : "";
}

btn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    estado.textContent = "❌ Geolocalización no soportada.";
    return;
  }
  mostrarCarga(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      coord.textContent = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)} (Precisión: ${pos.coords.accuracy}m)`;
      estado.textContent = "✅ Ubicación obtenida.";
      mostrarCarga(false);
    },
    (err) => {
      mostrarCarga(false);
      switch (err.code) {
        case err.PERMISSION_DENIED: estado.textContent = "⚠️ Permiso denegado. Usa la ciudad manual."; break;
        case err.POSITION_UNAVAILABLE: estado.textContent = "❌ Posición no disponible."; break;
        case err.TIMEOUT: estado.textContent = "⏰ Tiempo agotado."; break;
        default: estado.textContent = "❌ Error desconocido.";
      }
    },
    { timeout: 10000 }
  );
});

ciudadManual.addEventListener("input", () => {
  if (ciudadManual.value.trim()) {
    estado.textContent = `📍 Ciudad manual: ${ciudadManual.value.trim()}`;
  }
});