# Reto 46 - Catálogo por capas

## 🎯 Objetivo
Diseñar módulos por capa (datos, servicios, vista) sin acoplar la lógica al DOM.

## 🛠️ Requisitos
- Navegador web moderno (Chrome, Firefox, Edge).
- [Visual Studio Code](https://code.visualstudio.com/) (obligatorio para usar Live Server).
- Extensión **Live Server** para VS Code (imprescindible).

## ▶️ Cómo ejecutar

### 🌐 Opción única: Usando Visual Studio Code y Live Server (Obligatorio)

> ❌ **Importante:** Los módulos de JavaScript (ES Modules) **no funcionan** si abres el archivo `index.html` directamente con doble clic (desde `file://`). El navegador lo bloquea por seguridad (CORS). Es **obligatorio** usar un servidor local como Live Server.

#### Paso a paso:

1. **Instala Visual Studio Code**  
   Si no lo tienes, descárgalo gratis desde [https://code.visualstudio.com/](https://code.visualstudio.com/) e instálalo.

2. **Instala la extensión Live Server**  
   - Abre VS Code.  
   - Ve a la pestaña de extensiones (icono de cuadros en la barra izquierda, o presiona `Ctrl+Shift+X`).  
   - Busca **"Live Server"** (tiene un ícono morado).  
   - Haz clic en **Instalar** y espera unos segundos.

3. **Abre la carpeta del reto en VS Code**  
   - En VS Code, ve al menú `Archivo > Abrir carpeta...` (o `File > Open Folder...`).  
   - Busca y selecciona la carpeta **`Reto 46`** que está dentro de **`bloque-6`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-6/Reto 46
     ```

4. **Inicia Live Server**  
   - En el panel izquierdo de VS Code, verás el archivo `index.html`.  
   - Haz clic derecho sobre `index.html` y selecciona la opción **`Open with Live Server`**.  
   - El navegador se abrirá automáticamente y cargará el reto (por ejemplo, `http://127.0.0.1:5500/index.html`).

5. **Ya puedes interactuar con el reto**  
   Los módulos se cargarán correctamente y la aplicación funcionará. Live Server recargará la página al guardar cambios.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html` con Live Server, el navegador mostrará la interfaz del reto. En la consola del navegador (F12 > Consola) no deben aparecer errores. Si ves algún error de tipo "Failed to resolve module specifier" o "CORS", revisa que estés usando Live Server y que las rutas de los imports sean correctas (deben comenzar con `./` o `/`).

### 📂 Estructura de archivos esperada
- `datos.js`: contiene el array de productos.
- `serviciosCatalogo.js`: exporta funciones para filtrar, ordenar y obtener todos los productos.
- `vistaCatalogo.js`: renderiza los productos en el DOM.
- `app.js`: coordina eventos y flujo.


## 🧠 Decisiones y proceso de solución
- Separé estrictamente la capa de datos (productos), la lógica de negocio (filtros/ordenamiento) y la presentación (vista).
- El módulo de servicios no accede al DOM; recibe datos y retorna datos.
- La vista solo recibe el array ya procesado y lo convierte en elementos HTML.
- App.js actúa como orquestador, escuchando eventos y llamando a servicios y vista.
- Usé export/import para cada función necesaria, sin exponer más de lo requerido.

## ⚠️ Dificultades encontradas
- **Error al exportar por defecto vs nombrado**: en servicios quise exportar por defecto, pero luego necesitaba varias funciones. Cambié a export nombrado para importar solo lo necesario.
- **El filtro no funcionaba al principio**: estaba comparando categorías con mayúsculas/minúsculas diferentes. Normalicé con `toLowerCase()` en el servicio.
- **La vista no se actualizaba**: olvidé limpiar el contenedor antes de renderizar. Agregué `innerHTML = ""` al inicio de la función de render.
- **Problema con type="module"**: al igual que en el reto 45, tuve que recordar usar Live Server porque los módulos no cargan desde file://.

## ✅ Pruebas realizadas
- [x] Al cargar la página, se muestran todos los productos.
- [x] Filtrar por "Electrónica" oculta los muebles y solo muestra electrónica.
- [x] Ordenar por precio ascendente reorganiza la lista correctamente.
- [x] Los botones funcionan sin recargar la página.
- [x] La consola del navegador está limpia de errores.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador mostrando el catálogo filtrado por Electrónica y ordenado por precio.

![Resultado](resultado.png)

---

> **Nota:** Este reto es parte del manual de JavaScript 2026. Trabajar con módulos ES es fundamental para organizar proyectos grandes. ¡No te rindas si al principio los imports fallan!
