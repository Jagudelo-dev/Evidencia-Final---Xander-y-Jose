export function esNumeroValido(valor) {
  return typeof valor === "number" && !isNaN(valor) && isFinite(valor);
}

export function validarDivision(b) {
  if (b === 0) throw new Error("División por cero no permitida.");
}