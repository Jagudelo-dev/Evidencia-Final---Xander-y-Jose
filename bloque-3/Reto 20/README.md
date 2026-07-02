# Reto 20 - Clasificador de IMC

## 🎯 Objetivo
Calcular el índice de masa corporal y clasificarlo usando operadores ternarios y if/else.

## 🛠️ Requisitos
- [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
Abre una terminal en la raíz del repositorio y ejecuta:
```bash
cd bloque-3/Reto\ 20
node Reto20.js
```

## 🧠 Decisiones y proceso de solución
- Calculé el IMC con la fórmula peso/(altura^2).
- Usé ternarios para clasificaciones simples y if/else anidados para las más complejas.
- Mostré el resultado con una etiqueta de color (texto).

## ⚠️ Dificultades encontradas
- Asegurar que los valores de entrada fueran números positivos.
- La clasificación de la OMS tiene muchos rangos; usé una tabla para no equivocarme.

## ✅ Pruebas realizadas
- [x] Peso 70kg, altura 1.75m → IMC normal.
- [x] Peso 50kg, altura 1.60m → bajo peso.
- [x] Valores negativos muestran error.
- [x] El cálculo es correcto con decimales.

## 📸 Evidencia
*Captura de pantalla de la terminal después de ejecutar el código.*

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
