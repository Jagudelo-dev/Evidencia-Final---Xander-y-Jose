# Reto 57 - Importación dinámica de módulos

## 🎯 Objetivo
Usar import() para cargar módulos de forma dinámica según la interacción del usuario.

## 🛠️ Requisitos
- Navegador web moderno (Chrome, Firefox, Edge).
- [Visual Studio Code](https://code.visualstudio.com/) y Live Server (recomendado).

## ▶️ Cómo ejecutar
### 🌐 Usando Live Server (recomendado)
1. Abre la carpeta del reto en VS Code.
2. Haz clic derecho en `index.html` → **Open with Live Server**.
3. Interactúa con la página para ver la carga dinámica de módulos.

## 🧠 Decisiones y proceso de solución
- Usé import() para cargar módulos solo cuando el usuario hace clic, mejorando el rendimiento inicial.
- Manejé el estado de carga y posibles errores de red con un try/catch.
- Separé el código en módulos independientes para mantener el proyecto organizado.

## ⚠️ Dificultades encontradas
- Al principio olvidé que import() devuelve una promesa; tuve que usar async/await.
- El navegador bloqueaba los módulos hasta que los serví con Live Server.
- Tuve que asegurarme de que las rutas relativas funcionaran en todos los casos.

## ✅ Pruebas realizadas
- [x] El módulo se carga solo al hacer clic.
- [x] Si la carga falla, se muestra un mensaje de error.
- [x] La interfaz no se congela mientras se carga el módulo.
- [x] Los módulos no se cargan innecesariamente al inicio.

## 📸 Evidencia
*Captura de pantalla del navegador después de ejecutar el reto.*

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
