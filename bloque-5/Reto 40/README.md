# Reto 40 - Cotizador desde formulario

## 🎯 Objetivo
Calcular un presupuesto en tiempo real al cambiar controles de formulario.

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
   - Busca y selecciona la carpeta **`Reto 40`** que está dentro de **`bloque-5`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     ```bash
     .../Evidencia final - Jose y Xander/bloque-5/Reto 40
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
2. Navega hasta la carpeta **`Reto 40`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo `index.html`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el `index.html`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script `Reto40.js` se encarga de toda la lógica automáticamente.


## 🧠 Decisiones y proceso de solución
- Centralicé los precios en un objeto de configuración para no repetir valores.
- Agregué listeners change e input a cada control y una función calcular que lee los valores actuales.
- Convertí valores a número con parseInt y usé operadores lógicos para evitar NaN.
- Mostré el desglose y el total en elementos del DOM cada vez que cambia algo.
- La interfaz ejecuta calcular al inicio para mostrar valores por defecto.

## ⚠️ Dificultades encontradas
- Al usar el valor de un select directamente, olvidé convertirlo a número; el cálculo concatenaba en lugar de sumar. Lo detecté al ver "1003" en lugar de 103.
- El checkbox de soporte devolvía un booleano; tuve que recordar usar .checked.
- El descuento por meses no se aplicaba correctamente porque había escrito mal la fórmula. Corregí los paréntesis.

## ✅ Pruebas realizadas
- [x] Cambiar el plan actualiza el precio base.
- [x] Aumentar usuarios multiplica correctamente.
- [x] Activar soporte añade el recargo.
- [x] Seleccionar 6 meses aplica el 10% de descuento.
- [x] El total nunca muestra NaN.

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
Navegador con el cotizador mostrando un total calculado.

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
