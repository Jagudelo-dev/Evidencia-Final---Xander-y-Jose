# Reto 43 - Notas persistentes

## 🎯 Objetivo
Guardar y recuperar notas en localStorage, manejando JSON corrupto.

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
   - Busca y selecciona la carpeta **`Reto 43`** que está dentro de **`bloque-6`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-6/Reto 43
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
2. Navega hasta la carpeta **`Reto 43`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto43.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Creé dos funciones, leerNotas y guardarNotas, para centralizar el acceso al storage.
- Al leer, envuelvo JSON.parse en try/catch para capturar datos corruptos y devolver un array vacío.
- Cada operación (agregar, completar, eliminar) actualiza el array y guarda.
- Al completar una nota, realmente la elimino del array (como pide la interfaz).
- El botón "Borrar todas" pide confirmación y luego remueve la clave del storage.

## ⚠️ Dificultades encontradas
- Al probar con datos corruptos manualmente (editando localStorage), la app se rompía. Implementé el try/catch y solucionó.
- El renderizado no se actualizaba tras eliminar una nota; tuve que llamar a renderizar() dentro del evento del botón.
- La primera vez no aparecía nada; olvidé llamar a renderizar() al cargar la página. Lo agregué al final del script.

## ✅ Pruebas realizadas
- [x] Agregar una nota la muestra en la lista.
- [x] Recargar la página conserva las notas.
- [x] Modificar localStorage con JSON inválido no rompe la app (se ve vacía).
- [x] El botón "Borrar todas" limpia todo tras confirmar.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador con tres notas y el botón de borrar.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
