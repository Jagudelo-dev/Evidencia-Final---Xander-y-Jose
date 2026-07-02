# Reto 19 - Menú de opciones con switch

## 🎯 Objetivo
Crear un menú interactivo usando switch para ejecutar diferentes acciones según la opción elegida.

## 🛠️ Requisitos
- [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
Abre una terminal en la raíz del repositorio y ejecuta:
```bash
cd bloque-3/Reto\ 19
node Reto19.js
```

## 🧠 Decisiones y proceso de solución
- Usé switch para mapear cada opción numérica a una función.
- Agrupé casos con la misma acción usando fall-through.
- Incluí un caso default para opciones no válidas.

## ⚠️ Dificultades encontradas
- Al principio olvidé el break y se ejecutaban varias opciones.
- Para opciones que requerían entrada adicional, usé readline-sync.

## ✅ Pruebas realizadas
- [x] Cada opción del menú ejecuta la acción correcta.
- [x] Opción inválida muestra mensaje de error.
- [x] El programa no se cae con entradas inesperadas.

## 📸 Evidencia
*Captura de pantalla de la terminal después de ejecutar el código.*

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
