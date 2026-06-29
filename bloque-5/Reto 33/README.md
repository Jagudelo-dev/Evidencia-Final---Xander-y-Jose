# Reto 33 - Tarjeta de perfil interactiva

## 🎯 Objetivo
Seleccionar elementos del DOM y actualizar contenido con textContent y createElement.

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
   - Busca y selecciona la carpeta **`Reto 33`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 33
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
2. Navega hasta la carpeta **`Reto 33`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto33.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Usé querySelector para seleccionar cada campo de la tarjeta.
- Preferí textContent para insertar texto y así evitar inyección de HTML.
- La lista de habilidades la generé con createElement y appendChild, manteniendo el control sobre el DOM.
- Asigné el atributo alt de la imagen con un valor descriptivo para accesibilidad.

## ⚠️ Dificultades encontradas
- Al principio el script no funcionaba porque lo cargué antes que el HTML. Lo solucioné agregando defer en la etiqueta script.
- Olvidé que el selector de la imagen necesitaba comillas; la consola me mostró un error que me ayudó a corregirlo.
- Quería usar innerHTML para la lista, pero recordé la regla de seguridad y preferí createElement.

## ✅ Pruebas realizadas
- [x] La tarjeta se llena con los datos del objeto perfil.
- [x] La lista de habilidades tiene exactamente cuatro elementos.
- [x] La consola del navegador no muestra errores.
- [x] La imagen tiene un texto alternativo visible al inspeccionar.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando la tarjeta completa con foto y lista de habilidades.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
