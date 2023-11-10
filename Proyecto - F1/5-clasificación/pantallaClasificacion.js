import {constantes} from "../constantes.js";
import {alternarModo} from "../alternarModo.js";

let jugadoresDiv = document.querySelector('#jugadores');
let disputadosDiv = document.querySelector('#disputados');
let botUno;
let botDos;
let jugador;
let resultados;

function calcularDisputados(resultados) {
    let disputados = resultados.filter(function (granPremio) {
       return granPremio.disputado === true;
    }).length;

    let titulo = document.createElement('h2');
    let disputadosSpan = document.createElement('span');

    disputadosSpan.id = 'disputadosNum';
    titulo.textContent = "TOTAL DE GRANDES PREMIOS DISPUTADOS"
    disputadosSpan.textContent = `${disputados}`;

    disputadosDiv.appendChild(titulo);
    disputadosDiv.appendChild(disputadosSpan);
}

onload = function () {
    alternarModo(JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaClasificacion");

    try {
        botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
        botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));
        jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));
        resultados = JSON.parse(localStorage.getItem(constantes.claveResultados));

        let jugadores = [jugador, botUno, botDos];

        comprobarSiExisteTitular(jugador);

        colocarJugadores(jugadores);
        calcularDisputados(resultados);

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

    jugadores.sort(function (a, b) {
        if (a.puntuacion < b.puntuacion) {
            return 1;
        } else if (a.puntuacion > b.puntuacion) {
            return -1;
        }

        return 0;
    });

    let numSeccion = 0;

    jugadores.forEach(function (jugador) {
        numSeccion++;

        let seccionJugador = document.createElement('div');
        let nickJugador = document.createElement('span');
        let esBot = document.createElement('div');
        let puntuacionJugador = document.createElement('span');

        puntuacionJugador.classList.add('puntuacion');
        nickJugador.classList.add('nick');

        seccionJugador.id = 'seccion' + numSeccion;
        nickJugador.textContent = jugador.nombre;
        puntuacionJugador.textContent = jugador.puntuacion;

        seccionJugador.appendChild(nickJugador);
        seccionJugador.appendChild(puntuacionJugador);
        jugadoresDiv.appendChild(seccionJugador);
    });
}