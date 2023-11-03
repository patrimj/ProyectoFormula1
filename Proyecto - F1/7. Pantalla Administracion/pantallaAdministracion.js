import { constantes } from '../constantes.js';
import { obtenerSiguienteGranPremio } from "../ListaGrandesPremios.js";

let botonLanzarSiguiente = document.querySelector('#lanzarSiguiente');
let bienvenidaUsuario = document.querySelector('#bienvenidaUsuario');
let usuario = JSON.parse(localStorage.getItem(constantes.claveJugador));
let siguienteGranPremio = obtenerSiguienteGranPremio();
let resultados = JSON.parse(localStorage.getItem(constantes.claveResultados));

onload = function () {
    bienvenidaUsuario.innerHTML = `Bienvenido <b>${usuario.nombre}</b>`;
    botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
};

botonLanzarSiguiente.onclick = function () {
    siguienteGranPremio.disputado = true;

    if (!obtenerSiguienteGranPremio()) {
        botonLanzarSiguiente.disabled = true;
    } else {
        siguienteGranPremio = obtenerSiguienteGranPremio();
        botonLanzarSiguiente.textContent = `Lanzar ${siguienteGranPremio.nombre}`;
    }

    localStorage.setItem(constantes.claveResultados, JSON.stringify(resultados));
};