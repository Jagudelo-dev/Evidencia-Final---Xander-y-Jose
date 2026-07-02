'use strict';

/**
 * RETO 62 · Pipeline de validación
 * ----------------------------------
 * Cada "generador" (requerido, longitudMinima, cumplePatron) es una función
 * de orden superior: recibe configuración (mensaje, límites, patrón) y
 * DEVUELVE una función validadora ya configurada, que cierra sobre esos
 * parámetros por closure. Los validadores nunca mutan el valor recibido;
 * solo lo leen y devuelven `null` (válido) o un string de error.
 *
 * componerValidadores(...validadores) combina cualquier cantidad de
 * validadores en uno solo que acumula todos los mensajes de error.
 * Soporta validadores síncronos y asíncronos de forma transparente:
 * si ninguno es async, devuelve el arreglo de errores directamente;
 * si alguno devuelve una Promise, devuelve una Promise con el arreglo
 * final. La API pública (misma firma de llamada) no cambia en ningún caso.
 */

// ===========================================================================
// Generadores de validadores (funciones de orden superior)
// ===========================================================================

/**
 * Exige que el valor no esté vacío.
 */
function requerido(mensaje = 'Este campo es obligatorio.') {
  return function validadorRequerido(valor) {
    const vacio =
      valor === undefined ||
      valor === null ||
      (typeof valor === 'string' && valor.trim() === '');
    return vacio ? mensaje : null;
  };
}

/**
 * Exige una longitud mínima de caracteres.
 */
function longitudMinima(minimo, mensaje = `Debe tener al menos ${minimo} caracteres.`) {
  return function validadorLongitudMinima(valor) {
    const texto = valor ?? '';
    return String(texto).length >= minimo ? null : mensaje;
  };
}

/**
 * Exige que el valor cumpla una expresión regular.
 */
function cumplePatron(patron, mensaje = 'El formato no es válido.') {
  return function validadorPatron(valor) {
    const texto = valor ?? '';
    return patron.test(String(texto)) ? null : mensaje;
  };
}

// ---------------------------------------------------------------------------
// ⭐ Extensión: generador de validador ASÍNCRONO, misma "forma" de uso.
// Ejemplo: comprobar contra un servicio externo (aquí simulado).
// ---------------------------------------------------------------------------

/**
 * Genera un validador async que consulta `verificarFn(valor)` (que debe
 * devolver una Promise<boolean> => true significa "disponible/válido").
 */
function noExisteEn(verificarFn, mensaje = 'El valor ya está en uso.') {
  return async function validadorAsincrono(valor) {
    const disponible = await verificarFn(valor);
    return disponible ? null : mensaje;
  };
}

// ===========================================================================
// Combinador: componerValidadores(...validadores)
// ===========================================================================

function esPromesa(valor) {
  return valor !== null && typeof valor === 'object' && typeof valor.then === 'function';
}

/**
 * Combina cualquier cantidad de validadores en una sola función que,
 * al llamarse con un valor, ejecuta todos y acumula los mensajes de error
 * (ignorando los `null`). Detecta automáticamente si hubo validadores
 * asíncronos entre ellos:
 *   - Si todos son síncronos -> devuelve string[] directamente.
 *   - Si alguno es asíncrono -> devuelve Promise<string[]>.
 * La firma de llamada (`validador(valor)`) es siempre la misma.
 */
function componerValidadores(...validadores) {
  return function validadorCompuesto(valor) {
    const resultados = validadores.map((validar) => validar(valor));

    if (resultados.some(esPromesa)) {
      return Promise.all(resultados).then((resueltos) => resueltos.filter(Boolean));
    }
    return resultados.filter(Boolean);
  };
}

// ===========================================================================
// Pipeline declarativo para un formulario (nombre, correo, contraseña)
// ===========================================================================

const validarNombre = componerValidadores(
  requerido('El nombre es obligatorio.'),
  longitudMinima(2, 'El nombre debe tener al menos 2 caracteres.')
);

const validarCorreo = componerValidadores(
  requerido('El correo es obligatorio.'),
  cumplePatron(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo no tiene un formato válido.')
);

const validarContrasena = componerValidadores(
  requerido('La contraseña es obligatoria.'),
  longitudMinima(8, 'La contraseña debe tener al menos 8 caracteres.'),
  cumplePatron(/[0-9]/, 'La contraseña debe incluir al menos un número.')
);

// Esquema declarativo: campo -> validador compuesto para ese campo.
const esquemaRegistro = {
  nombre: validarNombre,
  correo: validarCorreo,
  contrasena: validarContrasena,
};

/**
 * Ejecuta un esquema de validadores sobre un objeto de datos y reúne
 * los mensajes de error por campo. No modifica `datos`.
 * Soporta esquemas con validadores async: si algún campo devuelve una
 * Promise, la función completa devuelve una Promise<resultado>.
 */
function validarFormulario(datos, esquema) {
  const entradas = Object.entries(esquema).map(([campo, validador]) => [
    campo,
    validador(datos[campo]),
  ]);

  const hayAsincronos = entradas.some(([, resultado]) => esPromesa(resultado));

  const construirResultado = (entradasResueltas) => {
    const errores = {};
    for (const [campo, mensajes] of entradasResueltas) {
      if (mensajes.length > 0) errores[campo] = mensajes;
    }
    return { esValido: Object.keys(errores).length === 0, errores };
  };

  if (!hayAsincronos) {
    return construirResultado(entradas);
  }

  return Promise.all(
    entradas.map(async ([campo, resultado]) => [campo, await resultado])
  ).then(construirResultado);
}

// ===========================================================================
// Demostración (se ejecuta solo si este archivo se corre directamente)
// ===========================================================================

if (require.main === module) {
  const separador = (t) => console.log('\n' + '='.repeat(70) + `\n${t}\n` + '='.repeat(70));

  separador('1) Reutilización: los mismos generadores arman distintos campos');
  console.log('validarNombre es función ->', typeof validarNombre === 'function');
  console.log('validarCorreo es función ->', typeof validarCorreo === 'function');

  separador('2) Datos inválidos: se acumulan varios mensajes por campo');
  const datosInvalidos = { nombre: '', correo: 'no-es-correo', contrasena: '123' };
  const resultadoInvalido = validarFormulario(datosInvalidos, esquemaRegistro);
  console.log(JSON.stringify(resultadoInvalido, null, 2));
  console.log('datosInvalidos no fue mutado ->', datosInvalidos);

  separador('3) Datos válidos: sin errores');
  const datosValidos = { nombre: 'Ana', correo: 'ana@correo.com', contrasena: 'clave1234' };
  const resultadoValido = validarFormulario(datosValidos, esquemaRegistro);
  console.log(JSON.stringify(resultadoValido, null, 2));

  separador('4) Pipeline reutilizado en otro formulario distinto, sin tocar los validadores base');
  const validarApodo = componerValidadores(longitudMinima(3, 'El apodo debe tener 3+ caracteres.'));
  console.log('apodo "Al" ->', validarApodo('Al'));
  console.log('apodo "Alex" ->', validarApodo('Alex'));
  console.log('validarNombre sigue intacto ->', validarNombre(''));

  separador('5) Extensión: validador asíncrono sin romper la API pública');
  const correosOcupados = new Set(['ana@correo.com']);
  const verificarCorreoDisponible = (correo) =>
    new Promise((resolve) => setTimeout(() => resolve(!correosOcupados.has(correo)), 20));

  const validarCorreoUnico = componerValidadores(
    requerido('El correo es obligatorio.'),
    cumplePatron(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo no tiene un formato válido.'),
    noExisteEn(verificarCorreoDisponible, 'Ese correo ya está registrado.')
  );

  const esquemaConAsync = { correo: validarCorreoUnico };

  (async () => {
    const resOcupado = await validarFormulario({ correo: 'ana@correo.com' }, esquemaConAsync);
    console.log('correo ocupado ->', resOcupado);

    const resLibre = await validarFormulario({ correo: 'nueva@correo.com' }, esquemaConAsync);
    console.log('correo libre   ->', resLibre);
  })();
}

module.exports = {
  requerido,
  longitudMinima,
  cumplePatron,
  noExisteEn,
  componerValidadores,
  validarFormulario,
  esquemaRegistro,
};
