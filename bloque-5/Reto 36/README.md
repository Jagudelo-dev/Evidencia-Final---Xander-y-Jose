# Reto 36 - Indicador de progreso accesible

## 🎯 Objetivo
Actualizar una barra de progreso con atributos ARIA y estilos controlados.

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
   - Busca y selecciona la carpeta **`Reto 36`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 36
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
2. Navega hasta la carpeta **`Reto 36`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto36.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- La función actualizarProgreso normaliza el valor con Math.max(0, Math.min(100, valor)).
- Cambio la clase del relleno según el estado (inicial, activo, completo) para aplicar estilos CSS.
- Los atributos aria-valuenow, aria-valuemin y aria-valuemax se actualizan sincronizados con el ancho.
- Solo el ancho se modifica con style; el resto queda en CSS.

## ⚠️ Dificultades encontradas
- Al probar con 150 el porcentaje se mostraba "150%" y el ancho sobresalía. Agregué la normalización para limitarlo.
- Los atributos ARIA no se veían en la interfaz, pero al inspeccionar con las herramientas de desarrollo noté que no había puesto aria-valuemin ni max.
- El cambio de clase no se reflejaba porque olvidé limpiar las clases anteriores con className = "" antes de añadir la nueva.

## ✅ Pruebas realizadas
- [x] Con valor 0 se muestra clase "inicial" y 0%.
- [x] Con 50 se muestra clase "activo" y la barra a la mitad.
- [x] Con 100 (o más) se ve clase "completo" y barra llena.
- [x] Valor negativo se convierte en 0.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador con la barra de progreso en tres estados diferentes.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
