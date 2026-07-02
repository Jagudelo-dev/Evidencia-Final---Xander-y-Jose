// Reto 57 - Sistema de Cuentas Bancarias con encapsulamiento estricto por hashtag (#)
"use strict";

const elLog = document.querySelector("#log-bancario");

function auditar(mensaje) {
    if (elLog) elLog.textContent += `\n${mensaje}`;
}

// 1. Crea una clase CuentaBancaria con titular, número y saldo privado
class CuentaBancaria {
    // Campos estrictamente privados
    #titular;
    #numeroCuenta;
    #saldo;
    #historialMovimientos;

    // 2. Inicializa el estado desde el constructor con validaciones
    constructor(titular, numeroCuenta, saldoInicial) {
        if (!titular || typeof titular !== "string" || titular.trim() === "") {
            throw new Error("Validación Fallida: El titular debe ser una cadena válida.");
        }
        if (!numeroCuenta || typeof numeroCuenta !== "string") {
            throw new Error("Validación Fallida: Formato de número de cuenta inválido.");
        }
        // Regla técnica: Los montos deben ser positivos
        if (typeof saldoInicial !== "number" || isNaN(saldoInicial) || saldoInicial < 0) {
            throw new Error("Validación Fallida: El saldo inicial no puede ser negativo.");
        }

        this.#titular = titular;
        this.#numeroCuenta = numeroCuenta;
        this.#saldo = saldoInicial;
        // 4. Registra un historial privado de movimientos
        this.#historialMovimientos = [
            { tipo: "APERTURA", monto: saldoInicial, fecha: new Date().toISOString() }
        ];
    }

    // 3. Implementa métodos públicos obligatorios
    consultarSaldo() {
        return this.#saldo;
    }

    get numeroCuenta() {
        return this.#numeroCuenta;
    }

    depositar(monto) {
        if (typeof monto !== "number" || isNaN(monto) || monto <= 0) {
            auditar(`[ERROR] Intento de depósito inválido: ${monto}`);
            return false;
        }
        this.#saldo += monto;
        this.#historialMovimientos.push({
            tipo: "DEPOSITO",
            monto: monto,
            fecha: new Date().toISOString()
        });
        return true;
    }

    retirar(monto) {
        if (typeof monto !== "number" || isNaN(monto) || monto <= 0) {
            auditar(`[ERROR] Intento de retiro con formato erróneo: ${monto}`);
            return false;
        }
        // Criterio de aceptación: Los retiros insuficientes se rechazan
        if (monto > this.#saldo) {
            auditar(`[RECHAZADO] Retiro fallido por fondos insuficientes en cuenta ${this.#numeroCuenta}. Solicitado: $${monto}, Disponible: $${this.#saldo}`);
            return false;
        }
        this.#saldo -= monto;
        this.#historialMovimientos.push({
            tipo: "RETIRO",
            monto: monto,
            fecha: new Date().toISOString()
        });
        return true;
    }

    // 5. Devuelve copias del historial para proteger el estado interno
    obtenerHistorial() {
        // Regla técnica: No expongas el array interno por referencia (Deep copy estructural)
        return this.#historialMovimientos.map(movimiento => ({ ...movimiento }));
    }

    // Extensión obligatoria: Añade transferencia entre cuentas como método estático
    static transferir(cuentaOrigen, cuentaDestino, monto) {
        if (!(cuentaOrigen instanceof CuentaBancaria) || !(cuentaDestino instanceof CuentaBancaria)) {
            throw new Error("Operación Estática Fallida: Las entidades deben ser instancias de CuentaBancaria.");
        }
        if (monto <= 0) return false;

        auditar(`[PROCESANDO] Transferencia estática solicitada. Desde: ${cuentaOrigen.numeroCuenta} Hacia: ${cuentaDestino.numeroCuenta} Monto: $${monto}`);
        
        if (cuentaOrigen.retirar(monto)) {
            cuentaDestino.depositar(monto);
            auditar("[ÉXITO] Transferencia ejecutada de forma segura.");
            return true;
        }
        
        auditar("[FALLO] Transferencia cancelada: Origen sin fondos.");
        return false;
    }
}

// 6. Crea dos cuentas y ejecuta operaciones válidas e inválidas
function ejecutarPruebasBanco() {
    try {
        const cuentaA = new CuentaBancaria("Juan Pérez", "111-222", 500000);
        const cuentaB = new CuentaBancaria("María López", "333-444", 100000);

        auditar(`Cuenta A inicializada con saldo: $${cuentaA.consultarSaldo()}`);
        auditar(`Cuenta B inicializada con saldo: $${cuentaB.consultarSaldo()}`);

        // Operaciones Válidas
        cuentaA.depositar(150000);
        cuentaA.retirar(50000);

        // Operación Inválida (Debe ser rechazada por fondos)
        cuentaB.retirar(300000);

        // Uso del método estático (Extensión)
        CuentaBancaria.transferir(cuentaA, cuentaB, 200000);

        // Verificar invariabilidad del historial devuelto
        const copiaHistorial = cuentaA.obtenerHistorial();
        copiaHistorial.push({ tipo: "HACK", monto: 9999999 }); // Intento de inyección externa

        auditar(`\nSaldo Final Real Cuenta A: $${cuentaA.consultarSaldo()}`);
        auditar(`Saldo Final Real Cuenta B: $${cuentaB.consultarSaldo()}`);
        auditar(`\nHistorial Real Cuenta A (Protegido contra mutaciones): ${JSON.stringify(cuentaA.obtenerHistorial(), null, 2)}`);

    } catch (e) {
        auditar(`[CRÍTICO] Excepción en constructor: ${e.message}`);
    }
}

window.addEventListener("DOMContentLoaded", ejecutarPruebasBanco);