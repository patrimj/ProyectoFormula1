export class Jugador {
    constructor(nombre, pilotoTitular, pilotoSuplente, bot) {
        this.nombre = nombre;
        this.pilotoTitular = pilotoTitular;
        this.pilotoSuplente = pilotoSuplente;
        this.bot = bot;
        this.puntuacion = 0;
    }
}