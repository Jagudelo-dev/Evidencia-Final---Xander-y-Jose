# Reto 57 - Sistema de Cuentas Bancarias

## Decisiones y Pruebas de Invarianza
- **Uso de Campos Privados Nativo:** Se optó por la sintaxis `#` para garantizar que el motor V8 impida cualquier lectura o escritura directa desde el exterior, lanzando un error sintáctico si se intenta acceder a `cuenta.#saldo`.
- **Inmutabilidad por Referencia:** Al retornar el historial mediante `.map(m => ({ ...m }))`, los desarrolladores consumidores pueden alterar el array de salida sin comprometer la integridad de la colección cronológica nativa de la cuenta.