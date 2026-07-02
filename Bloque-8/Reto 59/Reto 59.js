'use strict';

/**
 * RETO 59 · Explorador de la cadena de prototipos
 * ------------------------------------------------
 * Parte 1: objetos prototípicos puros (Object.create), sin `class`.
 * Parte 2 (extensión): la misma jerarquía usando función constructora + new.
 */

function separador(titulo) {
  console.log('\n' + '='.repeat(70));
  console.log(titulo);
  console.log('='.repeat(70));
}

// ===========================================================================
// PARTE 1: Objetos prototípicos con Object.create (sin `class`)
// ===========================================================================

// 1) Objeto base con un método `describir`.
const usuarioBase = {
  tipo: 'usuario',
  describir() {
    return `Soy ${this.nombre ?? 'un usuario sin nombre'} (${this.tipo}).`;
  },
};

// 2) Objetos creados con Object.create, con propiedades propias.
const usuarioEstandar = Object.create(usuarioBase);
usuarioEstandar.nombre = 'Ana';
usuarioEstandar.tipo = 'estándar';

const administrador = Object.create(usuarioBase);
administrador.nombre = 'Luis';
administrador.tipo = 'administrador';
administrador.permisos = ['crear', 'editar', 'borrar'];

// Un descendiente de segundo nivel: hereda de `administrador`,
// que a su vez hereda de `usuarioBase`.
const superAdministrador = Object.create(administrador);
superAdministrador.nombre = 'Marta';
superAdministrador.tipo = 'super-administrador';

// 5) Sobrescritura de `describir` SOLO en superAdministrador.
// Esto crea una propiedad propia que oculta (shadow) al método heredado,
// sin tocar `usuarioBase.describir` ni `administrador.describir`.
superAdministrador.describir = function describir() {
  return `⚡ ${this.nombre} tiene control TOTAL del sistema (${this.tipo}).`;
};

separador('Parte 1: uso básico de describir()');
console.log(usuarioEstandar.describir());
console.log(administrador.describir());
console.log(superAdministrador.describir());

// 3) hasOwn (propiedad propia) vs operador `in` (propia + heredada).
separador('Parte 1: propiedad propia (hasOwn) vs heredada (in)');

function inspeccionarPropiedad(obj, nombreObj, prop) {
  const esPropia = Object.hasOwn(obj, prop);
  const existeEnCadena = prop in obj;
  console.log(
    `${nombreObj}.${prop} -> Object.hasOwn: ${esPropia}` +
      `  |  '${prop}' in ${nombreObj}: ${existeEnCadena}` +
      (existeEnCadena && !esPropia ? '  (heredada)' : '')
  );
}

inspeccionarPropiedad(usuarioEstandar, 'usuarioEstandar', 'nombre');
inspeccionarPropiedad(usuarioEstandar, 'usuarioEstandar', 'describir');
inspeccionarPropiedad(administrador, 'administrador', 'permisos');
inspeccionarPropiedad(superAdministrador, 'superAdministrador', 'describir'); // ahora es propia
inspeccionarPropiedad(superAdministrador, 'superAdministrador', 'permisos'); // heredada de administrador
inspeccionarPropiedad(administrador, 'administrador', 'describir'); // sigue siendo heredada

// 4) Inspección de prototipos con Object.getPrototypeOf.
separador('Parte 1: Object.getPrototypeOf a lo largo de la cadena');

function nombrarPrototipo(proto) {
  if (proto === null) return 'null';
  if (proto === Object.prototype) return 'Object.prototype';
  if (proto === usuarioBase) return 'usuarioBase';
  if (proto === administrador) return 'administrador';
  return '(objeto desconocido)';
}

let actual = superAdministrador;
let nivel = 0;
while (actual !== null) {
  const proto = Object.getPrototypeOf(actual);
  console.log(
    `Nivel ${nivel}: getPrototypeOf(${nivel === 0 ? 'superAdministrador' : nombrarPrototipo(actual)}) -> ${nombrarPrototipo(proto)}`
  );
  actual = proto;
  nivel++;
}

// 6) Diagrama textual de la cadena de prototipos hasta null.
separador('Parte 1: diagrama de la cadena de prototipos');
console.log(`
superAdministrador  (propias: nombre, tipo, describir [sobrescrito])
        │
        ▼  [[Prototype]]
administrador       (propias: nombre, tipo, permisos)
        │
        ▼  [[Prototype]]
usuarioBase         (propias: tipo, describir)
        │
        ▼  [[Prototype]]
Object.prototype    (toString, hasOwnProperty, etc. — NO SE MODIFICA)
        │
        ▼  [[Prototype]]
null                (fin de la cadena)
`);

// Confirmación de que la sobrescritura NO afecta a los demás objetos.
separador('Parte 1: la sobrescritura solo afecta a superAdministrador');
console.log('administrador.describir === usuarioBase.describir ->',
  administrador.describir === usuarioBase.describir); // true, no fue sobrescrito
console.log('superAdministrador.describir === usuarioBase.describir ->',
  superAdministrador.describir === usuarioBase.describir); // false, propiedad propia
console.log('usuarioEstandar.describir() sigue usando el método base ->');
console.log('  ', usuarioEstandar.describir());

// Object.prototype no fue tocado.
separador('Parte 1: Object.prototype permanece intacto');
console.log('Object.prototype.describir ->', Object.prototype.describir); // undefined

// ===========================================================================
// PARTE 2 (Extensión): la misma jerarquía con función constructora + new
// ===========================================================================

separador('Parte 2 (extensión): función constructora + new');

function Usuario(nombre, tipo = 'usuario') {
  this.nombre = nombre;
  this.tipo = tipo;
}

// El método vive en el prototype de la función constructora,
// así todas las instancias lo comparten (no se duplica por instancia).
Usuario.prototype.describir = function describir() {
  return `Soy ${this.nombre} (${this.tipo}).`;
};

function Administrador(nombre, permisos = []) {
  // Reutiliza la lógica de inicialización de Usuario.
  Usuario.call(this, nombre, 'administrador');
  this.permisos = permisos;
}

// Enlaza la cadena de prototipos: Administrador.prototype -> Usuario.prototype
Administrador.prototype = Object.create(Usuario.prototype);
Administrador.prototype.constructor = Administrador;

const usuario1 = new Usuario('Sofía');
const admin1 = new Administrador('Pedro', ['crear', 'editar']);

// Sobrescritura del método SOLO en admin1 (propiedad propia de la instancia,
// no toca Administrador.prototype ni Usuario.prototype).
admin1.describir = function describir() {
  return `⚡ ${this.nombre} (instancia) anula el método heredado.`;
};

console.log(usuario1.describir());
console.log(admin1.describir());

const admin2 = new Administrador('Nora', ['ver']);
console.log('admin2 conserva el método heredado ->', admin2.describir());

separador('Parte 2: verificación de la cadena con new');
console.log('admin1 instanceof Administrador ->', admin1 instanceof Administrador);
console.log('admin1 instanceof Usuario       ->', admin1 instanceof Usuario);
console.log('Object.getPrototypeOf(admin1) === Administrador.prototype ->',
  Object.getPrototypeOf(admin1) === Administrador.prototype);
console.log('Object.getPrototypeOf(Administrador.prototype) === Usuario.prototype ->',
  Object.getPrototypeOf(Administrador.prototype) === Usuario.prototype);
console.log('Object.hasOwn(admin1, "describir") ->', Object.hasOwn(admin1, 'describir')); // true (sobrescrito en la instancia)
console.log('Object.hasOwn(admin2, "describir") ->', Object.hasOwn(admin2, 'describir')); // false (heredado)
console.log('"describir" in admin2 ->', 'describir' in admin2); // true (por la cadena)
