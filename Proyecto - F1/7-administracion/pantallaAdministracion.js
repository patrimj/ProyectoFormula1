import { constantes } from '../constantes.js';
let botonLanzarSiguiente = document.querySelector('#lanzarSiguiente');
let bienvenidaUsuario = document.querySelector('#bienvenidaUsuario');
let usuario = JSON.parse(localStorage.getItem(constantes.claveJugador));
let grandesPremios = JSON.parse(localStorage.getItem(constantes.claveResultados));
let pilotos = JSON.parse(localStorage.getItem(constantes.clavePilotos));
let botUno = JSON.parse(localStorage.getItem(constantes.claveBotUno));
let botDos = JSON.parse(localStorage.getItem(constantes.claveBotDos));
let siguienteGranPremio = obtenerSiguienteGranPremio();

onload = function () {
    bienvenidaUsuario.innerHTML = `Bienvenido <b>${usuario.nombre}</b>`;
    botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
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
    }

    usuario.puntuacion = asignarPuntuacion(usuario);
    botUno.puntuacion = asignarPuntuacion(botUno);
    botDos.puntuacion = asignarPuntuacion(botDos);

    // Guardando los objetos en caché
    localStorage.setItem(constantes.clavePilotos, JSON.stringify(pilotos));
    localStorage.setItem(constantes.claveResultados, JSON.stringify(grandesPremios));
    localStorage.setItem(constantes.claveJugador, JSON.stringify(usuario));
    localStorage.setItem(constantes.claveBotUno, JSON.stringify(botUno));
    localStorage.setItem(constantes.claveBotDos, JSON.stringify(botDos));

    // En caso de que exista un siguiente GP, se podrá avanzar. De lo contrario no.
    if (!obtenerSiguienteGranPremio()) {
        botonLanzarSiguiente.disabled = true;
    } else {
        siguienteGranPremio = obtenerSiguienteGranPremio();
        botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
    }
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

function asignarPuntuacion(jugador) {
    // Obteniendo las puntuaciones de los pilotos desde la lista de pilotos.
    // Es la unica forma de asignar las puntuaciones al ser objetos distintos.
    jugador.pilotoTitular.puntuacion = pilotos.find(function (piloto) {
        return jugador.pilotoTitular.codigo === piloto.codigo;
    }).puntuacion;

    jugador.pilotoSuplente.puntuacion = pilotos.find(function (piloto) {
        return jugador.pilotoSuplente.codigo === piloto.codigo;
    }).puntuacion;

    return jugador.pilotoTitular.puntuacion + jugador.pilotoSuplente.puntuacion;
}