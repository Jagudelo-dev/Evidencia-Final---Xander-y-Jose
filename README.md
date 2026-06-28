# 🧪 Evidencia Final – JavaScript 2026

**Autores:**  
- **Jose Miguel Agudelo Torres** ([@jagudelo-dev](https://github.com/jagudelo-dev))  
- **Xander González** ([@xandergdev](https://github.com/xandergdev))

**Materia:** Desarrollo de Software – JavaScript (Manual de Retos 2026)  
**Institución:** SENA – Articulación Análisis y Desarrollo de Software

---

## 📋 Descripción

Este repositorio contiene la solución de los **16 retos** de JavaScript propuestos en el manual, divididos en dos bloques:

| Bloque               | Retos      | Responsable                |
|----------------------|------------|----------------------------|
| `primeros-8-retos`   | 01 al 08   | Jose Miguel Agudelo Torres |
| `segundos-8-retos`   | 09 al 16   | Xander González            |

Cada reto incluye su **código fuente** (`*.js`), un **README.md** con decisiones, dificultades y pruebas, y una **captura de pantalla** del resultado.

El trabajo se realizó de manera equitativa: José Miguel redactó todos los README y supervisó la calidad del código; Xander desarrolló los ejercicios del 9 al 16.

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
Deberías ver dos números de versión.

### Linux (Ubuntu/Debian)
Abre una terminal (Ctrl+Alt+T).

Ejecuta los siguientes comandos:

## bash
sudo apt update
sudo apt install nodejs npm -y
Verifica la instalación:

## bash
node -v
npm -v
macOS
Descarga el instalador de nodejs.org o usa Homebrew:

## bash
brew install node
Verifica con node -v.

### 📂 Cómo llegar a la carpeta de evidencia
Descarga o clona este repositorio en tu computadora.

Abre una terminal y navega hasta la raíz del proyecto. Por ejemplo, si lo descargaste en Documentos:

## Windows (PowerShell / CMD):

## bash
cd "C:\Users\TuUsuario\Documentos\Evidencia final - Jose y Xander"
## Linux / macOS (Bash):

## bash
cd ~/Documentos/trabajos\ /Evidencia\ final\ -\ Jose\ y\ Xander
💡 La contrabarra \ escapa los espacios en Linux. También puedes escribir cd "~/Documentos/trabajos /Evidencia final - Jose y Xander" con comillas.

Una vez dentro, verás las carpetas primeros-8-retos y segundos-8-retos.

### ▶️ Cómo ejecutar los retos
Dentro de la raíz del proyecto, sigue las instrucciones de cada README individual. Normalmente será:

## bash
cd primeros-8-retos/reto-01-bitacora   # o el número que desees
node app.js
o para los retos del 9 al 16:

## bash
cd segundos-8-retos/Reto\ 9
node Reto9.js
Cada carpeta contiene su propio README.md con el paso a paso y las pruebas documentadas.

### 🧪 Estructura general del repositorio

Evidencia final - Jose y Xander/
├── primeros-8-retos/
│   ├── reto-01-bitacora/
│   │   ├── app.js
│   │   ├── README.md
│   │   └── salida.png
│   ├── ...
│   └── reto-08-analizador-mensajes/
├── segundos-8-retos/
│   ├── Reto 9/
│   │   ├── Reto9.js
│   │   ├── README.md
│   │   └── resultado.png
│   ├── ...
│   └── Reto 16/
└── README.md  ← este archivo
## 🤝 Créditos y división de trabajo
Jose Miguel Agudelo Torres (@jagudelo-dev): retos 1 al 8, documentación (READMEs) y aseguramiento de calidad.

Xander González (@xandergdev): retos 9 al 16, correcciones de lógica y pruebas.

Ambos trabajaron en equipo para revisar que todos los ejercicios cumplieran los criterios de aceptación del manual.

