export class GranPremio {
    constructor(nombre, lugar, descripcion) {
        this.nombre = nombre;
        this.lugar = lugar;
        this.descripcion = descripcion;
    }
}
//Se deben cargar los grandes premios con todas las puntuaciones de todas las carreras.
export const grandesPremios = [
    new GranPremio('Nom1', 'Australia', 'Descripcion1'),
    new GranPremio('Nom2', 'Bahrain', 'Descripcion2'),
    new GranPremio('Nom3', 'China', 'Descripcion3'),
    new GranPremio('Nom4', 'Azerbaijan', 'Descripcion4'),
    new GranPremio('Nom5', 'España', 'Descripcion5'),
    new GranPremio('Nom6', 'Mónaco', 'Descripcion6'),
];
