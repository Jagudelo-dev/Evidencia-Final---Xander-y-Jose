'use strict';

/**
 * RETO 68 · Explorador de árbol con generadores
 * -------------------------------------------------
 * `recorrer(nodo)` es una generator function recursiva: por cada nodo
 * produce (`yield`) un registro con el nodo, su profundidad y su ruta
 * desde la raíz, y delega (`yield*`) en cada hijo para que el propio
 * generador recursivo entregue sus valores. Nunca se aplana el árbol en
 * un array antes de recorrerlo: cada valor se calcula justo cuando el
 * consumidor lo pide (`.next()` / `for...of`).
 */

// ===========================================================================
// 1) Árbol de categorías de ejemplo
// ===========================================================================

function crearArbolDeEjemplo() {
  return {
    nombre: 'Catálogo',
    hijos: [
      {
        nombre: 'Electrónica',
        hijos: [
          { nombre: 'Computadoras', hijos: [
            { nombre: 'Laptops', hijos: [] },
            { nombre: 'Escritorio', hijos: [] },
          ] },
          { nombre: 'Celulares', hijos: [] },
        ],
      },
      {
        nombre: 'Hogar',
        hijos: [
          { nombre: 'Cocina', hijos: [
            { nombre: 'Ollas', hijos: [] },
          ] },
          { nombre: 'Muebles', hijos: [] },
        ],
      },
      { nombre: 'Juguetes', hijos: [] },
    ],
  };
}

// ===========================================================================
// 2) Generador recursivo: recorrer(nodo)
// ===========================================================================

/**
 * Recorre el árbol en profundidad (DFS, pre-orden) emitiendo un registro
 * por nodo: { nodo, profundidad, ruta }.
 *
 * - Caso base: un nodo sin hijos (`hijos` vacío o ausente) simplemente se
 *   emite y el bucle `for...of` sobre sus hijos no itera nada más: ahí
 *   termina esa rama de la recursión, sin condición especial adicional.
 * - `yield*` delega en el generador recursivo de cada hijo, así el
 *   generador padre "se convierte" temporalmente en el generador del
 *   hijo mientras este produce valores.
 * - `visitados` (⭐ extensión) es un Set de referencias de nodos ya
 *   emitidos en ESTE recorrido. Si un nodo ya fue visitado (referencia
 *   cíclica: un hijo apunta de vuelta a un ancestro), se corta esa rama
 *   en vez de recursar infinitamente — ese es el segundo caso base.
 */
function* recorrer(nodo, { profundidad = 0, ruta = [], visitados = new Set() } = {}) {
  if (visitados.has(nodo)) {
    // Caso base (ciclo detectado): no se vuelve a emitir ni a recursar.
    return;
  }
  visitados.add(nodo);

  const rutaActual = [...ruta, nodo.nombre];
  yield { nodo, profundidad, ruta: rutaActual };

  for (const hijo of nodo.hijos ?? []) {
    yield* recorrer(hijo, { profundidad: profundidad + 1, ruta: rutaActual, visitados });
  }
}

// ===========================================================================
// 3) Filtro opcional sobre el recorrido (sigue siendo perezoso)
// ===========================================================================

/**
 * Envuelve `recorrer` para emitir solo los nodos que cumplen `predicado`.
 * Sigue siendo un generador: no arma un array intermedio con todos los
 * nodos filtrados de antemano, solo "deja pasar" los que cumplen a medida
 * que el generador base los va produciendo.
 */
function* recorrerFiltrado(nodo, predicado) {
  for (const registro of recorrer(nodo)) {
    if (predicado(registro.nodo, registro)) {
      yield registro;
    }
  }
}

// ===========================================================================
// 4) Búsqueda con parada temprana
// ===========================================================================

/**
 * Busca la primera categoría cuyo nombre coincide, deteniendo el consumo
 * del generador en cuanto la encuentra (no sigue recorriendo el resto del
 * árbol). Devuelve también cuántos nodos tuvo que visitar para probar que
 * el generador es realmente perezoso (no precalculó todo el árbol).
 */
function buscarCategoria(raiz, nombreObjetivo) {
  let nodosVisitados = 0;
  for (const registro of recorrer(raiz)) {
    nodosVisitados++;
    if (registro.nodo.nombre === nombreObjetivo) {
      return { encontrado: registro, nodosVisitados };
    }
  }
  return { encontrado: null, nodosVisitados };
}

// ===========================================================================
// Demostración (se ejecuta solo si este archivo se corre directamente)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));
  const arbol = crearArbolDeEjemplo();

  separador('1) Recorrido completo: todos los niveles, con profundidad y ruta');
  for (const { nodo, profundidad, ruta } of recorrer(arbol)) {
    console.log('  '.repeat(profundidad) + `- ${nodo.nombre}  (nivel ${profundidad})  [${ruta.join(' > ')}]`);
  }

  separador('2) recorrer() es un generador: cada valor se produce bajo demanda');
  const it = recorrer(arbol);
  console.log('typeof it.next ->', typeof it.next); // confirma que es un iterador
  console.log('it.next() #1 ->', it.next().value.nodo.nombre); // Catálogo
  console.log('it.next() #2 ->', it.next().value.nodo.nombre); // Electrónica
  console.log('(el resto del árbol AÚN no se calculó; se calcula recién al pedir más .next())');

  separador('3) Filtro opcional: solo categorías "hoja" (sin hijos)');
  const esHoja = (nodo) => (nodo.hijos ?? []).length === 0;
  for (const { nodo, ruta } of recorrerFiltrado(arbol, esHoja)) {
    console.log(`- ${ruta.join(' > ')}`);
  }

  separador('4) Filtro opcional: categorías en profundidad >= 2');
  for (const { nodo, profundidad } of recorrerFiltrado(arbol, (_n, registro) => registro.profundidad >= 2)) {
    console.log(`- ${nodo.nombre} (nivel ${profundidad})`);
  }

  separador('5) Parada temprana: buscar "Celulares" sin recorrer todo el árbol');
  const resultado = buscarCategoria(arbol, 'Celulares');
  console.log('Encontrado ->', resultado.encontrado.ruta.join(' > '));
  console.log('Nodos visitados hasta encontrarlo ->', resultado.nodosVisitados);
  console.log('(el árbol completo tiene más nodos que ese número; no se recorrió todo)');

  separador('6) Categoría inexistente: se recorre todo el árbol y no se encuentra');
  const noExiste = buscarCategoria(arbol, 'Videojuegos');
  console.log('Encontrado ->', noExiste.encontrado);
  console.log('Nodos visitados (árbol completo) ->', noExiste.nodosVisitados);

  separador('7) Extensión: detección de referencias cíclicas');
  const nodoA = { nombre: 'A', hijos: [] };
  const nodoB = { nombre: 'B', hijos: [nodoA] };
  nodoA.hijos.push(nodoB); // ciclo: A -> B -> A -> B -> ...

  const registros = [...recorrer(nodoA)];
  console.log(
    'Recorrido de un árbol cíclico (A <-> B) termina en vez de colgarse ->',
    registros.map((r) => r.nodo.nombre)
  );
  console.log('Cantidad de registros emitidos (uno por nodo distinto, sin repetir) ->', registros.length);
}

module.exports = {
  crearArbolDeEjemplo,
  recorrer,
  recorrerFiltrado,
  buscarCategoria,
};
