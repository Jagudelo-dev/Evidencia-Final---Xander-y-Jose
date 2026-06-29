# Reto 49 - Flujo de matrícula asíncrono

## 🎯 Objetivo
Reescribir una cadena de promesas con async/await y control de errores.

## 🛠️ Requisitos
- Tener [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
Abre una terminal en la raíz del repositorio.
Ejecuta:
```bash
cd bloque-7/Reto\ 49
node Reto49.js
```
Observa los resultados en consola.

## 🧠 Decisiones y proceso de solución
- Convertí las funciones simuladas en async, aunque no usen await interno.
- La función matricularEstudiante es async y espera cada etapa con await.
- Uso try/catch/finally dentro de la función async para manejar el éxito, el fallo y el cierre.
- El caso fallido se probó con un ID específico que dispara un rechazo en validarDeuda.

## ⚠️ Dificultades encontradas
- No mezclar await y .then() en el mismo flujo fue una regla clara, lo logré.
- El error debe conservar el contexto de la etapa; en mi implementación cada función lanza un error descriptivo.
- finally se ejecuta al final, independientemente del resultado.

## ✅ Pruebas realizadas
- [x] Las dependencias se ejecutan en orden.
- [x] Cada fallo se identifica con un mensaje claro.
- [x] finally cierra el proceso en ambos casos.
- [x] El caso exitoso devuelve el objeto final con estudiante y asignaturas.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla de la terminal después de ejecutar el código.*  
Terminal con la matrícula exitosa y la fallida.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
