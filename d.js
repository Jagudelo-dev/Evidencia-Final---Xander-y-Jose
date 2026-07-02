/*
 * Script generador de README.md para los retos 17-24 (Node.js)
 * Ejecutar: node crear-readmes-17-24.js
 */

const fs = require('fs');
const path = require('path');

const retos = [
  {
    num: 17,
    titulo: 'Reto 17 - Validador de contraseñas',
    resumen: 'Evaluar la seguridad de una contraseña usando condicionales y operadores lógicos.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 17",
      "node Reto17.js",
      "```"
    ],
    decisiones: `- Usé if/else para verificar cada criterio: longitud, mayúsculas, números y caracteres especiales.
- Dividí la lógica en funciones pequeñas para cada validación.
- Mostré mensajes claros indicando qué criterio falta.`,
    dificultades: `- Al principio las expresiones regulares no detectaban correctamente los caracteres especiales.
- Tuve que ajustar el orden de las validaciones para que el mensaje fuera más útil.`,
    pruebas: `- [x] Contraseña "Abc123!" cumple todos los criterios.
- [x] Contraseña corta muestra mensaje de longitud insuficiente.
- [x] Contraseña sin números muestra mensaje específico.
- [x] Contraseña vacía se rechaza correctamente.`,
    captura: 'resultado.png'
  },
  {
    num: 18,
    titulo: 'Reto 18 - Calculadora de tarifas',
    resumen: 'Calcular el costo de un servicio según edad, membresía y horario usando condicionales anidados.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 18",
      "node Reto18.js",
      "```"
    ],
    decisiones: `- Organicé las condiciones desde la más específica (descuentos por membresía) hasta la tarifa base.
- Usé operadores lógicos (&&, ||) para combinar criterios.
- Mostré el desglose de la tarifa paso a paso.`,
    dificultades: `- La lógica para el horario pico (fin de semana) fue confusa al principio.
- Tuve que convertir cadenas de texto a números para las comparaciones de edad.`,
    pruebas: `- [x] Adulto con membresía y horario normal recibe descuento.
- [x] Niño sin membresía en fin de semana paga tarifa especial.
- [x] Edad inválida muestra mensaje de error.
- [x] El cálculo coincide con el manual.`,
    captura: 'resultado.png'
  },
  {
    num: 19,
    titulo: 'Reto 19 - Menú de opciones con switch',
    resumen: 'Crear un menú interactivo usando switch para ejecutar diferentes acciones según la opción elegida.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 19",
      "node Reto19.js",
      "```"
    ],
    decisiones: `- Usé switch para mapear cada opción numérica a una función.
- Agrupé casos con la misma acción usando fall-through.
- Incluí un caso default para opciones no válidas.`,
    dificultades: `- Al principio olvidé el break y se ejecutaban varias opciones.
- Para opciones que requerían entrada adicional, usé readline-sync.`,
    pruebas: `- [x] Cada opción del menú ejecuta la acción correcta.
- [x] Opción inválida muestra mensaje de error.
- [x] El programa no se cae con entradas inesperadas.`,
    captura: 'resultado.png'
  },
  {
    num: 20,
    titulo: 'Reto 20 - Clasificador de IMC',
    resumen: 'Calcular el índice de masa corporal y clasificarlo usando operadores ternarios y if/else.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 20",
      "node Reto20.js",
      "```"
    ],
    decisiones: `- Calculé el IMC con la fórmula peso/(altura^2).
- Usé ternarios para clasificaciones simples y if/else anidados para las más complejas.
- Mostré el resultado con una etiqueta de color (texto).`,
    dificultades: `- Asegurar que los valores de entrada fueran números positivos.
- La clasificación de la OMS tiene muchos rangos; usé una tabla para no equivocarme.`,
    pruebas: `- [x] Peso 70kg, altura 1.75m → IMC normal.
- [x] Peso 50kg, altura 1.60m → bajo peso.
- [x] Valores negativos muestran error.
- [x] El cálculo es correcto con decimales.`,
    captura: 'resultado.png'
  },
  {
    num: 21,
    titulo: 'Reto 21 - Generador de tablas de multiplicar',
    resumen: 'Mostrar la tabla de multiplicar de un número usando bucles for y while.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 21",
      "node Reto21.js",
      "```"
    ],
    decisiones: `- Usé un bucle for para generar la tabla del 1 al 10.
- También implementé una versión con while para practicar ambos bucles.
- Formateé la salida con alineación para que sea legible.`,
    dificultades: `- En la versión while, olvidé incrementar el contador y causé un bucle infinito.
- Alinear los números en columnas requirió usar padStart.`,
    pruebas: `- [x] La tabla del 5 se genera correctamente del 1 al 10.
- [x] El formato de salida es legible y alineado.
- [x] Se muestra un mensaje si el número es 0 o negativo.
- [x] Ambas versiones (for y while) producen el mismo resultado.`,
    captura: 'resultado.png'
  },
  {
    num: 22,
    titulo: 'Reto 22 - Control de flujo mixto',
    resumen: 'Combinar estructuras condicionales y ciclos para procesar un lote de datos.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 22",
      "node Reto22.js",
      "```"
    ],
    decisiones: `- Separé las validaciones de las operaciones para mantener el código limpio.
- Utilicé un bucle for para recorrer el arreglo y condicionales anidados para las reglas de negocio.
- Preferí usar variables acumuladoras para calcular totales sin modificar los datos originales.`,
    dificultades: `- Al principio anidé demasiadas condiciones y el código se volvió ilegible. Reorganicé los if para mayor claridad.
- Tuve que depurar un error donde un contador no se reiniciaba correctamente en cada iteración.`,
    pruebas: `- [x] El lote de datos se procesa completamente.
- [x] Los totales coinciden con los cálculos manuales.
- [x] Los casos inválidos se detectan y reportan.
- [x] No se modifica el array original.`,
    captura: 'resultado.png'
  },
  {
    num: 23,
    titulo: 'Reto 23 - Resumen financiero mensual',
    resumen: 'Usar reduce, find y sort para calcular ingresos, gastos, balance y agrupar por categoría.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 23",
      "node Reto23.js",
      "```"
    ],
    decisiones: `- Separé ingresos y gastos con filter antes de aplicar reduce.
- Usé un acumulador en reduce para agrupar gastos por categoría.
- Hice una copia con spread antes de ordenar, para no mutar el original.
- find devuelve el primer gasto alto; si no existe, se muestra un mensaje alternativo.`,
    dificultades: `- Al principio olvidé pasar el valor inicial a reduce y obtuve resultados inesperados.
- El sort con números requirió una función de comparación explícita; sin ella ordenaba como texto.
- Para el porcentaje por categoría tuve que asegurarme de que el total de gastos no fuera cero.`,
    pruebas: `- [x] Ingresos, gastos y balance calculados correctamente.
- [x] Gastos agrupados por categoría.
- [x] find localiza el primer gasto > 50 o muestra mensaje.
- [x] El array original no se modifica al ordenar.`,
    captura: 'resultado.png'
  },
  {
    num: 24,
    titulo: 'Reto 24 - Auditor de pedidos',
    resumen: 'Usar every, some y find para validar pedidos y tomar una decisión automatizada.',
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio y ejecuta:",
      "```bash",
      "cd bloque-3/Reto\\ 24",
      "node Reto24.js",
      "```"
    ],
    decisiones: `- every verifica que todas las direcciones estén completas.
- some detecta pedidos sin pagar o con total cero (suficiente con un caso).
- find busca el primer pedido que supera un valor de revisión manual.
- La decisión final sigue un orden de prioridad: rechazar, revisar o aprobar.`,
    dificultades: `- Comprendí que some se detiene al primer true, lo que lo hace eficiente para detectar problemas.
- Al usar comparaciones numéricas en sort tuve que usar resta para orden correcto.
- La copia para ordenar la hice con spread para no alterar los pedidos originales.`,
    pruebas: `- [x] Se detecta la falta de direcciones completas.
- [x] Se identifican pedidos pendientes.
- [x] El pedido de revisión se encuentra correctamente.
- [x] La decisión final es reproducible.`,
    captura: 'resultado.png'
  }
];

// ---------- CREAR READMEs ----------
const bloque = 'bloque-3';

retos.forEach(reto => {
  const carpeta = path.join(bloque, `Reto ${reto.num}`);
  
  if (!fs.existsSync(carpeta)) {
    console.error(`❌ La carpeta ${carpeta} no existe.`);
    return;
  }

  const contenido = `# ${reto.titulo}

## 🎯 Objetivo
${reto.resumen}

## 🛠️ Requisitos
- [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
${reto.comoEjecutar.join('\n')}

## 🧠 Decisiones y proceso de solución
${reto.decisiones}

## ⚠️ Dificultades encontradas
${reto.dificultades}

## ✅ Pruebas realizadas
${reto.pruebas}

## 📸 Evidencia
*Captura de pantalla de la terminal después de ejecutar el código.*

![Resultado](${reto.captura})

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
`;

  fs.writeFileSync(path.join(carpeta, 'README.md'), contenido, 'utf8');
  console.log(`✅ README creado para Reto ${reto.num}`);
});

console.log('\n🎉 Todos los README.md para los retos 17-24 han sido creados.');