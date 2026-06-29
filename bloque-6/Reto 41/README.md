# Reto 41 - Temporizador Pomodoro

## 🎯 Objetivo
Controlar setInterval y clearInterval para un temporizador de trabajo/descanso.

## 🛠️ Requisitos
- Navegador web moderno (Chrome, Firefox, Edge).
- [Visual Studio Code](https://code.visualstudio.com/) (opcional, pero muy recomendado).
- Extensión **Live Server** para VS Code (facilita la ejecución y prueba).

## ▶️ Cómo ejecutar

### 🌐 Opción 1: Usando Visual Studio Code y Live Server (Recomendado)

1. **Instala Visual Studio Code**  
   Si no lo tienes, descárgalo gratis desde [https://code.visualstudio.com/](https://code.visualstudio.com/) e instálalo.

2. **Instala la extensión Live Server**  
   - Abre VS Code.  
   - Ve a la pestaña de extensiones (icono de cuadros en la barra izquierda, o presiona `Ctrl+Shift+X`).  
   - Busca **"Live Server"** (tiene un ícono morado).  
   - Haz clic en **Instalar** y espera unos segundos.

3. **Abre la carpeta del reto en VS Code**  
   - En VS Code, ve al menú `Archivo > Abrir carpeta...` (o `File > Open Folder...`).  
   - Busca y selecciona la carpeta **`Reto 41`** que está dentro de **`bloque-6`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-6/Reto 41
     ```

4. **Inicia Live Server**  
   - En el panel izquierdo de VS Code, verás el archivo `index.html`.  
   - Haz clic derecho sobre `index.html` y selecciona la opción **`Open with Live Server`**.  
   - El navegador se abrirá automáticamente y cargará el reto.

5. **Ya puedes interactuar con el reto**  
   Cada vez que modifiques y guardes el código, Live Server recargará la página al instante. ¡Perfecto para hacer pruebas!

---

### 🖱️ Opción 2: Abrir directamente con el navegador (Sin instalar nada)

1. Abre tu explorador de archivos (el de Windows, Linux o macOS).
2. Navega hasta la carpeta **`Reto 41`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto41.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- El intervalo se guarda en una variable (intervalo) para poder limpiarlo luego.
- Al presionar Iniciar, primero verifico si ya hay un intervalo activo para no duplicarlo.
- Cada segundo actualizo el tiempo restante y la pantalla.
- Al llegar a 0, limpio el intervalo y cambio la fase (trabajo/descanso).
- Los botones Pausar y Reiniciar usan clearInterval y reinician variables.

## ⚠️ Dificultades encontradas
- Al principio no validaba si ya existía un intervalo, y al hacer clic rápido en Iniciar el conteo se aceleraba. Agregué la condición if (intervalo) return.
- La fase de descanso no se activaba porque olvidé cambiar el texto del elemento fase en el HTML. Luego agregué actualizarPantalla().
- El formato mm:ss con padStart no lo conocía; investigué y lo implementé.

## ✅ Pruebas realizadas
- [x] Iniciar arranca el conteo regresivo.
- [x] Pausar detiene el tiempo.
- [x] Reiniciar vuelve a 25:00 en fase Trabajo.
- [x] Al llegar a 0, cambia a Descanso y se detiene.
- [x] Clics repetidos en Iniciar no aceleran el conteo.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando el temporizador en pausa con 12:34 restante.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
