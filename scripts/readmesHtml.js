/*
 * Script generador de README.md para retos HTML enlazados (33-44)
 * Incluye manual detallado para abrir con Live Server o navegador.
 * Ejecutar: node crear-readmes-html-33-44.js
 */

const fs = require('fs');
const path = require('path');

function infoReto(num) {
  if (num >= 33 && num <= 40) return { bloque: 'bloque-5', carpeta: `Reto ${num}`, archivo: `Reto${num}.js` };
  if (num >= 41 && num <= 44) return { bloque: 'bloque-6', carpeta: `Reto ${num}`, archivo: `Reto${num}.js` };
  return null;
}

const retosData = {
  33: {
    titulo: 'Reto 33 - Tarjeta de perfil interactiva',
    resumen: 'Seleccionar elementos del DOM y actualizar contenido con textContent y createElement.',
    decisiones: `- Usé querySelector para seleccionar cada campo de la tarjeta.
- Preferí textContent para insertar texto y así evitar inyección de HTML.
- La lista de habilidades la generé con createElement y appendChild, manteniendo el control sobre el DOM.
- Asigné el atributo alt de la imagen con un valor descriptivo para accesibilidad.`,
    dificultades: `- Al principio el script no funcionaba porque lo cargué antes que el HTML. Lo solucioné agregando defer en la etiqueta script.
- Olvidé que el selector de la imagen necesitaba comillas; la consola me mostró un error que me ayudó a corregirlo.
- Quería usar innerHTML para la lista, pero recordé la regla de seguridad y preferí createElement.`,
    pruebas: `- [x] La tarjeta se llena con los datos del objeto perfil.
- [x] La lista de habilidades tiene exactamente cuatro elementos.
- [x] La consola del navegador no muestra errores.
- [x] La imagen tiene un texto alternativo visible al inspeccionar.`,
    captura: 'Navegador mostrando la tarjeta completa con foto y lista de habilidades.'
  },
  34: {
    titulo: 'Reto 34 - Tablero de tareas generado',
    resumen: 'Generar elementos DOM a partir de un array, mostrando un mensaje cuando esté vacío.',
    decisiones: `- La función renderizarTareas comienza limpiando el contenedor para evitar duplicados al llamarla varias veces.
- Cada tarjeta recibe clases según prioridad y estado, y un data-id con el identificador.
- Si el array está vacío, muestro un mensaje especial usando textContent en lugar de no mostrar nada.`,
    dificultades: `- La primera vez que probé con un array vacío no se veía ningún mensaje; había olvidado la condición y el contenedor quedaba en blanco.
- Tuve que investigar cómo asignar data-* con dataset para que cada tarjeta guardara su ID.
- El CSS inicial no distinguía las prioridades; añadí clases y estilos simples para probar.`,
    pruebas: `- [x] Con datos, aparecen tres tarjetas.
- [x] Las clases prioridad-alta, media, baja se asignan correctamente.
- [x] Al pasar un array vacío se muestra el texto "No hay tareas pendientes."
- [x] Llamar a renderizarTareas dos veces no duplica el contenido.`,
    captura: 'Navegador mostrando el tablero con tareas y el mensaje de vacío.'
  },
  35: {
    titulo: 'Reto 35 - Selector de tema visual',
    resumen: 'Cambiar la clase del body con classList y actualizar atributos ARIA.',
    decisiones: `- Uso classList.remove para quitar cualquier tema previo y luego añado el nuevo.
- Actualizo aria-pressed en todos los botones para reflejar el estado.
- Mantengo las clases de tema en una lista para removerlas fácilmente.
- Los estilos visuales están en el CSS (no los manejo desde JavaScript).`,
    dificultades: `- Al hacer clic rápido en varios botones se acumulaban clases; no estaba eliminando las anteriores correctamente. Lo resolví guardando las clases en un array y removiéndolas una a una.
- Inicialmente usé setAttribute para aria-pressed, pero luego aprendí que classList es más semántico para clases.
- Verificar que el texto del tema activo se actualizara sin errores me tomó varias pruebas.`,
    pruebas: `- [x] Al hacer clic en un tema, el body solo tiene esa clase (no se acumulan).
- [x] El atributo aria-pressed cambia al botón correspondiente.
- [x] El texto "Tema: oscuro" (o el elegido) aparece correctamente.
- [x] Probar los tres temas en orden aleatorio no rompe nada.`,
    captura: 'Navegador mostrando el tema oscuro aplicado y el texto actualizado.'
  },
  36: {
    titulo: 'Reto 36 - Indicador de progreso accesible',
    resumen: 'Actualizar una barra de progreso con atributos ARIA y estilos controlados.',
    decisiones: `- La función actualizarProgreso normaliza el valor con Math.max(0, Math.min(100, valor)).
- Cambio la clase del relleno según el estado (inicial, activo, completo) para aplicar estilos CSS.
- Los atributos aria-valuenow, aria-valuemin y aria-valuemax se actualizan sincronizados con el ancho.
- Solo el ancho se modifica con style; el resto queda en CSS.`,
    dificultades: `- Al probar con 150 el porcentaje se mostraba "150%" y el ancho sobresalía. Agregué la normalización para limitarlo.
- Los atributos ARIA no se veían en la interfaz, pero al inspeccionar con las herramientas de desarrollo noté que no había puesto aria-valuemin ni max.
- El cambio de clase no se reflejaba porque olvidé limpiar las clases anteriores con className = "" antes de añadir la nueva.`,
    pruebas: `- [x] Con valor 0 se muestra clase "inicial" y 0%.
- [x] Con 50 se muestra clase "activo" y la barra a la mitad.
- [x] Con 100 (o más) se ve clase "completo" y barra llena.
- [x] Valor negativo se convierte en 0.`,
    captura: 'Navegador con la barra de progreso en tres estados diferentes.'
  },
  37: {
    titulo: 'Reto 37 - Contador de interacciones',
    resumen: 'Manejar eventos de click y teclado, y retirar un listener temporal.',
    decisiones: `- Asigné event listeners a los botones con addEventListener, no con atributos onclick.
- El botón de disminuir se deshabilita cuando el contador llega a cero.
- Las teclas se escuchan en el documento y filtro solo las requeridas (+, -, Escape).
- Para probar removeEventListener, almacené la función en una variable y luego la removí.`,
    dificultades: `- Al retirar el listener, usé una función anónima y no funcionó. Aprendí que debo guardar una referencia exacta.
- El contador bajaba de cero si no ponía la condición en el evento de tecla "-". Lo corregí con un if.
- La tecla "+" requiere Shift en algunos teclados; lo documenté para que el usuario lo sepa.`,
    pruebas: `- [x] Clic en + aumenta el contador.
- [x] Clic en - con contador > 0 disminuye; con 0 el botón está deshabilitado.
- [x] Tecla Escape reinicia a cero.
- [x] Después de remover un listener, ese botón deja de funcionar.`,
    captura: 'Navegador mostrando el contador en 5 y el último evento registrado como "tecla +".'
  },
  38: {
    titulo: 'Reto 38 - Lista de compras con delegación',
    resumen: 'Usar un único listener en el contenedor para manejar eventos de elementos dinámicos.',
    decisiones: `- Coloqué un solo listener en el <ul> en lugar de uno por cada botón.
- Dentro del listener, identifico el botón con closest y luego la acción con data-action.
- Para completar, alterno la clase CSS; para eliminar, remuevo el <li> completo.
- Los nuevos elementos heredan el comportamiento automáticamente.`,
    dificultades: `- Al principio puse listeners individuales, pero los nuevos elementos no funcionaban. Comprendí la delegación de eventos.
- Clics en el texto del <li> sin botón causaban errores porque e.target.closest('button') devolvía null. Agregué una validación.
- El contador de pendientes no se actualizaba después de eliminar; tuve que llamar a la función de actualización tras cada acción.`,
    pruebas: `- [x] Agregar un elemento con el formulario lo muestra en la lista y responde a los botones.
- [x] Completar pone la clase "completado" y se ve tachado.
- [x] Eliminar quita el elemento de la lista.
- [x] El contador de pendientes refleja los cambios.`,
    captura: 'Navegador mostrando la lista con elementos completados y el contador actualizado.'
  },
  39: {
    titulo: 'Reto 39 - Registro de participante',
    resumen: 'Validar un formulario con preventDefault y mostrar errores por campo.',
    decisiones: `- Intercepté el evento submit con preventDefault para controlar la validación.
- Validé cada campo: nombre no vacío, correo con @, edad >= 18, términos aceptados.
- Los errores se acumulan en un array y luego se muestran en un div específico.
- Los datos válidos se normalizan (nombre sin espacios, correo en minúsculas) antes de mostrar el éxito.
- Después del envío exitoso, limpio el formulario con reset().`,
    dificultades: `- Al principio solo usé FormData y comprobaba si los campos estaban vacíos, pero no detectaba correos inválidos.
- Mostrar errores múltiples fue un reto; usar un array y luego unirlos con <br> lo resolvió.
- Olvidé limpiar los errores anteriores al validar de nuevo; se acumulaban mensajes viejos. Lo solucioné vaciando el div antes de cada validación.`,
    pruebas: `- [x] Enviar con campos vacíos muestra todos los errores.
- [x] Correo sin @ genera error específico.
- [x] Edad menor a 18 rechaza el registro.
- [x] Con todos los datos correctos se muestra el mensaje de éxito y el formulario se limpia.`,
    captura: 'Navegador con el formulario y los mensajes de error visibles.'
  },
  40: {
    titulo: 'Reto 40 - Cotizador desde formulario',
    resumen: 'Calcular un presupuesto en tiempo real al cambiar controles de formulario.',
    decisiones: `- Centralicé los precios en un objeto de configuración para no repetir valores.
- Agregué listeners change e input a cada control y una función calcular que lee los valores actuales.
- Convertí valores a número con parseInt y usé operadores lógicos para evitar NaN.
- Mostré el desglose y el total en elementos del DOM cada vez que cambia algo.
- La interfaz ejecuta calcular al inicio para mostrar valores por defecto.`,
    dificultades: `- Al usar el valor de un select directamente, olvidé convertirlo a número; el cálculo concatenaba en lugar de sumar. Lo detecté al ver "1003" en lugar de 103.
- El checkbox de soporte devolvía un booleano; tuve que recordar usar .checked.
- El descuento por meses no se aplicaba correctamente porque había escrito mal la fórmula. Corregí los paréntesis.`,
    pruebas: `- [x] Cambiar el plan actualiza el precio base.
- [x] Aumentar usuarios multiplica correctamente.
- [x] Activar soporte añade el recargo.
- [x] Seleccionar 6 meses aplica el 10% de descuento.
- [x] El total nunca muestra NaN.`,
    captura: 'Navegador con el cotizador mostrando un total calculado.'
  },
  41: {
    titulo: 'Reto 41 - Temporizador Pomodoro',
    resumen: 'Controlar setInterval y clearInterval para un temporizador de trabajo/descanso.',
    decisiones: `- El intervalo se guarda en una variable (intervalo) para poder limpiarlo luego.
- Al presionar Iniciar, primero verifico si ya hay un intervalo activo para no duplicarlo.
- Cada segundo actualizo el tiempo restante y la pantalla.
- Al llegar a 0, limpio el intervalo y cambio la fase (trabajo/descanso).
- Los botones Pausar y Reiniciar usan clearInterval y reinician variables.`,
    dificultades: `- Al principio no validaba si ya existía un intervalo, y al hacer clic rápido en Iniciar el conteo se aceleraba. Agregué la condición if (intervalo) return.
- La fase de descanso no se activaba porque olvidé cambiar el texto del elemento fase en el HTML. Luego agregué actualizarPantalla().
- El formato mm:ss con padStart no lo conocía; investigué y lo implementé.`,
    pruebas: `- [x] Iniciar arranca el conteo regresivo.
- [x] Pausar detiene el tiempo.
- [x] Reiniciar vuelve a 25:00 en fase Trabajo.
- [x] Al llegar a 0, cambia a Descanso y se detiene.
- [x] Clics repetidos en Iniciar no aceleran el conteo.`,
    captura: 'Navegador mostrando el temporizador en pausa con 12:34 restante.'
  },
  42: {
    titulo: 'Reto 42 - Ubicación con alternativa',
    resumen: 'Solicitar geolocalización con manejo de errores y ofrecer entrada manual.',
    decisiones: `- La solicitud de geolocalización solo se hace al hacer clic en el botón.
- Muestro un estado de carga mientras se espera la respuesta.
- Diferencio los tres códigos de error (PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT) con mensajes claros.
- El campo de ciudad manual siempre está disponible; al escribir se muestra la ciudad ingresada.
- Uso un timeout de 10 segundos para evitar bloqueos.`,
    dificultades: `- Al denegar el permiso en el navegador, el error no se mostraba porque olvidé pasar la función de error como segundo callback. Lo corregí.
- La propiedad code del error no es un string, sino un número; usé las constantes del objeto error (err.PERMISSION_DENIED, etc.) para comparar.
- Al principio el estado de carga no desaparecía si el usuario cancelaba manualmente; agregué un finally lógico con un setTimeout extra, pero luego opté por mostrar/ocultar con una variable booleana.`,
    pruebas: `- [x] Al permitir ubicación, se muestran latitud y longitud.
- [x] Al denegar, aparece el mensaje de permiso denegado.
- [x] La ciudad manual se puede escribir y se refleja.
- [x] El estado "Obteniendo ubicación..." aparece y se quita al terminar.`,
    captura: 'Navegador mostrando coordenadas o el mensaje de error y la ciudad manual.'
  },
  43: {
    titulo: 'Reto 43 - Notas persistentes',
    resumen: 'Guardar y recuperar notas en localStorage, manejando JSON corrupto.',
    decisiones: `- Creé dos funciones, leerNotas y guardarNotas, para centralizar el acceso al storage.
- Al leer, envuelvo JSON.parse en try/catch para capturar datos corruptos y devolver un array vacío.
- Cada operación (agregar, completar, eliminar) actualiza el array y guarda.
- Al completar una nota, realmente la elimino del array (como pide la interfaz).
- El botón "Borrar todas" pide confirmación y luego remueve la clave del storage.`,
    dificultades: `- Al probar con datos corruptos manualmente (editando localStorage), la app se rompía. Implementé el try/catch y solucionó.
- El renderizado no se actualizaba tras eliminar una nota; tuve que llamar a renderizar() dentro del evento del botón.
- La primera vez no aparecía nada; olvidé llamar a renderizar() al cargar la página. Lo agregué al final del script.`,
    pruebas: `- [x] Agregar una nota la muestra en la lista.
- [x] Recargar la página conserva las notas.
- [x] Modificar localStorage con JSON inválido no rompe la app (se ve vacía).
- [x] El botón "Borrar todas" limpia todo tras confirmar.`,
    captura: 'Navegador con tres notas y el botón de borrar.'
  },
  44: {
    titulo: 'Reto 44 - Asistente de formulario por sesión',
    resumen: 'Usar sessionStorage para guardar avance de formulario, excluyendo datos sensibles.',
    decisiones: `- Defino un array de campos permitidos (nombre, email, teléfono) y otro de sensibles (password, documento).
- Al cambiar cualquier campo permitido, guardo un objeto en sessionStorage.
- Al cargar la página, restauro los valores de los campos permitidos.
- Los campos sensibles se excluyen explícitamente y nunca se tocan.
- Al enviar el formulario, se borra el borrador y se muestra un mensaje de éxito.`,
    dificultades: `- Al principio guardaba todo el formulario, incluyendo contraseñas. El instructor me advirtió y creé la lista blanca.
- Tuve que comprobar si los elementos existían antes de setear .value, porque al añadir campos nuevos podría olvidar algún id y romper la consola.
- El aviso de privacidad no se veía; lo coloqué como un párrafo fijo que se actualiza con cada acción.`,
    pruebas: `- [x] Llenar campos permitidos, recargar: se restauran.
- [x] Campos sensibles aparecen vacíos tras recargar.
- [x] Enviar el formulario limpia sessionStorage y los campos.
- [x] El aviso de privacidad se muestra al guardar y al restaurar.`,
    captura: 'Navegador con campos restaurados y aviso de sesión.'
  }
};

function crearREADME(num) {
  const info = infoReto(num);
  if (!info) { console.error(`No hay información para el reto ${num}`); return; }
  const datos = retosData[num];
  if (!datos) { console.error(`Faltan datos para el reto ${num}`); return; }

  const rutaCarpeta = path.join(__dirname, info.bloque, info.carpeta);
  if (!fs.existsSync(rutaCarpeta)) {
    console.error(`La carpeta ${rutaCarpeta} no existe.`);
    return;
  }

  // NUEVO MANUAL DETALLADO PARA ABRIR EL RETO
  const comoEjecutar = `
### 🌐 Opción 1: Usando Visual Studio Code y Live Server (Recomendado)

1. **Instala Visual Studio Code**  
   Si no lo tienes, descárgalo gratis desde [https://code.visualstudio.com/](https://code.visualstudio.com/) e instálalo.

2. **Instala la extensión Live Server**  
   - Abre VS Code.  
   - Ve a la pestaña de extensiones (icono de cuadros en la barra izquierda, o presiona \`Ctrl+Shift+X\`).  
   - Busca **"Live Server"** (tiene un ícono morado).  
   - Haz clic en **Instalar** y espera unos segundos.

3. **Abre la carpeta del reto en VS Code**  
   - En VS Code, ve al menú \`Archivo > Abrir carpeta...\` (o \`File > Open Folder...\`).  
   - Busca y selecciona la carpeta **\`${info.carpeta}\`** que está dentro de **\`${info.bloque}\`** en este repositorio.  
   - Por ejemplo, la ruta completa podría ser:  
     \`\`\`bash
     .../Evidencia final - Jose y Xander/${info.bloque}/${info.carpeta}
     \`\`\`

4. **Inicia Live Server**  
   - En el panel izquierdo de VS Code, verás el archivo \`index.html\`.  
   - Haz clic derecho sobre \`index.html\` y selecciona la opción **\`Open with Live Server\`**.  
   - El navegador se abrirá automáticamente y cargará el reto.

5. **Ya puedes interactuar con el reto**  
   Cada vez que modifiques y guardes el código, Live Server recargará la página al instante. ¡Perfecto para hacer pruebas!

---

### 🖱️ Opción 2: Abrir directamente con el navegador (Sin instalar nada)

1. Abre tu explorador de archivos (el de Windows, Linux o macOS).
2. Navega hasta la carpeta **\`${info.carpeta}\`** dentro de este repositorio.
3. Haz **doble clic** sobre el archivo \`index.html\`.
4. Se abrirá en tu navegador predeterminado y podrás ver el reto en acción.

> ⚠️ **Nota:** Con este método no verás recarga automática al editar el código. Deberás recargar manualmente la página (F5) tras cada cambio.

---

### 📝 ¿Qué debo ver?
Al abrir el \`index.html\`, el navegador mostrará la interfaz del reto. Por ejemplo, botones, formularios o una tarjeta. El script \`${info.archivo}\` se encarga de toda la lógica automáticamente.
`;

  const contenido = `# ${datos.titulo}

## 🎯 Objetivo
${datos.resumen}

## 🛠️ Requisitos
- Navegador web moderno (Chrome, Firefox, Edge).
- [Visual Studio Code](https://code.visualstudio.com/) (opcional, pero muy recomendado).
- Extensión **Live Server** para VS Code (facilita la ejecución y prueba).

## ▶️ Cómo ejecutar
${comoEjecutar}

## 🧠 Decisiones y proceso de solución
${datos.decisiones}

## ⚠️ Dificultades encontradas
${datos.dificultades}

## ✅ Pruebas realizadas
${datos.pruebas}

## 📸 Evidencia
*Reemplaza esta línea con la captura de pantalla del navegador después de ejecutar el reto.*  
${datos.captura}

![Resultado](resultado.png)

---

> **Nota:** Este reto forma parte del manual de JavaScript 2026. Fue desarrollado siguiendo las especificaciones y criterios de aceptación.
`;

  const rutaArchivo = path.join(rutaCarpeta, 'README.md');
  fs.writeFileSync(rutaArchivo, contenido, 'utf8');
  console.log(`✅ README creado para Reto ${num}`);
}

// Generar todos los READMEs del 33 al 44
for (let num = 33; num <= 44; num++) {
  crearREADME(num);
}
console.log('\n🎉 Todos los README.md para los retos HTML (33-44) han sido creados con manual detallado.');