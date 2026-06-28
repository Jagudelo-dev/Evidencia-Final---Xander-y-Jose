/**
 * Panel de estados con ternarios
 * Tema 06 · Switch y operador ternario
 */

function generarTarjetaEstado(porcentajeBateria, conectado, porcentajeProgreso) {

  // Validación básica de datos
  const datosValidos =
    porcentajeBateria >= 0 && porcentajeBateria <= 100 &&
    typeof conectado === "boolean" &&
    porcentajeProgreso >= 0 && porcentajeProgreso <= 100;

  if (!datosValidos) {
    return "⚠️ Dato inválido: batería y progreso deben estar entre 0-100, y conexión debe ser true/false.";
  }

  // ---------- 2. ETIQUETA DE BATERÍA ----------
  // Límites documentados:
  // Crítica: 0-10 | Baja: 11-30 | Media: 31-70 | Alta: 71-100
  // Ternario anidado (máximo 2 niveles), refactorizado con variable intermedia
  // para que cada nivel sea legible por separado.
  const noEsCritica = porcentajeBateria > 10;
  const esAlta = porcentajeBateria > 70;
  const esMedia = porcentajeBateria > 30; // solo relevante si noEsCritica

  const etiquetaBateria = !noEsCritica
    ? "Crítica"
    : esAlta
      ? "Alta"
      : esMedia
        ? "Media"
        : "Baja";

  // Icono asociado (extensión)
  const iconoBateria = !noEsCritica ? "🔴" : esAlta ? "🟢" : esMedia ? "🟡" : "🟠";

  // ---------- 3. CONEXIÓN (ternario simple, dos resultados) ----------
  const textoConexion = conectado ? "Conectado" : "Sin conexión";
  const iconoConexion = conectado ? "📶" : "🚫";

  // ---------- 4. PROGRESO ----------
  // Límites documentados:
  // No iniciado: == 0 | En curso: 1-99 | Completado: == 100
  // Se usa variable intermedia para evitar un ternario anidado confuso con dos comparaciones de igualdad.
  const noIniciado = porcentajeProgreso === 0;
  const completado = porcentajeProgreso === 100;

  const etiquetaProgreso = noIniciado
    ? "No iniciado"
    : completado
      ? "Completado"
      : "En curso";

  const iconoProgreso = noIniciado ? "⏳" : completado ? "✅" : "🔄";

  // ---------- 5. TARJETA FINAL ----------
  const tarjeta =
    `${iconoBateria} Batería: ${etiquetaBateria} (${porcentajeBateria}%)\n` +
    `${iconoConexion} Conexión: ${textoConexion}\n` +
    `${iconoProgreso} Progreso: ${etiquetaProgreso} (${porcentajeProgreso}%)`;

  return tarjeta;
}

// ---------- PRUEBAS ----------
const pruebas = [
  { bateria: 5,   conectado: false, progreso: 0 },    // Crítica, Sin conexión, No iniciado
  { bateria: 25,  conectado: true,  progreso: 45 },   // Baja, Conectado, En curso
  { bateria: 50,  conectado: false, progreso: 100 },  // Media, Sin conexión, Completado
  { bateria: 85,  conectado: true,  progreso: 1 },    // Alta, Conectado, En curso (límite bajo)
  { bateria: 10,  conectado: true,  progreso: 99 },   // límite exacto Crítica, En curso (límite alto)
  { bateria: 71,  conectado: false, progreso: 100 },  // límite exacto Alta, Completado
  { bateria: 150, conectado: true,  progreso: 50 },   // inválido
];

pruebas.forEach((p, i) => {
  console.log(`--- Prueba ${i + 1} ---`);
  console.log(generarTarjetaEstado(p.bateria, p.conectado, p.progreso));
  console.log("");
});