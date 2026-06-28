/**
 * Juego de intentos controlados
 * Tema 07 · Bucles for, while y do...while
 */

// ---------- VERSIÓN 1: usando WHILE ----------
function jugarConWhile(numeroSecreto, intentos, maxIntentos) {
  let indice = 0;             // variable que cambia en cada iteración (recorre el arreglo)
  let intentosValidos = 0;
  let intentosInvalidos = 0;
  let acertado = false;
  const historial = [];

  // Condición de salida verificable: agotar el arreglo, llegar al máximo, o acertar (cubierto por break)
  while (indice < intentos.length && intentosValidos < maxIntentos) {
    const intentoActual = intentos[indice];
    indice++; // se actualiza siempre, evita ciclo infinito

    // Validación: ignorar intentos que no sean números dentro de un rango razonable
    const esValido = typeof intentoActual === "number" && Number.isInteger(intentoActual) && intentoActual >= 0 && intentoActual <= 100;

    if (!esValido) {
      intentosInvalidos++;
      historial.push({ intento: intentoActual, resultado: "Inválido, ignorado" });
      continue; // salta a la siguiente iteración sin gastar un intento válido
    }

    intentosValidos++;

    if (intentoActual === numeroSecreto) {
      historial.push({ intento: intentoActual, resultado: "¡Acertaste!" });
      acertado = true;
      break; // termina el ciclo apenas se encuentra la respuesta
    } else if (intentoActual < numeroSecreto) {
      historial.push({ intento: intentoActual, resultado: "El número es mayor" });
    } else {
      historial.push({ intento: intentoActual, resultado: "El número es menor" });
    }
  }

  return { acertado, intentosValidos, intentosInvalidos, historial };
}

// ---------- VERSIÓN 2: usando DO...WHILE ----------
function jugarConDoWhile(numeroSecreto, intentos, maxIntentos) {
  let indice = 0;
  let intentosValidos = 0;
  let intentosInvalidos = 0;
  let acertado = false;
  const historial = [];

  // do...while se usa aquí porque garantizamos al menos una evaluación,
  // aunque el arreglo esté vacío (en ese caso, el cuerpo maneja el caso límite con un intento "vacío")
  if (intentos.length === 0) {
    return { acertado: false, intentosValidos: 0, intentosInvalidos: 0, historial: [{ intento: null, resultado: "Sin intentos para procesar" }] };
  }

  do {
    const intentoActual = intentos[indice];
    indice++;

    const esValido = typeof intentoActual === "number" && Number.isInteger(intentoActual) && intentoActual >= 0 && intentoActual <= 100;

    if (!esValido) {
      intentosInvalidos++;
      historial.push({ intento: intentoActual, resultado: "Inválido, ignorado" });
      continue;
    }

    intentosValidos++;

    if (intentoActual === numeroSecreto) {
      historial.push({ intento: intentoActual, resultado: "¡Acertaste!" });
      acertado = true;
      break;
    } else if (intentoActual < numeroSecreto) {
      historial.push({ intento: intentoActual, resultado: "El número es mayor" });
    } else {
      historial.push({ intento: intentoActual, resultado: "El número es menor" });
    }

  } while (indice < intentos.length && intentosValidos < maxIntentos);

  return { acertado, intentosValidos, intentosInvalidos, historial };
}

// ---------- ⭐ EXTENSIÓN: número secreto generado con Math.random y validado ----------
function generarSecretoAleatorio(min = 1, max = 100) {
  const numero = Math.floor(Math.random() * (max - min + 1)) + min;

  // Validación del rango (aunque la fórmula ya lo garantiza, se verifica explícitamente)
  if (numero < min || numero > max) {
    throw new Error("El número generado está fuera del rango permitido.");
  }
  return numero;
}

// ---------- PRESENTACIÓN ----------
function mostrarResultado(titulo, resultado) {
  console.log(`===== ${titulo} =====`);
  resultado.historial.forEach((h, i) => {
    console.log(`Paso ${i + 1} → Intento: ${h.intento} | ${h.resultado}`);
  });
  console.log(`Intentos válidos: ${resultado.intentosValidos} | Intentos inválidos: ${resultado.intentosInvalidos}`);
  console.log(`Resultado final: ${resultado.acertado ? "✅ Adivinó el número" : "❌ No adivinó el número"}`);
  console.log("============================\n");
}

// ---------- PRUEBAS ----------
const numeroSecreto = 42;
const intentosSimulados = [10, "x", 30, 50, 42, 99]; // incluye un inválido y el acierto

console.log("--- Comparación WHILE vs DO...WHILE ---\n");

mostrarResultado("WHILE", jugarConWhile(numeroSecreto, intentosSimulados, 5));
mostrarResultado("DO...WHILE", jugarConDoWhile(numeroSecreto, intentosSimulados, 5));

// Prueba con arreglo vacío (caso límite para do...while)
mostrarResultado("DO...WHILE - arreglo vacío", jugarConDoWhile(numeroSecreto, [], 5));

// Prueba donde nunca se acierta (agota intentos válidos)
mostrarResultado("WHILE - sin acierto", jugarConWhile(numeroSecreto, [1, 2, 3, 4, 5], 5));

// Prueba con número generado aleatoriamente
const secretoAleatorio = generarSecretoAleatorio(1, 100);
console.log(`Número secreto generado aleatoriamente (oculto en juego real): ${secretoAleatorio}`);
mostrarResultado("WHILE - con secreto aleatorio", jugarConWhile(secretoAleatorio, [25, 50, 75, secretoAleatorio], 5));