// Reto 65 - Estructura Map para Acumulación y Ranking Lógico
"use strict";

const elConsola = document.querySelector("#consola-frecuencia");
function volcarFrecuencia(txt) { if (elConsola) elConsola.textContent += `\n${txt}`; }

// 1. Recibe un texto con mayúsculas, puntuación y palabras repetidas
const textoEntrada = "Desarrollo de software en ADSO. ¡El software de gestión 'Elo recreaciones' es excelente, interactivo y dinámico! El desarrollo requiere software de alta calidad.";

function analizarFrecuenciaTexto(texto) {
    if (elConsola) elConsola.textContent = "--- Analizando Flujo Léxico ---";

    // 2. Normaliza el texto y separa palabras válidas (No pierdas palabras con tildes)
    const palabrasLimpias = texto
        .toLowerCase()
        .replace(/[^a-záéíóúüñóóíáadso\s]/g, "") // Conserva alfabeto español, tildes y diéresis
        .split(/\s+/)
        .filter(p => p.length > 0);

    // 3. Cuenta frecuencias con Map
    const mapaFrecuencias = new Map();

    // ⭐ Extensión: Agrupa también palabras por longitud usando Map de arrays
    const mapaLongitudes = new Map();

    palabrasLimpias.forEach(palabra => {
        // Pista sin solución aplicada: uso de valor actual o cero y suma uno
        mapaFrecuencias.set(palabra, (mapaFrecuencias.get(palabra) || 0) + 1);

        // Lógica de la extensión
        const lon = palabra.length;
        if (!mapaLongitudes.has(lon)) {
            mapaLongitudes.set(lon, []);
        }
        if (!mapaLongitudes.get(lon).includes(palabra)) {
            mapaLongitudes.get(lon).push(palabra);
        }
    });

    // 4. Convierte las entradas a array y ordénalas por frecuencia
    const rankingOrdenado = [...mapaFrecuencias.entries()]
        .sort((a, b) => b[1] - a[1]);

    // 5. Muestra las diez palabras más frecuentes
    volcarFrecuencia("=== TOP PALABRAS MÁS FRECUENTES ===");
    rankingOrdenado.slice(0, 10).forEach(([palabra, cuenta], idx) => {
        volcarFrecuencia(`${idx + 1}. [${palabra}] -> Aparece ${cuenta} veces`);
    });

    // 6. Permite consultar una palabra concreta mediante get y has (Consulta de inexistentes segura)
    volcarFrecuencia("\n=== Pruebas de Consulta Segura (get/has) ===");
    
    const consultar = (palabra) => {
        if (mapaFrecuencias.has(palabra)) {
            volcarFrecuencia(`Palabra '${palabra}': Encontrada. Frecuencia = ${mapaFrecuencias.get(palabra)}`);
        } else {
            volcarFrecuencia(`Palabra '${palabra}': No existe en el registro léxico de la muestra.`);
        }
    };

    consultar("software");
    consultar("gestión"); // Con tilde
    consultar("javascript"); // Inexistente seguro

    volcarFrecuencia("\n=== 🌟 Extensión: Mapeo por Longitud de Caracteres ===");
    for (let [longitud, lista] of [...mapaLongitudes.entries()].sort((a,b)=>a[0]-b[0])) {
        volcarFrecuencia(`Longitud ${longitud} letras: ${JSON.stringify(lista)}`);
    }
}

window.addEventListener("DOMContentLoaded", () => analizarFrecuenciaTexto(textoEntrada));