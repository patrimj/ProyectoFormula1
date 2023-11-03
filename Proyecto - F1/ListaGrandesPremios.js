import {GranPremio} from "./Clases/GranPremio.js";
import {constantes} from "./constantes.js";

export let grandesPremios = [
    new GranPremio('Gran Premio de Bahrein', 'Shakir', 'Gran Premio de Bahrein en el Circuito Internacional de Shakir.', false),
    new GranPremio('Gran Premio de Arabia Saudi', 'Jeddah', 'Gran Premio de Arabia Saudi en el circuito urbano de Jeddah.', false),
    new GranPremio('Gran Premio de Australia', 'Melbourne', 'Gran Premio de Australia en el Circuito de Albert Park.', false),
    new GranPremio('Gran Premio de Azerbaijan', 'Bakú', 'Gran Premio de Azerbaijan en el circuito urbano de Baku.', false),
    new GranPremio('Gran Premio de Miami', 'Miami', 'Gran Premio de Miami en el Autódromo Internacional de Miami.', false),
    new GranPremio('Gran Premio de la Emilia Romagna', 'Imola', 'Gran Premio de la Emilia Romagna en el Autódromo Enzo e Dino Ferrari.', false),
    new GranPremio('Gran Premio de Monaco', 'Monaco', 'Gran Premio de Monaco en las calles del principado de Monaco.', false),
    new GranPremio('Gran Premio de España', 'Montmeló', 'Gran Premio de España en el Circuit de Barcelona-Catalunya.', false),
    new GranPremio('Gran Premio de Canada', 'Montreal', 'Gran Premio de Canada en el Circuito Gilles Villeneuve.', false),
    new GranPremio('Gran Premio de Austria', 'Spielberg', 'Gran Premio de Austria en el Red Bull Ring.', false),
    new GranPremio('Gran Premio de Gran Bretaña', 'Silverstone', 'Gran Premio de Gran Bretaña en el Circuito de Silverstone.', false),
    new GranPremio('Gran Premio de Hungria', 'Budapest', 'Gran Premio de Hungria en el Circuito de Hungaroring.', false),
    new GranPremio('Gran Premio de Belgica', 'Francorchamps', 'Gran Premio de Belgica en el Circuito de Spa Francorchamps.', false),
    new GranPremio('Gran Premio de Paises Bajos', 'Zandvoort', 'Gran Premio de Paises Bajos en el Circuito de Zandvoort.', false),
    new GranPremio('Gran Premio de Italia', 'Monza', 'Gran Premio de Italia en el Autodromo Internacional de Monza.', false),
    new GranPremio('Gran Premio de Singapur', 'Marina Bay', 'Gran Premio de Singapur en el circuito urbano de Marina Bay.', false),
    new GranPremio('Gran Premio de Japón', 'Suzuka', 'Gran Premio de Japón en el Circuito de Suzuka.', false),
    new GranPremio('Gran Premio de Qatar', 'Doha', 'Gran Premio de Qatar en el Circuito Internacional de Lusail.', false),
    new GranPremio('Gran Premio de Estados Unidos', 'Texas', 'Gran Premio de Estados Unidos en el Circuito de Las Americas.', false),
    new GranPremio('Gran Premio de Mexico', 'Ciudad de Mexico', 'Gran Premio de Mexico en el Autódromo Hermanos Rodriguez.', false),
    new GranPremio('Gran Premio de Brasil', 'Sao Paulo', 'Gran Premio de Brasil en el Autódromo Jose Carlos Pace.', false),
    new GranPremio('Gran Premio de Las Vegas', 'Las Vegas', 'Gran Premio de Las Vegas en el circuito urbano de Las Vegas.', false),
    new GranPremio('Gran Premio de Abu Dhabi', 'Yas Marina', 'Gran Premio de Abu Dhabi en el circuito de Yas Marina', false),
];

export const PUNTUACION = [
    25,
    18,
    15,
    12,
    10,
    8,
    6,
    4,
    2,
    1
];

export function obtenerSiguienteGranPremio() {
    let resultados;
    let siguienteGranPremio;
    try {
        resultados = JSON.parse(localStorage.getItem(constantes.claveResultados));

        siguienteGranPremio = resultados.find(function (granPremio) {
            return !granPremio.disputado;
        });

        if (!siguienteGranPremio) {
            siguienteGranPremio = false;
        }

        return siguienteGranPremio;
    } catch (exception) {
        return false;
    }
}