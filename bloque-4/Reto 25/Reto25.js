// Reto 25 - Gestor de biblioteca
// Autor: Xander González
// Fecha: 2026-06-29

const libro = {
  id: "LIB001",
  titulo: "Cien Años de Soledad",
  autor: "Gabriel García Márquez",
  disponible: true,
  prestamos: 0,

  prestar() {
    if (!this.disponible) {
      return "❌ El libro no está disponible en este momento.";
    }
    this.disponible = false;
    this.prestamos++;
    return `✅ Has tomado prestado "${this.titulo}".`;
  },

  devolver() {
    if (this.disponible) {
      return "⚠️ El libro ya estaba disponible.";
    }
    this.disponible = true;
    return `📚 Has devuelto "${this.titulo}".`;
  },

  obtenerResumen() {
    return `${this.titulo} (${this.id}) - ${this.autor} | Préstamos: ${this.prestamos} | Disponible: ${this.disponible}`;
  }
};

// Prueba de secuencia
console.log("📘 GESTOR DE BIBLIOTECA");
console.log(libro.obtenerResumen());
console.log(libro.prestar());
console.log(libro.prestar()); // intento duplicado
console.log(libro.devolver());
console.log(libro.devolver()); // ya estaba disponible
console.log(libro.obtenerResumen());