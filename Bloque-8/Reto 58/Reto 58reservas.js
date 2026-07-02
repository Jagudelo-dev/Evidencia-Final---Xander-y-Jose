'use strict';

/**
 * RETO 58 · Gestor de reservas orientado a objetos
 * ------------------------------------------------
 * Entidades:  Habitacion, Huesped, Reserva
 * Servicio:   GestorReservas  (coordina disponibilidad y reglas de negocio)
 *
 * Decisiones de diseño (ver README.md para más detalle):
 * - Cada clase tiene UNA responsabilidad clara (SRP).
 * - Habitacion NO guarda su lista de reservas (evita duplicar el estado);
 *   es GestorReservas quien conoce todas las reservas y resuelve solapamientos.
 * - Las fechas se normalizan siempre a objetos Date sin componente horaria,
 *   para poder compararlas de forma fiable con getTime().
 * - Reserva es responsable de sus propios cálculos (noches, costo, resumen)
 *   pero NO decide si puede crearse: esa decisión (disponibilidad) es del
 *   GestorReservas, que es quien tiene visión global de todas las reservas.
 */

// ---------------------------------------------------------------------------
// Utilidades de fecha
// ---------------------------------------------------------------------------

/** Convierte "YYYY-MM-DD" o Date a un Date normalizado a medianoche local. */
function normalizarFecha(valor) {
  const fecha = valor instanceof Date ? new Date(valor.getTime()) : new Date(valor);
  if (Number.isNaN(fecha.getTime())) {
    throw new Error(`Fecha inválida: ${valor}`);
  }
  fecha.setHours(0, 0, 0, 0);
  return fecha;
}

function msADias(ms) {
  return ms / (1000 * 60 * 60 * 24);
}

// ---------------------------------------------------------------------------
// Entidad: Huesped
// ---------------------------------------------------------------------------

class Huesped {
  constructor(nombre, documento, email = null) {
    if (!nombre || !nombre.trim()) {
      throw new Error('El huésped necesita un nombre.');
    }
    if (!documento || !documento.trim()) {
      throw new Error('El huésped necesita un documento de identidad.');
    }
    this.nombre = nombre.trim();
    this.documento = documento.trim();
    this.email = email;
  }

  toString() {
    return `${this.nombre} (doc. ${this.documento})`;
  }
}

// ---------------------------------------------------------------------------
// Entidad: Habitacion
// ---------------------------------------------------------------------------

class Habitacion {
  constructor(numero, capacidad, precioPorNoche) {
    if (capacidad <= 0) {
      throw new Error('La capacidad debe ser mayor que 0.');
    }
    if (precioPorNoche <= 0) {
      throw new Error('El precio por noche debe ser mayor que 0.');
    }
    this.numero = numero;
    this.capacidad = capacidad;
    this.precioPorNoche = precioPorNoche;
  }

  soportaHuespedes(cantidad) {
    return cantidad > 0 && cantidad <= this.capacidad;
  }

  toString() {
    return `Habitación ${this.numero} (cap. ${this.capacidad}, $${this.precioPorNoche}/noche)`;
  }
}

// ---------------------------------------------------------------------------
// Entidad: Reserva
// ---------------------------------------------------------------------------

const ESTADOS_RESERVA = Object.freeze({
  PENDIENTE: 'pendiente',
  CONFIRMADA: 'confirmada',
  CANCELADA: 'cancelada',
});

let siguienteId = 1;

class Reserva {
  constructor(habitacion, huesped, fechaEntrada, fechaSalida, numHuespedes) {
    if (!(habitacion instanceof Habitacion)) {
      throw new Error('Reserva requiere una Habitacion válida.');
    }
    if (!(huesped instanceof Huesped)) {
      throw new Error('Reserva requiere un Huesped válido.');
    }

    const entrada = normalizarFecha(fechaEntrada);
    const salida = normalizarFecha(fechaSalida);

    if (salida.getTime() <= entrada.getTime()) {
      throw new Error('La fecha de salida debe ser posterior a la de entrada.');
    }

    if (!habitacion.soportaHuespedes(numHuespedes)) {
      throw new Error(
        `La habitación ${habitacion.numero} no soporta ${numHuespedes} huésped(es) (capacidad: ${habitacion.capacidad}).`
      );
    }

    this.id = siguienteId++;
    this.habitacion = habitacion;
    this.huesped = huesped;
    this.fechaEntrada = entrada;
    this.fechaSalida = salida;
    this.numHuespedes = numHuespedes;
    this.estado = ESTADOS_RESERVA.CONFIRMADA;
    this.fechaCancelacion = null;
    this.cargoCancelacion = null;
  }

  /** Número de noches reservadas. */
  calcularNoches() {
    return msADias(this.fechaSalida.getTime() - this.fechaEntrada.getTime());
  }

  /** Costo total = noches * precio por noche de la habitación. */
  calcularCostoTotal() {
    return this.calcularNoches() * this.habitacion.precioPorNoche;
  }

  /** ¿Este rango [entrada, salida) se solapa con otro rango de fechas? */
  seSolapaCon(fechaEntrada, fechaSalida) {
    const otraEntrada = normalizarFecha(fechaEntrada);
    const otraSalida = normalizarFecha(fechaSalida);
    return (
      this.estado !== ESTADOS_RESERVA.CANCELADA &&
      this.fechaEntrada.getTime() < otraSalida.getTime() &&
      otraEntrada.getTime() < this.fechaSalida.getTime()
    );
  }

  /**
   * Cancela la reserva aplicando una política de cobro según anticipación:
   *  - 7 días o más antes del check-in  -> sin cargo (0%)
   *  - Entre 3 y 6 días antes            -> cargo del 50% del total
   *  - Menos de 3 días antes             -> cargo del 100% del total
   */
  cancelar(fechaCancelacion = new Date()) {
    if (this.estado === ESTADOS_RESERVA.CANCELADA) {
      throw new Error('La reserva ya estaba cancelada.');
    }

    const fechaCancel = normalizarFecha(fechaCancelacion);
    const diasAnticipacion = msADias(this.fechaEntrada.getTime() - fechaCancel.getTime());

    let porcentajeCargo;
    if (diasAnticipacion >= 7) {
      porcentajeCargo = 0;
    } else if (diasAnticipacion >= 3) {
      porcentajeCargo = 0.5;
    } else {
      porcentajeCargo = 1;
    }

    this.estado = ESTADOS_RESERVA.CANCELADA;
    this.fechaCancelacion = fechaCancel;
    this.cargoCancelacion = this.calcularCostoTotal() * porcentajeCargo;

    return this.cargoCancelacion;
  }

  resumen() {
    const fmt = (d) => d.toISOString().slice(0, 10);
    const lineas = [
      `Reserva #${this.id} — ${this.estado.toUpperCase()}`,
      `  Habitación : ${this.habitacion.toString()}`,
      `  Huésped    : ${this.huesped.toString()}`,
      `  Fechas     : ${fmt(this.fechaEntrada)} → ${fmt(this.fechaSalida)} (${this.calcularNoches()} noches)`,
      `  Ocupantes  : ${this.numHuespedes}`,
      `  Costo total: $${this.calcularCostoTotal().toFixed(2)}`,
    ];
    if (this.estado === ESTADOS_RESERVA.CANCELADA) {
      lineas.push(
        `  Cancelada el ${fmt(this.fechaCancelacion)} — cargo por cancelación: $${this.cargoCancelacion.toFixed(2)}`
      );
    }
    return lineas.join('\n');
  }
}

// ---------------------------------------------------------------------------
// Servicio: GestorReservas
// ---------------------------------------------------------------------------

class GestorReservas {
  constructor() {
    /** @type {Reserva[]} */
    this.reservas = [];
  }

  /** ¿La habitación está libre en el rango [fechaEntrada, fechaSalida)? */
  estaDisponible(habitacion, fechaEntrada, fechaSalida) {
    return !this.reservas.some(
      (r) => r.habitacion === habitacion && r.seSolapaCon(fechaEntrada, fechaSalida)
    );
  }

  crearReserva(habitacion, huesped, fechaEntrada, fechaSalida, numHuespedes) {
    if (!this.estaDisponible(habitacion, fechaEntrada, fechaSalida)) {
      throw new Error(
        `La habitación ${habitacion.numero} ya está ocupada en ese período.`
      );
    }
    // La validación de capacidad y fechas ocurre dentro del constructor de Reserva.
    const reserva = new Reserva(habitacion, huesped, fechaEntrada, fechaSalida, numHuespedes);
    this.reservas.push(reserva);
    return reserva;
  }

  cancelarReserva(reserva, fechaCancelacion = new Date()) {
    if (!this.reservas.includes(reserva)) {
      throw new Error('Esa reserva no pertenece a este gestor.');
    }
    return reserva.cancelar(fechaCancelacion);
  }

  reservasPorHabitacion(habitacion) {
    return this.reservas.filter((r) => r.habitacion === habitacion);
  }

  reservasPorHuesped(huesped) {
    return this.reservas.filter((r) => r.huesped === huesped);
  }
}

module.exports = { Habitacion, Huesped, Reserva, GestorReservas, ESTADOS_RESERVA };
