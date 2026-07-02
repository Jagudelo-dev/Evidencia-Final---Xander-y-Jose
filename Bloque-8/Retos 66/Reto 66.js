'use strict';

/**
 * RETO 66 · Control de sesiones y metadatos
 * ---------------------------------------------
 * Tres colecciones, tres ciclos de vida distintos:
 *
 *  - Set<string>            -> sesionesActivas: identificadores (strings)
 *    que deben ser únicos. Un Set de primitivos vive mientras el propio
 *    Set exista; no hay nada que "recolectar" antes de tiempo, así que un
 *    Set normal es la elección correcta (no WeakSet, que solo acepta
 *    objetos).
 *
 *  - WeakMap<objeto, metadatos> -> metadatos privados por componente.
 *    La clave es el objeto componente en sí. Si en algún momento nadie
 *    más referencia ese componente, el motor de JS puede liberar tanto el
 *    componente como su entrada en el WeakMap, sin que este archivo tenga
 *    que "avisar" o limpiar manualmente. Ideal para datos que solo tienen
 *    sentido mientras el objeto exista.
 *
 *  - WeakSet<objeto>        -> marca de "ya inicializado". Solo necesita
 *    responder sí/no a "¿este objeto ya pasó por aquí?", sin guardar datos
 *    adicionales ni impedir que el objeto se recolecte cuando ya no se
 *    use en ningún otro lugar del programa.
 */

// ===========================================================================
// 1) Set: identificadores únicos de sesiones activas
// ===========================================================================

const sesionesActivas = new Set();

/** Registra una sesión. Devuelve false si ya existía (Set elimina duplicados). */
function registrarSesion(idSesion) {
  if (sesionesActivas.has(idSesion)) {
    return false;
  }
  sesionesActivas.add(idSesion);
  return true;
}

function cerrarSesion(idSesion) {
  return sesionesActivas.delete(idSesion);
}

function contarSesionesActivas() {
  // Un Set normal SÍ permite conocer su tamaño: no es una colección débil.
  return sesionesActivas.size;
}

// ===========================================================================
// 2) Componentes simulados (objetos "normales" de la interfaz)
// ===========================================================================

function crearComponente(nombre) {
  // Un objeto simple; no necesita saber nada sobre metadatos ni WeakMaps.
  return { nombre };
}

// ===========================================================================
// 3) WeakMap: metadatos privados asociados a cada objeto componente
// ===========================================================================

// La clave DEBE ser un objeto (regla de WeakMap); por eso el metadato se
// asocia al propio componente, no a su nombre (string) ni a un id.
const metadatosComponentes = new WeakMap();

function asignarMetadatos(componente, metadatos) {
  if (typeof componente !== 'object' || componente === null) {
    throw new TypeError('La clave de un WeakMap debe ser un objeto.');
  }
  metadatosComponentes.set(componente, { ...metadatos, actualizadoEn: Date.now() });
}

function obtenerMetadatos(componente) {
  // .get() en una clave ausente devuelve undefined de forma segura,
  // sin lanzar error — no hace falta comprobar antes con has().
  return metadatosComponentes.get(componente);
}

// ===========================================================================
// 4) WeakSet: marca de componentes ya inicializados
// ===========================================================================

const componentesInicializados = new WeakSet();

/**
 * Inicializa un componente exactamente una vez. Si ya fue inicializado,
 * lanza un error en vez de repetir el trabajo o pisar sus metadatos.
 */
function inicializarComponente(componente, configuracion = {}) {
  if (componentesInicializados.has(componente)) {
    throw new Error(`El componente "${componente.nombre}" ya fue inicializado.`);
  }

  asignarMetadatos(componente, {
    nombre: componente.nombre,
    version: configuracion.version ?? '1.0.0',
    creadoEn: Date.now(),
  });
  componentesInicializados.add(componente);

  return obtenerMetadatos(componente);
}

function estaInicializado(componente) {
  return componentesInicializados.has(componente);
}

// ===========================================================================
// ⭐ Extensión: API que oculta completamente el WeakMap mediante closure
// ===========================================================================

/**
 * Fábrica que crea un "almacén de metadatos" totalmente encapsulado.
 * El WeakMap interno nunca se expone: solo se puede interactuar con él
 * a través de `asignar`, `obtener` y `tiene`. Nadie fuera de esta función
 * puede acceder al WeakMap en sí ni iterarlo.
 */
function crearAlmacenDeMetadatos() {
  const almacen = new WeakMap(); // privado: vive solo en este closure

  return Object.freeze({
    asignar(objeto, datos) {
      if (typeof objeto !== 'object' || objeto === null) {
        throw new TypeError('La clave debe ser un objeto.');
      }
      almacen.set(objeto, { ...datos });
      return true;
    },
    obtener(objeto) {
      return almacen.get(objeto);
    },
    tiene(objeto) {
      return almacen.has(objeto);
    },
    eliminar(objeto) {
      return almacen.delete(objeto);
    },
    // Nótese: NO existe ningún método `listar()` o `entradas()`.
    // Es intencional: ver la sección de documentación más abajo.
  });
}

// ===========================================================================
// Documentación en código: por qué WeakMap/WeakSet no pueden recorrerse
// ===========================================================================

/**
 * WeakMap y WeakSet NO implementan `size`, `keys()`, `values()`,
 * `entries()` ni son iterables con `for...of`. Esto no es una limitación
 * arbitraria: es lo que permite que sus claves sean "débiles".
 *
 * Si un componente ya no tiene ninguna otra referencia en el programa
 * (por ejemplo, se eliminó del DOM y ninguna variable lo apunta), el
 * recolector de basura debe poder liberar su memoria en cualquier
 * momento, incluida su entrada en el WeakMap/WeakSet — sin que el
 * programador tenga que borrarla a mano.
 *
 * Si se pudiera iterar (`for...of`, `.size`, etc.), el resultado
 * dependería de un detalle no determinista y no observable: el momento
 * exacto en que el recolector de basura decide actuar. Dos ejecuciones
 * "idénticas" del mismo programa podrían reportar tamaños o listas
 * distintas según cuándo corrió el GC. Por eso el estándar ECMAScript
 * directamente NO expone esa API: fuerza a que el único uso posible sea
 * "consultar por una clave que ya tengo en la mano" (`get`, `has`,
 * `set`, `delete`), nunca "dame todo lo que hay adentro".
 */

// ===========================================================================
// Demostración (se ejecuta solo si este archivo se corre directamente)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));

  separador('1) Set: sesionesActivas elimina duplicados');
  console.log('registrar "sesion-A" ->', registrarSesion('sesion-A')); // true
  console.log('registrar "sesion-B" ->', registrarSesion('sesion-B')); // true
  console.log('registrar "sesion-A" de nuevo ->', registrarSesion('sesion-A')); // false, duplicada
  console.log('total de sesiones activas ->', contarSesionesActivas()); // 2
  console.log('cerrar "sesion-B" ->', cerrarSesion('sesion-B'));
  console.log('total tras cerrar una ->', contarSesionesActivas()); // 1

  separador('2) Componentes simulados');
  const header = crearComponente('Header');
  const footer = crearComponente('Footer');
  const sidebar = crearComponente('Sidebar');
  console.log(header, footer, sidebar);

  separador('3) WeakMap: cada objeto recupera su propio metadato');
  asignarMetadatos(header, { rol: 'navegación', prioridad: 'alta' });
  asignarMetadatos(footer, { rol: 'información legal', prioridad: 'baja' });
  console.log('metadatos de header ->', obtenerMetadatos(header));
  console.log('metadatos de footer ->', obtenerMetadatos(footer));
  console.log('metadatos de sidebar (nunca asignados) ->', obtenerMetadatos(sidebar)); // undefined, sin error

  separador('4) WeakSet: marcar inicialización y evitar duplicados');
  console.log('¿header inicializado antes? ->', estaInicializado(header)); // false
  console.log(inicializarComponente(header, { version: '2.1.0' }));
  console.log('¿header inicializado después? ->', estaInicializado(header)); // true

  try {
    inicializarComponente(header); // segunda vez: debe fallar
  } catch (err) {
    console.log('Error esperado ->', err.message);
  }

  console.log(inicializarComponente(sidebar)); // primera vez: funciona normal

  separador('5) Metadatos siguen siendo privados por objeto (no se mezclan)');
  console.log('header.rol  ->', obtenerMetadatos(header).rol);
  console.log('sidebar.nombre en sus metadatos ->', obtenerMetadatos(sidebar).nombre);
  console.log('El objeto "header" NO expone sus metadatos como propiedad ->', header.metadatos);

  separador('6) Extensión: API que oculta el WeakMap con closure');
  const almacenPrivado = crearAlmacenDeMetadatos();
  const widget = crearComponente('Widget');

  almacenPrivado.asignar(widget, { color: 'azul', visible: true });
  console.log('almacenPrivado.obtener(widget) ->', almacenPrivado.obtener(widget));
  console.log('almacenPrivado.tiene(widget)   ->', almacenPrivado.tiene(widget));
  console.log(
    '¿El WeakMap interno es accesible desde fuera? ->',
    Object.keys(almacenPrivado).includes('almacen') // false: no existe esa propiedad
  );
  console.log('Métodos expuestos por el almacén ->', Object.keys(almacenPrivado));

  separador('7) Por qué WeakMap/WeakSet no se pueden recorrer (ver comentario en el código fuente)');
  console.log('metadatosComponentes.size ->', metadatosComponentes.size); // undefined
  console.log('componentesInicializados.size ->', componentesInicializados.size); // undefined
  console.log(
    'typeof metadatosComponentes.entries ->',
    typeof metadatosComponentes.entries
  ); // undefined: el método no existe
}

module.exports = {
  sesionesActivas,
  registrarSesion,
  cerrarSesion,
  contarSesionesActivas,
  crearComponente,
  asignarMetadatos,
  obtenerMetadatos,
  inicializarComponente,
  estaInicializado,
  crearAlmacenDeMetadatos,
};
