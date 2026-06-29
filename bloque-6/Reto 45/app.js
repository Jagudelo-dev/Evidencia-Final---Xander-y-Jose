import { sumar, restar, multiplicar, dividir } from "./operaciones.js";
import { esNumeroValido, validarDivision } from "./validaciones.js";
import formatearResultado from "./formato.js";

// Simulación de cálculos en consola
const a = 10, b = 2;
console.log(formatearResultado(sumar(a, b)));
console.log(formatearResultado(restar(a, b)));
console.log(formatearResultado(multiplicar(a, b)));
try {
  validarDivision(b);
  console.log(formatearResultado(dividir(a, b)));
} catch (e) {
  console.error(e.message);
}