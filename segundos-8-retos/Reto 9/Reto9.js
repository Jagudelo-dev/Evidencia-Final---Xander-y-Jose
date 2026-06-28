function clasificarEstudiante(notaFinal, asistencia, entregasRealizadas, totalEntregas, notaCorteAnterior = null) {
  // Validación de datos
  const datosValidos =
    notaFinal >= 0 && notaFinal <= 100 &&
    asistencia >= 0 && asistencia <= 100 &&
    entregasRealizadas >= 0 && entregasRealizadas <= totalEntregas &&
    totalEntregas > 0;

  if (!datosValidos) {
    return {
      estado: "Datos inválidos",
      recomendacion: "Verificar los valores ingresados: nota y asistencia deben estar entre 0-100, y las entregas no pueden superar el total."
    };
  }

  const todasLasEntregas = entregasRealizadas === totalEntregas;
  const asistenciaMinima = asistencia >= 80;
  const entregasMinimas = entregasRealizadas >= Math.ceil(totalEntregas * 0.6);

  let estado;
  let recomendacion;

  if (notaFinal >= 90 && asistenciaMinima && todasLasEntregas) {
    estado = "Excelente";
    recomendacion = "Gran trabajo. Mantén tu constancia y considera apoyar a otros como mentor.";
  } else if (notaFinal >= 70 && asistencia >= 60 && entregasMinimas) {
    estado = "Aprobado";
    recomendacion = "Buen desempeño. Refuerza temas con menor dominio para subir tu nivel.";
  } else if (notaFinal >= 50 && notaFinal < 70) {
    estado = "Recuperación";
    recomendacion = "Estás cerca de aprobar. Programa tutorías y entrega las actividades pendientes cuanto antes.";
  } else {
    estado = "Reprobado";
    recomendacion = "Es necesario reforzar contenidos desde la base. Solicita acompañamiento académico inmediato.";
  }

  // Extensión: mejora respecto al corte anterior
  if (notaCorteAnterior !== null && notaCorteAnterior >= 0 && notaCorteAnterior <= 100) {
    const mejora = notaFinal - notaCorteAnterior;
    if (mejora >= 15 && estado !== "Excelente") {
      estado += " (Mención: mejora destacada)";
      recomendacion += " Además, tu progreso respecto al corte anterior es notable: ¡sigue así!";
    }
  }

  return { estado, recomendacion };
}

// Pruebas (mínimo cinco)
const pruebas = [
  { nota: 95, asistencia: 90, entregas: 5, total: 5, corteAnterior: 80 },
  { nota: 75, asistencia: 65, entregas: 4, total: 5, corteAnterior: 70 },
  { nota: 60, asistencia: 55, entregas: 3, total: 5, corteAnterior: 58 },
  { nota: 40, asistencia: 50, entregas: 2, total: 5, corteAnterior: 45 },
  { nota: 92, asistencia: 70, entregas: 5, total: 5, corteAnterior: null },
  { nota: 110, asistencia: 90, entregas: 5, total: 5, corteAnterior: null },
];

pruebas.forEach((p, i) => {
  const resultado = clasificarEstudiante(p.nota, p.asistencia, p.entregas, p.total, p.corteAnterior);
  console.log(`Prueba ${i + 1}:`, resultado);
});