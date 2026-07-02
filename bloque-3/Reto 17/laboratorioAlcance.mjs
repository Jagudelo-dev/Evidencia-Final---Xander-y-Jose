// archivo: laboratorioAlcance.mjs
"use strict";

// Todo lo declarado aquí (incluso con 'let' en el nivel superior del módulo)
// pertenece al ámbito del MÓDULO, no al ámbito global compartido por otros scripts.
let contadorInterno = 0;

export function incrementarYObtener() {
  contadorInterno++;
  return contadorInterno;
}

// Verificación: 'contadorInterno' NO existe en el objeto global (globalThis)
console.log("¿Existe en globalThis?", "contadorInterno" in globalThis); // false