// Reto 61 - Creación de Closures herméticas para control de estado interno
"use strict";

const elConsola = document.querySelector("#consola-closures");
function logContexto(t) { if (elConsola) elConsola.textContent += `\n${t}`; }

// 1. Crea una función crearContador(inicial, paso) con validación previa
function crearContador(valorInicial, pasoConfigurado) {
    // 6. Valida inicial y paso antes de crear el contador para evitar fallos de ejecución
    if (typeof valorInicial !== "number" || isNaN(valorInicial)) {
        throw new Error("El valor inicial provisto debe ser un número válido.");
    }
    if (typeof pasoConfigurado !== "number" || isNaN(pasoConfigurado) || pasoConfigurado <= 0) {
        throw new Error("El paso configurado debe ser un número positivo mayor a cero.");
    }

    // 3. Mantén el valor inaccesible desde fuera excepto mediante la API (Léxico local)
    let valorActual = valorInicial;
    
    // Extensión obligatoria: Añade suscriptores que reciban notificación al cambiar el valor
    let suscriptores = [];

    function notificar() {
        suscriptores.forEach(cb => cb(valorActual));
    }

    // 2. Retorna métodos incrementar, disminuir, obtener y reiniciar en un objeto cerrado
    // Regla técnica: Cada método debe cerrar sobre las mismas variables privadas.
    return {
        incrementar() {
            valorActual += pasoConfigurado;
            notificar();
            return valorActual;
        },
        disminuir() {
            valorActual -= pasoConfigurado;
            notificar();
            return valorActual;
        },
        // Regla técnica: No retornes una referencia mutable al estado.
        obtener() {
            return valorActual;
        },
        reiniciar() {
            valorActual = valorInicial;
            notificar();
            return valorActual;
        },
        // Método de la extensión para acoplar observadores
        suscribir(callback) {
            if (typeof callback === "function") {
                suscriptores.push(callback);
            }
        }
    };
}

function iniciarPruebasClosures() {
    if (elConsola) elConsola.textContent = "--- Evaluando Aislamiento de Entornos ---";

    // 4. Crea dos contadores con configuraciones diferentes
    const contadorAlpha = crearContador(10, 2);
    const contadorBeta = crearContador(100, 25);

    // Adjuntar suscriptor de la extensión para auditorías en tiempo real
    contadorAlpha.suscribir((nuevoValor) => {
        logContexto(`[OBSERVADOR TRACE - Alpha]: El valor cambió de forma interna a: ${nuevoValor}`);
    });

    // Operaciones
    contadorAlpha.incrementar();
    contadorAlpha.incrementar();
    
    contadorBeta.disminuir();

    // 5. Demuestra que sus estados no se mezclan y permanecen herméticos
    logContexto(`\nValor Final Contador Alpha (Base 10, Paso 2): ${contadorAlpha.obtain ? contadorAlpha.obtain() : contadorAlpha.obtener()}`);
    logContexto(`Valor Final Contador Beta (Base 100, Paso 25): ${contadorBeta.obtener()}`);

    // Intentar alterar la variable interna de forma directa
    contadorAlpha.valorActual = 999; // Intento fallido de inyección
    logContexto(`\nVerificación post-intento de hack (Debe mantenerse intacto): ${contadorAlpha.obtener()}`);
    
    // Probar restauración por reinicio
    contadorAlpha.reiniciar();
    logContexto(`Contador Alpha relanzado a su origen: ${contadorAlpha.obtener()}`);
}

window.addEventListener("DOMContentLoaded", iniciarPruebasClosures);