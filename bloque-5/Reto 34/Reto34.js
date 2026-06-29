/*
 * Reto 34 - Tablero de tareas generado
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere: <div id="tablero"></div> y <script defer src="Reto34.js"></script>
 */

const tareas = [
  { id: 1, titulo: "Estudiar JS", prioridad: "alta", completada: false },
  { id: 2, titulo: "Hacer ejercicio", prioridad: "media", completada: true },
  { id: 3, titulo: "Leer documentación", prioridad: "baja", completada: false },
];

function renderizarTareas(lista) {
  const contenedor = document.getElementById("tablero");
  contenedor.innerHTML = ""; // limpiar

  if (lista.length === 0) {
    contenedor.textContent = "No hay tareas pendientes.";
    return;
  }

  lista.forEach(tarea => {
    const tarjeta = document.createElement("div");
    tarjeta.className = `tarea prioridad-${tarea.prioridad} ${tarea.completada ? "completada" : ""}`;
    tarjeta.dataset.id = tarea.id;
    tarjeta.textContent = tarea.titulo;
    contenedor.appendChild(tarjeta);
  });
}

renderizarTareas(tareas);