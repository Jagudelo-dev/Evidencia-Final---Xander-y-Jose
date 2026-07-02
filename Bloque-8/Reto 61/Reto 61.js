'use strict';

/**
 * RETO 61 · Contador encapsulado
 * --------------------------------
 * crearContador(inicial, paso) devuelve una API pública
 * (incrementar, disminuir, obtener, reiniciar, suscribir) cuyos métodos
 * cierran sobre las mismas variables privadas `valor`, `inicial`, `paso`
 * y `suscriptores`. Esas variables no son accesibles desde fuera más que
 * a través de esos métodos: no hay clases, no hay variables globales,
 * y nunca se retorna una referencia mutable al estado interno.
 */

function crearContador(inicial = 0, paso = 1) {
  // -- Validación de entradas ------------------------------------------------
  if (typeof inicial !== 'number' || Number.isNaN(inicial)) {
    throw new TypeError('"inicial" debe ser un número válido.');
  }
  if (typeof paso !== 'number' || Number.isNaN(paso)) {
    throw new TypeError('"paso" debe ser un número válido.');
  }
  if (paso === 0) {
    throw new RangeError('"paso" no puede ser 0 (el contador nunca cambiaría).');
  }

  // -- Estado privado (solo vive en este closure) -----------------------------
  let valor = inicial;
  const suscriptores = [];

  function notificar() {
    // Se pasa una copia primitiva (number), nunca una referencia mutable.
    for (const callback of suscriptores) {
      callback(valor);
    }
  }

  // -- API pública: cada método cierra sobre `valor`, `inicial`, `paso` -------
  return {
    incrementar() {
      valor += paso;
      notificar();
      return valor;
    },
    disminuir() {
      valor -= paso;
      notificar();
      return valor;
    },
    obtener() {
      return valor; // number primitivo: no hay forma de mutar el estado interno desde aquí
    },
    reiniciar() {
      valor = inicial;
      notificar();
      return valor;
    },
    // ⭐ Extensión: suscriptores notificados en cada cambio de valor.
    suscribir(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('El suscriptor debe ser una función.');
      }
      suscriptores.push(callback);
      // Devuelve una función para cancelar la suscripción (buena práctica,
      // sigue sin exponer el array interno de suscriptores).
      return function cancelarSuscripcion() {
        const indice = suscriptores.indexOf(callback);
        if (indice !== -1) suscriptores.splice(indice, 1);
      };
    },
  };
}

module.exports = { crearContador };
