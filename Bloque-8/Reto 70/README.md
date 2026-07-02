# Reto 70 - Caza de Errores con Pruebas Automatizadas

## Decisiones Técnicas y Cobertura
- **Simulación del Runner:** Se optó por construir una función `assertEqual` aislada para evitar dependencias externas de librerías como Jest o Mocha, manteniendo el código nativo Vanilla 2026.
- **🌟 Extensión de Propiedades:** El diseño lógico impide de forma estricta la existencia de saldos comerciales o cálculos finales negativos bajo cualquier mutación de argumentos, garantizando la consistencia del estado de facturación.