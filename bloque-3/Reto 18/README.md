# Reto 18 - Calculadora de tarifas

## 🎯 Objetivo
Calcular el costo de un servicio según edad, membresía y horario usando condicionales anidados.

## 🛠️ Requisitos
- [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
Abre una terminal en la raíz del repositorio y ejecuta:
```bash
cd bloque-3/Reto\ 18
node Reto18.js
```

## 🧠 Decisiones y proceso de solución
- Organicé las condiciones desde la más específica (descuentos por membresía) hasta la tarifa base.
- Usé operadores lógicos (&&, ||) para combinar criterios.
- Mostré el desglose de la tarifa paso a paso.

## ⚠️ Dificultades encontradas
- La lógica para el horario pico (fin de semana) fue confusa al principio.
- Tuve que convertir cadenas de texto a números para las comparaciones de edad.

## ✅ Pruebas realizadas
- [x] Adulto con membresía y horario normal recibe descuento.
- [x] Niño sin membresía en fin de semana paga tarifa especial.
- [x] Edad inválida muestra mensaje de error.
- [x] El cálculo coincide con el manual.

## 📸 Evidencia
*Captura de pantalla de la terminal después de ejecutar el código.*

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
