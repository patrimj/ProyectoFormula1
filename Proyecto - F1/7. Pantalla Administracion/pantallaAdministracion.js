import { constantes } from '../constantes.js';
let botonLanzarSiguiente = document.querySelector('#lanzarSiguiente');
let bienvenidaUsuario = document.querySelector('#bienvenidaUsuario');
let usuario = JSON.parse(localStorage.getItem(constantes.claveJugador));
let grandesPremios = JSON.parse(localStorage.getItem(constantes.claveResultados));
let pilotos = JSON.parse(localStorage.getItem(constantes.clavePilotos));
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

    console.log(siguienteGranPremio);
    console.log(grandesPremios);
    console.log(pilotos);

    localStorage.setItem(constantes.clavePilotos, JSON.stringify(pilotos));
    localStorage.setItem(constantes.claveResultados, JSON.stringify(grandesPremios));

    if (!obtenerSiguienteGranPremio()) {
        botonLanzarSiguiente.disabled = true;
    } else {
        siguienteGranPremio = obtenerSiguienteGranPremio();
        botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
    }
};

function obtenerSiguienteGranPremio() {
    try {
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