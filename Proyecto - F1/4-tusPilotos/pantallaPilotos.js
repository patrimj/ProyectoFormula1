
import {ROLES} from "../Roles.js";
import {Piloto} from "../Clases/Piloto.js";
import {Rol} from "../Clases/Rol.js";
import {constantes} from "../constantes.js";
import {alternarModo} from "../alternarModo.js";

const pilotoUnoDiv = document.querySelector("#pilotoUno");
const pilotoDosDiv = document.querySelector("#pilotoDos");
const jugador = JSON.parse(localStorage.getItem(constantes.claveJugador));

onload = function () {
    alternarModo(JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaPilotos");

    cargarPiloto(jugador.pilotoTitular, pilotoUnoDiv, ROLES.titular);
    cargarPiloto(jugador.pilotoSuplente, pilotoDosDiv, ROLES.suplente);

    asignarRol(jugador.pilotoTitular, pilotoUnoDiv, ROLES.titular);
    asignarRol(jugador.pilotoSuplente, pilotoDosDiv, ROLES.suplente);

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
    let anterior = document.getElementById('rotulo' + rol.nombre)

    if (anterior) {
        anterior.remove();
    }

    let titularSpan = document.createElement('span');

    titularSpan.id = 'rotulo' + rol.nombre;
    piloto.rol = rol;
    titularSpan.textContent = rol.nombre;
    titularSpan.classList.add('rolPiloto');
    infoPilotoDiv.appendChild(titularSpan);

    return piloto;
}

/**
 * @param piloto {Piloto}
 * @param infoPilotoDiv {HTMLDivElement}
 * @param botonTitular {HTMLButtonElement}
 * @param rol {Rol}
 */
function cargarPiloto(piloto, infoPilotoDiv, rol) {
    let imagen = document.createElement('img');
    let nombre = document.createElement("span");
    let nacionalidad = document.createElement("span");
    let bandera = document.createElement('img');

    nombre.textContent = `${piloto.nombre} ${piloto.apellido}`;
    nombre.classList.add('nombrePiloto'); 

    imagen.src = `../img/${piloto.codigo}.jpg`;
    imagen.classList.add('fotoPiloto');

    nacionalidad.textContent = piloto.nacionalidad;

    bandera.src = `../img/banderas/${piloto.nacionalidad}.png`;
    bandera.classList.add('bandera');

    infoPilotoDiv.appendChild(imagen);
    infoPilotoDiv.appendChild(nombre);
    infoPilotoDiv.appendChild(bandera);
}

pilotoUnoDiv.onclick = function () {
    let temp = jugador.pilotoTitular;

    asignarRol(jugador.pilotoTitular, pilotoUnoDiv, ROLES.titular);
    asignarRol(jugador.pilotoSuplente, pilotoDosDiv, ROLES.suplente);

    console.log(jugador.pilotoTitular, jugador.pilotoSuplente)

    jugador.pilotoTitular = jugador.pilotoSuplente;
    jugador.pilotoSuplente = temp;

    localStorage.setItem(constantes.claveJugador, JSON.stringify(jugador));
}

pilotoDosDiv.onclick = function () {
    asignarRol(jugador.pilotoTitular, pilotoUnoDiv, ROLES.suplente);
    asignarRol(jugador.pilotoSuplente, pilotoDosDiv,  ROLES.titular);

    let temp = jugador.pilotoTitular;

    jugador.pilotoTitular = jugador.pilotoSuplente;
    jugador.pilotoSuplente = temp;

    localStorage.setItem(constantes.claveJugador, JSON.stringify(jugador));
}