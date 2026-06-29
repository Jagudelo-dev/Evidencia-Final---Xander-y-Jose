/*
 * Script generador del README.md principal (raíz)
 * Ejecutar: node generar-readme-raiz.js
 */

const fs = require('fs');
const path = require('path');

// Configuración de autores
const autores = {
  jose: {
    nombre: 'Jose Miguel Agudelo Torres',
    github: '@jagudelo-dev',
    url: 'https://github.com/jagudelo-dev'
  },
  xander: {
    nombre: 'Xander González',
    github: '@xandergdev',
    url: 'https://github.com/xandergdev'
  }
};

// Mapeo de bloques a responsable
const bloques = [
  { numero: 1, retos: [1, 8], responsable: 'jose' },
  { numero: 2, retos: [9, 16], responsable: 'xander' },
  { numero: 3, retos: [17, 24], responsable: 'xander' },
  { numero: 4, retos: [25, 32], responsable: 'xander' },
  { numero: 5, retos: [33, 40], responsable: 'xander' },
  { numero: 6, retos: [41, 48], responsable: 'xander' },
  { numero: 7, retos: [49, 56], responsable: 'xander' },
  { numero: 8, retos: [57, 64], responsable: 'xander' },
  { numero: 9, retos: [65, 72], responsable: 'xander' }
];

// Función para generar la tabla de bloques
function generarTabla() {
  let tabla = '| Bloque     | Retos      | Responsable                |\n';
  tabla +=    '|------------|------------|----------------------------|\n';
  bloques.forEach(b => {
    const resp = b.responsable === 'jose' ? autores.jose.nombre : autores.xander.nombre;
    tabla += `| \`bloque-${b.numero}\` | ${String(b.retos[0]).padStart(2, '0')} al ${String(b.retos[1]).padStart(2, '0')} | ${resp} |\n`;
  });
  return tabla;
}

// Función para generar el árbol de directorios (simulado, asume que todo existe)
function generarEstructura() {
  let estructura = 'Evidencia final - Jose y Xander/\n';
  estructura += '├── bloque-1/\n';
  // Bloque 1 con nombres especiales
  const nombresBloque1 = [
    'reto-01-bitacora', 'reto-02-ficha-presentacion', 'reto-03-perfil-usuario',
    'reto-04-inventario', 'reto-05-calculadora-compra', 'reto-06-coercion',
    'reto-07-credenciales', 'reto-08-analizador-mensajes'
  ];
  nombresBloque1.forEach((nombre, i) => {
    const prefijo = (i === 7) ? '│   └── ' : '│   ├── ';
    estructura += `│   ├── ${nombre}/\n`;
    estructura += `│   │   ├── app.js\n`; // asumiendo que todos son app.js en bloque1 (ajusta si hay presentacion.js)
    estructura += `│   │   ├── README.md\n`;
    estructura += `│   │   └── salida.png\n`;
  });
  estructura += '│\n';

  // Bloques 2 a 9 con nombres "Reto X"
  for (let b = 2; b <= 9; b++) {
    estructura += `├── bloque-${b}/\n`;
    const inicio = (b-1)*8 + 1;
    const fin = inicio + 7;
    for (let r = inicio; r <= fin; r++) {
      const esUltimo = (r === fin) && (b === 9);
      const prefijo = esUltimo ? '│   └── ' : '│   ├── ';
      estructura += `│   ├── Reto ${r}/\n`;
      estructura += `│   │   ├── Reto${r}.js\n`;
      estructura += `│   │   ├── README.md\n`;
      estructura += `│   │   └── resultado.png\n`;
    }
    if (b < 9) estructura += '│\n';
  }
  estructura += '└── README.md  ← este archivo';
  return estructura;
}

// Construir el contenido del README
const contenido = `# 🧪 Evidencia Final – JavaScript 2026

**Autores:**  
- **${autores.jose.nombre}** ([${autores.jose.github}](${autores.jose.url}))  
- **${autores.xander.nombre}** ([${autores.xander.github}](${autores.xander.url}))

**Materia:** Desarrollo de Software – JavaScript (Manual de Retos 2026)  
**Institución:** SENA – Articulación Análisis y Desarrollo de Software

---

## 📋 Descripción

Este repositorio contiene la solución de los **72 retos** de JavaScript propuestos en el manual. Los ejercicios están organizados en **bloques de 8 retos consecutivos** para facilitar la navegación y la revisión.

${generarTabla()}

Cada reto incluye su **código fuente** (\`*.js\`), un **README.md** con decisiones, dificultades y pruebas, y una **captura de pantalla** del resultado.

El trabajo se realiza de manera equitativa: José Miguel redacta los README y supervisa la calidad del código; Xander desarrolla los ejercicios de los bloques asignados.

---

## 🛠️ Requisitos

Necesitas tener **Node.js** instalado para ejecutar los scripts. Si no lo tienes, sigue los pasos según tu sistema operativo.

### Windows
1. Ve a [https://nodejs.org](https://nodejs.org) y descarga la versión **LTS** (recomendada).
2. Ejecuta el instalador y marca la opción **"Agregar al PATH"** (viene por defecto).
3. Abre **Símbolo del sistema** (CMD) o **PowerShell** y verifica con:
   \`\`\`bash
   node -v
   npm -v
   \`\`\`
   Deberías ver dos números de versión.

### Linux (Ubuntu/Debian)
1. Abre una terminal (Ctrl+Alt+T).
2. Ejecuta los siguientes comandos:
   \`\`\`bash
   sudo apt update
   sudo apt install nodejs npm -y
   \`\`\`
3. Verifica la instalación:
   \`\`\`bash
   node -v
   npm -v
   \`\`\`

### macOS
1. Descarga el instalador de [nodejs.org](https://nodejs.org) o usa Homebrew:
   \`\`\`bash
   brew install node
   \`\`\`
2. Verifica con:
   \`\`\`bash
   node -v
   \`\`\`

---

## 📂 Cómo llegar a la carpeta de evidencia

1. **Descarga o clona** este repositorio en tu computadora.
2. Abre una terminal y navega hasta la raíz del proyecto. Por ejemplo, si lo descargaste en \`Documentos\`:

   **Windows (PowerShell / CMD):**
   \`\`\`bash
   cd "C:\\Users\\TuUsuario\\Documentos\\Evidencia final - Jose y Xander"
   \`\`\`

   **Linux / macOS (Bash):**
   \`\`\`bash
   cd ~/Documentos/trabajos\\ /Evidencia\\ final\\ -\\ Jose\\ y\\ Xander
   \`\`\`
   > 💡 La contrabarra \`\\\` escapa los espacios en Linux. También puedes escribir \`cd "~/Documentos/trabajos /Evidencia final - Jose y Xander"\` con comillas.

Una vez dentro, verás las carpetas organizadas por bloques: \`bloque-1\`, \`bloque-2\`, \`bloque-3\`, etc.

---

## ▶️ Cómo ejecutar los retos

Cada bloque contiene subcarpetas con los retos. Para ejecutar uno, posicionate en la carpeta del reto y lanza el archivo JavaScript correspondiente. Por ejemplo:

\`\`\`bash
cd bloque-1/reto-01-bitacora   # Bloque 1, Reto 1
node app.js
\`\`\`

O para los retos del bloque 2 en adelante:

\`\`\`bash
cd bloque-2/Reto\\ 9            # Bloque 2, Reto 9
node Reto9.js
\`\`\`

Consulta siempre el \`README.md\` de cada reto para conocer el nombre exacto del archivo y las instrucciones detalladas.

---

## 🧪 Estructura general del repositorio

\`\`\`
${generarEstructura()}
\`\`\`

---

## 🤝 Créditos y división de trabajo

- **${autores.jose.nombre}** ([${autores.jose.github}](${autores.jose.url})): retos 1 al 8, documentación (READMEs) y aseguramiento de calidad.
- **${autores.xander.nombre}** ([${autores.xander.github}](${autores.xander.url})): retos 9 al 72, correcciones de lógica y pruebas.

Ambos trabajan en equipo para revisar que todos los ejercicios cumplan los criterios de aceptación del manual.

---

**¡Gracias por revisar nuestra evidencia!**
`;

// Escribir el archivo README.md en la raíz
fs.writeFileSync(path.join(__dirname, 'README.md'), contenido, 'utf8');
console.log('✅ README.md principal generado exitosamente.');