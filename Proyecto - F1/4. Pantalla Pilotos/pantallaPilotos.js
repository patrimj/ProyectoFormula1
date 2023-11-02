import {pilotos} from "../ListaPilotos.js";
import {ROLES} from "../Roles.js";
import {Piloto} from "../Clases/Piloto.js";
import {Rol} from "../Clases/Rol.js";
import {constantes} from "../constantes.js";

const pilotoUnoDiv = document.querySelector("#pilotoUno");
const pilotoDosDiv = document.querySelector("#pilotoDos");
const pilotoUnoTitular = document.querySelector("#pilotoUnoTitular");
const pilotoDosTitular = document.querySelector("#pilotoDosTitular");
let listaPilotos = [];

onload = function () {
    let pilotoUnoIndice = Math.floor(Math.random() * listaPilotos.length);
    let pilotoDosIndice = pilotoUnoIndice;

    while (pilotoDosIndice === pilotoUnoIndice) {
        pilotoDosIndice =  Math.floor(Math.random() * listaPilotos.length);
    }

    cargarPiloto(listaPilotos[pilotoUnoIndice], pilotoUnoDiv, pilotoUnoTitular);
    cargarPiloto(listaPilotos[pilotoDosIndice], pilotoDosDiv, pilotoDosTitular);
};

/**
 *
 * @param piloto {Piloto}
 * @param infoPilotoDiv {HTMLDivElement}
 * @param boton {HTMLButtonElement}
 * @param rol {Rol}
 */
function asignarRol(piloto, infoPilotoDiv, boton, rol) {
    let titularSpan = document.createElement('span');

    piloto.rol = rol;
    titularSpan.textContent = rol.nombre;
    infoPilotoDiv.appendChild(titularSpan);
    boton.disabled = true;

    return piloto;
}

pilotoUnoTitular.onclick = function () {
    asignarRol(listaPilotos[0], pilotoUnoDiv, pilotoUnoTitular, ROLES.titular);
    asignarRol(listaPilotos[1], pilotoDosDiv, pilotoDosTitular, ROLES.suplente);

    localStorage.setItem(constantes.clavePilotos, JSON.stringify(listaPilotos));
};

pilotoDosTitular.onclick = function () {
    asignarRol(listaPilotos[0], pilotoUnoDiv, pilotoUnoTitular, ROLES.suplente);
    asignarRol(listaPilotos[1], pilotoDosDiv, pilotoDosTitular, ROLES.titular);

    localStorage.setItem(constantes.clavePilotos, JSON.stringify(listaPilotos));
};

/**
 * @param piloto {Piloto}
 * @param infoPilotoDiv {HTMLDivElement}
 * @param botonTitular {HTMLButtonElement}
 */
function cargarPiloto(piloto, infoPilotoDiv, botonTitular) {
    let imagen = document.createElement('img');
    let nombre = document.createElement("span");

    nombre.textContent = `${piloto.nombre} ${piloto.apellido}`;
    imagen.src = `/img/${piloto.codigo}`;
    botonTitular.textContent = `Asignar ${piloto.apellido} como titular`;

    listaPilotos.push(piloto);

    infoPilotoDiv.appendChild(imagen);
    infoPilotoDiv.appendChild(nombre);
}