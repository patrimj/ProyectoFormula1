import { pilotos } from '../ListaPilotos.js';
import { Jugador } from '../Clases/Jugador.js';
import {grandesPremios, PUNTUACION} from "../ListaGrandesPremios.js";
import {constantes} from "../constantes.js";

//coge el usuario del registro de localStorage
let usuarioCreado = JSON.parse(localStorage.getItem(constantes.claveJugador));

// TODO: Generador de nombres.
const botUno = generarBot('BotUno');
const botDos = generarBot('BotDos');

usuarioCreado.pilotos = [
    obtenerPilotoDisponible(),
    obtenerPilotoDisponible()
];

const resultados = generarResultados();

usuarioCreado.puntuacion = obtenerPuntuacion(usuarioCreado);
botUno.puntuacion = obtenerPuntuacion(botUno);
botDos.puntuacion = obtenerPuntuacion(botDos);

localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));
localStorage.setItem(constantes.claveResultados, JSON.stringify(resultados));
localStorage.setItem(constantes.clavePilotos, JSON.stringify(pilotos));
localStorage.setItem(constantes.claveJugador, JSON.stringify(usuarioCreado));

cargarSiguienteCarrera();

function simularGranPremio(granPremio) {
    granPremio.resultados = [];
    let temp = pilotos.slice();

    // TODO: Guardar puntuacion de cada gran premio.

    for (let i = 0; i < pilotos.length; i++) {
        const indice = Math.floor(Math.random() * temp.length - 1);
        let piloto = temp.splice(indice, 1)[0];

        let puntuacion = i <= PUNTUACION.length - 1 ? PUNTUACION[i] : 0;

        granPremio.resultados.push({
            codigo: piloto.codigo,
            puntuacion: puntuacion
        });
    }

    return granPremio.resultados;
}

//Se deben cargar los grandes premios con todas las puntuaciones de todas las carreras.
function generarResultados() {
    let temp = grandesPremios;

    for (let i = 0; i < temp.length; i++) {
        simularGranPremio(temp[i]);
    }

    console.log(temp[0]);

    return temp;
}

function obtenerPilotoDisponible() {
    let indice = Math.floor(Math.random() * pilotos.length);
    let piloto = pilotos[indice];

    while (!piloto.disponible) {
        indice = Math.floor(Math.random() * pilotos.length - 1);
        piloto = pilotos[indice];
    }

    piloto.disponible = false;

    return piloto;
}

// Se deben generarse los dos usuarios bot con sus pilotos suplentes y titulares respectivamente
function generarBot(nombre) {
    let pilotoTitular = obtenerPilotoDisponible();
    let pilotoSuplente = obtenerPilotoDisponible();

    return new Jugador(nombre, pilotoTitular, pilotoSuplente, true);
}

// Mostrar el nombre de la siguiente carrera por disputarse, con el lugar donde se disputa el gran premio y una breve descripción de la carrera.
function cargarSiguienteCarrera() {
    const nombreGP = document.getElementById('nombreGP');
    const lugarGP = document.getElementById('lugarGP');
    const descripcionGP = document.getElementById('descripcionGP');

    let siguienteGranPremio = resultados.find(function (granPremio) {
        return !granPremio.disputado;
    });

    nombreGP.textContent = siguienteGranPremio.nombre;
    lugarGP.textContent = siguienteGranPremio.lugar;
    descripcionGP.textContent = siguienteGranPremio.descripcion;
}

/**
 *
 * @param jugador {Jugador}
 */
function obtenerPuntuacion(jugador) {
    jugador.puntuacion = 0;
    return jugador.pilotoTitular.puntuacion + jugador.pilotoSuplente.puntuacion;
}