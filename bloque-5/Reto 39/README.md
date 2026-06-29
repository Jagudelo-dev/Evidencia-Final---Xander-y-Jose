# Reto 39 - Registro de participante

## 🎯 Objetivo
Validar un formulario con preventDefault y mostrar errores por campo.

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
   - Busca y selecciona la carpeta **`Reto 39`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 39
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
2. Navega hasta la carpeta **`Reto 39`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto39.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Intercepté el evento submit con preventDefault para controlar la validación.
- Validé cada campo: nombre no vacío, correo con @, edad >= 18, términos aceptados.
- Los errores se acumulan en un array y luego se muestran en un div específico.
- Los datos válidos se normalizan (nombre sin espacios, correo en minúsculas) antes de mostrar el éxito.
- Después del envío exitoso, limpio el formulario con reset().

## ⚠️ Dificultades encontradas
- Al principio solo usé FormData y comprobaba si los campos estaban vacíos, pero no detectaba correos inválidos.
- Mostrar errores múltiples fue un reto; usar un array y luego unirlos con <br> lo resolvió.
- Olvidé limpiar los errores anteriores al validar de nuevo; se acumulaban mensajes viejos. Lo solucioné vaciando el div antes de cada validación.

## ✅ Pruebas realizadas
- [x] Enviar con campos vacíos muestra todos los errores.
- [x] Correo sin @ genera error específico.
- [x] Edad menor a 18 rechaza el registro.
- [x] Con todos los datos correctos se muestra el mensaje de éxito y el formulario se limpia.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador con el formulario y los mensajes de error visibles.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
