import { Piloto, Usuario, Bot, GranPremio } from './clases.js';

//Se deben cargar los grandes premios con todas las puntuaciones de todas las carreras.
const grandesPremios = [
  new GranPremio('Nom1', 'Australia', 'Descripcion1', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]),
  new GranPremio('Nom2', 'Bahrain', 'Descripcion2', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]),
  new GranPremio('Nom3', 'China', 'Descripcion3', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]),
  new GranPremio('Nom4', 'Azerbaiyán', 'Descripcion4', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]),
  new GranPremio('Nom5', 'España', 'Descripcion5', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]),
  new GranPremio('Nom6', 'Mónaco', 'Descripcion6', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]),
  new GranPremio('Nom7', 'Canadá', 'Descripcion7', [25, 18, 15, 12, 10, 8, 6, 4, 2, 1])
];

//Se debe asignar un piloto titular y suplente a tu usuario
const usuario = new Usuario('TuUsuario', new Piloto ('Nombre1', 'Apellido1', 'Español'), new Piloto ('Nombre2', 'Apellido2', 'Español'));

// Se deben generarse los dos usuarios bot con sus pilotos suplentes y titulares respectivamente
const bots = [
    new Bot('Bot1', new Piloto('Nombre1', 'Apellido1', 'Español'), new Piloto('Nombre2', 'Apellido2', 'Español')),
    new Bot('Bot2', new Piloto('Nombre3', 'Apellido3', 'Inglés'), new Piloto('Nombre4', 'Apellido4', 'Inglés')),
];

// Mostrar el nombre de la siguiente carrera por disputarse, con el lugar donde se disputa el gran premio y una breve descripción de la carrera.
const siguienteCarrera = grandesPremios[0];
document.getElementById('nombreGP').textContent = siguienteCarrera.nombre;
document.getElementById('lugarGP').textContent = siguienteCarrera.lugar;
document.getElementById('descripcionGP').textContent = siguienteCarrera.descripcion;

