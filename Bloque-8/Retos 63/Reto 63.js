'use strict';

/**
 * RETO 63 · Actualizador inmutable de estado
 * ---------------------------------------------
 * Estado con tres secciones: usuario, carrito, preferencias.
 * Cada función de actualización sigue la misma idea:
 *   "copia el camino desde la raíz hasta el dato modificado,
 *    reutiliza (por referencia) todo lo que no cambió".
 * Nunca se usa push/splice/asignación directa sobre el estado recibido;
 * siempre se construyen objetos/arreglos nuevos con spread o map/filter.
 */

// ===========================================================================
// Estado inicial
// ===========================================================================

const estadoInicial = Object.freeze({
  usuario: Object.freeze({
    id: 'u1',
    nombre: 'Ana',
    sesionIniciada: true,
  }),
  carrito: Object.freeze({
    items: Object.freeze([]),
  }),
  preferencias: Object.freeze({
    tema: 'claro',
    idioma: 'es',
  }),
});

// ===========================================================================
// Funciones de actualización (puras, deterministas)
// ===========================================================================

/**
 * Cambia el tema. Solo se copian `estado` y `estado.preferencias`;
 * `usuario` y `carrito` conservan exactamente la misma referencia
 * porque no fueron tocados.
 */
function cambiarTema(estado, tema) {
  return {
    ...estado,
    preferencias: {
      ...estado.preferencias,
      tema,
    },
  };
}

/**
 * Agrega un producto al carrito. Si ya existe (mismo id), incrementa su
 * cantidad; si no, lo añade al final. Se copian `estado`, `carrito` y
 * `carrito.items`; los ítems NO modificados conservan su referencia
 * original dentro del nuevo arreglo (solo se crea un objeto nuevo para
 * el ítem que cambió o se agregó).
 */
function agregarProducto(estado, producto, cantidad = 1) {
  const yaExiste = estado.carrito.items.some((item) => item.id === producto.id);

  const nuevosItems = yaExiste
    ? estado.carrito.items.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      )
    : [...estado.carrito.items, { ...producto, cantidad }];

  return {
    ...estado,
    carrito: {
      ...estado.carrito,
      items: nuevosItems,
    },
  };
}

/**
 * Actualiza la cantidad de un producto ya existente en el carrito.
 * Misma idea: solo el ítem afectado es un objeto nuevo; el resto de
 * ítems del arreglo conserva su referencia.
 */
function actualizarCantidad(estado, productoId, cantidad) {
  if (cantidad < 0) {
    throw new RangeError('La cantidad no puede ser negativa.');
  }

  const nuevosItems = estado.carrito.items
    .map((item) => (item.id === productoId ? { ...item, cantidad } : item))
    // cantidad 0 => se elimina del carrito (sin usar splice, con filter)
    .filter((item) => item.cantidad > 0);

  return {
    ...estado,
    carrito: {
      ...estado.carrito,
      items: nuevosItems,
    },
  };
}

/**
 * Cambia datos del usuario (por ejemplo cerrar sesión). Solo copia
 * `estado` y `usuario`; `carrito` y `preferencias` conservan referencia.
 */
function actualizarUsuario(estado, cambios) {
  return {
    ...estado,
    usuario: {
      ...estado.usuario,
      ...cambios,
    },
  };
}

// ===========================================================================
// ⭐ Extensión: reducer con acciones tipadas por cadenas constantes
// ===========================================================================

const TIPOS_ACCION = Object.freeze({
  CAMBIAR_TEMA: 'CAMBIAR_TEMA',
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  ACTUALIZAR_CANTIDAD: 'ACTUALIZAR_CANTIDAD',
  ACTUALIZAR_USUARIO: 'ACTUALIZAR_USUARIO',
});

/**
 * reducer(estado, accion) -> nuevo estado.
 * Delega en las mismas funciones puras de arriba: el reducer no
 * duplica lógica, solo enruta según `accion.type`.
 */
function reducer(estado, accion) {
  switch (accion.type) {
    case TIPOS_ACCION.CAMBIAR_TEMA:
      return cambiarTema(estado, accion.payload.tema);

    case TIPOS_ACCION.AGREGAR_PRODUCTO:
      return agregarProducto(estado, accion.payload.producto, accion.payload.cantidad ?? 1);

    case TIPOS_ACCION.ACTUALIZAR_CANTIDAD:
      return actualizarCantidad(estado, accion.payload.productoId, accion.payload.cantidad);

    case TIPOS_ACCION.ACTUALIZAR_USUARIO:
      return actualizarUsuario(estado, accion.payload.cambios);

    default:
      // Acción desconocida: se devuelve el mismo estado (misma referencia),
      // comportamiento estándar de un reducer.
      return estado;
  }
}

// ===========================================================================
// Demostración (se ejecuta solo si este archivo se corre directamente)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));

  separador('1) Estado inicial');
  console.log(estadoInicial);

  separador('2) cambiarTema: solo cambia "preferencias"');
  const v1 = cambiarTema(estadoInicial, 'oscuro');
  console.log('v1.preferencias.tema ->', v1.preferencias.tema);
  console.log('v1 !== estadoInicial              ->', v1 !== estadoInicial);
  console.log('v1.preferencias !== estadoInicial.preferencias ->',
    v1.preferencias !== estadoInicial.preferencias);
  console.log('v1.usuario === estadoInicial.usuario  (reutilizado) ->',
    v1.usuario === estadoInicial.usuario);
  console.log('v1.carrito === estadoInicial.carrito  (reutilizado) ->',
    v1.carrito === estadoInicial.carrito);

  separador('3) agregarProducto: solo cambia "carrito"');
  const v2 = agregarProducto(v1, { id: 'p1', nombre: 'Teclado', precio: 50 });
  console.log('v2.carrito.items ->', v2.carrito.items);
  console.log('v2 !== v1                          ->', v2 !== v1);
  console.log('v2.carrito !== v1.carrito           ->', v2.carrito !== v1.carrito);
  console.log('v2.preferencias === v1.preferencias (reutilizado) ->',
    v2.preferencias === v1.preferencias);
  console.log('v2.usuario === v1.usuario           (reutilizado) ->',
    v2.usuario === v1.usuario);

  separador('4) agregarProducto de nuevo: ítems no tocados conservan referencia');
  const v3 = agregarProducto(v2, { id: 'p2', nombre: 'Mouse', precio: 20 });
  console.log('v3.carrito.items ->', v3.carrito.items);
  console.log('El ítem "Teclado" es el MISMO objeto en v2 y v3 ->',
    v2.carrito.items[0] === v3.carrito.items[0]);

  separador('5) actualizarCantidad: solo el ítem afectado cambia');
  const v4 = actualizarCantidad(v3, 'p1', 5);
  console.log('v4.carrito.items ->', v4.carrito.items);
  console.log('Ítem "Teclado" es un objeto NUEVO (cambió) ->',
    v4.carrito.items[0] !== v3.carrito.items[0]);
  console.log('Ítem "Mouse" es el MISMO objeto (no cambió) ->',
    v4.carrito.items[1] === v3.carrito.items[1]);

  separador('6) Las versiones anteriores permanecen intactas');
  console.log('estadoInicial.carrito.items.length ->', estadoInicial.carrito.items.length); // 0
  console.log('v1.carrito.items.length            ->', v1.carrito.items.length); // 0
  console.log('v2.carrito.items.length            ->', v2.carrito.items.length); // 1
  console.log('v3.carrito.items.length            ->', v3.carrito.items.length); // 2
  console.log('v4.carrito.items[0].cantidad       ->', v4.carrito.items[0].cantidad); // 5
  console.log('v3.carrito.items[0].cantidad (sin tocar) ->', v3.carrito.items[0].cantidad); // 1

  separador('7) Extensión: reducer con acciones tipadas');
  const v5 = reducer(v4, {
    type: TIPOS_ACCION.ACTUALIZAR_CANTIDAD,
    payload: { productoId: 'p2', cantidad: 0 }, // 0 => se elimina del carrito
  });
  console.log('v5.carrito.items (mouse eliminado) ->', v5.carrito.items);

  const v6 = reducer(v5, {
    type: TIPOS_ACCION.CAMBIAR_TEMA,
    payload: { tema: 'claro' },
  });
  console.log('v6.preferencias.tema ->', v6.preferencias.tema);

  const v7 = reducer(v6, { type: 'ACCION_DESCONOCIDA' });
  console.log('acción desconocida devuelve la MISMA referencia ->', v7 === v6);

  separador('8) Resumen de comparaciones === (documentación de identidad)');
  console.table([
    { comparación: 'estadoInicial === v1', resultado: estadoInicial === v1 },
    { comparación: 'v1.usuario === estadoInicial.usuario', resultado: v1.usuario === estadoInicial.usuario },
    { comparación: 'v2.preferencias === v1.preferencias', resultado: v2.preferencias === v1.preferencias },
    { comparación: 'v3.carrito.items[0] === v2.carrito.items[0]', resultado: v3.carrito.items[0] === v2.carrito.items[0] },
    { comparación: 'v4.carrito.items[0] === v3.carrito.items[0]', resultado: v4.carrito.items[0] === v3.carrito.items[0] },
    { comparación: 'v4.carrito.items[1] === v3.carrito.items[1]', resultado: v4.carrito.items[1] === v3.carrito.items[1] },
  ]);
}

module.exports = {
  estadoInicial,
  cambiarTema,
  agregarProducto,
  actualizarCantidad,
  actualizarUsuario,
  reducer,
  TIPOS_ACCION,
};
