# Reto 63 - Actualizador Inmutable de Estado

## Justificación del Algoritmo de Copia Selectiva
- **Structural Sharing (Compartición Estructural):** En lugar de realizar un clonado profundo indiscriminado (`structuredClone()`), el cual sobrecargaría el recolector de basura de V8 duplicando objetos estáticos, el operador de propagación (`...`) copia exclusivamente las referencias del nodo raíz afectado. 
- Los sub-objetos no modificados (como la propiedad `usuario`) mantienen su puntero de memoria compartido, garantizando un rendimiento óptimo de almacenamiento en aplicaciones de alta escala.