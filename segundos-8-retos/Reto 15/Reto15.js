/**
 * Biblioteca de conversiones
 * Tema 08 · Funciones y funciones flecha
 */

// ---------- VALIDACIÓN COMÚN (responsabilidad única, reutilizable) ----------
const esNumeroValido = (valor) => typeof valor === "number" && Number.isFinite(valor);

// ---------- CONVERSIONES (cada función resuelve una sola responsabilidad) ----------

// 1. Celsius → Fahrenheit
const celsiusAFahrenheit = (celsius) => {
  if (!esNumeroValido(celsius)) return null;
  return (celsius * 9) / 5 + 32;
};

// ⭐ Inversa: Fahrenheit → Celsius (reutiliza la misma validación)
const fahrenheitACelsius = (fahrenheit) => {
  if (!esNumeroValido(fahrenheit)) return null;
  return ((fahrenheit - 32) * 5) / 9;
};

// 2. Kilómetros → Millas
const KM_A_MILLAS_FACTOR = 0.621371;
const kilometrosAMillas = (kilometros) => {
  if (!esNumeroValido(kilometros)) return null;
  return kilometros * KM_A_MILLAS_FACTOR;
};

// ⭐ Inversa: Millas → Kilómetros (reutiliza el mismo factor)
const millasAKilometros = (millas) => {
  if (!esNumeroValido(millas)) return null;
  return millas / KM_A_MILLAS_FACTOR;
};

// 3. Pesos → Dólares (tasa de cambio con valor por defecto)
const pesosADolares = (pesos, tasaCambio = 4000) => {
  if (!esNumeroValido(pesos) || !esNumeroValido(tasaCambio) || tasaCambio <= 0) return null;
  return pesos / tasaCambio;
};

// ⭐ Inversa: Dólares → Pesos (misma tasa por defecto, reutiliza validación)
const dolaresAPesos = (dolares, tasaCambio = 4000) => {
  if (!esNumeroValido(dolares) || !esNumeroValido(tasaCambio) || tasaCambio <= 0) return null;
  return dolares * tasaCambio;
};

// ---------- FORMATEO (separado del cálculo, responsabilidad única) ----------
const formatearConUnidad = (valor, unidad, decimales = 2) => {
  if (valor === null) return "⚠️ Dato inválido: no se pudo calcular el resultado.";
  return `${valor.toFixed(decimales)} ${unidad}`;
};

// ---------- PRUEBAS (al menos seis, sin variables globales para los cálculos) ----------
function ejecutarPruebas() {
  const pruebas = [
    { etiqueta: "Celsius a Fahrenheit (25°C)", resultado: celsiusAFahrenheit(25), unidad: "°F" },
    { etiqueta: "Fahrenheit a Celsius (98.6°F)", resultado: fahrenheitACelsius(98.6), unidad: "°C" },
    { etiqueta: "Kilómetros a Millas (10 km)", resultado: kilometrosAMillas(10), unidad: "mi" },
    { etiqueta: "Millas a Kilómetros (6.21 mi)", resultado: millasAKilometros(6.21), unidad: "km" },
    { etiqueta: "Pesos a Dólares con tasa por defecto (400000)", resultado: pesosADolares(400000), unidad: "USD" },
    { etiqueta: "Pesos a Dólares con tasa personalizada (400000, 4200)", resultado: pesosADolares(400000, 4200), unidad: "USD" },
    { etiqueta: "Dólares a Pesos (100 USD)", resultado: dolaresAPesos(100), unidad: "COP" },
    { etiqueta: "Celsius inválido ('treinta')", resultado: celsiusAFahrenheit("treinta"), unidad: "°F" },
  ];

  pruebas.forEach((p) => {
    console.log(`${p.etiqueta} → ${formatearConUnidad(p.resultado, p.unidad)}`);
  });
}

ejecutarPruebas();