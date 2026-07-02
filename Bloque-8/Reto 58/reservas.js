// Reto 58 - Gestor de Reservas coordinando múltiples clases independientes
"use strict";

const elConsola = document.querySelector("#consola-reservas");
function logReservas(txt) { if (elConsola) elConsola.textContent += `\n${txt}`; }

// 1. Crea la clase Huesped
class Huesped {
    constructor(nombre, documento) {
        this.nombre = nombre;
        this.documento = documento;
    }
}

// 1. Crea la clase Habitacion
class Habitacion {
    constructor(numero, capacidad, precioPorNoche) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.precioPorNoche = precioPorNoche;
    }
}

// 1. Crea la clase Reserva
class Reserva {
    constructor(id, habitacion, huesped, fechaInicio, fechaFin) {
        // Regla técnica: Las fechas deben compararse como objetos Date
        if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date)) {
            throw new Error("Formato inválido: Las fechas de reserva deben ser instancias de Date.");
        }
        if (fechaFin <= fechaInicio) {
            throw new Error("Error Estructural: La fecha de fin debe ser posterior a la de inicio.");
        }
        // 3. Valida que la capacidad soporte el número de huéspedes (Mapeado contra negocio)
        if (habitacion.capacidad < 1) { 
            throw new Error("Habitación sin cupo viable.");
        }

        this.id = id;
        this.habitacion = habitacion;
        this.huesped = huesped;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.activa = true; // Flag para control de políticas de cancelación (Extensión)
    }

    // 4. Calcula noches y costo total mediante métodos dedicados
    calcularNoches() {
        const diferenciaMilisegundos = this.fechaFin - this.fechaInicio;
        return Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    }

    calcularCostoTotal() {
        return this.calcularNoches() * this.habitacion.precioPorNoche;
    }
}

// Pista sin solución: Servicio unificado de orquestación que coordina disponibilidad
class SistemaHotelero {
    #reservasExistentes = [];

    crearReserva(id, habitacion, huesped, fechaInicio, fechaFin) {
        // 5. Impide reservar fechas ocupadas en el período evaluando solapamientos
        const habitacionOcupada = this.#reservasExistentes.some(r => {
            if (!r.activa || r.habitacion.numero !== habitacion.numero) return false;
            
            // Lógica de solapamiento de intervalos de fechas
            return (fechaInicio < r.fechaFin && fechaFin > r.fechaInicio);
        });

        if (habitacionOcupada) {
            logReservas(`[DENEGADO] Bloqueo por Solapamiento: Habitación ${habitacion.numero} ocupada para el rango solicitado.`);
            return null;
        }

        const nuevaReserva = new Reserva(id, habitacion, huesped, fechaInicio, fechaFin);
        this.#reservasExistentes.push(nuevaReserva);
        return nuevaReserva;
    }

    // Extensión obligatoria: Añade cancelación con política de cobro según anticipación
    cancelarReserva(idReserva) {
        const reserva = this.#reservasExistentes.find(r => r.id === idReserva);
        if (!reserva) {
            logReservas(`[ERROR] No se localizó la reserva ID: ${idReserva}`);
            return;
        }

        const hoy = new Date();
        const diasAnticipacion = Math.ceil((reserva.fechaInicio - hoy) / (1000 * 60 * 60 * 24));
        reserva.activa = false;

        logReservas(`\n[CANCELACIÓN] Procesando ID: ${idReserva}.`);
        if (diasAnticipacion < 2) {
            const penalizacion = reserva.calcularCostoTotal() * 0.5; // Cobro del 50% por cancelación tardía
            logReservas(`-> Cancelación tardía (${diasAnticipacion} días de antelación). Se aplica penalización del 50%: $${penalizacion}`);
        } else {
            logReservas(`-> Cancelación exitosa con suficiente antelación (${diasAnticipacion} días). Sin cargos.`);
        }
    }

    // 6. Genera un resumen de reserva
    obtenerReporteGlobal() {
        return this.#reservasExistentes.map(r => ({
            ID: r.id,
            Habitacion: r.habitacion.numero,
            Cliente: r.huesped.nombre,
            Noches: r.calcularNoches(),
            Total: r.calcularCostoTotal(),
            Estado: r.activa ? "Confirmada" : "Cancelada"
        }));
    }
}

// Pruebas de varios escenarios concurrentes
function simularEscenarios() {
    const hotel = new SistemaHotelero();

    const habitacion101 = new Habitacion("101", 2, 90000);
    const cliente1 = new Huesped("Carlos Alarcón", "1094AA");
    const cliente2 = new Huesped("Ana Martínez", "2034BB");

    // Escenario 1: Reserva Exitosa
    const r1 = hotel.crearReserva("R_01", habitacion101, cliente1, new Date("2026-08-10"), new Date("2026-08-15"));
    if (r1) logReservas(`[ÉXITO] Reserva R_01 creada. Costo total: $${r1.calcularCostoTotal()}`);

    // Escenario 2: Intento de reserva solapada (Debe fallar)
    hotel.crearReserva("R_02", habitacion101, cliente2, new Date("2026-08-12"), new Date("2026-08-14"));

    // Escenario 3: Reserva en otra fecha (Debe pasar)
    hotel.crearReserva("R_03", habitacion101, cliente2, new Date("2026-08-20"), new Date("2026-08-22"));

    // Escenario 4: Cancelación con política de cobro (Extensión)
    hotel.cancelarReserva("R_03"); // Cancelación con meses de anticipación (Gratis)

    logReservas(`\n--- RESUMEN FINAL --- \n${JSON.stringify(hotel.obtenerReporteGlobal(), null, 2)}`);
}

window.addEventListener("DOMContentLoaded", simularEscenarios);