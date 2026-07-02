// Reto 59 - Herencia Prototípica pura sin uso sintáctico de "class"
"use strict";

const elOutput = document.querySelector("#consola-prototipos");
function volcarRastreo(mensaje) { if (elOutput) elOutput.textContent += `${mensaje}\n`; }

// 1. Crea un objeto base usuarioBase con un método describir
// Regla técnica: No uses class en la primera parte ni modifiques Object.prototype
const usuarioBase = {
    describir() {
        return `Perfil corporativo de: ${this.nombre || "Sin Asignar"} | Rol: ${this.rol || "Base"}`;
    }
};

// 2. Crea objetos mediante Object.create y añade propiedades propias
const usuarioAdministrador = Object.create(usuarioBase);
usuarioAdministrador.nombre = "Alejandro";
usuarioAdministrador.rol = "SuperAdministrador";
usuarioAdministrador.permisos = ["root", "database"];

// 5. Sobrescribe un método en un descendiente (Polimorfismo prototípico)
const usuarioInvitado = Object.create(usuarioBase);
usuarioInvitado.nombre = "Invitado Temporal";
usuarioInvitado.rol = "Invitado";
usuarioInvitado.describir = function() {
    return `[Acceso Restringido] Usuario: ${this.nombre}`;
};

function ejecutarInspeccionPrototipos() {
    // 3. Comprueba propiedades con Object.hasOwn y con el operador in
    volcarRastreo("=== Evaluación de Propiedades (hasOwn vs in) ===");
    
    // Propiedad propia
    volcarRastreo(`¿Tiene 'permisos' como propiedad PROPIA Administrador?: ${Object.hasOwn(usuarioAdministrador, "permisos")}`);
    
    // Propiedad heredada
    volcarRastreo(`¿Tiene 'describir' como propiedad PROPIA Administrador?: ${Object.hasOwn(usuarioAdministrador, "describir")}`);
    volcarRastreo(`¿Tiene 'describir' en su CADENA (in) Administrador?: ${"describir" in usuarioAdministrador}`);

    // 4. Inspecciona prototipos con Object.getPrototypeOf
    volcarRastreo("\n=== Verificación de Enlaces de Prototipos ===");
    const protoAdmin = Object.getPrototypeOf(usuarioAdministrador);
    volcarRastreo(`¿El prototipo de administrador es 'usuarioBase'?: ${protoAdmin === usuarioBase}`);

    // Demostrar el impacto de la sobrescritura del método
    volcarRastreo("\n=== Verificación de Sobrescrituras ===");
    volcarRastreo(`Admin (Hereda base): ${usuarioAdministrador.describir()}`);
    volcarRastreo(`Invitado (Sobrescrito): ${usuarioInvitado.describir()}`);

    // 6. Construye un diagrama textual de la cadena hasta null
    volcarRastreo("\n=== 🛠️ Diagrama Textual de la Cadena ===");
    let objetoActual = usuarioAdministrador;
    let nivel = 0;
    
    while (objetoActual !== null) {
        volcarRastreo(`[Nivel ${nivel}]: ${objetoActual === usuarioBase ? "usuarioBase" : objetoActual === Object.prototype ? "Object.prototype" : "Instancia/Objeto Creado"}`);
        objetoActual = Object.getPrototypeOf(objetoActual);
        nivel++;
    }
    volcarRastreo(`[Nivel ${nivel}]: null (Fin de la cadena)`);

    // Extensión obligatoria: Repite el ejercicio utilizando una función constructora y el operador new
    volcarRastreo("\n=== 🌟 Extensión: Equivalencia con Funciones Constructoras ===");
    
    function UsuarioConstructor(nombre, rol) {
        this.nombre = nombre;
        this.rol = rol;
    }
    // Asignación al prototipo compartido
    UsuarioConstructor.prototype.describir = function() {
        return `[Constructor] ${this.nombre} - ${this.rol}`;
    };

    const usuarioNuevoNew = new UsuarioConstructor("Diana", "Desarrolladora");
    volcarRastreo(usuarioNuevoNew.describir());
    volcarRastreo(`¿Prototipo correcto con new?: ${Object.getPrototypeOf(usuarioNuevoNew) === UsuarioConstructor.prototype}`);
}

window.addEventListener("DOMContentLoaded", ejecutarInspeccionPrototipos);