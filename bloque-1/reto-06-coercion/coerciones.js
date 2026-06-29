/*
 * Reto 06 - Laboratorio de coerción segura
 * Autor: Jose Miguel Agudelo Torres
 * Fecha: 2026-06-27
 */

const entradas = [
  { valorOriginal: "25", descripcion: "número como texto" },
  { valorOriginal: "", descripcion: "cadena vacía" },
  { valorOriginal: true, descripcion: "booleano true" },
  { valorOriginal: null, descripcion: "nulo" },
  { valorOriginal: "  10px  ", descripcion: "cadena con espacios y letras" },
];

console.log("🔬 LABORATORIO DE COERCIÓN SEGURA\n");

entradas.forEach(({ valorOriginal, descripcion }) => {
  console.group(`Caso: ${descripcion} (${valorOriginal})`);
  
  console.log("--- Sin convertir ---");
  const sumaImplicita = valorOriginal + 5;
  console.log(`Suma con + 5: ${sumaImplicita} (tipo: ${typeof sumaImplicita})`);
  const comparacionDebil = valorOriginal == 25;
  console.log(`== 25: ${comparacionDebil}`);
  const comparacionEstricta = valorOriginal === 25;
  console.log(`=== 25: ${comparacionEstricta}`);
  
  const numeroConvertido = Number(valorOriginal);
  const cadenaConvertida = String(valorOriginal);
  const booleanoConvertido = Boolean(valorOriginal);
  
  console.log("\n--- Conversiones explícitas ---");
  console.log(`Number: ${numeroConvertido} (tipo: ${typeof numeroConvertido})`);
  console.log(`String: "${cadenaConvertida}" (tipo: ${typeof cadenaConvertida})`);
  console.log(`Boolean: ${booleanoConvertido} (tipo: ${typeof booleanoConvertido})`);
  
  const esFinite = Number.isFinite(numeroConvertido);
  console.log(`¿Es finito el número? ${esFinite}`);
  
  console.groupEnd();
  console.log("");
});

console.log("📊 TABLA COMPARATIVA");
const tabla = entradas.map(({ valorOriginal }) => {
  const convNum = Number(valorOriginal);
  return {
    "Original": valorOriginal,
    "Tipo orig.": typeof valorOriginal,
    "Convertido (Number)": convNum,
    "Tipo final": typeof convNum,
  };
});
console.table(tabla);

/*
 * Explicación de == vs === en tres escenarios:
 * 1. "25" == 25  → true (la cadena se convierte a número por coerción implícita)
 * 2. true == 1   → true (booleano se convierte a número)
 * 3. null == undefined → true (regla especial de igualdad débil)
 * Con === no hay coerción, por lo que todas las anteriores son false.
 */