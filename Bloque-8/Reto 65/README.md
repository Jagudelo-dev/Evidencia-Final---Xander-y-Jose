# Reto 65 - Analizador de Frecuencia con Map

## Ventajas de Map sobre Objetos Planos
- **Seguridad en Llaves:** Un objeto plano (`{}`) hereda propiedades de su prototipo (como `constructor` o `toString`). Si el texto de entrada incluye la palabra "constructor", rompería la lógica del contador. `Map` es completamente seguro y no colisiona.
- **Preservación de Tipos e Iteración:** Mantiene el orden de inserción de forma nativa y permite transformaciones directas a arrays mediante la desestructuración de sus métodos de utilidad.