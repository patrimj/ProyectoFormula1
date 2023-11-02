import { PILOTOS } from '../ListaPilotos.js';

const tabla = document.getElementById('tabla-pilotos');

function infoPilotos() {
  
  // limpiamos la tabla para que no se repitan los pilotos cada vez que se cargue la página
  tabla.innerHTML = '';

  // Recorre la lista de pilotos
  PILOTOS.forEach(piloto => {

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
      celdaPropiedad.textContent = `Propiedad de: ${piloto.propiedadJugador}, Rol: ${piloto.rol}`;
    } else {
      celdaPropiedad.textContent = 'Libre';
    }
    fila.appendChild(celdaPropiedad);

    // Agrega la fila a la tabla
    tabla.appendChild(fila);
  });
}

infoPilotos();
