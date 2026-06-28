/**
 * Cotizador de envíos
 * Tema 05 · Condicionales if, else if y else
 */

// ---------- CÁLCULO (separado de la presentación) ----------
function calcularCotizacion(ciudadDestino, pesoKg, tipoEntrega, esMiembro, ciudadPrincipal = "Bogotá", fecha = new Date()) {

  // Validaciones de datos
  const tiposValidos = ["estandar", "urgente"];
  const datosValidos =
    typeof ciudadDestino === "string" && ciudadDestino.trim() !== "" &&
    pesoKg > 0 &&
    tiposValidos.includes(tipoEntrega) &&
    typeof esMiembro === "boolean";

  if (!datosValidos) {
    return { valido: false, mensaje: "Dato inválido: revisa ciudad, peso (>0), tipo de entrega (estandar/urgente) o membresía." };
  }

  const desglose = [];
  let total = 0;

  // 1. Tarifa base según destino
  let tarifaBase;
  if (ciudadDestino.toLowerCase() === ciudadPrincipal.toLowerCase()) {
    tarifaBase = 8000; // ciudad principal
  } else {
    tarifaBase = 15000; // destino externo
  }
  total += tarifaBase;
  desglose.push({ concepto: `Tarifa base (${ciudadDestino})`, valor: tarifaBase });

  // 2. Recargo por peso (dos límites, se acumulan si aplica)
  let recargoPeso = 0;
  if (pesoKg > 5 && pesoKg <= 15) {
    recargoPeso = 4000;
  } else if (pesoKg > 15) {
    recargoPeso = 9000;
  }
  if (recargoPeso > 0) {
    total += recargoPeso;
    desglose.push({ concepto: `Recargo por peso (${pesoKg} kg)`, valor: recargoPeso });
  }

  // 3. Recargo por entrega urgente (se acumula, no reemplaza)
  if (tipoEntrega === "urgente") {
    const recargoUrgencia = 6000;
    total += recargoUrgencia;
    desglose.push({ concepto: "Recargo por entrega urgente", valor: recargoUrgencia });
  }

  // ⭐ EXTENSIÓN: promoción de fin de semana
  const dia = fecha.getDay(); // 0 = domingo, 6 = sábado
  if (dia === 0 || dia === 6) {
    const descuentoFinDeSemana = Math.round(total * 0.05);
    total -= descuentoFinDeSemana;
    desglose.push({ concepto: "Promoción fin de semana (-5%)", valor: -descuentoFinDeSemana });
  }

  // 5. Descuento de miembro (solo si el envío cumple condición mínima)
  if (esMiembro && total >= 10000) {
    const descuentoMiembro = Math.round(total * 0.10);
    total -= descuentoMiembro;
    desglose.push({ concepto: "Descuento miembro (-10%)", valor: -descuentoMiembro });
  }

  return { valido: true, desglose, total };
}

// ---------- PRESENTACIÓN ----------
function mostrarCotizacion(resultado) {
  if (!resultado.valido) {
    console.log("❌", resultado.mensaje);
    return;
  }
  console.log("---- Desglose de envío ----");
  resultado.desglose.forEach(item => {
    console.log(`${item.concepto}: $${item.valor}`);
  });
  console.log(`TOTAL A PAGAR: $${resultado.total}`);
  console.log("----------------------------");
}

// ---------- PRUEBAS (mínimo cinco) ----------
const fechaEntreSemana = new Date("2026-06-24"); // miércoles
const fechaFinDeSemana = new Date("2026-06-27"); // sábado

const pruebas = [
  { ciudad: "Bogotá", peso: 3, tipo: "estandar", miembro: false, fecha: fechaEntreSemana }, // base simple
  { ciudad: "Medellín", peso: 10, tipo: "estandar", miembro: false, fecha: fechaEntreSemana }, // externo + recargo peso medio
  { ciudad: "Medellín", peso: 20, tipo: "urgente", miembro: true, fecha: fechaEntreSemana }, // recargos acumulados + miembro
  { ciudad: "Bogotá", peso: 2, tipo: "urgente", miembro: true, fecha: fechaEntreSemana }, // miembro sin descuento (no llega al mínimo)
  { ciudad: "Cali", peso: 18, tipo: "urgente", miembro: true, fecha: fechaFinDeSemana }, // todo + promo finde
  { ciudad: "Cali", peso: -5, tipo: "urgente", miembro: true, fecha: fechaEntreSemana }, // inválido
];

pruebas.forEach((p, i) => {
  console.log(`\nPrueba ${i + 1}:`);
  const resultado = calcularCotizacion(p.ciudad, p.peso, p.tipo, p.miembro, "Bogotá", p.fecha);
  mostrarCotizacion(resultado);
});