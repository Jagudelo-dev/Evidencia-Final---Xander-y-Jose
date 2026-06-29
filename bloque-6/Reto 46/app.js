import { filtrarPorCategoria, ordenarPorPrecio, todos } from "./serviciosCatalogo.js";
import { renderizarProductos } from "./vistaCatalogo.js";

const contenedor = document.getElementById("catalogo");
document.getElementById("btn-electronica").addEventListener("click", () => {
  renderizarProductos(filtrarPorCategoria("Electrónica"), contenedor);
});
document.getElementById("btn-todos").addEventListener("click", () => {
  renderizarProductos(todos(), contenedor);
});
document.getElementById("btn-ordenar").addEventListener("click", () => {
  renderizarProductos(ordenarPorPrecio(true), contenedor);
});

// inicial
renderizarProductos(todos(), contenedor);