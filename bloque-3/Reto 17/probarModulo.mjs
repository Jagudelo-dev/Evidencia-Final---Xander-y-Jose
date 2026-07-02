// archivo: probarModulo.mjs
import { incrementarYObtener } from "./laboratorioAlcance.mjs";

console.log(incrementarYObtener()); // 1
console.log(incrementarYObtener()); // 2

// Esto confirma que el módulo encapsula su estado: 'contadorInterno'
// no es accesible ni modificable desde fuera, solo a través de la función exportada.