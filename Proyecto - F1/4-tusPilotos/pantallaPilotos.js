
import {ROLES} from "../Roles.js";
import {Piloto} from "../Clases/Piloto.js";
import {Rol} from "../Clases/Rol.js";
import {constantes} from "../constantes.js";

const pilotoTitularDiv = document.querySelector("#pilotoUno");
const pilotoSuplenteDiv = document.querySelector("#pilotoDos");
const jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));

onload = function () {
    cargarPiloto(jugador.pilotoTitular, pilotoTitularDiv);
    cargarPiloto(jugador.pilotoSuplente, pilotoSuplenteDiv);

    asignarRol(jugador.pilotoTitular, pilotoTitularDiv, ROLES.titular);
    asignarRol(jugador.pilotoSuplente, pilotoSuplenteDiv, ROLES.suplente);

    localStorage.setItem(constantes.claveJugador, JSON.stringify(jugador));
};

/**
 *
 * @param piloto {Piloto}
 * @param infoPilotoDiv {HTMLDivElement}
 * @param boton {HTMLButtonElement}
 * @param rol {Rol}
 */
function asignarRol(piloto, infoPilotoDiv, rol) {
    let titularSpan = document.createElement('span');

    piloto.rol = rol;
    titularSpan.textContent = rol.nombre;
    infoPilotoDiv.appendChild(titularSpan);

    return piloto;
}

/**
 * @param piloto {Piloto}
 * @param infoPilotoDiv {HTMLDivElement}
 * @param botonTitular {HTMLButtonElement}
 */
function cargarPiloto(piloto, infoPilotoDiv) {
    let imagen = document.createElement('img');
    let nombre = document.createElement("span");

    nombre.textContent = `${piloto.nombre} ${piloto.apellido}`;
    imagen.src = `/img/${piloto.codigo}.jpg`;

    infoPilotoDiv.appendChild(imagen);
    infoPilotoDiv.appendChild(nombre);
}