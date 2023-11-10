import { constantes } from '../constantes.js';
import {alternarModo} from "../alternarModo.js";

let usuario = JSON.parse(localStorage.getItem(constantes.claveJugador));
let grandesPremios = JSON.parse(localStorage.getItem(constantes.claveResultados));
let pilotos = JSON.parse(localStorage.getItem(constantes.clavePilotos));
let botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
let botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));

let alternarModoBoton = document.querySelector('#alternarModo')
let botonLanzarSiguiente = document.querySelector('#lanzarSiguiente');
let bienvenidaUsuario = document.querySelector('#bienvenidaUsuario');
let reiniciar = document.querySelector('#reiniciar');

let siguienteGranPremio = obtenerSiguienteGranPremio();

onload = function () {
    alternarModo(JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaAdministracion");
    bienvenidaUsuario.innerHTML = `Juguemos, <span id="nombreBienvenida">${usuario.nombre}</span>`;
    

    if (!obtenerSiguienteGranPremio()){
        botonLanzarSiguiente.textContent = `Has completado todas los Grandes Premios`;
    }else {
        botonLanzarSiguiente.innerHTML = `Lanzar <b>${siguienteGranPremio.nombre}</b>`;
    }
};

function buscarPiloto(codigo) {
    return pilotos.find(function (piloto) {
        return piloto.codigo === codigo;
    });
}

botonLanzarSiguiente.onclick = function () {
    siguienteGranPremio.disputado = true;

    for (let i = 0; i < siguienteGranPremio.resultados.length; i++) {
        let resultado = siguienteGranPremio.resultados[i];
        let piloto = buscarPiloto(resultado.codigo);

        piloto.puntuacion += resultado.puntuacion;

        asignarPuntuacion(usuario, piloto, resultado);
        asignarPuntuacion(botUno, piloto, resultado);
        asignarPuntuacion(botDos, piloto, resultado);
    }


    // Guardando los objetos en caché
    localStorage.setItem(constantes.clavePilotos, JSON.stringify(pilotos));
    localStorage.setItem(constantes.claveResultados, JSON.stringify(grandesPremios));
    localStorage.setItem(constantes.claveJugador, JSON.stringify(usuario));
    localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
    localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));

    // En caso de que exista un siguiente GP, se podrá avanzar. De lo contrario no.
    if (!obtenerSiguienteGranPremio()) {
        botonLanzarSiguiente.disabled = true;
        botonLanzarSiguiente.textContent = `Has completado todas los Grandes Premios`;
    } else {
        siguienteGranPremio = obtenerSiguienteGranPremio();
        botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
    }

    // window.location.href = "../3-inicio/pantallaInicio.html"
};

function obtenerSiguienteGranPremio() {
    try {
        // Busca entre la lista de grandes premios el primero sin disputarse.
        let siguienteGranPremio = grandesPremios.find(function (granPremio) {
            return !granPremio.disputado;
        });

        if (!siguienteGranPremio) {
            siguienteGranPremio = false;
        }

        return siguienteGranPremio;
    } catch (exception) {
        console.log(exception);
        return false;
    }
}

function reiniciarPuntuacion(jugador) {
    jugador.pilotoTitular.puntuacion = 0;
    jugador.pilotoSuplente.puntuacion = 0;
    jugador.puntuacion = 0;
}

reiniciar.onclick = function () {
    pilotos.forEach(function (piloto) {
        piloto.puntuacion = 0;
    })

    grandesPremios.forEach(function (granPremio) {
        granPremio.disputado = false
    });

    reiniciarPuntuacion(botUno)
    reiniciarPuntuacion(botDos)
    reiniciarPuntuacion(usuario)

    localStorage.setItem(constantes.claveJugador, JSON.stringify(usuario));
    localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
    localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));

    localStorage.setItem(constantes.clavePilotos, JSON.stringify(pilotos));
    localStorage.setItem(constantes.claveResultados, JSON.stringify(grandesPremios.slice()));

    siguienteGranPremio = obtenerSiguienteGranPremio();
    botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
}

/**
 *
 * @param jugador {Jugador}
 * @param piloto {Piloto}
 * @returns {Number}
 */
function asignarPuntuacion(jugador, piloto, resultado) {
    if (jugador.pilotoTitular.codigo === piloto.codigo) {
        jugador.puntuacion += resultado.puntuacion;
    }
}

alternarModoBoton.onclick = function () {
    alternarModo(!JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaAdministracion");
}