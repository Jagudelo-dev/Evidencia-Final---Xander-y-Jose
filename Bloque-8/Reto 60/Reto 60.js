'use strict';

/**
 * RETO 60 · Robot por composición
 * --------------------------------
 * Cada "capacidad" es una fábrica (mixin funcional) independiente:
 * recibe el estado que necesita como parámetro (closure), y devuelve
 * un objeto con los métodos de esa capacidad. Ningún estado se lee de
 * variables globales: todo viaja explícito por argumentos.
 *
 * Los robots se arman con Object.assign combinando las capacidades que
 * necesiten, en vez de heredar de una jerarquía de clases fija.
 */

// ===========================================================================
// Fábricas de capacidades
// ===========================================================================

/**
 * Capacidad: moverse en un plano 2D.
 * @param {{x?: number, y?: number, velocidad?: number}} estadoInicial
 */
function crearCapacidadMover({ x = 0, y = 0, velocidad = 1 } = {}) {
  // Estado privado por closure: nadie fuera de esta fábrica puede tocarlo
  // directamente, solo a través de los métodos que devolvemos.
  const posicion = { x, y };

  return {
    mover(dx, dy) {
      posicion.x += dx * velocidad;
      posicion.y += dy * velocidad;
      return `Moviéndose a (${posicion.x}, ${posicion.y})`;
    },
    obtenerPosicion() {
      // Se devuelve una copia para no exponer la referencia interna.
      return { ...posicion };
    },
  };
}

/**
 * Capacidad: emitir mensajes hablados.
 * @param {{voz?: string}} opciones
 */
function crearCapacidadHablar({ voz = 'robótica estándar' } = {}) {
  let ultimoMensaje = null;

  return {
    hablar(mensaje) {
      ultimoMensaje = mensaje;
      return `[voz ${voz}] "${mensaje}"`;
    },
    ultimoMensajeDicho() {
      return ultimoMensaje;
    },
  };
}

/**
 * Capacidad: cargar y descargar objetos con un límite de peso.
 * @param {{capacidadMaxima?: number}} opciones
 */
function crearCapacidadCargar({ capacidadMaxima = 10 } = {}) {
  const carga = [];
  const pesoActual = () => carga.reduce((total, item) => total + item.peso, 0);

  return {
    cargarObjeto(nombre, peso) {
      if (pesoActual() + peso > capacidadMaxima) {
        throw new Error(
          `No se puede cargar "${nombre}" (${peso}kg): excede la capacidad máxima de ${capacidadMaxima}kg.`
        );
      }
      carga.push({ nombre, peso });
      return `Cargado "${nombre}" (${peso}kg). Carga actual: ${pesoActual()}/${capacidadMaxima}kg.`;
    },
    descargarTodo() {
      const items = carga.map((item) => item.nombre);
      carga.length = 0;
      return items;
    },
    obtenerCarga() {
      return carga.map((item) => ({ ...item }));
    },
  };
}

/**
 * Capacidad: llevar un registro (bitácora) de eventos del propio robot.
 * Independiente de cualquier otra capacidad: solo necesita saber
 * "quién" registra, dato que se le pasa explícitamente.
 * @param {{nombreRobot: string}} opciones
 */
function crearCapacidadRegistrarEstado({ nombreRobot }) {
  const historial = [];

  return {
    registrarEstado(evento) {
      const entrada = { evento, timestamp: historial.length + 1 };
      historial.push(entrada);
      return `[${nombreRobot} #${entrada.timestamp}] ${evento}`;
    },
    obtenerHistorial() {
      return [...historial];
    },
  };
}

// ===========================================================================
// Composición de robots
// ===========================================================================

/**
 * Robot mensajero: se mueve rápido, habla para anunciarse y lleva bitácora.
 * NO tiene capacidad de carga pesada (no la necesita).
 */
function crearRobotMensajero(nombre) {
  const identidad = { nombre, tipo: 'mensajero' };

  return Object.assign(
    identidad,
    crearCapacidadMover({ velocidad: 3 }),
    crearCapacidadHablar({ voz: 'aguda y rápida' }),
    crearCapacidadRegistrarEstado({ nombreRobot: nombre })
  );
}

/**
 * Robot de carga: se mueve despacio, puede cargar mucho peso y lleva
 * bitácora. NO tiene capacidad de hablar (no la necesita).
 */
function crearRobotCarga(nombre, capacidadMaxima = 200) {
  const identidad = { nombre, tipo: 'carga' };

  return Object.assign(
    identidad,
    crearCapacidadMover({ velocidad: 1 }),
    crearCapacidadCargar({ capacidadMaxima }),
    crearCapacidadRegistrarEstado({ nombreRobot: nombre })
  );
}

/**
 * ⭐ Extensión: añadir una capacidad en tiempo de ejecución.
 * No muta la fábrica original; simplemente mezcla la nueva capacidad
 * en el objeto robot que ya existe.
 */
function agregarCapacidad(robot, capacidad) {
  return Object.assign(robot, capacidad);
}

module.exports = {
  crearCapacidadMover,
  crearCapacidadHablar,
  crearCapacidadCargar,
  crearCapacidadRegistrarEstado,
  crearRobotMensajero,
  crearRobotCarga,
  agregarCapacidad,
};
