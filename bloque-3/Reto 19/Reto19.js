/**
 * Carrito de compras dinámico
 * Tema 10 · Arrays fundamentales
 */

// ---------- 1. Array vacío + cuatro productos ----------
const carrito = []; // MUTA: push() modifica el array original

carrito.push("Camiseta");
carrito.push("Pantalón");
carrito.push("Zapatos");
carrito.push("Gorra");

console.log("Paso 1 - Carrito con cuatro productos:", carrito);

// ---------- 2. Insertar producto urgente al inicio ----------
// unshift() MUTA: agrega al inicio y desplaza los demás índices
carrito.unshift("Pedido urgente: Mascarilla");

console.log("Paso 2 - Después de unshift:", carrito);

// ---------- 3. Eliminar el último producto y conservar su valor ----------
// pop() MUTA: elimina y retorna el último elemento
const productoEliminado = carrito.pop();

console.log("Paso 3 - Después de pop:", carrito);
console.log("Producto eliminado conservado:", productoEliminado);

// ⭐ Extensión: pila de deshacer (guarda lo eliminado para poder restaurarlo)
const historialEliminados = [productoEliminado];

// ---------- 4. Sustituir un producto intermedio con splice ----------
// splice() MUTA: aquí se usa para REEMPLAZAR (eliminar 1 elemento e insertar otro)
// Validación: comprobar que el índice exista antes de operar
const indiceASustituir = 2;
let productoSustituido = null;

if (indiceASustituir >= 0 && indiceASustituir < carrito.length) {
  productoSustituido = carrito.splice(indiceASustituir, 1, "Chaqueta")[0];
}

console.log("Paso 4 - Después de splice (sustitución):", carrito);
console.log("Producto sustituido:", productoSustituido);

// ---------- 5. Copia parcial con slice (NO muta) ----------
// slice() NO MUTA: devuelve un nuevo array independiente del original
const copiaParcial = carrito.slice(0, 2);

// Verificación de independencia: modificar la copia no debe afectar al original
copiaParcial.push("Producto solo en la copia");

console.log("Paso 5 - Copia parcial (modificada):", copiaParcial);
console.log("Paso 5 - Carrito original (sin alterar):", carrito);

// ---------- Comprobación con includes ----------
const tieneGorra = carrito.includes("Gorra");
console.log("¿El carrito incluye 'Gorra'?:", tieneGorra);

// ---------- Acceso seguro a índices (evita índices inexistentes) ----------
function obtenerProductoSeguro(arr, indice) {
  if (indice < 0 || indice >= arr.length) {
    return "⚠️ Índice fuera de rango";
  }
  return arr[indice];
}

console.log("Acceso seguro a índice 10 (inexistente):", obtenerProductoSeguro(carrito, 10));
console.log("Acceso seguro a índice 0:", obtenerProductoSeguro(carrito, 0));

// ---------- 6. Resumen final ----------
console.log("\n===== RESUMEN FINAL =====");
console.log("Carrito actual:", carrito);
console.log("Copia parcial:", copiaParcial);
console.log("Producto eliminado (pop):", productoEliminado);
console.log("Total de elementos en el carrito (length):", carrito.length);
console.log("==========================\n");

// ---------- ⭐ EXTENSIÓN: deshacer la última eliminación ----------
function deshacerUltimaEliminacion(arr, historial) {
  if (historial.length === 0) {
    console.log("No hay eliminaciones para deshacer.");
    return;
  }
  const productoRestaurado = historial.pop(); // saca del historial (MUTA el historial)
  arr.push(productoRestaurado);               // lo regresa al carrito (MUTA el carrito)
  console.log(`Producto restaurado: "${productoRestaurado}"`);
}

console.log("Antes de deshacer:", carrito);
deshacerUltimaEliminacion(carrito, historialEliminados);
console.log("Después de deshacer:", carrito);