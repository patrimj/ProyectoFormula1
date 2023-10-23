import {PILOTOS} from "./ListaPilotos.js";

const opcionesSelects = document.getElementsByClassName('opcionesPilotos');
const opcionesSelectsUno = opcionesSelects[0];
const opcionesSelectsDos = opcionesSelects[1];
const asignarPilotoUnoBoton = document.getElementById("asignarPilotoUno");
const asignarPilotoDosBoton = document.getElementById("asignarPilotoDos");
const pilotoUno = document.getElementById("pilotoUno");
const pilotoDos = document.getElementById("pilotoDos");


onload = function () {
    for (let select of opcionesSelects) {
        cargarPilotos(select);
    }
};

asignarPilotoUnoBoton.onclick = function () {
    asignarPiloto(opcionesSelectsUno);
};

/**
 * @param elemento {HTMLSelectElement}
 */
function cargarPilotos(elemento) {
    for (let piloto of PILOTOS) {
        let opcion = document.createElement("option");

        opcion.id = piloto.codigo;
        opcion.text = `${piloto.nombre} ${piloto.apellido}`;

        elemento.add(opcion);
    }
}

/**
 * @param select {HTMLSelectElement}
 * @param piloto {HTMLDivElement}
 */
function asignarPiloto(select, pilotoDiv) {
    let piloto = PILOTOS.find(function (piloto) {
       return piloto.nombre === select.value;
    });


}
