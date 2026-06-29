/*
 * Reto 40 - Cotizador desde formulario
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere select#plan, input#usuarios, checkbox#soporte, select#duracion, div#desglose, span#total
 */

const planSelect = document.getElementById("plan");
const usuariosInput = document.getElementById("usuarios");
const soporteCheck = document.getElementById("soporte");
const duracionSelect = document.getElementById("duracion");
const desgloseDiv = document.getElementById("desglose");
const totalSpan = document.getElementById("total");

const precios = {
  basico: 100,
  premium: 200,
  soporte: 50,
  meses: { 1: 1, 3: 2.8, 6: 5.2, 12: 9.6 }
};

function calcular() {
  const plan = planSelect.value;
  const usuarios = parseInt(usuariosInput.value) || 0;
  const soporte = soporteCheck.checked;
  const meses = parseInt(duracionSelect.value);

  const precioBase = precios[plan] || 0;
  const subtotal = precioBase * usuarios * precios.meses[meses];
  const descuento = meses >= 6 ? subtotal * 0.1 : 0;
  const recargoSoporte = soporte ? precios.soporte * meses : 0;
  const total = subtotal - descuento + recargoSoporte;

  desgloseDiv.innerHTML = `
    Subtotal: $${subtotal.toFixed(2)}<br>
    Descuento: -$${descuento.toFixed(2)}<br>
    Soporte: +$${recargoSoporte.toFixed(2)}
  `;
  totalSpan.textContent = `$${total.toFixed(2)}`;
}

[planSelect, usuariosInput, soporteCheck, duracionSelect].forEach(el => {
  el.addEventListener("change", calcular);
  el.addEventListener("input", calcular);
});

calcular();