"use strict";

/**
 * Hoisting bajo investigación
 * Tema 09 · Ámbito, hoisting y modo estricto
 *
 * IMPORTANTE: este archivo es un laboratorio de OBSERVACIÓN.
 * Llamar o leer variables antes de su declaración NO es una práctica
 * recomendada; aquí se hace deliberadamente para estudiar el comportamiento.
 * Cada experimento está aislado en su propia función para no mezclar casos.
 */

const resultados = []; // tabla de resultados, se llena experimento por experimento

function registrar(caso, valorObtenido, error, explicacion) {
  resultados.push({ caso, valorObtenido, error, explicacion });
}

// ============================================================
// CASO 1: declaración de función (function declaration)
// ============================================================
function experimentoDeclaracionFuncion() {
  try {
    // Se llama ANTES de la línea donde aparece escrita la función.
    const resultado = saludar();
    registrar(
      "1. function declaration llamada antes de su línea",
      resultado,
      null,
      "El motor sube tanto la declaración como su definición completa (hoisting total). La función ya está lista para usarse desde el inicio del ámbito."
    );
  } catch (e) {
    registrar("1. function declaration llamada antes de su línea", null, e.message, "No debería fallar.");
  }

  function saludar() {
    return "Hola, soy una función declarada";
  }
}

// ============================================================
// CASO 2: expresión de función (function expression) asignada con var
// ============================================================
function experimentoExpresionFuncionVar() {
  try {
    // Se intenta llamar antes de la línea de asignación.
    const resultado = saludarExpresion();
    registrar(
      "2. function expression (var) llamada antes de su línea",
      resultado,
      null,
      "No debería ejecutarse sin error."
    );
  } catch (e) {
    registrar(
      "2. function expression (var) llamada antes de su línea",
      undefined,
      e.message,
      "Solo el nombre 'saludarExpresion' se sube (hoisting de declaración), inicializado en undefined. Intentar invocar 'undefined' como función lanza TypeError."
    );
  }

  var saludarExpresion = function () {
    return "Hola, soy una expresión de función";
  };
}

// ============================================================
// CASO 3: lectura de var antes de su declaración
// ============================================================
function experimentoVar() {
  let valorObtenido;
  let errorMsg = null;
  try {
    valorObtenido = contador; // se lee antes de declararse
  } catch (e) {
    errorMsg = e.message;
  }

  registrar(
    "3. Lectura de 'var' antes de su declaración",
    valorObtenido,
    errorMsg,
    "'var' se declara (hoisting) pero se inicializa en 'undefined' hasta llegar a su línea. Leerla antes no lanza error, solo da 'undefined'."
  );

  var contador = 10;
}

// ============================================================
// CASO 4: lectura de let antes de su declaración (Zona Temporal Muerta)
// ============================================================
function experimentoLet() {
  let valorObtenido;
  let errorMsg = null;
  try {
    valorObtenido = nombre; // se lee antes de declararse
  } catch (e) {
    errorMsg = e.message;
  }

  registrar(
    "4. Lectura de 'let' antes de su declaración (TDZ)",
    valorObtenido,
    errorMsg,
    "'let' existe para el motor desde el inicio del bloque, pero permanece en la Zona Temporal Muerta (TDZ) sin inicializar. Leerla antes de su línea lanza ReferenceError."
  );

  let nombre = "Ana";
}

// ============================================================
// CASO 5: lectura de const antes de su declaración (TDZ)
// ============================================================
function experimentoConst() {
  let valorObtenido;
  let errorMsg = null;
  try {
    valorObtenido = PI_APROXIMADO; // se lee antes de declararse
  } catch (e) {
    errorMsg = e.message;
  }

  registrar(
    "5. Lectura de 'const' antes de su declaración (TDZ)",
    valorObtenido,
    errorMsg,
    "Igual que 'let', 'const' está en la TDZ hasta su línea de declaración. El error es indistinguible en mensaje del caso de 'let', pero la causa es la misma: declarada, no inicializada."
  );

  const PI_APROXIMADO = 3.14;
}

// ============================================================
// ⭐ EXTENSIÓN: caso con una clase antes de su declaración
// ============================================================
function experimentoClase() {
  let valorObtenido;
  let errorMsg = null;
  try {
    const instancia = new Vehiculo(); // se intenta instanciar antes de declararse
    valorObtenido = instancia;
  } catch (e) {
    errorMsg = e.message;
  }

  registrar(
    "6. Instanciar una clase antes de su declaración (TDZ)",
    valorObtenido,
    errorMsg,
    "Las clases también quedan en la Zona Temporal Muerta, igual que let/const. Aunque internamente una clase se compila de forma similar a una función, el motor NO le da hoisting utilizable: lanza ReferenceError."
  );

  class Vehiculo {
    constructor() {
      this.tipo = "genérico";
    }
  }
}

// ============================================================
// EJECUCIÓN DE TODOS LOS EXPERIMENTOS (aislados, no mezclados)
// ============================================================
experimentoDeclaracionFuncion();
experimentoExpresionFuncionVar();
experimentoVar();
experimentoLet();
experimentoConst();
experimentoClase();

// ============================================================
// TABLA FINAL DE RESULTADOS
// ============================================================
console.log("\n===== TABLA DE RESULTADOS =====\n");
console.table(resultados);