# Reto 37 - Contador de interacciones

## 🎯 Objetivo
Manejar eventos de click y teclado, y retirar un listener temporal.

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
   - Busca y selecciona la carpeta **`Reto 37`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 37
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
2. Navega hasta la carpeta **`Reto 37`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto37.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Asigné event listeners a los botones con addEventListener, no con atributos onclick.
- El botón de disminuir se deshabilita cuando el contador llega a cero.
- Las teclas se escuchan en el documento y filtro solo las requeridas (+, -, Escape).
- Para probar removeEventListener, almacené la función en una variable y luego la removí.

## ⚠️ Dificultades encontradas
- Al retirar el listener, usé una función anónima y no funcionó. Aprendí que debo guardar una referencia exacta.
- El contador bajaba de cero si no ponía la condición en el evento de tecla "-". Lo corregí con un if.
- La tecla "+" requiere Shift en algunos teclados; lo documenté para que el usuario lo sepa.

## ✅ Pruebas realizadas
- [x] Clic en + aumenta el contador.
- [x] Clic en - con contador > 0 disminuye; con 0 el botón está deshabilitado.
- [x] Tecla Escape reinicia a cero.
- [x] Después de remover un listener, ese botón deja de funcionar.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando el contador en 5 y el último evento registrado como "tecla +".

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
