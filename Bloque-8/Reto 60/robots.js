// Reto 60 - Composición funcional de comportamientos (Mixins funcionales)
"use strict";

const elConsola = document.querySelector("#consola-robots");
function logRobot(m) { if (elConsola) elConsola.textContent += `\n${m}`; }

// 1. Crea fábricas para capacidades individuales reutilizables
// Regla técnica: Evita que una capacidad dependa de propiedades globales (Inyección por contexto 'this')
const canMover = () => ({
    mover() {
        logRobot(`[MÓDULO MOVER]: ${this.nombre} se desplazó a una nueva coordenada de patrullaje.`);
    }
});

const canHablar = () => ({
    hablar(mensaje) {
        logRobot(`[MÓDULO HABLAR]: ${this.nombre} emite sintetizador de voz: "${mensaje}"`);
    }
});

const canCargar = () => ({
    cargar() {
        logRobot(`[MÓDULO CARGAR]: ${this.nombre} elevó un contenedor pesado utilizando sus actuadores.`);
    }
});

const canRegistrarEstado = () => ({
    registrarEstado() {
        logRobot(`[AUDITORÍA DE ESTADO]: Nombre: ${this.nombre} | Batería: ${this.batería}%`);
    }
});

// 3. Compón un robotMensajero y un robotCarga con capacidades distintas
// Regla técnica: No copies ni pegues código. La composición debe ser explícita
function crearRobotMensajero(nombre, batería) {
    let estadoInterno = { nombre, batería };
    
    // Composición explícita de comportamientos extendiendo un objeto base unificado
    return Object.assign(
        estadoInterno,
        canMover(),
        canHablar(),
        canRegistrarEstado()
    );
}

function crearRobotCarga(nombre, batería) {
    let estadoInterno = { nombre, batería };
    
    return Object.assign(
        estadoInterno,
        canMover(),
        canCargar(),
        canRegistrarEstado()
    );
}

function ejecutarSimuladorComposicion() {
    if (elConsola) elConsola.textContent = "--- Inicio de Simulación Mecánica ---";

    const mensajero = crearRobotMensajero("TUF-Messenger-A16", 95);
    const carga = crearRobotCarga("Titan-Lifter-01", 80);

    // 5. Demuestra que ambos comparten algunas funciones y difieren en otras
    logRobot("\n=== Pruebas del Robot Mensajero ===");
    mensajero.registrarEstado();
    mensajero.mover();
    mensajero.hablar("Entrega de paquetes asignada para el módulo ADSO.");

    logRobot("\n=== Pruebas del Robot de Carga ===");
    carga.registrarEstado();
    carga.mover();
    carga.cargar();

    // Verificación de APIs diferenciadas (Criterio de aceptación)
    logRobot("\n=== Verificación de Interfaces Dinámicas ===");
    logRobot(`¿Mensajero puede hablar?: ${typeof mensajero.hablar === "function"}`);
    logRobot(`¿Mensajero puede cargar?: ${typeof mensajero.cargar === "function"}`);
    logRobot(`¿Carga puede cargar?: ${typeof carga.cargar === "function"}`);

    // Extensión obligatoria: Permite añadir una capacidad en tiempo de ejecución
    logRobot("\n=== 🌟 Extensión: Inyección de Capacidades en Caliente ===");
    const canEscanearEntorno = () => ({
        escanear() { logRobot(`[NUEVA CAPACIDAD]: ${this.nombre} ejecutó un escaneo láser de espectro completo.`); }
    });

    // Inyección dinámica directa en caliente
    Object.assign(mensajero, canEscanearEntorno());
    mensajero.escanear();
}

window.addEventListener("DOMContentLoaded", ejecutarSimuladorComposicion);