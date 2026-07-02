// Reto 68 - Generadores y yield* Recursivo
"use strict";

const elLog = document.querySelector("#consola-arbol");
function trazarNodo(m) { if (elLog) elLog.textContent += `\n${m}`; }

// 1. Define un árbol de categorías con hijos anidados
const catalogoCategorias = {
    nombre: "Equipos Alquiler",
    hijos: [
        {
            nombre: "Inflables Grandes",
            hijos: [
                { nombre: "Castillos Inflables", hijos: [] },
                { nombre: "Toboganes de Agua", hijos: [] }
            ]
        },
        {
            nombre: "Logística",
            hijos: [
                { nombre: "Mesas Tipo Tablón", hijos: [] },
                { nombre: "Sillas Samaria", hijos: [] }
            ]
        }
    ]
};

// 2. Crea un generador function* recorrer(nodo, profundidad)
// ⭐ Extensión: Detecta referencias cíclicas con un Set de nodos visitados
function* recorrerArbol(nodo, profundidad = 0, filtroOpcional = null, visitados = new Set()) {
    // Regla técnica: Incluye un caso base claro
    if (!nodo) return;
    
    if (visitados.has(nodo)) {
        trazarNodo("[CICLO DETECTADO] Bloqueo preventivo de bucle infinito.");
        return;
    }
    visitados.add(nodo);

    // 3. Emite cada nodo con su ruta o nivel si cumple la condición del filtro
    if (!filtroOpcional || filtroOpcional(nodo)) {
        // El generador debe producir valores bajo demanda
        yield { nombre: nodo.nombre, nivel: profundidad };
    }

    if (nodo.hijos && nodo.hijos.length > 0) {
        for (const hijo of nodo.hijos) {
            // 4. Usa yield* para delegar en hijos de forma recursiva
            yield* recorrerArbol(hijo, profundidad + 1, filtroOpcional, visitados);
        }
    }
}

function iniciarExploracion() {
    if (elLog) elLog.textContent = "--- Explorando Nodos Arbóreos ---";

    trazarNodo("=== RECORRIDO COMPLETO DEL ÁRBOL ===");
    for (const nodo of recorrerArbol(catalogoCategorias)) {
        trazarNodo(`${"  ".repeat(nodo.nivel)}- ${nodo.nombre} (Nivel ${nodo.nivel})`);
    }

    // 5. Permite filtrar nodos mediante una función opcional
    trazarNodo("\n=== RECORRIDO FILTRADO (Solo términos que inician con 'C') ===");
    const filtroC = (n) => n.nombre.startsWith("C");
    for (const nodo of recorrerArbol(catalogoCategorias, 0, filtroC)) {
        trazarNodo(`Cumple filtro: ${nodo.nombre}`);
    }

    // 6. Detén el consumo después de encontrar una categoría concreta
    trazarNodo("\n=== CONSUMO INTERRUMPIDO TEMPRANO ===");
    const iteradorDeBusqueda = recorrerArbol(catalogoCategorias);
    for (const nodo of iteradorDeBusqueda) {
        trazarNodo(`Evaluando: ${nodo.nombre}`);
        if (nodo.nombre === "Castillos Inflables") {
            trazarNodo("-> [STOP] Categoría localizada. Rompiendo consumo inmediato.");
            break;
        }
    }
}

window.addEventListener("DOMContentLoaded", iniciarExploracion);