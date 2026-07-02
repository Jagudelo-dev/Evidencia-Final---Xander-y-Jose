'use strict';

const {
  crearCapacidadHablar,
  crearRobotMensajero,
  crearRobotCarga,
  agregarCapacidad,
} = require('./robots');

function separador(titulo) {
  console.log('\n' + '='.repeat(70));
  console.log(titulo);
  console.log('='.repeat(70));
}

// ---------------------------------------------------------------------------
separador('1) Composición de robotMensajero y robotCarga');
// ---------------------------------------------------------------------------
const mensajero = crearRobotMensajero('R2-Fast');
const cargador = crearRobotCarga('Mule-9', 150);

console.log('mensajero:', mensajero.nombre, `(${mensajero.tipo})`);
console.log('cargador :', cargador.nombre, `(${cargador.tipo})`);

// ---------------------------------------------------------------------------
separador('2) APIs distintas: cada robot solo tiene lo que necesita');
// ---------------------------------------------------------------------------
console.log('mensajero tiene hablar()      ->', typeof mensajero.hablar === 'function');
console.log('mensajero tiene cargarObjeto()->', typeof mensajero.cargarObjeto === 'function');
console.log('cargador  tiene hablar()      ->', typeof cargador.hablar === 'function');
console.log('cargador  tiene cargarObjeto()->', typeof cargador.cargarObjeto === 'function');

// ---------------------------------------------------------------------------
separador('3) Capacidades compartidas: mover() y registrarEstado()');
// ---------------------------------------------------------------------------
console.log(mensajero.registrarEstado('Iniciando ruta de entrega'));
console.log(mensajero.mover(2, 3));
console.log('Posición mensajero:', mensajero.obtenerPosicion());

console.log(cargador.registrarEstado('Iniciando ruta de transporte'));
console.log(cargador.mover(2, 3)); // misma función mover(), distinta velocidad interna
console.log('Posición cargador:', cargador.obtenerPosicion());

// ---------------------------------------------------------------------------
separador('4) Capacidades exclusivas de cada robot');
// ---------------------------------------------------------------------------
console.log(mensajero.hablar('¡Paquete en camino!'));
console.log(mensajero.registrarEstado(`Dijo: "${mensajero.ultimoMensajeDicho()}"`));

console.log(cargador.cargarObjeto('Caja de tornillos', 40));
console.log(cargador.cargarObjeto('Motor de repuesto', 90));
console.log(cargador.registrarEstado('Carga completa, iniciando transporte'));

try {
  cargador.cargarObjeto('Bloque de hormigón', 100); // excede la capacidad restante
} catch (err) {
  console.log('Error esperado ->', err.message);
}

// ---------------------------------------------------------------------------
separador('5) El estado permanece encapsulado (closures, no propiedades globales)');
// ---------------------------------------------------------------------------
console.log('mensajero no expone "posicion" directamente ->', mensajero.posicion === undefined);
console.log('cargador no expone "carga" directamente     ->', cargador.carga === undefined);
console.log('obtenerCarga() sí expone una copia segura   ->', cargador.obtenerCarga());

// Cada robot tiene su propio estado, aunque comparten la misma fábrica de capacidad.
const mensajero2 = crearRobotMensajero('R2-Slow');
mensajero.mover(5, 5);
console.log('mensajero  (movido):', mensajero.obtenerPosicion());
console.log('mensajero2 (sin mover):', mensajero2.obtenerPosicion());

// ---------------------------------------------------------------------------
separador('6) Extensión: añadir una capacidad en tiempo de ejecución');
// ---------------------------------------------------------------------------
console.log('¿cargador puede hablar antes? ->', typeof cargador.hablar === 'function');

agregarCapacidad(cargador, crearCapacidadHablar({ voz: 'grave e industrial' }));
console.log('¿cargador puede hablar ahora? ->', typeof cargador.hablar === 'function');
console.log(cargador.hablar('Entrega completada.'));
console.log(cargador.registrarEstado(`Dijo: "${cargador.ultimoMensajeDicho()}"`));

// El mensajero sigue sin verse afectado: la capacidad se agregó solo a `cargador`.
console.log('mensajero2 (no afectado) sigue teniendo hablar propio ->',
  typeof mensajero2.hablar === 'function');

// ---------------------------------------------------------------------------
separador('7) Historiales independientes de cada robot');
// ---------------------------------------------------------------------------
console.log('Historial mensajero:', mensajero.obtenerHistorial());
console.log('Historial cargador :', cargador.obtenerHistorial());

// ---------------------------------------------------------------------------
separador('8) Reflexión: composición vs jerarquía de clases');
// ---------------------------------------------------------------------------
console.log(`
Con una jerarquía de clases (RobotBase -> RobotMensajero / RobotCarga),
si más adelante aparece un "RobotCargaParlante" (carga + habla), habría
que elegir entre duplicar código, crear una clase intermedia artificial,
o recurrir a herencia múltiple (que JS no soporta con class).

Con composición:
  - Cada capacidad (mover, hablar, cargar, registrarEstado) es un bloque
    independiente y reutilizable, sin relación "es un tipo de" entre ellas.
  - Un robot nuevo simplemente combina las capacidades que necesita
    (Object.assign), sin heredar cosas que no le sirven.
  - El estado de cada capacidad vive en su propio closure, así que no hay
    colisiones de nombres ni un "this" compartido frágil entre capacidades.
  - Se puede añadir una capacidad a un robot YA CREADO (ver punto 6),
    algo que la herencia clásica no permite sin reestructurar clases.

Límite honesto de la composición: al no haber una jerarquía explícita,
es responsabilidad del programador documentar qué combinaciones de
capacidades tienen sentido (por ejemplo, nada impide crear un robot con
cargarObjeto() pero sin mover(), aunque conceptualmente sea raro). En una
jerarquía de clases, el compilador/runtime impone más esa estructura.
`);
