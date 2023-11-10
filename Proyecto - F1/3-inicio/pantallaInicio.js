import { listaPilotos } from '../ListaPilotos.js';
import { Jugador } from '../Clases/Jugador.js';
import { constantes } from "../constantes.js";
import { ROLES } from "../Roles.js";
import { listaGrandesPremios } from "../ListaGrandesPremios.js";
import * as factoria from "../Factoria.js";
import {alternarModo} from "../alternarModo.js";

let granPremioDiv = document.querySelector("#granPremioDiv");
let ganadorDiv = document.querySelector("#terminado");


let usuarioCreado = JSON.parse(localStorage.getItem(constantes.claveJugador));
let botUno;
let botDos;
let resultados;

onload = function () {
    alternarModo(JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaInicio");

    if (!localStorage.getItem(constantes.claveResultados) || localStorage.length === 0) {
        let nombresBots = elegirNombresBots();

        botUno = factoria.generarBot(nombresBots[0]);
        botDos = factoria.generarBot(nombresBots[1]);
        usuarioCreado.pilotoTitular = factoria.obtenerPilotoDisponible(usuarioCreado.nombre, ROLES.titular);
        usuarioCreado.pilotoSuplente = factoria.obtenerPilotoDisponible(usuarioCreado.nombre, ROLES.suplente);
        usuarioCreado.puntuacion = 0;

        resultados = factoria.generarResultados(listaGrandesPremios);

        localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
        localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));
        localStorage.setItem(constantes.claveResultados, JSON.stringify(resultados));
        localStorage.setItem(constantes.clavePilotos, JSON.stringify(listaPilotos));
        localStorage.setItem(constantes.claveJugador, JSON.stringify(usuarioCreado));

    } else {
        botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
        botDos = JSON.parse(localStorage.getItem(constantes.claveBotUno));
        resultados = JSON.parse(localStorage.getItem(constantes.claveResultados));
    }

    cargarSiguienteCarrera();
};


function cargarSiguienteCarrera() {
    const nombreGP = document.getElementById('nombreGP');
    const lugarGP = document.getElementById('lugarGP');
    const descripcionGP = document.getElementById('descripcionGP');

    let siguienteGranPremio = resultados.find(function (granPremio) {
        return !granPremio.disputado;
    });

    if (!siguienteGranPremio) {
        granPremioDiv.hidden = true;
        ganadorDiv.hidden = false;
    } else {
        nombreGP.textContent = siguienteGranPremio.nombre;
        lugarGP.textContent = siguienteGranPremio.lugar;
        descripcionGP.textContent = siguienteGranPremio.descripcion;
    }
}

const listaNombresBots = [
    "Jaime Fraile",
    "Inés Barrera",
    "Patricia Mota",
    "Francisco Álvarez",
    "Sergio López de Coca",
    "Laura Pedraza",
    "David Trujillo",
    "Carlos Fernández",
    "Manuel García",
    "Alejandro García",
    "Raúl Gutiérrez",
    "Badr Hamidou",
    "Marina Laguna",
    "Gonzalo Martínez",
    "Javier Morales",
    "Óscar Moreno",
    "Elena Rodríguez",
    "Ismael Sarrión",
    "Javier Velasco",
    "Juan Navarrete"
];

function elegirNombresBots() {
    let indiceUno = Math.floor(Math.random() * listaNombresBots.length);
    let indiceDos = Math.floor(Math.random() * listaNombresBots.length);

    while (indiceDos === indiceUno) {
        indiceDos = listaNombresBots[Math.floor(Math.random() * listaNombresBots.length - 1)];
    }

    return [
        listaNombresBots[indiceUno],
        listaNombresBots[indiceDos],
    ]
}