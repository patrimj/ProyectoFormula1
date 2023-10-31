export class Jugador {
    constructor(nombre, pilotoTitular, pilotoSuplente, esBot) {
        this.nombre = nombre;
        this.pilotoTitular = pilotoTitular;
        this.pilotoSuplente = pilotoSuplente;
        this.bot = esBot;
        this.puntuacion = 0;
    }
}