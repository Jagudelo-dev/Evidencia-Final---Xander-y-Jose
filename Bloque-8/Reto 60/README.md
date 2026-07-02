# Reto 60 - Robot por Composición

## Reflexión Breve: Composición vs Herencia Rígida
La composición evita el antipatrón del "problema del plátano y el gorila" típico de la herencia jerárquica estricta. Si usáramos clases base tradicionales, un robot que requiriera volar y hablar heredaría métodos huérfanos innecesarios. 

La combinación con `Object.assign()` dota al sistema de flexibilidad polimórfica lineal limpia, permitiendo acoplar habilidades según el contexto específico en tiempo de ejecución.