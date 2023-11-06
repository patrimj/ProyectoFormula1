import {constantes} from "../constantes.js";

let jugadoresDiv = document.querySelector('#jugadores');
let botUno;
let botDos;
let jugador;
let resultados;

onload = function () {
    try {
        botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
        botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));
        jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));
        resultados = JSON.parse(localStorage.getItem(constantes.claveResultados));

        let jugadores = [jugador, botUno, botDos];

        comprobarSiExisteTitular(jugador);

        jugadores.forEach(function (jugador) {
            console.log(jugador);
            jugador.puntuacion = jugador.pilotoTitular.puntuacion + jugador.pilotoSuplente.puntuacion;
        });

        colocarJugadores(jugadores);

        localStorage.setItem(constantes.claveJugador, JSON.stringify(jugador));
        localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
        localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));
    } catch (exception) {
        console.log(exception);
    }
};

function comprobarSiExisteTitular(jugador) {
    if (!jugador.pilotoTitular) {
        let error = document.createElement('span');

        error.textContent = 'Se debe asignar primero el piloto titular.';

        document.body.appendChild(error);
    }
}

function colocarJugadores(jugadores) {
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