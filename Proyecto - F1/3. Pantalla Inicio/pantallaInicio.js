import { grandesPremios } from '../Clases/GranPremio.js';
import { PILOTOS } from '../ListaPilotos.js';
import { Jugador } from '../Clases/Jugador.js';

  //coge el usuario del registro de localStorage
  var usuarioJSON = localStorage.getItem('usuario'); 
  var usuarioCreado = JSON.parse(usuarioJSON);


const bot1 = generarBot('Bot1');
const bot2 = generarBot('Bot2');
const usuario = generarUsuario();
cargarSiguienteCarerra();

console.log("Usuario:", usuario);
console.log("Bot1:", bot1);
console.log("Bot2:", bot2);

//Se deben cargar los grandes premios con todas las puntuaciones de todas las carreras.


// Se deben generarse los dos usuarios bot con sus pilotos suplentes y titulares respectivamente
function generarBot(nombre) {
    let pilotoUnoIndice = Math.floor(Math.random() * PILOTOS.length); // Coge un piloto aleatorio de la lista pilotos.
    let pilotoDosIndice = pilotoUnoIndice;

    while (pilotoDosIndice === pilotoUnoIndice) {
        pilotoDosIndice =  Math.floor(Math.random() * PILOTOS.length); // Mientras sean los mismos pilotos, irá eligiendo un piloto aleatorio hasta que sea distinto
    }

    return new Jugador(nombre, PILOTOS[pilotoUnoIndice], PILOTOS[pilotoDosIndice], true);
}

//Se debe asignar un piloto titular y suplente a tu usuario
function generarUsuario() {
  let pilotoUnoIndice = Math.floor(Math.random() * PILOTOS.length); 
  let pilotoDosIndice = pilotoUnoIndice;

  while (pilotoDosIndice === pilotoUnoIndice) {
      pilotoDosIndice =  Math.floor(Math.random() * PILOTOS.length); 
  }

  return new Jugador(usuarioCreado.nombre, PILOTOS[pilotoUnoIndice], PILOTOS[pilotoDosIndice], false);
}

// Mostrar el nombre de la siguiente carrera por disputarse, con el lugar donde se disputa el gran premio y una breve descripción de la carrera.
function cargarSiguienteCarerra() {
  const nombreGP = document.getElementById('nombreGP');
  const lugarGP = document.getElementById('lugarGP');
  const descripcionGP = document.getElementById('descripcionGP');

  nombreGP.textContent = grandesPremios[0].nombre;
  lugarGP.textContent = grandesPremios[0].lugar;
  descripcionGP.textContent = grandesPremios[0].descripcion;
}



