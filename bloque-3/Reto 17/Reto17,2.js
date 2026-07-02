"use strict";

/**
 * VERSIÓN REFACTORIZADA
 * Mismos experimentos, pero con nombres que expresan claramente
 * a qué ámbito pertenece cada variable. Esto elimina la necesidad
 * de "adivinar" qué valor tiene 'valor' o 'mensaje' en cada punto.
 */

let temaGlobal = "configuración global";

function procesarPedido() {
  let estadoPedido = "en función: procesando";
  console.log("Estado dentro de la función:", estadoPedido);

  if (true) {
    let estadoEtapaActual = "en bloque: validando pago"; // nombre distinto, no hay shadowing
    console.log("Estado de la etapa actual:", estadoEtapaActual);
  }

  console.log("Estado dentro de la función (sin cambios):", estadoPedido);
}

procesarPedido();
console.log("Configuración global intacta:", temaGlobal);

// Manejo de error de alcance, ahora con nombres descriptivos
function leerDatoTemporal() {
  if (true) {
    let codigoTemporalDeSesion = "ABC123";
    console.log("Código generado dentro del bloque:", codigoTemporalDeSesion);
  }

  try {
    console.log("Intentando reutilizar el código fuera del bloque:", codigoTemporalDeSesion);
  } catch (error) {
    console.log("Error capturado: el código temporal no existe fuera de su bloque ->", error.message);
  }
}

leerDatoTemporal();