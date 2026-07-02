'use strict';

/**
 * RETO 65 · Analizador de frecuencia con Map
 * ---------------------------------------------
 * Todo el conteo se hace con `Map` (nunca un objeto plano), lo que evita
 * problemas con claves reservadas de Object (p. ej. "constructor",
 * "__proto__") y permite distinguir de forma nativa "la palabra no existe"
 * (`Map.get` devuelve `undefined`) de "la palabra existe con frecuencia 0"
 * (algo que en este dominio nunca ocurre, pero la API lo deja claro con
 * `has()` en vez de adivinar a partir de un número).
 */

// ===========================================================================
// 1) Normalización del texto
// ===========================================================================

/**
 * Convierte el texto a minúsculas y extrae solo las "palabras" (secuencias
 * de letras Unicode), descartando puntuación, números sueltos y espacios.
 * Usa \p{L} (cualquier letra Unicode) con la bandera `u`, así las tildes,
 * la "ñ" y la diéresis se conservan sin necesidad de una lista manual de
 * caracteres especiales.
 */
function normalizarTexto(texto) {
  return String(texto).toLowerCase();
}

/**
 * Separa el texto normalizado en un arreglo de palabras válidas.
 * Se apoya en `normalizarTexto` para que la extracción sea consistente
 * sin importar mayúsculas/minúsculas de entrada.
 */
function extraerPalabras(texto) {
  const normalizado = normalizarTexto(texto);
  const coincidencias = normalizado.match(/[\p{L}]+/gu);
  return coincidencias ?? [];
}

// ===========================================================================
// 2) Conteo de frecuencias con Map
// ===========================================================================

/**
 * Cuenta cuántas veces aparece cada palabra. Por cada palabra: toma el
 * valor actual en el Map o 0 si aún no existe, y le suma 1.
 */
function contarFrecuencias(palabras) {
  const frecuencias = new Map();
  for (const palabra of palabras) {
    const actual = frecuencias.get(palabra) ?? 0;
    frecuencias.set(palabra, actual + 1);
  }
  return frecuencias;
}

/** Atajo: texto -> Map de frecuencias, en un solo paso. */
function analizarTexto(texto) {
  return contarFrecuencias(extraerPalabras(texto));
}

// ===========================================================================
// 3) Ranking ordenado por frecuencia
// ===========================================================================

/**
 * Convierte el Map a un arreglo de [palabra, frecuencia] ordenado de mayor
 * a menor frecuencia. En caso de empate, ordena alfabéticamente para que
 * el resultado sea determinista (mismo texto -> mismo orden siempre).
 */
function obtenerRanking(frecuencias, limite = frecuencias.size) {
  return [...frecuencias.entries()]
    .sort(([palabraA, frecA], [palabraB, frecB]) => {
      if (frecB !== frecA) return frecB - frecA;
      return palabraA.localeCompare(palabraB, 'es');
    })
    .slice(0, limite);
}

/** Las 10 palabras más frecuentes (o menos, si el texto tiene menos palabras distintas). */
function top10(frecuencias) {
  return obtenerRanking(frecuencias, 10);
}

// ===========================================================================
// 4) Consulta segura de una palabra concreta
// ===========================================================================

/**
 * Consulta la frecuencia de una palabra. Distingue explícitamente entre:
 *  - la palabra NO aparece en el texto -> { existe: false, frecuencia: null }
 *  - la palabra SÍ aparece               -> { existe: true, frecuencia: N }
 * La palabra de consulta se normaliza igual que el texto original, así
 * "Casa", "CASA" y "casa" consultan la misma clave.
 */
function consultarPalabra(frecuencias, palabra) {
  const clave = normalizarTexto(palabra).trim();
  const existe = frecuencias.has(clave);
  return {
    palabra: clave,
    existe,
    frecuencia: existe ? frecuencias.get(clave) : null,
  };
}

// ===========================================================================
// ⭐ Extensión: agrupar palabras por longitud usando Map de arrays
// ===========================================================================

/**
 * Agrupa las palabras (sin deduplicar) por su longitud en caracteres.
 * Devuelve Map<number, string[]>. Se usa el mismo patrón "valor actual o
 * arreglo vacío" que en contarFrecuencias, pero acumulando elementos
 * en vez de sumar un contador.
 */
function agruparPorLongitud(palabras) {
  const grupos = new Map();
  for (const palabra of palabras) {
    const longitud = palabra.length;
    const listaActual = grupos.get(longitud) ?? [];
    listaActual.push(palabra);
    grupos.set(longitud, listaActual);
  }
  return grupos;
}

// ===========================================================================
// Demostración (se ejecuta solo si este archivo se corre directamente)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));

  const texto = `
    El árbol crece junto al río. El río refleja el árbol y el cielo.
    ¡Qué árbol tan grande! El niño mira el árbol, el río y el cielo azul.
    El cielo, el río y el árbol forman una postal: árbol, río, cielo, río, árbol.
  `;

  separador('1) Texto original');
  console.log(texto.trim());

  separador('2) Palabras extraídas (normalizadas, sin puntuación, con tildes intactas)');
  const palabras = extraerPalabras(texto);
  console.log(palabras);
  console.log('Total de palabras:', palabras.length);

  separador('3) Frecuencias contadas con Map');
  const frecuencias = contarFrecuencias(palabras);
  console.log('¿Es instancia de Map? ->', frecuencias instanceof Map);
  console.log([...frecuencias.entries()]);

  separador('4) Ranking completo ordenado por frecuencia (y alfabético en empates)');
  console.log(obtenerRanking(frecuencias));

  separador('5) Las 10 palabras más frecuentes');
  console.table(top10(frecuencias).map(([palabra, frecuencia]) => ({ palabra, frecuencia })));

  separador('6) Consultas con get/has: existente, inexistente y con tildes');
  console.log('consultarPalabra("árbol")   ->', consultarPalabra(frecuencias, 'árbol'));
  console.log('consultarPalabra("RÍO")     ->', consultarPalabra(frecuencias, 'RÍO'));
  console.log('consultarPalabra("dragón")  ->', consultarPalabra(frecuencias, 'dragón'));
  console.log('frecuencias.get("dragón")   ->', frecuencias.get('dragón')); // undefined
  console.log('frecuencias.has("dragón")   ->', frecuencias.has('dragón')); // false
  console.log('frecuencias.get("cielo")    ->', frecuencias.get('cielo'));
  console.log('frecuencias.has("cielo")    ->', frecuencias.has('cielo'));

  separador('7) Extensión: agrupación por longitud (Map de arrays)');
  const porLongitud = agruparPorLongitud(palabras);
  const longitudesOrdenadas = [...porLongitud.keys()].sort((a, b) => a - b);
  for (const longitud of longitudesOrdenadas) {
    console.log(`Longitud ${longitud}:`, porLongitud.get(longitud));
  }

  separador('8) Verificación: la normalización es consistente');
  console.log(
    'analizarTexto("Árbol árbol ÁRBOL").get("árbol") ->',
    analizarTexto('Árbol árbol ÁRBOL').get('árbol')
  ); // debe ser 3
}

module.exports = {
  normalizarTexto,
  extraerPalabras,
  contarFrecuencias,
  analizarTexto,
  obtenerRanking,
  top10,
  consultarPalabra,
  agruparPorLongitud,
};
