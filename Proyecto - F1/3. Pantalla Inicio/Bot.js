import { Bot } from "./clases";
import { Piloto } from "./clases";

// Se deben generarse los dos usuarios bot con sus pilotos suplentes y titulares respectivamente
const grandesPremios = [
    new Bot('Bot1', new Piloto('Nombre1', 'Apellido1', 'Español'), new Piloto('Nombre2', 'Apellido2', 'Español')),
    new Bot('Bot2', new Piloto('Nombre3', 'Apellido3', 'Inglés'), new Piloto('Nombre4', 'Apellido4', 'Inglés')),
];



