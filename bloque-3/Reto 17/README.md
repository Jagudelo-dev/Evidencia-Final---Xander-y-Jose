# Reto 17 - Validador de contraseñas

## 🎯 Objetivo
Evaluar la seguridad de una contraseña usando condicionales y operadores lógicos.

## 🛠️ Requisitos
- [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
Abre una terminal en la raíz del repositorio y ejecuta:
```bash
cd bloque-3/Reto\ 17
node Reto17.js
```

## 🧠 Decisiones y proceso de solución
- Usé if/else para verificar cada criterio: longitud, mayúsculas, números y caracteres especiales.
- Dividí la lógica en funciones pequeñas para cada validación.
- Mostré mensajes claros indicando qué criterio falta.

## ⚠️ Dificultades encontradas
- Al principio las expresiones regulares no detectaban correctamente los caracteres especiales.
- Tuve que ajustar el orden de las validaciones para que el mensaje fuera más útil.

## ✅ Pruebas realizadas
- [x] Contraseña "Abc123!" cumple todos los criterios.
- [x] Contraseña corta muestra mensaje de longitud insuficiente.
- [x] Contraseña sin números muestra mensaje específico.
- [x] Contraseña vacía se rechaza correctamente.

## 📸 Evidencia
*Captura de pantalla de la terminal después de ejecutar el código.*

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
