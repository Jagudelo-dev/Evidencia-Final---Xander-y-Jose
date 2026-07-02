// Reto 63 - Manipulación de estructuras de datos inmutables y comparación estructural
"use strict";

const elConsola = document.querySelector("#consola-inmutable");
function logInmutable(htmlTexto) { if (elConsola) elConsola.innerHTML += `\n${htmlTexto}`; }

// 1. Define un objeto estadoInicial unificado con usuario, carrito y preferencias
const estadoInicial = {
    usuario: {
        id: "usr_4050",
        nombre: "Juan ADSO",
        rango: "Estudiante"
    },
    carrito: [
        { producto: "Servicio Inflable Premium", precio: 120000, cantidad: 1 },
        { producto: "Máquina de Snacks", precio: 45000, cantidad: 2 }
    ],
    preferencias: {
        tema: "oscuro",
        notificaciones: true,
        idioma: "es"
    }
};

// 2 y 3. Crea funciones de transformación deterministas que devuelvan nuevos estados
// Regla técnica: No uses push, splice ni asignación directa sobre el estado recibido
function cambiarTema(estado, nuevoTema) {
    return {
        ...estado,
        preferencias: {
            ...estado.preferencias,
            tema: nuevoTema
        }
    };
}

function agregarProductoAlCarrito(estado, nuevoProducto) {
    return {
        ...estado,
        // Genera nueva referencia de array concatenando de forma inmutable
        carrito: [...estado.carrito, nuevoProducto]
    };
}

function actualizarCantidadProducto(estado, indice, nuevaCantidad) {
    return {
        ...estado,
        carrito: estado.carrito.map((item, idx) => {
            if (idx !== indice) return item; // 4. Conserva la referencia exacta del objeto sin cambios
            return {
                ...item,
                cantidad: nuevaCantidad
            };
        })
    };
}

// Extensión obligatoria (Pista sin solución): Implementa una función reducer con acciones tipadas
const ACCIONES = {
    CAMBIAR_TEMA: "PREFERENCIAS/CAMBIAR_TEMA",
    AGREGAR_CARRITO: "CARRITO/AGREGAR_PRODUCTO"
};

function rootReducer(estado, accion) {
    // Regla técnica: Las funciones deben ser completamente deterministas
    switch (accion.type) {
        case ACCIONES.CAMBIAR_TEMA:
            return cambiarTema(estado, accion.payload);
        case ACCIONES.AGREGAR_CARRITO:
            return agregarProductoAlCarrito(estado, accion.payload);
        default:
            return estado;
    }
}

function iniciarLaboratorioInmutabilidad() {
    if (elConsola) elConsola.textContent = "=== Análisis de Mutación Estructural ===";

    // 5. Guarda varias versiones del estado de la aplicación
    const estadoV1 = estadoInicial;
    
    // Evolución de estado V2
    const estadoV2 = cambiarTema(estadoV1, "esmeralda");
    
    // Evolución de estado V3
    const estadoV3 = actualizarCantidadProducto(estadoV2, 0, 3);

    // 6. Compara referencias con === y documenta exhaustivamente los resultados
    logInmutable(`¿Es estadoV1 exactamente idéntico a estadoV2?: ${estadoV1 === estadoV2 ? "<span class='alerta'>SÍ</span>" : "<span class='exito'>NO (Éxito Inmutable)</span>"}`);
    
    // Regla técnica: No copies más niveles de los necesarios (Structural sharing)
    logInmutable(`¿Comparten la referencia del bloque 'usuario' V1 y V2?: ${estadoV1.usuario === estadoV2.usuario ? "<span class='exito'>SÍ (Ahorro de Memoria Óptimo)</span>" : "<span class='alerta'>NO</span>"}`);
    
    logInmutable(`¿Comparten el bloque de 'preferencias' V1 y V2?: ${estadoV1.preferencias === estadoV2.preferencias ? "<span class='alerta'>SÍ</span>" : "<span class='exito'>NO (Modificado Correctamente)</span>"}`);

    logInmutable(`\n¿Comparten la referencia del 'usuario' V2 y V3?: ${estadoV2.usuario === estadoV3.usuario ? "<span class='exito'>SÍ (Preservado)</span>" : "<span class='alerta'>NO</span>"}`);
    logInmutable(`¿Comparten el ítem index[1] del carrito V2 y V3?: ${estadoV2.carrito[1] === estadoV3.carrito[1] ? "<span class='exito'>SÍ (Nodo no alterado reutilizado por map)</span>" : "<span class='alerta'>NO</span>"}`);

    // Demostración del Reducer de la Extensión Estreha
    logInmutable(`\n=== 🌟 Ejecución del Reducer de Estado Tipado ===`);
    const estadoAccion = rootReducer(estadoV3, { 
        type: ACCIONES.AGREGAR_CARRITO, 
        payload: { producto: "Luces LED RGB de Escenario", precio: 75000, cantidad: 1 } 
    });
    
    logInmutable(`Cantidad de artículos finales en Carrito Reducer: <strong>${estadoAccion.carrito.length}</strong>`);
}

window.addEventListener("DOMContentLoaded", iniciarLaboratorioInmutabilidad);