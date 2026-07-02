/**
 * Catálogo de productos en oferta
 * Tema 11 · map, filter y forEach
 */

// ---------- 1. Array de objetos original ----------
const productos = [
  { nombre: "Laptop",       precio: 2500000, categoria: "Tecnología", descuento: 20, activo: true },
  { nombre: "Mouse",        precio: 50000,   categoria: "Tecnología", descuento: 10, activo: true },
  { nombre: "Silla",        precio: 350000,  categoria: "Hogar",      descuento: 15, activo: true },
  { nombre: "Lámpara",      precio: 80000,   categoria: "Hogar",      descuento: 30, activo: false },
  { nombre: "Audífonos",    precio: 150000,  categoria: "Tecnología", descuento: 25, activo: true },
  { nombre: "Mesa",         precio: 400000,  categoria: "Hogar",      descuento: 5,  activo: true },
  { nombre: "Teclado",      precio: 120000,  categoria: "Tecnología", descuento: 18, activo: true },
];

// ---------- 2. filter: decide inclusión, no transforma ----------
function filtrarOfertasValidas(listaProductos, categoriaOpcional = null) {
  return listaProductos.filter((producto) => {
    const cumpleOferta = producto.activo === true && producto.descuento >= 15;
    // ⭐ Extensión: filtro opcional por categoría, sin romper el filtro base
    const cumpleCategoria = categoriaOpcional === null || producto.categoria === categoriaOpcional;
    return cumpleOferta && cumpleCategoria;
  });
}

// ---------- 3. map: transforma, no decide inclusión ----------
// No se agrega 'precioFinal' al objeto original: se crea un objeto NUEVO con spread
function transformarAEtiquetas(listaFiltrada) {
  return listaFiltrada.map((producto) => {
    const precioFinal = producto.precio * (1 - producto.descuento / 100);
    const etiqueta = `${producto.nombre} - ${producto.descuento}% OFF - $${precioFinal.toFixed(0)}`;

    return {
      ...producto,        // copia las propiedades originales sin mutarlas
      precioFinal,         // nueva propiedad, solo en el objeto transformado
      etiqueta,
    };
  });
}

// ---------- 4. Ordenar sin mutar el original ----------
// sort() muta el array sobre el que se llama, por eso se usa sobre una COPIA ([...array])
function ordenarPorPrecioFinal(listaTransformada) {
  return [...listaTransformada].sort((a, b) => a.precioFinal - b.precioFinal);
}

// ---------- 5. forEach únicamente para imprimir ----------
function imprimirEtiquetas(listaOrdenada) {
  listaOrdenada.forEach((producto) => {
    console.log(producto.etiqueta); // solo lectura, no modifica nada
  });
}

// ---------- EJECUCIÓN DEL FLUJO ----------
const ofertasFiltradas = filtrarOfertasValidas(productos);
const ofertasTransformadas = transformarAEtiquetas(ofertasFiltradas);
const ofertasOrdenadas = ordenarPorPrecioFinal(ofertasTransformadas);

console.log("===== ETIQUETAS DE OFERTAS (ordenadas por precio final) =====");
imprimirEtiquetas(ofertasOrdenadas);

// ---------- 6. Comparación de longitudes ----------
console.log("\n===== COMPARACIÓN DE LONGITUDES =====");
console.log("Original:", productos.length);
console.log("Filtrado:", ofertasFiltradas.length);
console.log("Transformado:", ofertasTransformadas.length);

// ---------- Verificación: el original NO fue modificado ----------
console.log("\n===== VERIFICACIÓN DEL ORIGINAL =====");
console.log("¿El primer producto original tiene 'precioFinal'?:", "precioFinal" in productos[0]);
console.log("Producto original sin alterar:", productos[0]);

// ---------- ⭐ EXTENSIÓN: filtro opcional por categoría ----------
console.log("\n===== OFERTAS SOLO DE 'Tecnología' =====");
const ofertasTecnologia = transformarAEtiquetas(filtrarOfertasValidas(productos, "Tecnología"));
const ofertasTecnologiaOrdenadas = ordenarPorPrecioFinal(ofertasTecnologia);
imprimirEtiquetas(ofertasTecnologiaOrdenadas);