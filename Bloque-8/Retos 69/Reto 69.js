/**
 * Reto 69 · Validador de formatos colombianos
 * =============================================
 *
 * Valida tres formatos de un formulario:
 *   1. Correo electrónico básico
 *   2. Código interno tipo ABC-2026-001
 *   3. Número telefónico nacional (Colombia)
 *
 * Cada validador devuelve { valido: boolean, motivo: string } para que
 * el formulario pueda mostrar un mensaje de corrección al usuario.
 *
 * Diseño: cada patrón se arma a partir de fragmentos con nombre, en vez
 * de una sola expresión críptica, tal como pide la pista del reto.
 *
 * Ejecutar con: node validador_colombiano.js
 */

"use strict";

// ---------------------------------------------------------------------------
// 1) CORREO ELECTRÓNICO BÁSICO
// ---------------------------------------------------------------------------
// Reglas que decidimos exigir (documentadas también en el README):
//   - Parte local: 1 a 64 caracteres, letras/dígitos/._- , no puede empezar
//     ni terminar en un carácter especial.
//   - Dominio: una o más etiquetas separadas por punto, cada etiqueta de
//     1 a 63 caracteres alfanuméricos (con guiones permitidos en medio).
//   - TLD final: solo letras, 2 a 24 caracteres.
//   - Longitud total máxima: 254 caracteres (límite práctico de RFC 5321).
//
// NO intentamos cubrir todo lo que el RFC 5322 permite (comillas, IPs
// literales, comentarios, unicode, etc.). Ver "Limitaciones" en el README.

const LOCAL_PART = "[A-Za-z0-9](?:[A-Za-z0-9._-]{0,62}[A-Za-z0-9])?";
const DOMAIN_LABEL = "[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?";
const TLD = "[A-Za-z]{2,24}";

const EMAIL_REGEX = new RegExp(
  `^(?<local>${LOCAL_PART})@(?<domain>(?:${DOMAIN_LABEL}\\.)+(?<tld>${TLD}))$`
);

/**
 * @param {string} valor
 * @returns {{ valido: boolean, motivo: string }}
 */
function validarCorreo(valor) {
  if (typeof valor !== "string" || valor === "") {
    return { valido: false, motivo: "El correo no puede estar vacío." };
  }
  if (valor.length > 254) {
    return { valido: false, motivo: "El correo supera los 254 caracteres permitidos." };
  }
  if (!valor.includes("@")) {
    return { valido: false, motivo: "El correo debe contener un símbolo @." };
  }

  const arroba = valor.indexOf("@");
  const local = valor.slice(0, arroba);

  if (local.length > 64) {
    return { valido: false, motivo: "La parte antes del @ supera los 64 caracteres." };
  }
  if (local.includes("..")) {
    return { valido: false, motivo: "La parte local no puede tener puntos consecutivos." };
  }

  if (!EMAIL_REGEX.test(valor)) {
    return {
      valido: false,
      motivo:
        "Formato de correo inválido. Debe ser usuario@dominio.tld, " +
        "sin espacios ni caracteres especiales al inicio/fin.",
    };
  }
  return { valido: true, motivo: "Correo válido." };
}

// ---------------------------------------------------------------------------
// 2) CÓDIGO INTERNO  (ej. ABC-2026-001)
// ---------------------------------------------------------------------------
// Reglas:
//   - 3 letras mayúsculas (prefijo de área/proyecto).
//   - Guion.
//   - Año de 4 dígitos, entre 1900 y 2099.
//   - Guion.
//   - Consecutivo de 3 dígitos (000-999).
//   - Longitud total fija: 12 caracteres.

const PREFIJO = "[A-Z]{3}";
const ANIO = "(?:19|20)\\d{2}";
const CONSECUTIVO = "\\d{3}";

const CODIGO_REGEX = new RegExp(`^(?<prefijo>${PREFIJO})-(?<anio>${ANIO})-(?<consecutivo>${CONSECUTIVO})$`);

/**
 * @param {string} valor
 * @returns {{ valido: boolean, motivo: string }}
 */
function validarCodigo(valor) {
  if (typeof valor !== "string" || valor === "") {
    return { valido: false, motivo: "El código no puede estar vacío." };
  }
  if (valor.length !== 12) {
    return { valido: false, motivo: "El código debe tener exactamente 12 caracteres (AAA-YYYY-NNN)." };
  }

  if (!CODIGO_REGEX.test(valor)) {
    if (!/^[A-Z]{3}-/.test(valor)) {
      return { valido: false, motivo: "El código debe iniciar con 3 letras mayúsculas seguidas de un guion." };
    }
    if (!/^[A-Z]{3}-(19|20)\d{2}-/.test(valor)) {
      return { valido: false, motivo: "El año debe tener 4 dígitos entre 1900 y 2099." };
    }
    return { valido: false, motivo: "El consecutivo final debe ser de 3 dígitos (000-999)." };
  }
  return { valido: true, motivo: "Código válido." };
}

// ---------------------------------------------------------------------------
// 3) TELÉFONO NACIONAL (Colombia)
// ---------------------------------------------------------------------------
// Reglas:
//   - Prefijo internacional opcional: +57, 57, con o sin espacio/guion.
//   - Móvil: 10 dígitos que inician en 3.
//   - Fijo (esquema nacional vigente): 60 + código de ciudad (1-8) +
//     7 dígitos = 10 dígitos, ej. 601 7654321 (Bogotá).
//   - Se permiten espacios simples o guiones como separadores visuales,
//     que se eliminan antes de validar.

const PREFIJO_INTL = "(?:\\+?57[\\s-]?)?";
const MOVIL = "3\\d{9}";
const FIJO_NACIONAL = "60[1-8]\\d{7}";

const TELEFONO_REGEX = new RegExp(`^${PREFIJO_INTL}(?:${MOVIL}|${FIJO_NACIONAL})$`);

/**
 * @param {string} valor
 * @returns {{ valido: boolean, motivo: string }}
 */
function validarTelefono(valor) {
  if (typeof valor !== "string" || valor === "") {
    return { valido: false, motivo: "El teléfono no puede estar vacío." };
  }

  const limpio = valor.replace(/[ -]/g, "");
  if (limpio.length > 13) {
    // +57 + 10 dígitos
    return { valido: false, motivo: "El número tiene más dígitos de los esperados." };
  }

  if (!TELEFONO_REGEX.test(limpio)) {
    return {
      valido: false,
      motivo:
        "Formato inválido. Use un celular de 10 dígitos que inicie en 3, " +
        "o un fijo nacional de 10 dígitos que inicie en 60 (601-608), " +
        "con prefijo opcional +57.",
    };
  }
  return { valido: true, motivo: "Teléfono válido." };
}

const VALIDADORES = {
  correo: validarCorreo,
  codigo: validarCodigo,
  telefono: validarTelefono,
};

// ---------------------------------------------------------------------------
// TABLA DE CASOS DE PRUEBA
// ---------------------------------------------------------------------------

/** @typedef {{ formato: string, entrada: string, esperado: boolean, descripcion: string }} Caso */

/** @type {Caso[]} */
const CASOS = [
  // --- Correo ---
  { formato: "correo", entrada: "ana.gomez@example.com", esperado: true, descripcion: "correo simple válido" },
  { formato: "correo", entrada: "a@b.co", esperado: true, descripcion: "correo mínimo válido" },
  { formato: "correo", entrada: "usuario_01@sub.dominio.com.co", esperado: true, descripcion: "subdominios válidos" },
  { formato: "correo", entrada: "usuario@dominio", esperado: false, descripcion: "sin TLD" },
  { formato: "correo", entrada: "usuario..doble@dominio.com", esperado: false, descripcion: "puntos consecutivos" },
  { formato: "correo", entrada: "@dominio.com", esperado: false, descripcion: "sin parte local" },
  { formato: "correo", entrada: "usuario@dominio.com ", esperado: false, descripcion: "espacio final no permitido" },
  { formato: "correo", entrada: "usuario@-dominio.com", esperado: false, descripcion: "etiqueta de dominio inicia en guion" },

  // --- Código interno ---
  { formato: "codigo", entrada: "ABC-2026-001", esperado: true, descripcion: "código válido estándar" },
  { formato: "codigo", entrada: "XYZ-1999-999", esperado: true, descripcion: "año límite inferior válido" },
  { formato: "codigo", entrada: "QWE-2099-000", esperado: true, descripcion: "consecutivo en cero permitido" },
  { formato: "codigo", entrada: "abc-2026-001", esperado: false, descripcion: "minúsculas no permitidas" },
  { formato: "codigo", entrada: "ABCD-2026-001", esperado: false, descripcion: "prefijo de más de 3 letras" },
  { formato: "codigo", entrada: "ABC-2026-01", esperado: false, descripcion: "consecutivo con solo 2 dígitos" },
  { formato: "codigo", entrada: "ABC-1899-001", esperado: false, descripcion: "año fuera de rango" },
  { formato: "codigo", entrada: "ABC/2026/001", esperado: false, descripcion: "separador incorrecto" },

  // --- Teléfono ---
  { formato: "telefono", entrada: "3001234567", esperado: true, descripcion: "móvil nacional válido" },
  { formato: "telefono", entrada: "+57 3001234567", esperado: true, descripcion: "móvil con prefijo internacional" },
  { formato: "telefono", entrada: "57-3011234567", esperado: true, descripcion: "móvil con prefijo y guion" },
  { formato: "telefono", entrada: "6017654321", esperado: true, descripcion: "fijo nacional válido (Bogotá)" },
  { formato: "telefono", entrada: "2001234567", esperado: false, descripcion: "no inicia en 3 ni en 60" },
  { formato: "telefono", entrada: "300123456", esperado: false, descripcion: "móvil con solo 9 dígitos" },
  { formato: "telefono", entrada: "+573001234567890", esperado: false, descripcion: "demasiados dígitos" },
  { formato: "telefono", entrada: "609 1234567", esperado: false, descripcion: "código de ciudad fuera de 1-8" },
];

/**
 * @param {Caso[]} casos
 * @returns {{ aprobadas: number, total: number, fallidas: Caso[] }}
 */
function ejecutarPruebas(casos) {
  let aprobadas = 0;
  const fallidas = [];

  console.log(`${"FORMATO".padEnd(10)} ${"RESULTADO".padEnd(8)} ${"ENTRADA".padEnd(30)} MOTIVO`);
  console.log("-".repeat(95));

  for (const caso of casos) {
    const validador = VALIDADORES[caso.formato];
    const { valido, motivo } = validador(caso.entrada);
    const ok = valido === caso.esperado;
    if (ok) aprobadas++;
    else fallidas.push(caso);

    const estado = ok ? "OK" : "FALLO";
    console.log(`${caso.formato.padEnd(10)} ${estado.padEnd(8)} ${JSON.stringify(caso.entrada).padEnd(30)} ${motivo}`);
  }

  return { aprobadas, total: casos.length, fallidas };
}

// ---------------------------------------------------------------------------
// EXTENSIÓN: pruebas generativas simples con datos aleatorios válidos
// ---------------------------------------------------------------------------

function elegirAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function enteroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarCorreoValido() {
  const usuarios = ["ana", "carlos.perez", "maria_01", "j-lopez"];
  const dominios = ["example.com", "empresa.co", "mail.dominio.com.co"];
  return `${elegirAleatorio(usuarios)}@${elegirAleatorio(dominios)}`;
}

function generarCodigoValido() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let prefijo = "";
  for (let i = 0; i < 3; i++) {
    prefijo += letras[enteroAleatorio(0, letras.length - 1)];
  }
  const anio = enteroAleatorio(1900, 2099);
  const consecutivo = String(enteroAleatorio(0, 999)).padStart(3, "0");
  return `${prefijo}-${anio}-${consecutivo}`;
}

function generarTelefonoValido() {
  if (Math.random() < 0.5) {
    let resto = "3";
    for (let i = 0; i < 9; i++) resto += enteroAleatorio(0, 9);
    return resto;
  }
  const ciudad = enteroAleatorio(1, 8);
  let resto = "";
  for (let i = 0; i < 7; i++) resto += enteroAleatorio(0, 9);
  return `60${ciudad}${resto}`;
}

function pruebasGenerativas(n = 20) {
  const generadores = {
    correo: [generarCorreoValido, validarCorreo],
    codigo: [generarCodigoValido, validarCodigo],
    telefono: [generarTelefonoValido, validarTelefono],
  };

  let okTotal = 0;
  let total = 0;

  for (const [formato, [generar, validar]] of Object.entries(generadores)) {
    for (let i = 0; i < n; i++) {
      const dato = generar();
      const { valido, motivo } = validar(dato);
      total++;
      if (valido) {
        okTotal++;
      } else {
        console.log(`[generativo] ${formato} generó dato inválido inesperado: ${JSON.stringify(dato)} -> ${motivo}`);
      }
    }
  }

  return { okTotal, total };
}

// ---------------------------------------------------------------------------
// EJECUCIÓN PRINCIPAL
// ---------------------------------------------------------------------------

function main() {
  console.log("=== PRUEBAS FIJAS (tabla de casos) ===\n");
  const { aprobadas, total, fallidas } = ejecutarPruebas(CASOS);
  console.log(`\nResumen pruebas fijas: ${aprobadas}/${total} aprobadas.`);
  if (fallidas.length > 0) {
    console.log("Casos fallidos:");
    for (const c of fallidas) {
      console.log(`  - [${c.formato}] ${JSON.stringify(c.entrada)} (${c.descripcion})`);
    }
  }

  console.log("\n=== PRUEBAS GENERATIVAS (extensión) ===\n");
  const { okTotal, total: totalGen } = pruebasGenerativas(20);
  console.log(`Resumen pruebas generativas: ${okTotal}/${totalGen} datos aleatorios válidos aceptados.`);

  console.log("\n=== RESULTADO FINAL ===");
  console.log(`Fijas: ${aprobadas}/${total} | Generativas: ${okTotal}/${totalGen}`);
  if (aprobadas === total && okTotal === totalGen) {
    console.log("TODAS LAS PRUEBAS PASARON ✅");
  } else {
    console.log("HAY PRUEBAS FALLIDAS ❌");
  }
}

main();

module.exports = { validarCorreo, validarCodigo, validarTelefono };
