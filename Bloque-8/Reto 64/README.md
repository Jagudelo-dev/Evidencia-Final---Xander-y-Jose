# Reto 64 - Compositor de Reportes Funcional

## Decisiones de Arquitectura
- **Inmutabilidad y Funciones Puras:** Cada etapa del pipeline genera un nuevo contexto en memoria. El array original de transacciones comerciales se mantiene intacto, eliminando efectos secundarios colaterales.
- **Rendimiento por Memoización:** Se implementó una función de orden superior para retener resultados en un `Map` indexado por la huella estructural JSON del lote. Esto reduce la complejidad computacional a $O(1)$ en ejecuciones idénticas repetitivas.