/**
 * Menú de soporte técnico
 * Tema 06 · Switch y operador ternario
 */

// ⭐ EXTENSIÓN: el menú está implementado como función reutilizable
function clasificarSolicitud(opcion, datoAdicional = null) {
  let area;
  let prioridad;
  let tiempoEstimado;
  let notaExtra = "";

  switch (opcion) {
    case 1: // Falla de hardware
      area = "Soporte técnico - Hardware";
      prioridad = "Alta";
      tiempoEstimado = "4 horas";
      break;

    case 2: // Falla de software
      area = "Soporte técnico - Software";
      prioridad = "Media";
      tiempoEstimado = "8 horas";
      break;

    case 3: // Problema de red
    case 4: // Problema de acceso/credenciales
      // Caso agrupado: mismo equipo atiende ambas solicitudes
      area = "Infraestructura y Accesos";
      prioridad = opcion === 4 ? "Alta" : "Media"; // ternario para matizar dentro del grupo
      tiempoEstimado = "6 horas";
      break;

    case 5: // Solicitud de facturación → requiere validación adicional
      if (datoAdicional === null || datoAdicional.trim() === "") {
        area = "Facturación";
        prioridad = "Media";
        tiempoEstimado = "No asignado";
        notaExtra = "⚠️ Falta el número de factura o referencia para continuar.";
      } else {
        area = "Facturación";
        prioridad = "Media";
        tiempoEstimado = "24 horas";
        notaExtra = `Referencia registrada: ${datoAdicional}`;
      }
      break;

    case 6: // Solicitud general / otros
      area = "Atención al cliente";
      prioridad = "Baja";
      tiempoEstimado = "48 horas";
      break;

    default:
      area = "No identificada";
      prioridad = "N/A";
      tiempoEstimado = "N/A";
      notaExtra = "⚠️ Opción fuera del menú (1-6). Por favor seleccione una opción válida.";
      break;
  }

  // Operador ternario: estado de la solicitud según si fue reconocida
  const estado = (opcion >= 1 && opcion <= 6) ? "Radicada" : "Rechazada";

  return { opcion, estado, area, prioridad, tiempoEstimado, notaExtra };
}

// ---------- PRESENTACIÓN ----------
function imprimirFicha(ficha) {
  console.log("===== FICHA DE RADICACIÓN =====");
  console.log(`Opción seleccionada : ${ficha.opcion}`);
  console.log(`Estado              : ${ficha.estado}`);
  console.log(`Área responsable    : ${ficha.area}`);
  console.log(`Prioridad           : ${ficha.prioridad}`);
  console.log(`Tiempo estimado     : ${ficha.tiempoEstimado}`);
  if (ficha.notaExtra !== "") {
    console.log(`Nota                : ${ficha.notaExtra}`);
  }
  console.log("================================\n");
}

// ---------- PRUEBAS (las seis opciones + una inválida) ----------
const pruebas = [
  { opcion: 1 },
  { opcion: 2 },
  { opcion: 3 },                          // agrupado con 4
  { opcion: 4 },                          // agrupado con 3
  { opcion: 5, dato: "" },                // requiere validación, sin dato
  { opcion: 5, dato: "FAC-2026-0098" },   // requiere validación, con dato
  { opcion: 6 },
  { opcion: 9 },                          // fuera de menú → default
];

pruebas.forEach(p => {
  const ficha = clasificarSolicitud(p.opcion, p.dato);
  imprimirFicha(ficha);
});