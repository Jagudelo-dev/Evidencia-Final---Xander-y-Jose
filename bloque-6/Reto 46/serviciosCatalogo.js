import { productos } from "./datos.js";

export function filtrarPorCategoria(categoria) {
  return productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
}

export function ordenarPorPrecio(asc = true) {
  return [...productos].sort((a, b) => asc ? a.precio - b.precio : b.precio - a.precio);
}

export function todos() {
  return [...productos];
}