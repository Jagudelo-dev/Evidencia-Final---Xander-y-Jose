"use strict";

/**
 * VERSIÓN REFACTORIZADA
 * Todas las declaraciones aparecen ANTES de su primer uso.
 * El comportamiento es 100% predecible: no depende de reglas de hoisting.
 */

function saludar() {
  return "Hola, soy una función declarada";
}

const saludarExpresion = function () {
  return "Hola, soy una expresión de función";
};

let contador = 10;
let nombre = "Ana";
const PI_APROXIMADO = 3.14;

class Vehiculo {
  constructor() {
    this.tipo = "genérico";
  }
}

// Ahora cada uso ocurre después de su declaración: sin sorpresas, sin TDZ, sin undefined inesperados.
console.log(saludar());
console.log(saludarExpresion());
console.log(contador);
console.log(nombre);
console.log(PI_APROXIMADO);
console.log(new Vehiculo().tipo);