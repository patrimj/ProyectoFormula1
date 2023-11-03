import {constantes} from "../constantes.js";

let jugadoresDiv = document.querySelector('#jugadores');
let botUno;
let botDos;
let jugador;

onload = function () {
    botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
    botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));
    jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));

    colocarDatos(jugador, botUno, botDos);
};

function colocarDatos(jugador, botUno, botDos) {

    let jugadores = [jugador, botUno, botDos];

    // Se ordenan los jugadores segun su puntuación.
    jugadores.sort(function (a, b) {
        if (a.puntuacion < b.puntuacion) {
            return 1;
        } else if (a.puntuacion > b.puntuacion) {
            return -1;
        }

        return 0;
    });

    let numSeccion = 0;

    // Crear la infomacion de cada jugador
    jugadores.forEach(function (jugador) {
        numSeccion++;

        let seccionJugador = document.createElement('div');
        let nickJugador = document.createElement('span');
        let puntuacionJugador = document.createElement('span');

        seccionJugador.id = 'seccion' + numSeccion;

        nickJugador.textContent = jugador.nombre;
        puntuacionJugador.textContent = jugador.puntuacion;

        seccionJugador.appendChild(nickJugador);
        seccionJugador.appendChild(puntuacionJugador);
        jugadoresDiv.appendChild(seccionJugador);
    });
}