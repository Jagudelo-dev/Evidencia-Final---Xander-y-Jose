/*
 * Script generador de README.md para los retos 9-16
 * Ejecutar: node crear-readmes-segundos.js
 */

const fs = require('fs');
const path = require('path');

const retos = [
  {
    carpeta: "Reto 9",
    archivo: "Reto9.js",
    titulo: "Reto 09 - Clasificador de rendimiento académico",
    resumen: "Asignar un estado final (Excelente, Aprobado, Recuperación, Reprobado) según nota, asistencia y entregas.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio (donde están `primeros-8-retos` y `segundos-8-retos`).",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 9",
      "node Reto9.js",
      "```",
      "Verás las seis pruebas con su estado y recomendación."
    ],
    decisiones: `
- Separé la validación de datos antes de clasificar, usando rangos estrictos (0-100) y comprobando que las entregas no superen el total.
- Ordené las condiciones desde la más específica (Excelente: nota alta, asistencia mínima del 80% y todas las entregas) hasta la más general (Reprobado).
- Usé comparaciones estrictas y operadores lógicos para que cada regla fuera clara.
- Agregué la extensión de mejora destacada: si la nota subió 15 puntos o más respecto al corte anterior, se añade una mención especial.
- Al principio olvidé usar la variable booleana \`todasLasEntregas\` y puse \`totalEntregas\` directamente en la condición, lo que provocaba que Excelente nunca se activara. José me ayudó a detectarlo y lo corregimos.
- También había confundido el nombre de la función en las pruebas y tenía errores de ortografía. Aprendí que nombrar bien las funciones desde el inicio ahorra tiempo.`,
    dificultades: `
- La validación de datos me comió la cabeza: al principio retornaba "datos válidos" cuando en realidad eran inválidos. Tardé en notarlo porque las pruebas con datos fuera de rango mostraban un mensaje confuso.
- La condición para Excelente me falló porque usé \`totalentregas\` (el número) en vez del booleano \`todaslasentregas\`. José revisó el código y me dijo que así nunca se activaba. Fue un error tonto pero me enseñó a revisar bien los nombres de variables.`,
    pruebas: `
- [x] Nota 95, asistencia 90%, 5/5 entregas → Excelente
- [x] Nota 75, asistencia 65%, 4/5 entregas → Aprobado
- [x] Nota 60, asistencia 55%, 3/5 entregas → Recuperación
- [x] Nota 40, asistencia 50%, 2/5 entregas → Reprobado
- [x] Nota 110 → Datos inválidos
- [x] Nota 92 con corte anterior 80 → mejora de 12 puntos, no activa mención (solo 15+)`,
    captura: "Salida de la terminal mostrando las seis pruebas."
  },
  {
    carpeta: "Reto 10",
    archivo: "Reto10.js",
    titulo: "Reto 10 - Cotizador de envíos",
    resumen: "Calcular el costo de envío según ciudad, peso, tipo de entrega y membresía.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 10",
      "node Reto10.js",
      "```",
      "Verás el desglose y total de seis escenarios diferentes."
    ],
    decisiones: `
- Separé el cálculo de la presentación: la función \`calcularCotizacion\` retorna un objeto con validez, desglose y total; \`mostrarCotizacion\` solo imprime.
- Inicié una variable \`total\` con la tarifa base y fui acumulando recargos (peso, urgencia) y descuentos (miembro, finde).
- Usé condicionales anidados para el peso porque los límites son acumulativos (5 y 15 kg).
- Implementé la extensión de promoción de fin de semana detectando el día con \`getDay()\`.
- El descuento de miembro solo se aplica si el total hasta ese momento supera los 10 000, respetando la condición mínima.
- Validé que el peso sea positivo y que el tipo de entrega sea válido antes de calcular.`,
    dificultades: `
- Al principio puse los recargos como \`if-else\`, pero así si un paquete pesaba más de 15 solo pagaba el recargo alto y no el medio. El enunciado decía "recargos deben acumularse", así que los puse en \`if\` separados.
- La fecha de fin de semana la probé con un sábado, pero dudé si debía usar \`getDay()\` que empieza en domingo. Confirmé en internet y lo dejé así.`,
    pruebas: `
- [x] Envío a Bogotá, 3 kg estándar → tarifa base 8000
- [x] Envío a Medellín, 10 kg estándar → externa + recargo peso medio
- [x] Envío a Medellín, 20 kg urgente miembro → todos los recargos y descuento
- [x] Bogotá, 2 kg urgente miembro → no aplica descuento (total < 10000)
- [x] Cali, 18 kg urgente miembro en sábado → incluye promo fin de semana
- [x] Peso negativo → dato inválido`,
    captura: "Salida del desglose de cada prueba."
  },
  {
    carpeta: "Reto 11",
    archivo: "Reto11.js",
    titulo: "Reto 11 - Menú de soporte técnico",
    resumen: "Clasificar solicitudes por opción numérica usando switch, agrupando casos y con validación adicional.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 11",
      "node Reto11.js",
      "```",
      "Verás la ficha de radicación para cada opción."
    ],
    decisiones: `
- Envolví el switch en una función \`clasificarSolicitud\` para que sea reutilizable (extensión).
- Agrupé los casos 3 y 4 (problemas de red y credenciales) porque los atiende el mismo equipo, usando fall-through.
- Dentro del caso agrupado, usé un operador ternario para matizar la prioridad (4 es más crítica que 3).
- El caso 5 (facturación) requiere validación adicional: si no se recibe un dato extra, se marca como "No asignado" y se pide el número de factura.
- El default informa claramente que la opción no es válida.
- La ficha incluye área, prioridad, tiempo estimado y estado.`,
    dificultades: `
- Al probar el caso 5 con dato vacío, me saltó error porque \`datoAdicional.trim()\` fallaba si era null. Lo resolví validando primero si era null o cadena vacía.
- Me confundí con el parámetro: en las pruebas lo llamé \`dato\` pero en la función \`datoAdicional\`. José me lo señaló; luego lo unifiqué para que funcionara correctamente.
- El fall-through de los casos 3 y 4 al principio me pareció peligroso, pero recordé que en el manual se recomendaba agruparlos para no repetir código.`,
    pruebas: `
- [x] Opción 1: Hardware, Alta, 4h
- [x] Opción 2: Software, Media, 8h
- [x] Opción 3: Infraestructura, Media, 6h
- [x] Opción 4: Infraestructura, Alta, 6h
- [x] Opción 5 sin dato: Facturación, Media, No asignado, pide referencia
- [x] Opción 5 con dato: Facturación, Media, 24h
- [x] Opción 6: Atención al cliente, Baja, 48h
- [x] Opción 9: Rechazada, N/A`,
    captura: "Fichas de radicación impresas para las 8 pruebas."
  },
  {
    carpeta: "Reto 12",
    archivo: "Reto12.js",
    titulo: "Reto 12 - Panel de estados con ternarios",
    resumen: "Generar etiquetas de batería, conexión y progreso usando operadores ternarios simples y anidados con límites claros.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 12",
      "node Reto12.js",
      "```",
      "Verás la tarjeta de estado para siete combinaciones."
    ],
    decisiones: `
- Documenté los límites exactos: batería crítica 0-10, baja 11-30, media 31-70, alta 71-100; progreso 0% = No iniciado, 100% = Completado, resto En curso.
- Para la batería usé un ternario anidado, pero lo separé en variables intermedias (\`noEsCritica\`, \`esAlta\`, \`esMedia\`) para no superar dos niveles y que sea legible.
- La conexión es un ternario simple (dos resultados).
- El progreso también lo refactoricé con variables booleanas para evitar anidar comparaciones de igualdad en un solo ternario.
- Agregué iconos textuales como extensión para que la tarjeta sea más visual.
- La función \`generarTarjetaEstado\` retorna la cadena formateada, no imprime directamente.`,
    dificultades: `
- Al principio quise hacer un ternario de tres niveles para batería, pero se volvía ilegible. Apliqué la pista: "si necesitas explicar un ternario durante mucho tiempo, mejor usa if". Preferí las variables intermedias.
- El límite exacto de Crítica (0-10) me costó; al poner \`porcentajeBateria <= 10\` olvidé que 0 es válido y 10 también, pero tuve que ajustar la lógica para que 0 no diera error en el ternario.
- Me aseguré de que la conexión solo fuera true/false y no recibiera otros valores.`,
    pruebas: `
- [x] Batería 5%: Crítica
- [x] Batería 25%: Baja
- [x] Batería 50%: Media
- [x] Batería 85%: Alta
- [x] Progreso 0: No iniciado; 100: Completado; intermedio: En curso
- [x] Dato inválido (batería 150) → mensaje de error`,
    captura: "Tarjetas de estado impresas para cada prueba."
  },
  {
    carpeta: "Reto 13",
    archivo: "Reto13.js",
    titulo: "Reto 13 - Planificador de ahorro",
    resumen: "Simular el ahorro mensual durante un año con aportes, rendimiento y detección de meta.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 13",
      "node Reto13.js",
      "```",
      "Verás el detalle mensual y el resumen de varias simulaciones."
    ],
    decisiones: `
- Usé un bucle for para los 12 meses porque el número de iteraciones es conocido.
- Separé el total aportado y el rendimiento generado en variables diferentes para el resumen.
- No redondeé durante los cálculos, solo al mostrar con \`toFixed(2)\`.
- Detecté el primer mes donde el saldo alcanza la meta con una variable \`mesMetaAlcanzada\` que se actualiza solo una vez.
- Añadí la extensión de aporte extraordinario cada tercer mes (múltiplo de 3) con un condicional dentro del ciclo.
- Validé que los datos iniciales no sean negativos.`,
    dificultades: `
- Tuve que recordar que el rendimiento se aplica después de sumar el aporte del mes, no antes. Probé varias fórmulas hasta que cuadró.
- Al implementar la detección de meta, casi la pongo dentro del bucle con un if que se ejecutaba cada mes; luego entendí que debía guardar el primer mes nada más.
- El aporte extraordinario me enredó un poco: al ser cada tercer mes, usé \`mes % 3 === 0\`, pero tuve que verificar que el mes 0 no existe (el bucle empieza en 1).`,
    pruebas: `
- [x] Simulación con meta inalcanzable en 12 meses → mensaje "no alcanzada"
- [x] Simulación con meta alcanzable a mitad de año
- [x] Simulación sin ahorro inicial, solo aporte mensual
- [x] Simulación con aporte extra cada tercer mes
- [x] Datos inválidos (tasa negativa) → error`,
    captura: "Detalle mensual y resumen de cada prueba."
  },
  {
    carpeta: "Reto 14",
    archivo: "Reto14.js",
    titulo: "Reto 14 - Juego de intentos controlados",
    resumen: "Simular intentos de adivinanza con while y do...while, usando break y continue.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 14",
      "node Reto14.js",
      "```",
      "Verás el historial de intentos y la comparación entre while y do...while."
    ],
    decisiones: `
- Creé dos funciones: una con while y otra con do...while, para comparar su comportamiento.
- En ambas versiones, el ciclo controla el índice del arreglo de intentos y el máximo de intentos válidos.
- Uso \`continue\` para saltar intentos no numéricos o fuera del rango 0-100, sin descontar intentos válidos.
- \`break\` se activa al encontrar el número secreto, evitando procesar los intentos restantes.
- Conté por separado intentos válidos e inválidos.
- Implementé la extensión: generación de número secreto aleatorio con \`Math.random\` y validación de rango.
- El do...while está protegido contra arreglo vacío, devolviendo un resultado especial.`,
    dificultades: `
- Al principio olvidé incrementar el índice en el while, y se volvió un ciclo infinito. Menos mal que tenía un máximo de intentos para salir.
- El do...while me obligó a pensar qué pasa si el arreglo está vacío, porque el primer intento siempre se evalúa. Añadí un if al inicio para manejarlo.
- La diferencia entre while y do...while la anoté en comentarios: while verifica la condición antes de ejecutar el cuerpo, do...while la verifica después. En este caso, ambos funcionan similar porque el índice se actualiza al inicio del bloque.
- La extensión de número aleatorio fue fácil, pero tuve que validar que estuviera dentro del rango.`,
    pruebas: `
- [x] While y do...while con intentos que incluyen un inválido y acierto.
- [x] do...while con arreglo vacío → manejo especial.
- [x] While sin acierto → agota intentos válidos.
- [x] Prueba con secreto aleatorio.`,
    captura: "Resultados de cada estrategia mostrando el historial."
  },
  {
    carpeta: "Reto 15",
    archivo: "Reto15.js",
    titulo: "Reto 15 - Biblioteca de conversiones",
    resumen: "Crear funciones puras para convertir Celsius, kilómetros y pesos, con validación y formateo separado.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 15",
      "node Reto15.js",
      "```",
      "Verás los resultados de todas las conversiones."
    ],
    decisiones: `
- Cada función resuelve una sola conversión (Celsius→Fahrenheit, km→millas, pesos→dólares) y retorna el valor numérico o null si el dato no es válido.
- La validación común \`esNumeroValido\` se definió como función flecha para reutilizarla.
- Agregué también las conversiones inversas (Fahrenheit→Celsius, millas→km, dólares→pesos) como extensión, reutilizando la misma lógica y el factor de conversión.
- La tasa de cambio para pesos a dólares tiene un valor por defecto (4000), pero se puede pasar otro parámetro.
- La función \`formatearConUnidad\` se encarga de la presentación, manteniendo separado cálculo y visualización.
- Todas las funciones son puras: no usan variables globales y retornan un resultado nuevo.`,
    dificultades: `
- Al principio puse \`Number.isFinite\` directamente, pero no recordaba que también rechaza NaN. Tuve que complementar con \`typeof === "number"\`.
- La extensión de conversiones inversas me obligó a mantener coherencia con el factor de millas; usé la misma constante para dividir o multiplicar.
- Con la tasa por defecto me aseguré de que si el usuario no pasa tasa, funcione; pero si pasa una tasa negativa, devuelve null.`,
    pruebas: `
- [x] 25°C → 77°F
- [x] 98.6°F → 37°C
- [x] 10 km → 6.21 mi
- [x] 6.21 mi → 10 km
- [x] 400000 COP → 100 USD (tasa 4000)
- [x] 400000 COP con tasa 4200 → 95.24 USD
- [x] 100 USD → 400000 COP
- [x] Dato inválido ("treinta") → mensaje controlado`,
    captura: "Salida de todas las conversiones con sus unidades."
  },
  {
    carpeta: "Reto 16",
    archivo: "Reto16.js",
    titulo: "Reto 16 - Generador de facturas modular",
    resumen: "Construir funciones declaradas, expresiones y flechas para calcular subtotal, descuento, impuesto y generar factura.",
    comoEjecutar: [
      "Abre una terminal en la raíz del repositorio.",
      "Ejecuta:",
      "```bash",
      "cd segundos-8-retos/Reto\\ 16",
      "node Reto16.js",
      "```",
      "Verás las facturas generadas y una tabla comparativa."
    ],
    decisiones: `
- \`calcularSubtotal\` es una función declarada (puede ser llamada antes de su definición).
- \`calcularDescuento\` es una expresión de función (no se eleva) y tiene un porcentaje por defecto 0.
- \`calcularImpuesto\` es una función flecha, también con parámetro por defecto (19%).
- La función principal \`generarFactura\` compone las demás sin conocer las fórmulas, solo las invoca.
- Implementé la extensión: acepta una función de descuento como callback; por defecto usa la porcentual, pero también creé un descuento fijo como alternativa.
- Validé que todos los datos de entrada sean números finitos y no negativos; en caso inválido retorna 0 para esa parte.
- La tabla final usa \`console.table\` para comparar las tres facturas.`,
    dificultades: `
- Al principio la función de descuento fijo no tenía límite y podía descontar más que el subtotal; luego usé \`Math.min\` para evitar un total negativo.
- La extensión del callback me resultó interesante: tuve que pasar la función correcta y asegurarme de que la factura3 usara descuento fijo, no porcentual. José y yo repasamos por qué la primera versión de factura3 no aplicaba el descuento fijo porque olvidé pasar el callback.
- Recordar que la base gravable es el subtotal menos el descuento, no el subtotal directo, fue clave para el cálculo del impuesto.`,
    pruebas: `
- [x] Factura 1: con precio, cantidad, descuento 10%, impuesto 19%.
- [x] Factura 2: usa valores por defecto (0% descuento, 19% impuesto).
- [x] Factura 3: con callback de descuento fijo de $20.000.
- [x] Tabla comparativa muestra subtotal, descuento, impuesto y total.`,
    captura: "Objetos factura y tabla comparativa en consola."
  }
];

function crearREADME(reto) {
  const rutaCarpeta = path.join(__dirname, 'segundos-8-retos', reto.carpeta);
  if (!fs.existsSync(rutaCarpeta)) {
    console.error(`La carpeta ${rutaCarpeta} no existe.`);
    return;
  }

  const contenido = `# ${reto.titulo}

## 🎯 Objetivo
${reto.resumen}

## 🛠️ Requisitos
- Tener [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
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
*Reemplaza esta línea con la captura de pantalla de la terminal después de ejecutar el código.*
${reto.captura}

![Resultado](resultado.png)

---

> **Nota del autor (Xander):** Este reto me ayudó a practicar estructuras de control, funciones y trabajo en equipo. Si algo puede mejorar, ¡bienvenidas las sugerencias!
`;

  fs.writeFileSync(path.join(rutaCarpeta, 'README.md'), contenido, 'utf8');
  console.log(`✅ README creado en ${reto.carpeta}`);
}

// Generar todos los READMEs
retos.forEach(crearREADME);
console.log('\n🎉 Todos los README.md para los retos 9-16 han sido creados.');