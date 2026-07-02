"use strict";

/**
 * Laboratorio de alcance
 * Tema 09 · Ámbito, hoisting y modo estricto
 *
 * NOTA: Esta es la VERSIÓN CON NOMBRES AMBIGUOS (experimento),
 * seguida de la VERSIÓN REFACTORIZADA (paso 6) más abajo.
 */

// ============================================================
// EXPERIMENTO 1: mismo nombre en tres ámbitos distintos
// ============================================================

// Ámbito GLOBAL
let valor = "global";
console.log("1. Lectura en ámbito global:", valor); // "global"

function demostrarAmbitoDeFuncion() {
  // Ámbito de FUNCIÓN: esta declaración "tapa" (shadowing) a la global
  // dentro de toda la función, sin importar en qué bloque interno se lea.
  let valor = "función";
  console.log("2. Lectura dentro de la función (antes del bloque):", valor); // "función"

  if (true) {
    // Ámbito de BLOQUE: tapa a la de función solo dentro de este bloque {}
    let valor = "bloque";
    console.log("3. Lectura dentro del bloque (if):", valor); // "bloque"
  }

  // Al salir del bloque, vuelve a verse la variable de ámbito de función
  console.log("4. Lectura dentro de la función (después del bloque):", valor); // "función"
}

demostrarAmbitoDeFuncion();
console.log("5. Lectura en ámbito global (sin cambios):", valor); // "global", no se contaminó

// ============================================================
// EXPERIMENTO 2: 
// ============================================================

function demostrarShadowing() {
  let mensaje = "mensaje original de la función";

  for (let i = 0; i < 1; i++) {
    // 'mensaje' aquí hace shadowing del 'mensaje' de la función.
    // Mientras exista esta declaración en el bloque, JS ya no puede
    // "ver" la variable externa con ese mismo nombre desde dentro del bloque.
    let mensaje = "mensaje del bloque for";
    console.log("6. Shadowing dentro del for:", mensaje); // "mensaje del bloque for"
  }

  // Fuera del for, el shadowing ya no aplica: se ve la variable original
  console.log("7. Fuera del for (sin shadowing):", mensaje); // "mensaje original de la función"
}

demostrarShadowing();

// ============================================================
// EXPERIMENTO 3: acceso fuera de alcance capturado con try/catch
// ============================================================

function demostrarErrorDeAlcance() {
  if (true) {
    let variableDeBloque = "solo existe aquí dentro";
    console.log("8. Dentro del bloque:", variableDeBloque);
  }

  try {
    // Esta línea intenta leer una variable que solo existía dentro del bloque anterior.
    // Como let/const tienen ámbito de bloque, esto lanza ReferenceError.
    console.log("9. Intentando leer fuera del bloque:", variableDeBloque);
  } catch (error) {
    // El error se observa y se registra SIN detener la ejecución del archivo.
    console.log("9. Error capturado correctamente:", error.message);
  }
}

demostrarErrorDeAlcance();

console.log("10. El archivo continúa ejecutándose después del error capturado.\n");