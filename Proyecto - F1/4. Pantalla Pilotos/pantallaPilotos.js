import {PILOTOS} from "./ListaPilotos.js";
import {ROLES} from "./Roles.js";

const opcionesSelects = document.getElementsByClassName('opcionesPilotos');
const opcionesSelectsUno = opcionesSelects[0];
const opcionesSelectsDos = opcionesSelects[1];
const asignarPilotoUnoBoton = document.getElementById("asignarPilotoUno");
const asignarPilotoDosBoton = document.getElementById("asignarPilotoDos");
const infoPilotoUno = document.getElementById("infoPilotoUno");
const infoPilotoDos = document.getElementById("infoPilotoDos");
const rolPilotoUno = document.getElementById('rolPilotoUno');
const rolPilotoDos = document.getElementById('rolPilotoDos');

var pilotosAsignados;

onload = function () {
    for (let select of opcionesSelects) {
        cargarPilotos(select);
    }
};

asignarPilotoUnoBoton.onclick = function () {
    let pilotoAsignado = asignarPiloto(opcionesSelectsUno, infoPilotoUno, rolPilotoUno);
    // TODO: Borrar piloto asignado de la lista.
    asignarPilotoUnoBoton.disabled = true;


};

asignarPilotoDosBoton.onclick = function () {
    asignarPiloto(opcionesSelectsDos, infoPilotoDos, rolPilotoDos);
    asignarPilotoDosBoton.disabled = true;
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
 * @param infoPilotoDiv {HTMLDivElement}
 * @param rolInput {HTMLInputElement}
 */
function asignarPiloto(select, infoPilotoDiv, rolInput) {
    let piloto = PILOTOS.find(function (piloto) {
       return `${piloto.nombre} ${piloto.apellido}` === select.value;
    });

    console.log(rolInput);

    let imagen = document.createElement('img');
    let nombre = document.createElement("span");
    let rol = document.createElement("span");

    nombre.textContent = `${piloto.nombre} ${piloto.apellido}`;
    imagen.src = `../img/${piloto.codigo}`;
    rol.textContent = rolInput.checked ? ROLES[0].nombre : ROLES[1].nombre;

    // TODO: Guardar rol en el objeto del piloto.

    infoPilotoDiv.appendChild(imagen);
    infoPilotoDiv.appendChild(nombre);
    infoPilotoDiv.appendChild(rol);

    select.disabled = true;
    rolInput.disabled = true;

    return piloto;
}

// TODO: Guardar array de pilotos asignados en LocalStorage.
