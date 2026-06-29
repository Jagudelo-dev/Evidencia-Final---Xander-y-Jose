# Reto 35 - Selector de tema visual

## 🎯 Objetivo
Cambiar la clase del body con classList y actualizar atributos ARIA.

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
   - Busca y selecciona la carpeta **`Reto 35`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 35
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
2. Navega hasta la carpeta **`Reto 35`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto35.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Uso classList.remove para quitar cualquier tema previo y luego añado el nuevo.
- Actualizo aria-pressed en todos los botones para reflejar el estado.
- Mantengo las clases de tema en una lista para removerlas fácilmente.
- Los estilos visuales están en el CSS (no los manejo desde JavaScript).

## ⚠️ Dificultades encontradas
- Al hacer clic rápido en varios botones se acumulaban clases; no estaba eliminando las anteriores correctamente. Lo resolví guardando las clases en un array y removiéndolas una a una.
- Inicialmente usé setAttribute para aria-pressed, pero luego aprendí que classList es más semántico para clases.
- Verificar que el texto del tema activo se actualizara sin errores me tomó varias pruebas.

## ✅ Pruebas realizadas
- [x] Al hacer clic en un tema, el body solo tiene esa clase (no se acumulan).
- [x] El atributo aria-pressed cambia al botón correspondiente.
- [x] El texto "Tema: oscuro" (o el elegido) aparece correctamente.
- [x] Probar los tres temas en orden aleatorio no rompe nada.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando el tema oscuro aplicado y el texto actualizado.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
