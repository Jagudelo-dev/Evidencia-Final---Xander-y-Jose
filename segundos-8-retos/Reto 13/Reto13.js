/**
 * Planificador de ahorro
 * Tema 07 · Bucles for, while y do...while
 */

function planificarAhorro(ahorroInicial, aporteMensual, tasaRendimiento, meta, aporteExtraordinario = 0) {

  // Validación básica
  if (ahorroInicial < 0 || aporteMensual < 0 || tasaRendimiento < 0 || meta <= 0) {
    return { valido: false, mensaje: "⚠️ Dato inválido: los valores no pueden ser negativos y la meta debe ser mayor que cero." };
  }

  // Variables separadas: capital aportado vs. rendimiento generado (sin redondear, precisión interna)
  let saldo = ahorroInicial;
  let totalAportado = ahorroInicial;
  let totalRendimiento = 0;
  let mesMetaAlcanzada = null;

  const detalle = [];

  // 2. Recorrido de doce meses con for (no se repiten instrucciones manuales)
  for (let mes = 1; mes <= 12; mes++) {

    // ⭐ EXTENSIÓN: aporte extraordinario cada tercer mes (3, 6, 9, 12)
    const esMesExtraordinario = aporteExtraordinario > 0 && mes % 3 === 0;
    const aporteDelMes = esMesExtraordinario ? aporteMensual + aporteExtraordinario : aporteMensual;

    // 3. Suma el aporte y luego aplica el rendimiento sobre el saldo ya actualizado
    saldo += aporteDelMes;
    totalAportado += aporteDelMes;

    const rendimientoDelMes = saldo * tasaRendimiento;
    saldo += rendimientoDelMes;
    totalRendimiento += rendimientoDelMes;

    // 4. Guarda los datos del período (sin redondear aún, solo al mostrar)
    detalle.push({
      mes,
      aporte: aporteDelMes,
      extraordinario: esMesExtraordinario,
      rendimiento: rendimientoDelMes,
      saldoAcumulado: saldo
    });

    // 5. Detecta el primer mes en que se alcanza la meta
    if (mesMetaAlcanzada === null && saldo >= meta) {
      mesMetaAlcanzada = mes;
    }
  }

  return {
    valido: true,
    detalle,
    resumen: {
      totalAportado,
      totalRendimiento,
      saldoFinal: saldo,
      mesMetaAlcanzada
    }
  };
}

// ---------- PRESENTACIÓN (redondeo solo aquí) ----------
function mostrarReporte(resultado, meta) {
  if (!resultado.valido) {
    console.log(resultado.mensaje);
    return;
  }

  console.log("===== DETALLE MENSUAL =====");
  resultado.detalle.forEach(p => {
    const marca = p.extraordinario ? " (aporte extraordinario)" : "";
    console.log(
      `Mes ${p.mes}${marca} | Aporte: $${p.aporte.toFixed(2)} | ` +
      `Rendimiento: $${p.rendimiento.toFixed(2)} | Saldo: $${p.saldoAcumulado.toFixed(2)}`
    );
  });

  console.log("\n===== RESUMEN =====");
  console.log(`Total aportado     : $${resultado.resumen.totalAportado.toFixed(2)}`);
  console.log(`Total rendimiento  : $${resultado.resumen.totalRendimiento.toFixed(2)}`);
  console.log(`Saldo final        : $${resultado.resumen.saldoFinal.toFixed(2)}`);

  if (resultado.resumen.mesMetaAlcanzada !== null) {
    console.log(`✅ Meta de $${meta} alcanzada en el mes ${resultado.resumen.mesMetaAlcanzada}`);
  } else {
    console.log(`❌ La meta de $${meta} no se alcanzó en los 12 meses.`);
  }
  console.log("====================\n");
}

// ---------- PRUEBAS ----------
console.log("PRUEBA 1: Ahorro simple, sin meta alcanzable");
mostrarReporte(planificarAhorro(100000, 50000, 0.01, 5000000), 5000000);

console.log("PRUEBA 2: Meta alcanzable a mitad de año");
mostrarReporte(planificarAhorro(200000, 100000, 0.015, 1300000), 1300000);

console.log("PRUEBA 3: Sin aporte inicial, solo mensual");
mostrarReporte(planificarAhorro(0, 80000, 0.02, 1000000), 1000000);

console.log("PRUEBA 4: Con aporte extraordinario cada tercer mes");
mostrarReporte(planificarAhorro(150000, 60000, 0.01, 1200000, 100000), 1200000);

console.log("PRUEBA 5: Datos inválidos (tasa negativa)");
mostrarReporte(planificarAhorro(100000, 50000, -0.01, 500000), 500000);