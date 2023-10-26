export class GranPremio {
    constructor(nombre, lugar, descripcion, carrera) {
      this.nombre = nombre;
      this.lugar = lugar;
      this.descripcion = descripcion;
      this.carrera = carrera;
    }
  }

export class Bot {
    constructor(nombre, pilotoTitular, pilotoSuplente) {
        this.nombre = nombre;
        this.pilotoTitular = pilotoTitular;
        this.pilotoSuplente = pilotoSuplente;
    }
}

export class Piloto {

    constructor(codigo, nombre, apellido, nacionalidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
    }
}  

export class Equipo {
    constructor(nombre, puntos) {
        this.nombre = nombre;
        this.puntos = puntos;
    }
}

export class Usuario {
    constructor(nombre, pilotoTitular, pilotoSuplente) {
        this.nombre = nombre;
        this.pilotoTitular = pilotoTitular;
        this.pilotoSuplente = pilotoSuplente;
    }
}


