/*
 * Reto 33 - Tarjeta de perfil interactiva
 * Autor: Xander González
 * Fecha: 2026-06-29
 * 
 * Requiere el siguiente HTML mínimo:
 * <section id="tarjeta">
 *   <h2 id="nombre"></h2>
 *   <p id="rol"></p>
 *   <p id="ciudad"></p>
 *   <p id="bio"></p>
 *   <img id="foto" src="" alt="">
 *   <ul id="habilidades"></ul>
 * </section>
 * <script defer src="Reto33.js"></script>
 */

const perfil = {
  nombre: "Xander González",
  rol: "Desarrollador Frontend",
  ciudad: "Medellín",
  bio: "Estudiante de Análisis y Desarrollo de Software en el SENA.",
  foto: "https://via.placeholder.com/150",
  habilidades: ["JavaScript", "React", "Node.js", "Git"]
};

document.getElementById("nombre").textContent = perfil.nombre;
document.getElementById("rol").textContent = perfil.rol;
document.getElementById("ciudad").textContent = perfil.ciudad;
document.getElementById("bio").textContent = perfil.bio;
document.getElementById("foto").src = perfil.foto;
document.getElementById("foto").alt = `Foto de ${perfil.nombre}`;

const lista = document.getElementById("habilidades");
perfil.habilidades.forEach(h => {
  const li = document.createElement("li");
  li.textContent = h;
  lista.appendChild(li);
});