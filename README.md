# 🧪 Evidencia Final – JavaScript 2026

**Autores:**  
- **Jose Miguel Agudelo Torres** ([@jagudelo-dev](https://github.com/jagudelo-dev))  
- **Xander González** ([@xandergdev](https://github.com/xandergdev))

**Materia:** Desarrollo de Software – JavaScript (Manual de Retos 2026)  
**Institución:** SENA – Articulación Análisis y Desarrollo de Software

---

## 📋 Descripción

Este repositorio contiene la solución de los **72 retos** de JavaScript propuestos en el manual. Los ejercicios están organizados en **bloques de 8 retos consecutivos** para facilitar la navegación y la revisión.

| Bloque     | Retos      | Responsable                |
|------------|------------|----------------------------|
| `bloque-1` | 01 al 08 | Jose Miguel Agudelo Torres |
| `bloque-2` | 09 al 16 | Xander González |
| `bloque-3` | 17 al 24 | Jose Miguel Agudelo Torres |
| `bloque-4` | 25 al 32 | Xander González |
| `bloque-5` | 33 al 40 | Jose Miguel Agudelo Torres |
| `bloque-6` | 41 al 48 | Xander González |
| `bloque-7` | 49 al 56 | Xander González |
| `bloque-8` | 57 al 64 | Jose Miguel Agudelo Torres |
| `bloque-9` | 65 al 72 | Xander González |


Cada reto incluye su **código fuente** (`*.js`), un **README.md** con decisiones, dificultades y pruebas, y una **captura de pantalla** del resultado.

El trabajo se realiza de manera equitativa: José Miguel redacta los README y supervisa la calidad del código; Xander desarrolla los ejercicios de los bloques asignados.

---

## 🛠️ Requisitos

Necesitas tener **Node.js** instalado para ejecutar los scripts. Si no lo tienes, sigue los pasos según tu sistema operativo.

### Windows
1. Ve a [https://nodejs.org](https://nodejs.org) y descarga la versión **LTS** (recomendada).
2. Ejecuta el instalador y marca la opción **"Agregar al PATH"** (viene por defecto).
3. Abre **Símbolo del sistema** (CMD) o **PowerShell** y verifica con:
   ```bash
   node -v
   npm -v
   ```
   Deberías ver dos números de versión.

### Linux (Ubuntu/Debian)
1. Abre una terminal (Ctrl+Alt+T).
2. Ejecuta los siguientes comandos:
   ```bash
   sudo apt update
   sudo apt install nodejs npm -y
   ```
3. Verifica la instalación:
   ```bash
   node -v
   npm -v
   ```

### macOS
1. Descarga el instalador de [nodejs.org](https://nodejs.org) o usa Homebrew:
   ```bash
   brew install node
   ```
2. Verifica con:
   ```bash
   node -v
   ```

---

## 📂 Cómo llegar a la carpeta de evidencia

1. **Descarga o clona** este repositorio en tu computadora.
2. Abre una terminal y navega hasta la raíz del proyecto. Por ejemplo, si lo descargaste en `Documentos`:

   **Windows (PowerShell / CMD):**
   ```bash
   cd "C:\Users\TuUsuario\Documentos\Evidencia final - Jose y Xander"
   ```

   **Linux / macOS (Bash):**
   ```bash
   cd ~/Documentos/trabajos\ /Evidencia\ final\ -\ Jose\ y\ Xander
   ```
   > 💡 La contrabarra `\` escapa los espacios en Linux. También puedes escribir `cd "~/Documentos/trabajos /Evidencia final - Jose y Xander"` con comillas.

Una vez dentro, verás las carpetas organizadas por bloques: `bloque-1`, `bloque-2`, `bloque-3`, etc.

---

## ▶️ Cómo ejecutar los retos

Cada bloque contiene subcarpetas con los retos. Para ejecutar uno, posicionate en la carpeta del reto y lanza el archivo JavaScript correspondiente. Por ejemplo:

```bash
cd bloque-1/reto-01-bitacora   # Bloque 1, Reto 1
node app.js
```

O para los retos del bloque 2 en adelante:

```bash
cd bloque-2/Reto\ 9            # Bloque 2, Reto 9
node Reto9.js
```

Consulta siempre el `README.md` de cada reto para conocer el nombre exacto del archivo y las instrucciones detalladas.

---

## 🧪 Estructura general del repositorio

```
Evidencia final - Jose y Xander/
├── bloque-1/
│   ├── reto-01-bitacora/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-02-ficha-presentacion/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-03-perfil-usuario/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-04-inventario/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-05-calculadora-compra/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-06-coercion/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-07-credenciales/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── reto-08-analizador-mensajes/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│
├── bloque-2/
│   ├── Reto 9/
│   │   ├── Reto9.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 10/
│   │   ├── Reto10.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 11/
│   │   ├── Reto11.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 12/
│   │   ├── Reto12.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 13/
│   │   ├── Reto13.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 14/
│   │   ├── Reto14.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 15/
│   │   ├── Reto15.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 16/
│   │   ├── Reto16.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-3/
│   ├── Reto 17/
│   │   ├── Reto17.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 18/
│   │   ├── Reto18.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 19/
│   │   ├── Reto19.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 20/
│   │   ├── Reto20.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 21/
│   │   ├── Reto21.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 22/
│   │   ├── Reto22.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 23/
│   │   ├── Reto23.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 24/
│   │   ├── Reto24.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-4/
│   ├── Reto 25/
│   │   ├── Reto25.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 26/
│   │   ├── Reto26.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 27/
│   │   ├── Reto27.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 28/
│   │   ├── Reto28.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 29/
│   │   ├── Reto29.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 30/
│   │   ├── Reto30.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 31/
│   │   ├── Reto31.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 32/
│   │   ├── Reto32.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-5/
│   ├── Reto 33/
│   │   ├── Reto33.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 34/
│   │   ├── Reto34.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 35/
│   │   ├── Reto35.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 36/
│   │   ├── Reto36.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 37/
│   │   ├── Reto37.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 38/
│   │   ├── Reto38.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 39/
│   │   ├── Reto39.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 40/
│   │   ├── Reto40.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-6/
│   ├── Reto 41/
│   │   ├── Reto41.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 42/
│   │   ├── Reto42.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 43/
│   │   ├── Reto43.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 44/
│   │   ├── Reto44.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 45/
│   │   ├── Reto45.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 46/
│   │   ├── Reto46.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 47/
│   │   ├── Reto47.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 48/
│   │   ├── Reto48.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-7/
│   ├── Reto 49/
│   │   ├── Reto49.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 50/
│   │   ├── Reto50.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 51/
│   │   ├── Reto51.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 52/
│   │   ├── Reto52.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 53/
│   │   ├── Reto53.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 54/
│   │   ├── Reto54.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 55/
│   │   ├── Reto55.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 56/
│   │   ├── Reto56.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-8/
│   ├── Reto 57/
│   │   ├── Reto57.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 58/
│   │   ├── Reto58.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 59/
│   │   ├── Reto59.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 60/
│   │   ├── Reto60.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 61/
│   │   ├── Reto61.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 62/
│   │   ├── Reto62.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 63/
│   │   ├── Reto63.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 64/
│   │   ├── Reto64.js
│   │   ├── README.md
│   │   └── resultado.png
│
├── bloque-9/
│   ├── Reto 65/
│   │   ├── Reto65.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 66/
│   │   ├── Reto66.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 67/
│   │   ├── Reto67.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 68/
│   │   ├── Reto68.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 69/
│   │   ├── Reto69.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 70/
│   │   ├── Reto70.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 71/
│   │   ├── Reto71.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── Reto 72/
│   │   ├── Reto72.js
│   │   ├── README.md
│   │   └── resultado.png
└── README.md  ← este archivo
```

---

## 🤝 Créditos y división de trabajo

- **Jose Miguel Agudelo Torres** ([@jagudelo-dev](https://github.com/jagudelo-dev)): retos 1 al 8, documentación (READMEs) y aseguramiento de calidad.
- **Xander González** ([@xandergdev](https://github.com/xandergdev)): retos 9 al 72, correcciones de lógica y pruebas.

Ambos trabajan en equipo para revisar que todos los ejercicios cumplan los criterios de aceptación del manual.

---

**¡Gracias por revisar nuestra evidencia!**
