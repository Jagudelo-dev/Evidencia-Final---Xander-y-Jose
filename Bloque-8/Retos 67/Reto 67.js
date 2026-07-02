'use strict';

/**
 * RETO 67 · Rango iterable personalizado
 * -----------------------------------------
 * `Rango` implementa el protocolo iterable (`[Symbol.iterator]`) de forma
 * perezosa: nunca construye un array con todos los valores. Cada vez que
 * se recorre (con `for...of`, spread, desestructuración, etc.) se calcula
 * el siguiente valor bajo demanda, y cada recorrido nuevo arranca con su
 * propio estado independiente (no comparte "posición actual" entre
 * ejecuciones simultáneas).
 *
 * Semántica del rango: `inicio` incluido, `fin` EXCLUIDO (igual que
 * `range()` de Python), avanzando de `paso` en `paso`. Se documenta así
 * de forma explícita para que el comportamiento con distintos signos de
 * paso sea predecible.
 */

class Rango {
  constructor(inicio, fin, paso = 1) {
    for (const [nombre, valor] of [
      ['inicio', inicio],
      ['fin', fin],
      ['paso', paso],
    ]) {
      if (typeof valor !== 'number' || Number.isNaN(valor)) {
        throw new TypeError(`"${nombre}" debe ser un número válido (recibido: ${valor}).`);
      }
    }
    if (paso === 0) {
      throw new RangeError('"paso" no puede ser 0: el rango nunca avanzaría.');
    }

    this.inicio = inicio;
    this.fin = fin;
    this.paso = paso;
  }

  /**
   * Cada llamada a [Symbol.iterator] crea un iterador NUEVO con su propia
   * variable `actual`, cerrada por closure. Así, dos recorridos del mismo
   * `Rango` (p. ej. dos `for...of` anidados sobre el mismo objeto) no
   * interfieren entre sí.
   */
  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;
    const paso = this.paso;

    // El signo del paso determina la condición de parada:
    // paso positivo -> avanza mientras actual < fin (rango ascendente)
    // paso negativo -> avanza mientras actual > fin (rango descendente)
    const debeContinuar = paso > 0 ? () => actual < fin : () => actual > fin;

    return {
      next() {
        if (!debeContinuar()) {
          return { value: undefined, done: true };
        }
        const value = actual;
        actual += paso;
        return { value, done: false };
      },
      // Hace que el propio iterador también sea iterable (buena práctica
      // del protocolo: permite usar `for...of` directamente sobre él).
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  /**
   * ⭐ Extensión: versión perezosa de "tomar los primeros n valores".
   * Devuelve un objeto ITERABLE (no un array): al recorrerlo, crea un
   * iterador fresco del rango original y se detiene tras `n` valores,
   * sin haber materializado nada de más. Funciona incluso con rangos
   * infinitos (p. ej. `fin = Infinity`).
   */
  take(n) {
    if (typeof n !== 'number' || Number.isNaN(n) || n < 0) {
      throw new RangeError('"n" debe ser un número mayor o igual a 0.');
    }
    const rango = this;

    return {
      [Symbol.iterator]() {
        const iteradorBase = rango[Symbol.iterator]();
        let tomados = 0;

        return {
          next() {
            if (tomados >= n) {
              return { value: undefined, done: true };
            }
            const resultado = iteradorBase.next();
            if (resultado.done) {
              return resultado;
            }
            tomados++;
            return resultado;
          },
          [Symbol.iterator]() {
            return this;
          },
        };
      },
    };
  }
}

// ===========================================================================
// Demostración (se ejecuta solo si este archivo se corre directamente)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));

  separador('1) for...of sobre un rango ascendente');
  for (const n of new Rango(0, 10, 2)) {
    process.stdout.write(n + ' ');
  }
  console.log();

  separador('2) for...of sobre un rango descendente');
  for (const n of new Rango(10, 0, -2)) {
    process.stdout.write(n + ' ');
  }
  console.log();

  separador('3) Spread obtiene los valores');
  console.log([...new Rango(1, 6)]);
  console.log([...new Rango(5, -5, -3)]);

  separador('4) Desestructuración sobre el rango');
  const [a, b, c] = new Rango(100, 200, 25);
  console.log('a, b, c ->', a, b, c);

  separador('5) fin excluido: Rango(0, 5) NO incluye 5');
  console.log([...new Rango(0, 5)]);

  separador('6) Paso cero se rechaza');
  try {
    new Rango(0, 10, 0);
  } catch (err) {
    console.log('Error esperado ->', err.message);
  }

  separador('7) Dos recorridos independientes del MISMO objeto Rango');
  const compartido = new Rango(0, 3);
  const iterA = compartido[Symbol.iterator]();
  const iterB = compartido[Symbol.iterator]();
  console.log('iterA.next() ->', iterA.next()); // { value: 0, done: false }
  console.log('iterA.next() ->', iterA.next()); // { value: 1, done: false }
  console.log('iterB.next() (arranca desde 0, no se ve afectado por iterA) ->', iterB.next());

  separador('8) Extensión: take(n) perezoso, incluso sobre un rango INFINITO');
  const infinito = new Rango(0, Infinity, 1);
  console.log('infinito.take(5) ->', [...infinito.take(5)]);
  console.log('infinito.take(0) ->', [...infinito.take(0)]);

  separador('9) take(n) no consume ni afecta al rango original');
  const base = new Rango(0, 10, 1);
  console.log('base.take(3) ->', [...base.take(3)]);
  console.log('base completo sigue intacto ->', [...base]);

  separador('10) Objeto {value, done} devuelto manualmente por next()');
  const it = new Rango(0, 2)[Symbol.iterator]();
  console.log(it.next()); // { value: 0, done: false }
  console.log(it.next()); // { value: 1, done: false }
  console.log(it.next()); // { value: undefined, done: true }
}

module.exports = { Rango };
