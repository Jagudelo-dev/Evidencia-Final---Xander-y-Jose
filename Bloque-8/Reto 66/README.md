# Reto 66 - Control de Sesiones y Metadatos

## ¿Por qué WeakMap y WeakSet no se pueden recorrer?
- **Imposibilidad de Iteración:** Las referencias en `WeakMap` y `WeakSet` son **débiles**. Esto significa que si un objeto no tiene ninguna otra referencia apuntando a él en toda la aplicación, el Recolector de Basura (*Garbage Collector*) lo eliminará de la memoria.
- Si estas estructuras permitieran métodos como `.keys()`, `.size` o bucles `for...of`, JavaScript se vería obligado a mantener un listado fuerte de las referencias de los objetos en memoria para poder mostrarlas, lo que anularía por completo su propósito y provocaría fugas de memoria permanentes.