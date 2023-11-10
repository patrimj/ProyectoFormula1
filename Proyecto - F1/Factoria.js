import {listaPilotos} from "./ListaPilotos.js";
import {puntuaciones} from "./ListaGrandesPremios.js";
import {Jugador} from "./Clases/Jugador.js";
import {ROLES} from "./Roles.js";


/**
 * @param listaGrandesPremios {GranPremio[]} Lista de Grandes Premios que se quieren simular.
 * @returns {GranPremio[]} Lista con los Grandes Premios ya simulados.
 */
export function generarResultados(listaGrandesPremios) {
    let temp = listaGrandesPremios;

    for (let i = 0; i < temp.length; i++) {
        temp[i] = simularGranPremio(temp[i]);
    }

    return temp;
}

/**
 *
 * @param granPremio {GranPremio} Gran premio que se quiera simular.
 * @returns {GranPremio} Lista de los resultados del gran premio, con cada piloto y su puntuación.
 */
export function simularGranPremio(granPremio) {
    let temp = listaPilotos.slice();
    granPremio.resultados = [];

    for (let i = 0; i < listaPilotos.length; i++) {

        const indice = Math.floor(Math.random() * temp.length - 1);
        let piloto = temp.splice(indice, 1)[0];
        let puntuacion = i <= puntuaciones.length - 1 ? puntuaciones[i] : 0;

        console.log(granPremio);

        // TODO: Solo puntuan los pilotos titulares
        granPremio.resultados.push({
            codigo: piloto.codigo,
            puntuacion: puntuacion
        });
    }

    return granPremio;
}

export function generarBot(nombre) {
    return new Jugador(
        nombre,
        obtenerPilotoDisponible(nombre, ROLES.titular),
        obtenerPilotoDisponible(nombre, ROLES.suplente),
        true
    );
}

export function obtenerPilotoDisponible(nombreJugador, rol) {
    let indice = Math.floor(Math.random() * listaPilotos.length);
    let piloto = listaPilotos[indice];

    while (!piloto.disponible) {
        indice = Math.floor(Math.random() * listaPilotos.length - 1);
        piloto = listaPilotos[indice];
    }

    piloto.rol = rol;
    piloto.propiedadJugador = nombreJugador;
    piloto.disponible = false;

    return piloto;
}