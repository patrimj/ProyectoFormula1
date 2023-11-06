import { pilotos } from '../ListaPilotos.js';
import { Jugador } from '../Clases/Jugador.js';
import {grandesPremios, PUNTUACION} from "../ListaGrandesPremios.js";
import {constantes} from "../constantes.js";
import {ROLES} from "../Roles.js";

//coge el usuario del registro de localStorage
let usuarioCreado = JSON.parse(localStorage.getItem(constantes.claveJugador));

// TODO: Generador de nombres.
let botUno = generarBot('BotUno');
let botDos = generarBot('BotDos');

let resultados;

onload = function () {
    usuarioCreado.pilotoTitular = obtenerPilotoDisponible(usuarioCreado.nombre, ROLES.titular);
    usuarioCreado.pilotoSuplente = obtenerPilotoDisponible(usuarioCreado.nombre, ROLES.suplente);

    resultados = generarResultados();

    localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
    localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));
    localStorage.setItem(constantes.claveResultados, JSON.stringify(resultados));
    localStorage.setItem(constantes.clavePilotos, JSON.stringify(pilotos));
    localStorage.setItem(constantes.claveJugador, JSON.stringify(usuarioCreado));

    cargarSiguienteCarrera();
};

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

    return temp;
}

function obtenerPilotoDisponible(nombreJugador, rol) {
    let indice = Math.floor(Math.random() * pilotos.length);
    let piloto = pilotos[indice];

    while (!piloto.disponible) {
        indice = Math.floor(Math.random() * pilotos.length - 1);
        piloto = pilotos[indice];
    }

    piloto.rol = rol;
    piloto.propiedadJugador = nombreJugador;
    piloto.disponible = false;

    return piloto;
}

// Se deben generarse los dos usuarios bot con sus pilotos suplentes y titulares respectivamente
function generarBot(nombre) {
    return new Jugador(
        nombre,
        obtenerPilotoDisponible(nombre, ROLES.titular),
        obtenerPilotoDisponible(nombre, ROLES.suplente),
        true
    );
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
