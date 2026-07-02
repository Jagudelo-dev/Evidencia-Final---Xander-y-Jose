# Reto 61 - Contador Encapsulado

## Decisiones de Diseño Lógico
- **Encapsulamiento Léxico Absoluto:** Al destruir el bloque de activación principal tras la ejecución de `crearContador`, las variables `valorActual` e `inicial` quedan suspendidas en el montón de memoria (heap) referenciadas exclusivamente por los punteros internos de los métodos expuestos, imposibilitando cualquier lectura directa externa.