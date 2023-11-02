import { GranPremio } from '../Clases/GranPremio.js';
import { pilotos } from '../ListaPilotos.js';
import { Jugador } from '../Clases/Jugador.js';
import { Piloto } from "../Clases/Piloto.js";
import {grandesPremios, PUNTUACION} from "../ListaGrandesPremios.js";

//coge el usuario del registro de localStorage
var usuarioJSON = localStorage.getItem('usuario');
var usuarioCreado = JSON.parse(usuarioJSON);


const bot1 = generarBot('Bot1');
const bot2 = generarBot('Bot2');
const usuario = generarUsuario();
const resultados = generarGrandesPremios();

cargarSiguienteCarrera();


function calcularResultados(granPremio) {
    granPremio.resultados = [];
    let temp = pilotos.slice();

    for (let i = 0; i < pilotos.length; i++) {
        const indice = Math.floor(Math.random() * temp.length - 1);
        const piloto = temp.splice(indice, 1)[0];

        if (i < PUNTUACION.length - 1) {
            piloto.puntuacion += PUNTUACION[i];
        }

        granPremio.resultados.push(piloto);
    }

    return granPremio.resultados;
}

//Se deben cargar los grandes premios con todas las puntuaciones de todas las carreras.
function generarGrandesPremios() {
    for (let i = 0; i < grandesPremios.length; i++) {
        calcularResultados(grandesPremios[i]);
    }

    return grandesPremios;
}

function obtenerPilotoDisponible() {
    let esDisponible = false;
    const indice = Math.floor(Math.random() * pilotos.length - 1);
    let piloto = pilotos[indice];

    while (!esDisponible) {
        esDisponible = piloto.disponible;
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

//Se debe asignar un piloto titular y suplente a tu usuario
function generarUsuario() {
  let pilotoUnoIndice = Math.floor(Math.random() * pilotos.length);
  let pilotoDosIndice = pilotoUnoIndice;

  while (pilotoDosIndice === pilotoUnoIndice) {
      pilotoDosIndice =  Math.floor(Math.random() * pilotos.length);
  }

  return new Jugador(usuarioCreado.nombre, pilotos[pilotoUnoIndice], pilotos[pilotoDosIndice], false);
}

// Mostrar el nombre de la siguiente carrera por disputarse, con el lugar donde se disputa el gran premio y una breve descripción de la carrera.
function cargarSiguienteCarrera() {
  const nombreGP = document.getElementById('nombreGP');
  const lugarGP = document.getElementById('lugarGP');
  const descripcionGP = document.getElementById('descripcionGP');

  nombreGP.textContent = grandesPremios[0].nombre;
  lugarGP.textContent = grandesPremios[0].lugar;
  descripcionGP.textContent = grandesPremios[0].descripcion;
}