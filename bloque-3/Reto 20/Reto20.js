/**
 * Agenda semanal matricial
 * Tema 10 · Arrays fundamentales
 */

// ---------- Etiquetas separadas de la matriz (regla técnica) ----------
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const franjasHorarias = ["Mañana", "Tarde", "Noche"];

// ---------- 1. Matriz: 5 días x 3 franjas ----------
// "Libre" representa una franja sin actividad asignada
const agenda = [
  ["Yoga", "Libre", "Programación"],          // Lunes
  ["Libre", "Inglés", "Libre"],                // Martes
  ["Programación", "Libre", "Música"],         // Miércoles
  ["Libre", "Libre", "Libre"],                  // Jueves
  ["Inglés", "Yoga", "Libre"],                  // Viernes
];

// ---------- Validación de índices (reutilizable) ----------
function indicesValidos(matriz, fila, columna) {
  return (
    fila >= 0 && fila < matriz.length &&
    columna >= 0 && columna < matriz[fila].length
  );
}

// ---------- 2. Acceder y modificar una actividad específica ----------
function modificarActividad(matriz, fila, columna, nuevaActividad) {
  if (!indicesValidos(matriz, fila, columna)) {
    console.log(`⚠️ Índices inválidos: fila ${fila}, columna ${columna}`);
    return false;
  }
  matriz[fila][columna] = nuevaActividad;
  return true;
}

console.log("Actividad original [Miércoles][Tarde]:", agenda[2][1]); // acceso por índices
modificarActividad(agenda, 2, 1, "Natación"); // modificación validada
console.log("Actividad modificada [Miércoles][Tarde]:", agenda[2][1]);

// ---------- 3. Recorrido por filas y columnas ----------
function imprimirAgenda(matriz) {
  console.log("\n===== AGENDA SEMANAL =====");
  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      console.log(`${diasSemana[fila]} - ${franjasHorarias[columna]}: ${matriz[fila][columna]}`);
    }
  }
  console.log("===========================\n");
}

imprimirAgenda(agenda);

// ---------- 4. Contar franjas libres ----------
function contarFranjasLibres(matriz) {
  let contador = 0;
  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      if (matriz[fila][columna] === "Libre") {
        contador++;
      }
    }
  }
  return contador;
}

console.log("Total de franjas libres:", contarFranjasLibres(agenda));

// ---------- 5. Buscar primera ubicación de una actividad ----------
function buscarPrimeraUbicacion(matriz, actividadBuscada) {
  for (let fila = 0; fila < matriz.length; fila++) {
    for (let columna = 0; columna < matriz[fila].length; columna++) {
      if (matriz[fila][columna] === actividadBuscada) {
        return { dia: diasSemana[fila], franja: franjasHorarias[columna], fila, columna };
      }
    }
  }
  return null; // no encontrada
}

const ubicacionYoga = buscarPrimeraUbicacion(agenda, "Yoga");
console.log("Primera ubicación de 'Yoga':", ubicacionYoga);

const ubicacionInexistente = buscarPrimeraUbicacion(agenda, "Ajedrez");
console.log("Búsqueda de 'Ajedrez' (no existe):", ubicacionInexistente);

// ---------- 6. Copia profunda SIN JSON.stringify (regla técnica) ----------
// Copiar solo el array exterior (slice/spread) NO copia los arrays internos:
// las filas seguirían siendo referencias compartidas con el original.
function copiarAgendaProfundamente(matriz) {
  return matriz.map(fila => [...fila]); // cada fila se copia con su propio array nuevo
}

const copiaAgenda = copiarAgendaProfundamente(agenda);

// Modificamos un día completo en la copia
copiaAgenda[0] = ["Pilates", "Pilates", "Pilates"]; // reemplazo del día Lunes en la copia
copiaAgenda[3][1] = "Ajedrez"; // modificación de una celda puntual (Jueves - Tarde)

console.log("\n----- Verificación de independencia -----");
console.log("Original [Lunes]:", agenda[0]);          // debe seguir igual
console.log("Copia [Lunes]:", copiaAgenda[0]);          // debe mostrar el cambio
console.log("Original [Jueves][Tarde]:", agenda[3][1]); // debe seguir "Libre"
console.log("Copia [Jueves][Tarde]:", copiaAgenda[3][1]); // debe mostrar "Ajedrez"

// ---------- ⭐ EXTENSIÓN: resumen por día de espacios disponibles ----------
function generarResumenPorDia(matriz) {
  return matriz.map((filaDia, indiceFila) => {
    const espaciosLibres = filaDia.filter(actividad => actividad === "Libre").length;
    return {
      dia: diasSemana[indiceFila],
      espaciosLibres,
      espaciosOcupados: filaDia.length - espaciosLibres,
    };
  });
}

const resumen = generarResumenPorDia(agenda);
console.log("\n===== RESUMEN POR DÍA =====");
console.table(resumen);