# Reto 68 - Explorador de Árbol con Generadores

## Criterios de Evaluación y Delegación
- **No Aplanamiento Preventivo:** El árbol conserva su estructura anidada intacta; el recorrido se realiza en tiempo de ejecución de manera perezosa mediante `yield*`.
- **Estrategia Contra Referencias Cíclicas:** La inyección de una colección de identidad como `Set` permite evaluar si el puntero de memoria del sub-objeto ya ha sido procesado, mitigando caídas por desbordamiento de pila (*stack overflow*).