# Reto 34 - Tablero de tareas generado

## 🎯 Objetivo
Generar elementos DOM a partir de un array, mostrando un mensaje cuando esté vacío.

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
   - Busca y selecciona la carpeta **`Reto 34`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 34
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
2. Navega hasta la carpeta **`Reto 34`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto34.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- La función renderizarTareas comienza limpiando el contenedor para evitar duplicados al llamarla varias veces.
- Cada tarjeta recibe clases según prioridad y estado, y un data-id con el identificador.
- Si el array está vacío, muestro un mensaje especial usando textContent en lugar de no mostrar nada.

## ⚠️ Dificultades encontradas
- La primera vez que probé con un array vacío no se veía ningún mensaje; había olvidado la condición y el contenedor quedaba en blanco.
- Tuve que investigar cómo asignar data-* con dataset para que cada tarjeta guardara su ID.
- El CSS inicial no distinguía las prioridades; añadí clases y estilos simples para probar.

## ✅ Pruebas realizadas
- [x] Con datos, aparecen tres tarjetas.
- [x] Las clases prioridad-alta, media, baja se asignan correctamente.
- [x] Al pasar un array vacío se muestra el texto "No hay tareas pendientes."
- [x] Llamar a renderizarTareas dos veces no duplica el contenido.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando el tablero con tareas y el mensaje de vacío.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
