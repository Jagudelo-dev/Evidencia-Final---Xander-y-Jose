/*
 * Reto 07 - Generador de credenciales
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const nombreCompleto = "   JOSE   MIGUEL   agudelo  torres   ";
const codigoEstudiante = "2026100458";

const nombreLimpio = nombreCompleto.trim();
const nombreNormalizado = nombreLimpio.replace(/\s+/g, " ");
const palabras = nombreNormalizado.split(" ");

const primerNombre = palabras[0].charAt(0).toUpperCase() + palabras[0].slice(1).toLowerCase();
const primerApellido = palabras[palabras.length - 1].charAt(0).toUpperCase() + 
                       palabras[palabras.length - 1].slice(1).toLowerCase();

const correoBase = nombreNormalizado
  .toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/\s+/g, ".");
const correo = `${correoBase}@universidad.edu.co`;

const inicial = primerNombre.charAt(0).toLowerCase();
const apellidoLower = primerApellido.toLowerCase();
const ultimosDigitos = codigoEstudiante.slice(-4);
const usuario = `${inicial}${apellidoLower}${ultimosDigitos}`;

const credencial = `
╔══════════════════════════════════╗
║     CREDENCIAL UNIVERSITARIA     ║
╠══════════════════════════════════╣
║  Nombre: ${primerNombre} ${primerApellido}
║  Usuario: ${usuario}
║  Correo:  ${correo}
║  Código:  ${codigoEstudiante}
╚══════════════════════════════════╝
`;

console.log(credencial);