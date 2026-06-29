# Reto 45 - Calculadora modular

## 🎯 Objetivo
Dividir un proyecto en módulos ES (operaciones, validaciones, formato) y consumirlos desde un archivo principal.

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
   - Busca y selecciona la carpeta **`Reto 45`** que está dentro de **`bloque-6`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-6/Reto 45
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
- `operaciones.js`: exporta sumar, restar, multiplicar, dividir.
- `validaciones.js`: exporta funciones para validar números y división por cero.
- `formato.js`: exporta por defecto una función formateadora.
- `app.js`: importa y coordina los módulos.
- `index.html`: carga el script con `type="module"`.


## 🧠 Decisiones y proceso de solución
- Dividí el código en módulos con responsabilidades únicas: operaciones matemáticas, validación y formateo.
- Usé export nombrado para las funciones individuales y export default para la formateadora, practicando ambas sintaxis.
- En app.js solo importé lo necesario de cada módulo, evitando variables globales.
- La validación de división por cero la puse en el módulo de validaciones y la llamo antes de dividir.
- El HTML usa `type="module"` para que el navegador reconozca los imports.

## ⚠️ Dificultades encontradas
- **Error de módulo no encontrado**: al principio puse mal la ruta de un import (olvidé el `./` relativo). El navegador mostraba "Failed to resolve module specifier". Lo corregí revisando cada ruta.
- **CORS bloqueando módulos**: intenté abrir el HTML con doble clic y los módulos no cargaban. Aprendí que los módulos ES requieren un servidor; Live Server lo resolvió.
- **Olvidé type="module"**: cargué el script como normal y los imports fallaron. Agregué el atributo en el `<script>`.
- **Dependencia circular**: al principio quise importar desde app.js hacia operaciones.js y viceversa. El navegador lanzó un error; rediseñé para que app.js solo consuma, sin exportar.

## ✅ Pruebas realizadas
- [x] Los cuatro botones de operación realizan el cálculo correcto.
- [x] La división por cero muestra un mensaje de error controlado (sin romper la app).
- [x] Los resultados se muestran formateados (con dos decimales).
- [x] No hay errores en la consola del navegador al inspeccionar.
- [x] Los módulos están correctamente enlazados (verificado en la pestaña Network).

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador con la calculadora mostrando el resultado de 10 + 2 = 12.00.

![Resultado](resultado.png)

---

> **Nota:** Este reto es parte del manual de JavaScript 2026. Trabajar con módulos ES es fundamental para organizar proyectos grandes. ¡No te rindas si al principio los imports fallan!
