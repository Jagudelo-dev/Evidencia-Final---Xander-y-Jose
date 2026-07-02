/**
 * Sistema de cuentas bancarias
 * Tema 29 · Clases y programación orientada a objetos
 */

class CuentaBancaria {

  // ---------- Campos privados (inaccesibles desde fuera de la clase) ----------
  #saldo;
  #historial;
  #numeroCuenta;
  #titular;

  // ---------- Constructor con validaciones ----------
  constructor(titular, numeroCuenta, saldoInicial = 0) {
    if (typeof titular !== "string" || titular.trim() === "") {
      throw new Error("El titular debe ser un texto no vacío.");
    }
    if (typeof numeroCuenta !== "string" || numeroCuenta.trim() === "") {
      throw new Error("El número de cuenta debe ser un texto no vacío.");
    }
    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      throw new Error("El saldo inicial debe ser un número no negativo.");
    }

    this.#titular = titular.trim();
    this.#numeroCuenta = numeroCuenta.trim();
    this.#saldo = saldoInicial;
    this.#historial = [];

    // Solo se registra en historial si hay saldo inicial real
    if (saldoInicial > 0) {
      this.#registrarMovimiento("apertura", saldoInicial);
    }
  }

  // ---------- Método privado: registra movimientos internamente ----------
  // Al ser privado, solo el propio código de la clase puede llamarlo.
  #registrarMovimiento(tipo, monto) {
    this.#historial.push({
      tipo,
      monto,
      saldoTrasMovimiento: this.#saldo,
      fecha: new Date().toISOString(),
    });
  }

  // ---------- 3. Métodos públicos de operación ----------

  depositar(monto) {
    if (!Number.isFinite(monto) || monto <= 0) {
      return { exito: false, mensaje: "El monto a depositar debe ser un número positivo." };
    }
    this.#saldo += monto;
    this.#registrarMovimiento("depósito", monto);
    return { exito: true, mensaje: `Depósito de $${monto} realizado. Saldo actual: $${this.#saldo}` };
  }

  retirar(monto) {
    if (!Number.isFinite(monto) || monto <= 0) {
      return { exito: false, mensaje: "El monto a retirar debe ser un número positivo." };
    }
    if (monto > this.#saldo) {
      return { exito: false, mensaje: `Fondos insuficientes. Saldo disponible: $${this.#saldo}` };
    }
    this.#saldo -= monto;
    this.#registrarMovimiento("retiro", monto);
    return { exito: true, mensaje: `Retiro de $${monto} realizado. Saldo actual: $${this.#saldo}` };
  }

  consultarSaldo() {
    // El saldo se expone como valor primitivo: inmutable por naturaleza
    return this.#saldo;
  }

  // ---------- 5. Historial: se devuelve copia para proteger el estado interno ----------
  // Se mapea a objetos nuevos para que ni siquiera los objetos internos sean
  // accesibles por referencia desde fuera de la clase.
  obtenerHistorial() {
    return this.#historial.map((movimiento) => ({ ...movimiento }));
  }

  // ---------- Getters de solo lectura (no hay setter equivalente) ----------
  get titular() { return this.#titular; }
  get numeroCuenta() { return this.#numeroCuenta; }

  // ---------- toString para representación amigable ----------
  toString() {
    return `Cuenta [${this.#numeroCuenta}] - Titular: ${this.#titular} - Saldo: $${this.#saldo}`;
  }

  // ---------- ⭐ EXTENSIÓN: transferencia entre cuentas como método estático ----------
  // Es estático porque opera sobre DOS instancias, no sobre una sola.
  // No necesita acceder a campos privados de instancia directamente;
  // delega en los métodos públicos retirar/depositar de cada cuenta.
  static transferir(cuentaOrigen, cuentaDestino, monto) {
    if (!(cuentaOrigen instanceof CuentaBancaria) || !(cuentaDestino instanceof CuentaBancaria)) {
      return { exito: false, mensaje: "Ambas cuentas deben ser instancias de CuentaBancaria." };
    }
    if (cuentaOrigen.numeroCuenta === cuentaDestino.numeroCuenta) {
      return { exito: false, mensaje: "No se puede transferir a la misma cuenta." };
    }

    const resultadoRetiro = cuentaOrigen.retirar(monto);
    if (!resultadoRetiro.exito) {
      return { exito: false, mensaje: `Transferencia fallida en origen: ${resultadoRetiro.mensaje}` };
    }

    const resultadoDeposito = cuentaDestino.depositar(monto);
    if (!resultadoDeposito.exito) {
      // Revertir el retiro si el depósito falla (atomicidad básica)
      cuentaOrigen.depositar(monto);
      return { exito: false, mensaje: `Transferencia fallida en destino, operación revertida.` };
    }

    return {
      exito: true,
      mensaje: `Transferencia de $${monto} de [${cuentaOrigen.numeroCuenta}] a [${cuentaDestino.numeroCuenta}] completada.`,
    };
  }
}

// ---------- 6. EJECUCIÓN: dos cuentas, operaciones válidas e inválidas ----------

function mostrarResultado(etiqueta, resultado) {
  const icono = resultado.exito ? "✅" : "❌";
  console.log(`${icono} ${etiqueta}: ${resultado.mensaje}`);
}

// Creación de dos cuentas con saldo inicial
const cuentaAna   = new CuentaBancaria("Ana García",    "001-2024", 500000);
const cuentaPedro = new CuentaBancaria("Pedro Ramírez", "002-2024", 200000);

console.log("===== ESTADO INICIAL =====");
console.log(cuentaAna.toString());
console.log(cuentaPedro.toString());

console.log("\n===== OPERACIONES VÁLIDAS =====");
mostrarResultado("Depósito Ana",    cuentaAna.depositar(150000));
mostrarResultado("Retiro Ana",      cuentaAna.retirar(80000));
mostrarResultado("Depósito Pedro",  cuentaPedro.depositar(50000));

console.log("\n===== OPERACIONES INVÁLIDAS =====");
mostrarResultado("Retiro excede saldo", cuentaAna.retirar(9999999));
mostrarResultado("Monto negativo",      cuentaAna.depositar(-500));
mostrarResultado("Monto cero",          cuentaPedro.retirar(0));
mostrarResultado("Monto no numérico",   cuentaAna.depositar("mucho"));

console.log("\n===== TRANSFERENCIA (método estático) =====");
mostrarResultado(
  "Transferencia Ana → Pedro",
  CuentaBancaria.transferir(cuentaAna, cuentaPedro, 100000)
);
mostrarResultado(
  "Transferencia inválida (misma cuenta)",
  CuentaBancaria.transferir(cuentaAna, cuentaAna, 10000)
);
mostrarResultado(
  "Transferencia sin fondos",
  CuentaBancaria.transferir(cuentaPedro, cuentaAna, 9999999)
);

console.log("\n===== SALDOS FINALES =====");
console.log(cuentaAna.toString());
console.log(cuentaPedro.toString());

console.log("\n===== HISTORIAL ANA (copia, no referencia interna) =====");
const historiaCopia = cuentaAna.obtenerHistorial();
console.table(historiaCopia);

// Verificación: modificar la copia no altera el historial real
historiaCopia.push({ tipo: "HACK", monto: 99999 });
console.log("Movimientos en historial real tras modificar la copia:", cuentaAna.obtenerHistorial().length);
console.log("Movimientos en la copia modificada:", historiaCopia.length);

console.log("\n===== INTENTO DE ACCESO DIRECTO A CAMPO PRIVADO =====");
try {
  console.log(cuentaAna.#saldo);
} catch (e) {
  console.log("Error esperado al acceder a campo privado:", e.message);
}