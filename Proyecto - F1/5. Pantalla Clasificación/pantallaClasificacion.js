import {constantes} from "../constantes.js";
import {pilotos} from "../ListaPilotos.js";
import {Jugador} from "../Clases/Jugador.js";


const JUGADORES_DIV = document.querySelector('#jugadores');
let botUno;
let botDos;
let jugador;


function generarBot(nombre) {
    let pilotoUnoIndice = Math.floor(Math.random() * pilotos.length); // Coge un piloto aleatorio de la lista pilotos.
    let pilotoDosIndice = pilotoUnoIndice;

    while (pilotoDosIndice === pilotoUnoIndice) {
        pilotoDosIndice =  Math.floor(Math.random() * pilotos.length); // Mientras sean los mismos pilotos, irá eligiendo un piloto aleatorio hasta que sea distinto
    }

    return new Jugador(nombre, pilotos[pilotoUnoIndice], pilotos[pilotoDosIndice], true);
}

function colocarDatos(jugador, botUno, botDos) {
    let jugadorDiv = document.createElement('div');
    let botUnoDiv = document.createElement('div');
    let botDosDiv = document.createElement('div');
    let elementos = [jugador, botUno, botDos];
    let max = 0;

    // for (let i = 0; i < elementos; i++) {
    //     if (elementos[i].puntuacion > max) {
    //
    //     }
    // }


}

onload = function () {
    botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
    botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));
    jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));

     colocarDatos(jugador, botUno, botDos);
};
