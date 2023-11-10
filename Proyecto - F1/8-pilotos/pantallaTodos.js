import {constantes} from "../constantes.js";
import {alternarModo} from "../alternarModo.js";

let tabla = document.getElementById('tabla-pilotos');
let pilotos = JSON.parse(localStorage.getItem(constantes.clavePilotos));
let posicion = 0;

function obtenerAbreviacion(apellido) {
    if (apellido.includes(' ')) {
        return apellido.replace(' ', '').substring(0, 3).toUpperCase();
    } else {
        return apellido.substring(0, 3).toUpperCase();
    }
}

function rellenarTabla(piloto) {

    const fila = document.createElement('tr');

    const celdaPosicion = document.createElement('td');
    const celdaImagen = document.createElement('td');
    const celdaPiloto = document.createElement('td');
    const celdaNacionalidad = document.createElement('td');
    const imagen = document.createElement('img');
    const celdaPuntos = document.createElement('td');
    const celdaPropiedad = document.createElement('td');

    posicion++;

    celdaPosicion.classList.add('celdaPosicion');
    celdaPosicion.innerHTML = `${posicion}`;

    if (posicion < 4) {
        let colores = ["#ffd700", "#c0c0c0", "#cd7f32"];

        celdaPosicion.textContent = `${posicion}`;
        celdaPosicion.style.fontFamily = "Formula1-Bold"
        celdaPosicion.style.color = colores[posicion - 1];
    }

    imagen.src = '../Recursos/img/' + piloto.codigo + '.jpg';
    imagen.classList.add('fotoPiloto');

    celdaNacionalidad.innerHTML = `<img class='bandera' src=\"../Recursos/img/banderas/${piloto.nacionalidad}.png\" />`

    celdaPiloto.classList.add("celdaPiloto");
    celdaPiloto.textContent = `${obtenerAbreviacion(piloto.apellido)}`;


    if (piloto.propiedadJugador) {
        celdaPropiedad.textContent = `${piloto.propiedadJugador} (${piloto.rol.nombre})`;
        celdaPropiedad.style.fontFamily = "Formula1-Italic";
        imagen.style.borderColor = "#ef2626"
    } else {
        celdaPropiedad.textContent = 'Libre';
    }

    celdaPuntos.classList.add("celdaPuntos");
    celdaPuntos.textContent = piloto.puntuacion;

    fila.appendChild(celdaPosicion);
    celdaImagen.appendChild(imagen);
    fila.appendChild(celdaImagen);
    fila.appendChild(celdaPiloto);
    fila.appendChild(celdaNacionalidad);
    fila.appendChild(celdaPropiedad);
    fila.appendChild(celdaPuntos);

    tabla.appendChild(fila);
}

onload = function () {
    alternarModo(JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaPilotos");

    tabla.innerHTML = '';

    pilotos.sort(function (pilotoA, pilotoB) {
        let value;

        if (pilotoA.puntuacion > pilotoB.puntuacion) {
            value = -1;
        } else if (pilotoA.puntuacion > pilotoB.puntuacion) {
            value = 1;
        } else {
            value = 0;
        }

        return value;
    });

    pilotos.forEach(piloto => {
        rellenarTabla(piloto);
    });


};