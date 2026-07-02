// Reto 67 - Protocolo Iterador con Symbol.iterator
"use strict";

const elLog = document.querySelector("#consola-rango");
function imprimirRango(m) { if (elLog) elLog.textContent += `\n${m}`; }

// 1. Crea una función o clase Rango con inicio, fin y paso
class Rango {
    constructor(inicio, fin, paso = 1) {
        // 5. Valida que el paso no sea cero
        if (paso === 0) {
            throw new Error("Fallo de Validación: El paso de iteración no puede ser cero.");
        }
        this.inicio = inicio;
        this.fin = fin;
        this.paso = paso;
    }

    // 2. Implementa [Symbol.iterator]() que devuelva un iterador
    [Symbol.iterator]() {
        // Regla técnica: Cada iteración nueva debe tener un estado independiente
        let actual = this.inicio;
        const fin = this.fin;
        const paso = this.paso;

        return {
            // 3. Produce objetos {value, done} correctamente
            next() {
                // 4. Soporta rangos ascendentes y descendentes (El final debe respetar el signo del paso)
                const haTerminado = paso > 0 ? actual > fin : actual < fin;

                if (!haTerminado) {
                    const valorActual = actual;
                    actual += paso;
                    return { value: valorActual, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }

    // ⭐ Extensión: Añade un método take(n) perezoso
    take(n) {
        const iteradorOriginal = this[Symbol.iterator]();
        let contador = 0;

        return {
            [Symbol.iterator]() { return this; },
            next() {
                if (contador < n) {
                    contador++;
                    return iteradorOriginal.next();
                }
                return { value: undefined, done: true };
            }
        };
    }
}

// 6. Prueba spread, for...of y desestructuración sobre el rango
function probarProtocolos() {
    if (elLog) elLog.textContent = "--- Analizando Estructuras Iterables de Rango ---";

    try {
        const rangoAscendente = new Rango(5, 20, 5);
        
        imprimirRango("=== Prueba for...of (Ascendente de 5 en 5) ===");
        for (const num of rangoAscendente) {
            imprimirRango(`Valor: ${num}`);
        }

        imprimirRango("\n=== Prueba Operador Spread (...) ===");
        const rangoDescendente = new Rango(10, 2, -2);
        const arrayResultante = [...rangoDescendente];
        imprimirRango(`Rango Descendente evaluado en Array: ${JSON.stringify(arrayResultante)}`);

        imprimirRango("\n=== Prueba Desestructuración Lineal ===");
        const [primero, segundo] = new Rango(100, 500, 100);
        imprimirRango(`Primer elemento desestructurado: ${primero}, Segundo: ${segundo}`);

        imprimirRango("\n=== 🌟 Prueba Extensión: take(n) Perezoso ===");
        const rangoIncalculable = new Rango(1, 1000000, 1); // Rango masivo
        const tomaTres = [...rangoIncalculable.take(3)];
        imprimirRango(`Toma los 3 primeros de un rango de 1 millón: ${JSON.stringify(tomaTres)}`);

    } catch (e) {
        imprimirRango(`[ERROR]: ${e.message}`);
    }
}

window.addEventListener("DOMContentLoaded", probarProtocolos);