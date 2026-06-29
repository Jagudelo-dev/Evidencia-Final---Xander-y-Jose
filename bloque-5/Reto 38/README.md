# Reto 38 - Lista de compras con delegación

## 🎯 Objetivo
Usar un único listener en el contenedor para manejar eventos de elementos dinámicos.

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
   - Busca y selecciona la carpeta **`Reto 38`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 38
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
2. Navega hasta la carpeta **`Reto 38`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto38.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Coloqué un solo listener en el <ul> en lugar de uno por cada botón.
- Dentro del listener, identifico el botón con closest y luego la acción con data-action.
- Para completar, alterno la clase CSS; para eliminar, remuevo el <li> completo.
- Los nuevos elementos heredan el comportamiento automáticamente.

## ⚠️ Dificultades encontradas
- Al principio puse listeners individuales, pero los nuevos elementos no funcionaban. Comprendí la delegación de eventos.
- Clics en el texto del <li> sin botón causaban errores porque e.target.closest('button') devolvía null. Agregué una validación.
- El contador de pendientes no se actualizaba después de eliminar; tuve que llamar a la función de actualización tras cada acción.

## ✅ Pruebas realizadas
- [x] Agregar un elemento con el formulario lo muestra en la lista y responde a los botones.
- [x] Completar pone la clase "completado" y se ve tachado.
- [x] Eliminar quita el elemento de la lista.
- [x] El contador de pendientes refleja los cambios.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando la lista con elementos completados y el contador actualizado.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
