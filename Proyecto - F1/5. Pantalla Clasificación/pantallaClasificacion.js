import {constantes} from "../constantes.js";
import {PILOTOS} from "../ListaPilotos.js";
import {Jugador} from "../Clases/Jugador.js";

const JUGADORES_DIV = document.querySelector('#jugadores');
let botUno;
let botDos;
let jugador;

// function generarBot(nombre) {
//     let pilotoUnoIndice = Math.floor(Math.random() * PILOTOS.length); // Coge un piloto aleatorio de la lista pilotos.
//     let pilotoDosIndice = pilotoUnoIndice;
//
//     while (pilotoDosIndice === pilotoUnoIndice) {
//         pilotoDosIndice =  Math.floor(Math.random() * PILOTOS.length); // Mientras sean los mismos pilotos, irá eligiendo un piloto aleatorio hasta que sea distinto
//     }
//
//     return new Jugador(nombre, PILOTOS[pilotoUnoIndice], PILOTOS[pilotoDosIndice], true);
// }

function colocarDatos(jugador, botUno, botDos) {
    // let jugadorDiv = document.createElement('div');
    // let botUnoDiv = document.createElement('div');
    // let botDosDiv = document.createElement('div');

    let jugadorDiv = document.createElement('div');
    let botUnoDiv = document.createElement('div');
    let botDosDiv = document.createElement('div');

    let elementos = [jugador, botUno, botDos];

    elementos.sort(function (a, b) {
        if (a.puntuacion > b.puntuacion) {
            return 1;
        } else if (a.puntuacion < b.puntuacion) {
            return -1;
        }

        return 0;
    });

    console.log(elementos);

}

onload = function () {
    botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
    botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));
    jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));

     colocarDatos(jugador, botUno, botDos);
};
