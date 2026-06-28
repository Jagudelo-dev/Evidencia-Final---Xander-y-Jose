/*
 * Script generador de README.md para los retos 1-8
 * Ejecutar: node crear-readmes-primeros.js
 */

const fs = require('fs');
const path = require('path');

const retos = [
  {
    carpeta: 'reto-01-bitacora',
    archivo: 'app.js',
    titulo: 'Reto 01 - Bitácora del primer programa',
    objetivo: 'Confirmar que el entorno de JavaScript funciona y construir una salida legible usando `console.log`, comentarios y secuencias de escape.',
    proceso: `- Primero escribí un comentario de cabecera con mis datos.
- Usé \`console.group\` para organizar la salida como un reporte.
- Incluí \`\\t\` y \`\\n\` dentro de una cadena para tabular y saltar línea.
- Medí el tiempo de ejecución con \`console.time\`.`,
    dificultades: `- Olvidé cerrar el \`console.group\` y se veía anidado.
- La extensión de tiempo me confundió hasta que leí la documentación.`,
    pruebas: `- [x] Se ejecuta sin errores.
- [x] Muestra título, datos y cierre.
- [x] Se evidencia tabulación y salto de línea.`,
    mejoras: '- Probar otros estilos como `console.table`.'
  },
  {
    carpeta: 'reto-02-ficha-presentacion',
    archivo: 'presentacion.js',
    titulo: 'Reto 02 - Ficha digital de presentación',
    objetivo: 'Generar una ficha con datos académicos usando `log`, `info`, `warn` y `table`.',
    proceso: `- Definí los datos en constantes.
- Usé \`console.table\` para los datos principales y el arreglo de tecnologías.
- Documenté las diferencias entre métodos de consola.`,
    dificultades: `- Al principio puse \`console.table\` dentro de \`console.log\`.
- Investigar las diferencias entre métodos tomó más tiempo del esperado.`,
    pruebas: `- [x] Contiene los cuatro datos solicitados.
- [x] La tabla muestra las tecnologías.
- [x] Se usaron cuatro métodos de consola.`,
    mejoras: '- Implementar la extensión de estilo CSS con `%c`.'
  },
  {
    carpeta: 'reto-03-perfil-usuario',
    archivo: 'perfil.js',
    titulo: 'Reto 03 - Perfil de usuario tipado',
    objetivo: 'Distinguir `let` y `const`, reconocer tipos primitivos con `typeof`.',
    proceso: `- Usé \`const\` para ID (bigint), nombre y fecha.
- \`let\` para puntos, activo y último acceso.
- Simulé una nueva sesión y mostré cada valor con \`typeof\`.`,
    dificultades: `- El bigint me costó: tuve que poner \`n\` al final.
- \`typeof\` sobre una variable sin asignar devuelve \`undefined\`.`,
    pruebas: `- [x] Las constantes no se reasignan.
- [x] Las variables mutables cambian correctamente.
- [x] \`typeof\` se aplica a todos los datos.`,
    mejoras: '- Añadir un Symbol como clave interna.'
  },
  {
    carpeta: 'reto-04-inventario',
    archivo: 'inventario.js',
    titulo: 'Reto 04 - Control de inventario básico',
    objetivo: 'Modelar datos y reconocer `null`, `undefined`, `NaN` y conversiones simples.',
    proceso: `- Declaré producto con proveedor undefined y fechaReposicion null.
- Calculé el total y provoqué un NaN a propósito.
- Detecté con \`Number.isNaN\` y corregí.`,
    dificultades: `- Diferenciar null y undefined me llevó tiempo.
- Al principio usé \`isNaN\` global en lugar de \`Number.isNaN\`.`,
    pruebas: `- [x] El total válido es numérico.
- [x] NaN se detecta correctamente.
- [x] La tabla muestra los tipos.`,
    mejoras: '- Validar cantidades negativas.'
  },
  {
    carpeta: 'reto-05-calculadora-compra',
    archivo: 'calculadora.js',
    titulo: 'Reto 05 - Calculadora de compra inteligente',
    objetivo: 'Aplicar operadores aritméticos, de asignación, comparación y lógicos.',
    proceso: `- Calculé subtotal, descuento, base gravable, impuesto y total paso a paso.
- Usé \`+=\` para los puntos del cliente.
- Combiné condiciones con \`&&\` para el beneficio premium.`,
    dificultades: `- Puse mal los paréntesis en el descuento y obtuve un número negativo.
- La condición premium usaba \`||\` al principio, debía ser \`&&\`.`,
    pruebas: `- [x] Los cálculos se derivan de variables.
- [x] El beneficio premium depende de dos condiciones.
- [x] Los resultados están redondeados.`,
    mejoras: '- Cambio de moneda y comisión opcional.'
  },
  {
    carpeta: 'reto-06-coercion',
    archivo: 'coerciones.js',
    titulo: 'Reto 06 - Laboratorio de coerción segura',
    objetivo: 'Comparar coerción implícita y conversión explícita.',
    proceso: `- Creé un arreglo de entradas problemáticas.
- Probé sumas y comparaciones sin convertir, luego convertí explícitamente.
- Comparé \`==\` con \`===\` y documenté los resultados.`,
    dificultades: `- La cadena vacía devuelve 0 con \`Number()\`, eso fue confuso.
- Entender por qué \`null == undefined\` es true pero con \`===\` es false.`,
    pruebas: `- [x] La tabla muestra al menos cinco casos.
- [x] Se evidencia la diferencia entre == y ===.
- [x] Las conversiones inválidas son identificadas.`,
    mejoras: '- Incluir parseInt y parseFloat en la comparación.'
  },
  {
    carpeta: 'reto-07-credenciales',
    archivo: 'credenciales.js',
    titulo: 'Reto 07 - Generador de credenciales',
    objetivo: 'Usar métodos de string y template literals para producir identificadores.',
    proceso: `- Limpié el nombre con \`trim()\` y normalicé espacios.
- Extraje primer nombre y apellido, capitalicé correctamente.
- Generé correo y usuario con métodos de cadena y template literal.`,
    dificultades: `- La expresión regular para quitar tildes fue nueva para mí.
- Al principio el correo tenía espacios, usé \`replace\` por puntos.`,
    pruebas: `- [x] El nombre queda normalizado.
- [x] Usuario y correo se derivan de los datos.
- [x] La plantilla contiene varias líneas.`,
    mejoras: '- Eliminar tildes con normalize de forma más robusta.'
  },
  {
    carpeta: 'reto-08-analizador-mensajes',
    archivo: 'analizador.js',
    titulo: 'Reto 08 - Analizador de mensajes',
    objetivo: 'Aplicar búsqueda, reemplazo, conteo y segmentación de cadenas.',
    proceso: `- Definí un mensaje con espacios dobles y palabras repetidas.
- Limpié espacios y conté palabras.
- Busqué palabras prohibidas con regex \`gi\` y las reemplacé por asteriscos.
- Generé vista previa y estado de moderación.`,
    dificultades: `- La bandera \`gi\` la aprendí en esta práctica.
- Al contar palabras, no había limpiado bien los espacios dobles al inicio.`,
    pruebas: `- [x] Se conservan original y procesada.
- [x] Las palabras prohibidas se ocultan.
- [x] La vista previa no excede 30 caracteres.`,
    mejoras: '- Añadir contador de vocales y consonantes.'
  }
];

function crearREADME(reto) {
  const rutaCarpeta = path.join(__dirname, 'primeros-8-retos', reto.carpeta);
  if (!fs.existsSync(rutaCarpeta)) {
    console.error(`La carpeta ${rutaCarpeta} no existe.`);
    return;
  }

  const contenido = `# ${reto.titulo}

## 🎯 Objetivo
${reto.objetivo}

## 🛠️ Requisitos
- Tener [Node.js](https://nodejs.org) instalado (versión LTS recomendada).
- Terminal o línea de comandos (Git Bash, CMD, PowerShell, Bash).

## ▶️ Cómo ejecutar
Abre una terminal en la raíz del proyecto y ejecuta:
\`\`\`bash
cd primeros-8-retos/${reto.carpeta}
node ${reto.archivo}
\`\`\`

## 🧠 Decisiones y proceso de solución
${reto.proceso}

## ⚠️ Dificultades encontradas
${reto.dificultades}

## ✅ Pruebas realizadas
${reto.pruebas}

## 📸 Evidencia
*Captura de pantalla de la terminal ejecutando el código.*
![Salida](salida.png)

## 🔧 Mejoras pendientes
${reto.mejoras}

---

> **Nota del autor (José Miguel):** Este reto me ayudó a afianzar los fundamentos de JavaScript. Si algo puede mejorar, ¡bienvenidas las sugerencias!
`;

  fs.writeFileSync(path.join(rutaCarpeta, 'README.md'), contenido, 'utf8');
  console.log(`✅ README creado en ${reto.carpeta}`);
}

// Generar todos los READMEs
retos.forEach(crearREADME);
console.log('\n🎉 Todos los README.md para los retos 1-8 han sido creados.');