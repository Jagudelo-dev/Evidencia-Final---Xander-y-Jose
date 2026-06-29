/*
 * Script generador de README.md para retos Node.js puro (22-50, sin HTML)
 * Ejecutar: node crear-readmes-node-22-50.js
 */

const fs = require('fs');
const path = require('path');

// Mapeo de número de reto -> bloque y carpeta (solo Node.js)
function infoReto(num) {
  if (num === 22) return { bloque: 'bloque-3', carpeta: 'Reto 22', archivo: 'Reto22.js' };
  if (num >= 23 && num <= 24) return { bloque: 'bloque-3', carpeta: `Reto ${num}`, archivo: `Reto${num}.js` };
  if (num >= 25 && num <= 32) return { bloque: 'bloque-4', carpeta: `Reto ${num}`, archivo: `Reto${num}.js` };
  if (num === 47 || num === 48) return { bloque: 'bloque-6', carpeta: `Reto ${num}`, archivo: `Reto${num}.js` };
  if (num === 49 || num === 50) return { bloque: 'bloque-7', carpeta: `Reto ${num}`, archivo: `Reto${num}.js` };
  return null;
}

// Datos de cada reto (incluye 22, 23-32, 47-50)
const retosData = {
  22: {
    titulo: 'Reto 22 - Control de flujo mixto',
    resumen: 'Combinar estructuras condicionales y ciclos para procesar un lote de datos.',
    decisiones: `- Separé las validaciones de las operaciones para mantener el código limpio.
- Utilicé un bucle for para recorrer el arreglo y condicionales anidados para las reglas de negocio.
- Preferí usar variables acumuladoras para calcular totales sin modificar los datos originales.`,
    dificultades: `- Al principio anidé demasiadas condiciones y el código se volvió ilegible. Reorganicé los if para mayor claridad.
- Tuve que depurar un error donde un contador no se reiniciaba correctamente en cada iteración.`,
    pruebas: `- [x] El lote de datos se procesa completamente.
- [x] Los totales coinciden con los cálculos manuales.
- [x] Los casos inválidos se detectan y reportan.
- [x] No se modifica el array original.`,
    captura: 'Terminal con los resultados del procesamiento.'
  },
  23: {
    titulo: 'Reto 23 - Resumen financiero mensual',
    resumen: 'Usar reduce, find y sort para calcular ingresos, gastos, balance y agrupar por categoría.',
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
    captura: 'Salida de terminal con resumen financiero, top 3 y porcentajes.'
  },
  24: {
    titulo: 'Reto 24 - Auditor de pedidos',
    resumen: 'Usar every, some y find para validar pedidos y tomar una decisión automatizada.',
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
    captura: 'Salida de terminal con resultado de auditoría.'
  },
  25: {
    titulo: 'Reto 25 - Gestor de biblioteca',
    resumen: 'Crear un objeto libro con métodos prestar, devolver y obtenerResumen usando this.',
    decisiones: `- Los métodos están dentro del objeto, accediendo a this para modificar el estado.
- prestar verifica disponibilidad antes de cambiar el estado e incrementa el contador.
- devolver solo actúa si el libro no está disponible, restaurando la disponibilidad.
- obtenerResumen devuelve un string con el estado actual.`,
    dificultades: `- Entender que this dentro de un método normal apunta al objeto que lo llama.
- Al principio olvidé devolver un mensaje cuando el préstamo era rechazado.
- Tuve que comprobar que el contador de préstamos aumentara solo en préstamos exitosos.`,
    pruebas: `- [x] Préstamo exitoso cambia disponibilidad y contador.
- [x] Préstamo duplicado se rechaza.
- [x] Devolución restaura el estado.
- [x] Resumen muestra todos los cambios.`,
    captura: 'Terminal mostrando secuencia de préstamo y devolución.'
  },
  26: {
    titulo: 'Reto 26 - Comparador de configuraciones',
    resumen: 'Fusionar configuración por defecto con preferencias del usuario, congelar y detectar propiedades desconocidas.',
    decisiones: `- Usé spread para fusionar objetos: las preferencias del usuario sobrescriben las del defecto.
- Detectar propiedades desconocidas lo hice comparando claves con Object.keys.
- Object.freeze en modo estricto lanza error al modificar, lo comprobé con un try/catch.`,
    dificultades: `- Comprendí que spread no hace fusión profunda, pero aquí bastaba.
- El valor false en preferencias es válido y no debe ser reemplazado por el defecto; spread lo respeta.
- Object.freeze solo es efectivo en modo estricto para lanzar error visible.`,
    pruebas: `- [x] Las preferencias sobrescriben correctamente.
- [x] false no se reemplaza por accidente.
- [x] Propiedades desconocidas se reportan.
- [x] El objeto congelado no puede modificarse.`,
    captura: 'Terminal mostrando objeto final y mensajes de propiedades desconocidas.'
  },
  27: {
    titulo: 'Reto 27 - Normalizador de respuestas API',
    resumen: 'Extraer, renombrar y dar valores por defecto con desestructuración.',
    decisiones: `- Desestructure el objeto anidando para obtener ciudad desde ubicacion.
- Renombré id a usuarioId y usé rest para separar metadatos.
- Asigné valor por defecto a teléfono al no existir en la respuesta.`,
    dificultades: `- La desestructuración de varios niveles puede volverse confusa; preferí legibilidad.
- Rest captura todas las propiedades no desestructuradas, lo que simplificó la extracción.
- Verifiqué que el objeto original permaneciera intacto después de todo el proceso.`,
    pruebas: `- [x] Nombres renombrados correctamente.
- [x] Valor por defecto para teléfono aparece.
- [x] Rest reúne las propiedades restantes.
- [x] El objeto final contiene solo lo necesario.`,
    captura: 'Terminal con el objeto normalizado y los metadatos.'
  },
  28: {
    titulo: 'Reto 28 - Compositor de equipos',
    resumen: 'Usar spread en arrays y objetos, y parámetros rest en funciones.',
    decisiones: `- Uní dos arrays con spread para no mutar los originales.
- Creé perfiles combinando un objeto base con spread, sobrescribiendo el rol.
- La función registrarHabilidades usa rest para aceptar un número variable de habilidades.
- Eliminé duplicados convirtiendo a Set y luego a array.`,
    dificultades: `- Diferenciar spread (expandir) de rest (recoger) me ayudó a ubicarlos correctamente.
- Al copiar el equipo y añadir un miembro, verifiqué que el original no cambiara.
- El Set elimina duplicados, pero tuve que convertirlo de nuevo a array para usarlo.`,
    pruebas: `- [x] Los equipos se combinan en orden.
- [x] Los perfiles conservan propiedades base.
- [x] Las habilidades variables se registran sin duplicados.
- [x] Los originales permanecen iguales.`,
    captura: 'Terminal mostrando equipos combinados y perfiles.'
  },
  29: {
    titulo: 'Reto 29 - Agenda de vencimientos',
    resumen: 'Calcular días restantes, clasificar urgencia y formatear fechas con Intl.',
    decisiones: `- Las fechas las construí con new Date usando formato ISO para evitar ambigüedades.
- La diferencia en días la obtuve restando timestamps y convirtiendo milisegundos a días.
- Clasifiqué según días: vencido (<0), urgente (0-3), próximo (4-7), estable (>7).
- Formateé con Intl.DateTimeFormat en es-CO para localización.`,
    dificultades: `- Al restar fechas, el signo negativo indica vencimiento; tuve que considerarlo.
- Las fechas se comparan numéricamente con getTime, no como texto.
- Aprendí que Intl.DateTimeFormat es más fiable que toLocaleDateString.`,
    pruebas: `- [x] Los días restantes se calculan correctamente.
- [x] Las fechas se muestran en formato colombiano.
- [x] El orden cronológico es correcto.
- [x] Las vencidas reciben estado especial.`,
    captura: 'Terminal con agenda de vencimientos y estados.'
  },
  30: {
    titulo: 'Reto 30 - Sorteo reproducible y estadísticas',
    resumen: 'Generar números aleatorios, calcular estadísticas y formatear con Intl.NumberFormat.',
    decisiones: `- Usé Math.floor con Math.random para obtener un índice entero seguro.
- Para generar números en un rango, calculé el tamaño del rango y sumé el mínimo.
- Math.min, Math.max, reduce y every me dieron las estadísticas requeridas.
- Apliqué Intl.NumberFormat para moneda y porcentaje.`,
    dificultades: `- El límite superior en Math.random requiere sumar 1 al rango; lo documenté.
- Verifiqué que todos los números generados estuvieran dentro del rango con every.
- Recordé que Math.random no es criptográficamente seguro; lo menciono en el código.`,
    pruebas: `- [x] El índice aleatorio siempre existe dentro del array.
- [x] Los diez números están dentro del rango especificado.
- [x] Estadísticas (mín, máx, promedio) correctas.
- [x] Formatos localizados legibles.`,
    captura: 'Terminal con resultados del sorteo y estadísticas.'
  },
  31: {
    titulo: 'Reto 31 - Cajero seguro',
    resumen: 'Lanzar y capturar errores específicos con try/catch/finally.',
    decisiones: `- Validé primero el tipo de monto, luego positividad y finalmente fondos.
- Lancé errores descriptivos con new Error para cada caso inválido.
- finally se usó para registrar el fin de la operación, independientemente del resultado.
- Conté éxitos y fallos para el resumen final.`,
    dificultades: `- Diferenciar Error de otros valores en catch fue necesario para leer message.
- Al principio puse catch vacío, pero luego lo completé con mensajes.
- finally se ejecutó siempre, incluso cuando no lo esperaba por los throw.`,
    pruebas: `- [x] Retiro válido modifica el saldo.
- [x] Los errores específicos muestran mensajes claros.
- [x] finally se ejecuta en todos los escenarios.
- [x] Resumen de operaciones exitosas y fallidas.`,
    captura: 'Terminal con las cuatro pruebas y el resumen.'
  },
  32: {
    titulo: 'Reto 32 - Importador de registros',
    resumen: 'Validar registros uno a uno sin detener el proceso, usando try/catch por registro.',
    decisiones: `- Creé una función validarRegistro reutilizable que lanza errores detallados.
- Procesé cada registro en un try/catch independiente para no detener el lote.
- Los válidos y los errores se guardan en arrays separados.
- Calculé el porcentaje de éxito para el resumen.`,
    dificultades: `- Colocar el try/catch dentro del forEach fue clave para no interrumpir el flujo.
- Incluí el índice y el dato original en el reporte de error para facilitar la corrección.
- Tuve cuidado de no modificar los registros originales; los válidos se normalizaron en una copia.`,
    pruebas: `- [x] Todos los registros se intentan procesar.
- [x] Válidos y errores quedan separados.
- [x] Los mensajes de error incluyen índice y causa.
- [x] El porcentaje de éxito coincide.`,
    captura: 'Terminal con arrays de válidos y errores, y el porcentaje.'
  },
  47: {
    titulo: 'Reto 47 - Procesador de pedidos con callback',
    resumen: 'Diseñar callbacks de éxito y error para una función asíncrona simulada.',
    decisiones: `- La función procesarPedido recibe un callback onSuccess y otro onError.
- Valida el pedido antes de simular la demora con setTimeout.
- Invoca exactamente un callback según el resultado.
- Incluí una reflexión sobre cómo el anidamiento se vuelve complejo si se encadenaran más tareas.`,
    dificultades: `- Entender que el return de la función externa ocurre antes que el callback, por lo que no se puede retornar el resultado directamente.
- Al principio intenté lanzar un error, pero recordé que en una función asíncrona simulada se debe invocar el callback de error.
- Documentar la complejidad del anidamiento me ayudó a valorar las promesas.`,
    pruebas: `- [x] Cada pedido produce éxito o error según validación.
- [x] La demora con setTimeout se nota en la salida (los logs aparecen después).
- [x] No se invocan ambos callbacks para un mismo pedido.
- [x] La reflexión sobre anidamiento está escrita en comentarios.`,
    captura: 'Terminal mostrando los resultados de los tres pedidos con delay.'
  },
  48: {
    titulo: 'Reto 48 - Cadena de reserva con Promise',
    resumen: 'Encadenar promesas para validar cupo, registrar pago y emitir confirmación.',
    decisiones: `- Cada etapa devuelve una nueva Promise, permitiendo encadenamiento con .then().
- Las funciones se encadenan en orden, y un rechazo detiene las etapas posteriores.
- finally se usa para cerrar un indicador de proceso.
- Incluí pruebas de reserva exitosa y fallida para verificar el catch.`,
    dificultades: `- Al principio anidé .then() innecesariamente; luego aprendí a retornar cada promesa para una cadena plana.
- Asegurar que el catch capture el rechazo de cualquier etapa fue sencillo, pero tuve que probar en qué punto fallaba.
- finally se ejecuta en ambos casos, algo que no esperaba al inicio.`,
    pruebas: `- [x] Las etapas exitosas respetan el orden.
- [x] La falla en validarCupo detiene el resto.
- [x] catch recibe la causa del rechazo.
- [x] finally se ejecuta tanto en éxito como en error.`,
    captura: 'Terminal con la salida de las dos pruebas (exitosa y fallida).'
  },
  49: {
    titulo: 'Reto 49 - Flujo de matrícula asíncrono',
    resumen: 'Reescribir una cadena de promesas con async/await y control de errores.',
    decisiones: `- Convertí las funciones simuladas en async, aunque no usen await interno.
- La función matricularEstudiante es async y espera cada etapa con await.
- Uso try/catch/finally dentro de la función async para manejar el éxito, el fallo y el cierre.
- El caso fallido se probó con un ID específico que dispara un rechazo en validarDeuda.`,
    dificultades: `- No mezclar await y .then() en el mismo flujo fue una regla clara, lo logré.
- El error debe conservar el contexto de la etapa; en mi implementación cada función lanza un error descriptivo.
- finally se ejecuta al final, independientemente del resultado.`,
    pruebas: `- [x] Las dependencias se ejecutan en orden.
- [x] Cada fallo se identifica con un mensaje claro.
- [x] finally cierra el proceso en ambos casos.
- [x] El caso exitoso devuelve el objeto final con estudiante y asignaturas.`,
    captura: 'Terminal con la matrícula exitosa y la fallida.'
  },
  50: {
    titulo: 'Reto 50 - Carga paralela de panel',
    resumen: 'Comparar carga secuencial, Promise.all y Promise.allSettled para tareas independientes.',
    decisiones: `- Simulé tres tareas asíncronas con tiempos distintos y una de ellas rechaza.
- Medí tiempos con console.time en cada estrategia.
- Promise.all falla completamente ante un rechazo; Promise.allSettled devuelve el estado de cada promesa.
- Documenté las diferencias en comentarios y en la salida.`,
    dificultades: `- Al principio pensé que Promise.all también devolvía resultados parciales; tuve que probarlo para entenderlo.
- allSettled siempre devuelve un array de objetos con status y value/reason, lo que obliga a procesarlo distinto.
- Aseguré que las tareas independientes se ejecutaran en paralelo, no en secuencia.`,
    pruebas: `- [x] La versión paralela con allSettled obtiene los resultados de las tres.
- [x] Promise.all se rechaza ante la métrica fallida.
- [x] La carga secuencial toma más tiempo que la paralela.
- [x] La comparación queda documentada en la salida.`,
    captura: 'Terminal con los tiempos y resultados de las tres estrategias.'
  }
};

function crearREADME(num) {
  const info = infoReto(num);
  if (!info) { console.error(`No hay información para el reto ${num}`); return; }
  const datos = retosData[num];
  if (!datos) { console.error(`Faltan datos para el reto ${num}`); return; }

  const rutaCarpeta = path.join(__dirname, info.bloque, info.carpeta);
  if (!fs.existsSync(rutaCarpeta)) {
    console.error(`La carpeta ${rutaCarpeta} no existe.`);
    return;
  }

  const comoEjecutar = [
    "Abre una terminal en la raíz del repositorio.",
    "Ejecuta:",
    `\`\`\`bash`,
    `cd ${info.bloque}/Reto\\ ${num}`,
    `node ${info.archivo}`,
    `\`\`\``,
    "Observa los resultados en consola."
  ].join('\n');

  const contenido = `# ${datos.titulo}

## 🎯 Objetivo
${datos.resumen}

## 🛠️ Requisitos
- Tener [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
${comoEjecutar}

## 🧠 Decisiones y proceso de solución
${datos.decisiones}

## ⚠️ Dificultades encontradas
${datos.dificultades}

## ✅ Pruebas realizadas
${datos.pruebas}

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla de la terminal después de ejecutar el código.*  
${datos.captura}

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
`;

  const rutaArchivo = path.join(rutaCarpeta, 'README.md');
  fs.writeFileSync(rutaArchivo, contenido, 'utf8');
  console.log(`✅ README creado para Reto ${num}`);
}

// Generar todos los READMEs del conjunto definido
const numeros = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 47, 48, 49, 50];
numeros.forEach(crearREADME);
console.log('\n🎉 Todos los README.md para los retos Node.js (22-50) han sido creados.');