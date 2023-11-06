import {constantes} from "../constantes.js";

let tabla = document.getElementById('tabla-pilotos');
let pilotos = JSON.parse(localStorage.getItem(constantes.clavePilotos));

function rellenarTabla(piloto) {
    // Crea una nueva fila de tabla
    const fila = document.createElement('tr');

    // Crea una celda para la imagen del piloto
    const celdaImagen = document.createElement('td');
    const imagen = document.createElement('img');

    imagen.src = '../img/' + piloto.codigo + '.jpg';

    celdaImagen.appendChild(imagen);
    fila.appendChild(celdaImagen);

    // Crea una celda para la información del piloto
    const celdaInformacion = document.createElement('td');

    celdaInformacion.innerHTML = `Piloto: ${piloto.nombre} ${piloto.apellido} <br><br> Nacionalidad: ${piloto.nacionalidad} <br><br> Puntuación: ${piloto.puntuacion}`;

    fila.appendChild(celdaInformacion);

    // Crea una celda para la propiedad del piloto
    const celdaPropiedad = document.createElement('td');

    if (piloto.propiedadJugador) {
        console.log(piloto.propiedadJugador);
        celdaPropiedad.textContent = piloto.propiedadJugador;
        celdaPropiedad.textContent = `${piloto.propiedadJugador} (${piloto.rol.nombre})`;
    } else {
        celdaPropiedad.textContent = 'Libre';
    }

    fila.appendChild(celdaPropiedad);

    // Crea una celda para los puntos del piloto
    const celdaPuntos = document.createElement('td');

    celdaPuntos.textContent = piloto.puntuacion;

    fila.appendChild(celdaPuntos);

    // Agrega la fila a la tabla
    tabla.appendChild(fila);
}

onload = function () {
    // Limpiamos la tabla para que no se repitan los pilotos cada vez que se cargue la página
    tabla.innerHTML = '';

    // Ordenamos los pilotos según su puntuación.
    pilotos.sort(function (pilotoA, pilotoB) {
        if (pilotoA.puntuacion > pilotoB.puntuacion) {
            return -1;
        } else {
            return 1;
        }

        return 0;
    });

    // Recorre la lista de pilotos
    pilotos.forEach(piloto => {
        rellenarTabla(piloto);
    });


};