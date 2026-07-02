# Reto 58 - Gestor de Reservas Orientado a Objetos

## Principios de Responsabilidad Única
- **Modularidad:** Cada clase se hace cargo exclusivamente de su contexto semántico. `Reserva` calcula costos y valida su propia consistencia temporal interna, mientras que `SistemaHotelero` actúa como coordinador de colecciones, cruzando estados cruzados para determinar colisiones transaccionales.