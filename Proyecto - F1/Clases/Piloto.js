export class Piloto {
    constructor(codigo, nombre, apellido, nacionalidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
        this.puntuacion = 0;
        this.disponible = true;
    }
}