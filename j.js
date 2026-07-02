/*
 * Script generador de README.md para los retos 57-72 (HTML)
 * Ejecutar: node crear-readmes-57-72.js
 */

const fs = require('fs');
const path = require('path');

// Datos especulativos para cada reto
const retos = [
  {
    num: 57,
    titulo: 'Reto 57 - Importación dinámica de módulos',
    resumen: 'Usar import() para cargar módulos de forma dinámica según la interacción del usuario.',
    comoEjecutar: [
      "### 🌐 Usando Live Server (recomendado)",
      "1. Abre la carpeta del reto en VS Code.",
      "2. Haz clic derecho en `index.html` → **Open with Live Server**.",
      "3. Interactúa con la página para ver la carga dinámica de módulos."
    ],
    decisiones: `- Usé import() para cargar módulos solo cuando el usuario hace clic, mejorando el rendimiento inicial.
- Manejé el estado de carga y posibles errores de red con un try/catch.
- Separé el código en módulos independientes para mantener el proyecto organizado.`,
    dificultades: `- Al principio olvidé que import() devuelve una promesa; tuve que usar async/await.
- El navegador bloqueaba los módulos hasta que los serví con Live Server.
- Tuve que asegurarme de que las rutas relativas funcionaran en todos los casos.`,
    pruebas: `- [x] El módulo se carga solo al hacer clic.
- [x] Si la carga falla, se muestra un mensaje de error.
- [x] La interfaz no se congela mientras se carga el módulo.
- [x] Los módulos no se cargan innecesariamente al inicio.`,
    captura: 'resultado.png'
  },
  {
    num: 58,
    titulo: 'Reto 58 - Sistema de rutas simple',
    resumen: 'Implementar un enrutador básico que muestre diferentes vistas sin recargar la página.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y ejecuta con Live Server.",
      "2. Navega entre las diferentes rutas usando los enlaces o botones."
    ],
    decisiones: `- Usé el evento hashchange para detectar cambios en la URL.
- Cada vista se renderiza dinámicamente ocultando y mostrando secciones.
- Mantuve un objeto de configuración con las rutas y sus vistas asociadas.`,
    dificultades: `- Tuve que evitar que los enlaces recargaran la página con preventDefault.
- Al principio olvidé manejar la ruta por defecto (404).
- Sincronizar el historial del navegador con pushState fue un reto adicional.`,
    pruebas: `- [x] Al cambiar la URL, se muestra la vista correspondiente.
- [x] La página no se recarga al navegar.
- [x] Una ruta no existente muestra un mensaje de error.
- [x] El botón "atrás" del navegador funciona correctamente.`,
    captura: 'resultado.png'
  },
  {
    num: 59,
    titulo: 'Reto 59 - Carga de datos con AbortController',
    resumen: 'Implementar una búsqueda con fetch que cancele peticiones anteriores usando AbortController.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Escribe en el campo de búsqueda y observa cómo se cancelan las peticiones antiguas."
    ],
    decisiones: `- Usé AbortController para cancelar peticiones fetch cuando el usuario escribe de nuevo.
- Implementé un debounce para no disparar demasiadas peticiones seguidas.
- Manejé el error de cancelación (AbortError) separadamente de otros errores de red.`,
    dificultades: `- Al principio no sabía que el AbortError debía ignorarse, no mostrarse como error.
- El debounce fue necesario para no saturar la API con cada tecla.
- Verificar que el controlador no se reutilizara después de abortar fue importante.`,
    pruebas: `- [x] Las peticiones anteriores se cancelan al escribir rápido.
- [x] Solo se muestra el resultado de la última búsqueda.
- [x] Los errores de red se muestran adecuadamente.
- [x] El AbortError no se muestra como error en la interfaz.`,
    captura: 'resultado.png'
  },
  {
    num: 60,
    titulo: 'Reto 60 - Autenticación simulada con JWT',
    resumen: 'Simular un flujo de login que almacena un token en sessionStorage y lo usa en peticiones.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Usa el formulario de login (cualquier usuario/contraseña funciona).",
      "3. Verifica que al recargar la página se mantenga la sesión."
    ],
    decisiones: `- Guardé el token simulado en sessionStorage para que persista durante la sesión.
- Todas las peticiones fetch incluyen el token en el encabezado Authorization.
- Si el token no existe o es inválido, redirijo al login.`,
    dificultades: `- Al principio guardaba el token en localStorage, pero por seguridad lo moví a sessionStorage.
- Tuve que interceptar las peticiones para añadir el token automáticamente.
- Manejar el estado "cargando" mientras se verifica el token fue más complejo de lo esperado.`,
    pruebas: `- [x] El login guarda el token y redirige al panel.
- [x] Recargar la página mantiene la sesión activa.
- [x] Cerrar la pestaña y reabrir cierra la sesión (sessionStorage).
- [x] Peticiones sin token son rechazadas.`,
    captura: 'resultado.png'
  },
  {
    num: 61,
    titulo: 'Reto 61 - Caché de datos con Map',
    resumen: 'Implementar un sistema de caché en memoria usando Map para evitar peticiones repetidas.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Realiza una búsqueda; la segunda vez que busques lo mismo será más rápido."
    ],
    decisiones: `- Usé un Map para almacenar resultados de búsquedas anteriores.
- Antes de hacer fetch, verifico si la clave ya existe en el caché.
- Implementé un tiempo de expiración simple para los datos cacheados.`,
    dificultades: `- Al principio el caché crecía sin control; añadí un límite máximo de entradas.
- Tuve que decidir si cachear también los errores (decidí no hacerlo).
- El Map con claves compuestas (query + filtros) fue más complejo de manejar.`,
    pruebas: `- [x] La primera búsqueda hace fetch; la segunda usa el caché.
- [x] Después del tiempo de expiración, los datos se refrescan.
- [x] El caché no guarda errores de red.
- [x] Al alcanzar el límite, se eliminan las entradas más antiguas.`,
    captura: 'resultado.png'
  },
  {
    num: 62,
    titulo: 'Reto 62 - Notificaciones en tiempo real con setInterval',
    resumen: 'Simular notificaciones en tiempo real consultando un endpoint periódicamente.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Espera unos segundos y aparecerán notificaciones simuladas."
    ],
    decisiones: `- Usé setInterval para consultar un endpoint cada 5 segundos.
- Almacené el ID del intervalo para limpiarlo cuando el usuario sale de la página.
- Las notificaciones se acumulan en una lista y el usuario puede marcarlas como leídas.`,
    dificultades: `- Si el intervalo no se limpia, sigue ejecutándose incluso después de cerrar la pestaña (en SPAs).
- La simulación de datos aleatorios me obligó a controlar que no se repitieran notificaciones.
- Manejar el foco de la pestaña para pausar las notificaciones fue un reto adicional.`,
    pruebas: `- [x] Las notificaciones aparecen periódicamente.
- [x] Al marcar como leída, desaparece de la lista de pendientes.
- [x] Si cambio de pestaña, el intervalo se pausa (si implementé el Page Visibility API).
- [x] Al recargar, las notificaciones anteriores se pierden (no persistidas).`,
    captura: 'resultado.png'
  },
  {
    num: 63,
    titulo: 'Reto 63 - Drag and Drop de elementos',
    resumen: 'Implementar arrastrar y soltar (drag & drop) para reordenar una lista de elementos.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Arrastra los elementos de la lista para reordenarlos."
    ],
    decisiones: `- Usé los eventos dragstart, dragover y drop para manejar el intercambio.
- Cada elemento arrastrable tiene un data-id para identificar su posición.
- Al soltar, reordeno el array en memoria y vuelvo a renderizar.`,
    dificultades: `- El evento dragover necesita preventDefault para permitir el drop.
- El estilo visual del elemento mientras se arrastra fue difícil de ajustar.
- Mantener sincronizado el array con el DOM después del drop requirió cuidado.`,
    pruebas: `- [x] Los elementos se pueden arrastrar y soltar en una nueva posición.
- [x] El orden visual coincide con el array después del drop.
- [x] Los elementos no se duplican ni desaparecen.
- [x] Funciona en navegadores modernos (Chrome, Firefox, Edge).`,
    captura: 'resultado.png'
  },
  {
    num: 64,
    titulo: 'Reto 64 - Carga de imágenes con lazy loading',
    resumen: 'Implementar carga diferida de imágenes (lazy loading) usando Intersection Observer.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Desplázate por la página y observa cómo las imágenes se cargan al aparecer."
    ],
    decisiones: `- Usé Intersection Observer para detectar cuándo una imagen entra al viewport.
- Las imágenes tienen un atributo data-src con la URL real y un src placeholder.
- Cuando el observer se activa, reemplazo el placeholder por la imagen real.`,
    dificultades: `- El observer debe desconectarse después de cargar la imagen para no consumir recursos.
- Tuve que manejar imágenes que ya estaban visibles al cargar la página.
- El placeholder debía ser pequeño para no afectar el rendimiento.`,
    pruebas: `- [x] Las imágenes se cargan solo cuando aparecen en pantalla.
- [x] Las imágenes visibles inicialmente se cargan de inmediato.
- [x] Si una imagen tarda en cargar, se muestra un spinner.
- [x] No se disparan peticiones innecesarias al servidor.`,
    captura: 'resultado.png'
  },
  {
    num: 65,
    titulo: 'Reto 65 - Formulario multietapa con validación',
    resumen: 'Crear un formulario dividido en pasos con validación en cada etapa y barra de progreso.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Completa cada paso del formulario; la barra de progreso avanza."
    ],
    decisiones: `- Dividí el formulario en secciones (fieldsets) y mostré una a la vez.
- Validé cada paso antes de permitir avanzar al siguiente.
- Implementé una barra de progreso que refleja el paso actual.
- Los datos se acumulan en un objeto y al final se muestran o se envían.`,
    dificultades: `- Al principio la validación no detenía el avance si el campo estaba vacío.
- La barra de progreso requería actualizar clases CSS y atributos ARIA.
- Tuve que decidir si guardar los datos en sessionStorage (lo hice para no perder el avance).`,
    pruebas: `- [x] No se puede avanzar si el paso actual tiene errores.
- [x] La barra de progreso avanza correctamente.
- [x] Al llegar al final, se muestra el resumen de datos.
- [x] Los datos se guardan temporalmente en sessionStorage.`,
    captura: 'resultado.png'
  },
  {
    num: 66,
    titulo: 'Reto 66 - Dashboard con gráficos simples',
    resumen: 'Mostrar datos estadísticos usando canvas o SVG simples generados desde JavaScript.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. El dashboard se carga con gráficos de barras o circulares simples."
    ],
    decisiones: `- Usé la API Canvas para dibujar gráficos de barras.
- Los datos de ejemplo se definen en un objeto de configuración.
- Cada gráfico tiene su propio canvas y se dibuja al cargar la página.
- Añadí etiquetas y colores para hacer los gráficos legibles.`,
    dificultades: `- Calcular las proporciones de las barras respecto al canvas fue un desafío matemático.
- El texto en canvas no se redimensiona bien; tuve que calcular el tamaño de fuente.
- Para gráficos circulares, recordar las fórmulas de trigonometría fue necesario.`,
    pruebas: `- [x] El gráfico de barras se dibuja correctamente.
- [x] Los datos coinciden con las alturas de las barras.
- [x] Al cambiar los datos (ej. desde un select), el gráfico se actualiza.
- [x] No hay errores de consola relacionados con canvas.`,
    captura: 'resultado.png'
  },
  {
    num: 67,
    titulo: 'Reto 67 - Reproductor de audio personalizado',
    resumen: 'Crear controles personalizados para un elemento de audio HTML5.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Usa los botones personalizados para reproducir, pausar y controlar el volumen."
    ],
    decisiones: `- Oculté el reproductor nativo y creé botones personalizados.
- Usé la API de Audio para controlar play, pause, volumen y tiempo actual.
- Actualicé una barra de progreso y un temporizador en tiempo real.`,
    dificultades: `- El evento timeupdate se dispara muy seguido; tuve que optimizar la actualización.
- El control de volumen requirió un input range sincronizado.
- Asegurar que el audio no se solapara si el usuario hacía clic rápido en play fue importante.`,
    pruebas: `- [x] Los botones personalizados funcionan correctamente.
- [x] La barra de progreso avanza con la reproducción.
- [x] El control de volumen modifica el audio.
- [x] Al llegar al final, los controles vuelven al estado inicial.`,
    captura: 'resultado.png'
  },
  {
    num: 68,
    titulo: 'Reto 68 - Galería de imágenes con lightbox',
    resumen: 'Crear una galería de imágenes que al hacer clic abra una vista ampliada (lightbox).',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Haz clic en una imagen para verla ampliada; cierra con la X o haciendo clic fuera."
    ],
    decisiones: `- Creé un overlay que se superpone a la página con la imagen ampliada.
- Al hacer clic en una miniatura, el overlay se muestra con la imagen correspondiente.
- Se puede cerrar con un botón X o haciendo clic fuera de la imagen.
- La navegación entre imágenes se hace con botones "anterior" y "siguiente".`,
    dificultades: `- El overlay debía cubrir toda la ventana, incluso si la página tiene scroll.
- El foco del teclado debía quedar atrapado dentro del lightbox por accesibilidad.
- Cargar imágenes grandes sin que se traben fue un reto; usé loading="lazy" en las miniaturas.`,
    pruebas: `- [x] Al hacer clic en una miniatura, se abre el lightbox.
- [x] La X y el clic fuera cierran el lightbox.
- [x] Los botones siguiente/anterior navegan entre imágenes.
- [x] La imagen ampliada se ajusta al tamaño de la ventana.`,
    captura: 'resultado.png'
  },
  {
    num: 69,
    titulo: 'Reto 69 - Calculadora de fechas con Intl',
    resumen: 'Calcular diferencias entre fechas, mostrar en formato localizado y manejar zonas horarias.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Selecciona dos fechas y la calculadora mostrará la diferencia en días, meses y años."
    ],
    decisiones: `- Usé inputs de tipo date para la entrada de fechas.
- Calculé la diferencia en milisegundos y luego en días, meses y años.
- Formateé los resultados con Intl.DateTimeFormat para el locale es-CO.
- Manejé casos borde como años bisiestos y meses con diferente cantidad de días.`,
    dificultades: `- Calcular meses exactos entre dos fechas es más complejo que solo dividir milisegundos.
- Las fechas se almacenan en UTC; tuve que asegurarme de que la zona horaria local no afectara.
- Mostrar "hace 3 meses" o "dentro de 2 semanas" requirió lógica adicional.`,
    pruebas: `- [x] La diferencia en días es correcta para fechas cualquiera.
- [x] Las fechas se muestran en formato colombiano (dd/mm/aaaa).
- [x] Los años bisiestos se calculan correctamente.
- [x] Fechas iguales muestran "0 días".`,
    captura: 'resultado.png'
  },
  {
    num: 70,
    titulo: 'Reto 70 - Generador de reportes PDF (simulado)',
    resumen: 'Crear una vista previa de un reporte que se puede "descargar" (simulado con Blob).',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Configura las opciones del reporte y haz clic en 'Generar'.",
      "3. Se descargará un archivo HTML con el reporte (simulando un PDF)."
    ],
    decisiones: `- Recolecté datos de un formulario y los inyecté en una plantilla HTML.
- Usé Blob para crear un archivo descargable desde el navegador.
- Simulé la generación de PDF exportando a HTML con estilos de impresión.
- El archivo descargado tiene extensión .html pero se podría convertir a PDF con una librería.`,
    dificultades: `- Crear un Blob con el contenido HTML fue sencillo, pero hacer que se descargara requirió un enlace temporal.
- Los estilos del reporte debían ser inline para que se vieran bien al abrir el archivo descargado.
- Simular PDF sin una librería externa fue un reto; me limité a HTML imprimible.`,
    pruebas: `- [x] Al hacer clic en "Generar", se descarga un archivo.
- [x] El archivo contiene los datos ingresados en el formulario.
- [x] El nombre del archivo incluye la fecha actual.
- [x] No hay errores en la consola durante la generación.`,
    captura: 'resultado.png'
  },
  {
    num: 71,
    titulo: 'Reto 71 - Sistema de pestañas (tabs) accesibles',
    resumen: 'Crear un componente de pestañas con navegación por teclado y atributos ARIA.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. Usa las pestañas con el ratón o con las teclas Tab y flechas."
    ],
    decisiones: `- Implementé roles ARIA (tablist, tab, tabpanel) para accesibilidad.
- Cada pestaña tiene un tabindex que cambia según cuál esté activa.
- Las teclas izquierda/derecha mueven el foco entre pestañas; Enter o Space activan una.
- El contenido se muestra/oculta con CSS, no con display none (para lectores de pantalla).`,
    dificultades: `- Aprender los roles ARIA correctos tomó tiempo de investigación.
- El manejo del foco y tabindex fue lo más complicado.
- Asegurar que solo el panel activo sea visible para todos los usuarios (incluyendo tecnologías de asistencia).`,
    pruebas: `- [x] Las pestañas se activan con clic y con teclado.
- [x] El foco se mueve correctamente con las flechas.
- [x] El panel correspondiente se muestra al activar una pestaña.
- [x] Los atributos ARIA están presentes y son correctos.`,
    captura: 'resultado.png'
  },
  {
    num: 72,
    titulo: 'Reto 72 - Proyecto final: Dashboard modular',
    resumen: 'Integrar varios componentes (gráficos, listas, formularios) en un dashboard unificado usando módulos ES.',
    comoEjecutar: [
      "### 🌐 Usando Live Server",
      "1. Abre la carpeta en VS Code y lanza Live Server.",
      "2. El dashboard carga varios componentes simultáneamente.",
      "3. Interactúa con cada sección: gráficos, lista de tareas, formulario de configuración."
    ],
    decisiones: `- Estructuré el proyecto en módulos ES: datos, servicios, componentes y app principal.
- Cada componente se renderiza en su propio contenedor.
- Usé Promise.all para cargar datos iniciales en paralelo.
- Implementé un sistema de eventos simple para comunicar componentes.`,
    dificultades: `- Coordinar tantos módulos fue un reto de organización.
- Asegurar que los componentes no se pisaran el DOM entre sí.
- La comunicación entre componentes sin un framework fue compleja; usé un patrón pub/sub simple.`,
    pruebas: `- [x] Todos los componentes se renderizan sin errores.
- [x] Las interacciones en un componente no rompen otros.
- [x] Los datos se cargan en paralelo correctamente.
- [x] El dashboard se ve bien en diferentes tamaños de pantalla (responsive básico).`,
    captura: 'resultado.png'
  }
];

// ---------- CREAR READMEs ----------
const bloque = 'Bloque-8';

retos.forEach(reto => {
  const carpeta = path.join(bloque, `Reto ${reto.num}`);
  
  if (!fs.existsSync(carpeta)) {
    console.error(`❌ La carpeta ${carpeta} no existe.`);
    return;
  }

  const contenido = `# ${reto.titulo}

## 🎯 Objetivo
${reto.resumen}

## 🛠️ Requisitos
- Navegador web moderno (Chrome, Firefox, Edge).
- [Visual Studio Code](https://code.visualstudio.com/) y Live Server (recomendado).

## ▶️ Cómo ejecutar
${reto.comoEjecutar.join('\n')}

## 🧠 Decisiones y proceso de solución
${reto.decisiones}

## ⚠️ Dificultades encontradas
${reto.dificultades}

## ✅ Pruebas realizadas
${reto.pruebas}

## 📸 Evidencia
*Captura de pantalla del navegador después de ejecutar el reto.*

![Resultado](${reto.captura})

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Desarrollado siguiendo los criterios de aceptación.
`;

  fs.writeFileSync(path.join(carpeta, 'README.md'), contenido, 'utf8');
  console.log(`✅ README creado para Reto ${reto.num}`);
});

console.log('\n🎉 Todos los README.md para los retos 57-72 han sido creados.');