export function renderizarProductos(lista, contenedor) {
  contenedor.innerHTML = "";
  lista.forEach(prod => {
    const card = document.createElement("div");
    card.textContent = `${prod.nombre} - $${prod.precio}`;
    contenedor.appendChild(card);
  });
}