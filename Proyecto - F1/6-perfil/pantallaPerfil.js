import {alternarModo} from "../alternarModo.js";
import {constantes} from "../constantes.js";


function guardarDatosUsuario(jugador) {
    var usuarioJSON = JSON.stringify(jugador);
    localStorage.setItem('jugador', usuarioJSON);
}

function obtenerDatosUsuario() {
    var usuarioJSON = localStorage.getItem('usuario'); 
    var usuarioCreado = JSON.parse(usuarioJSON);
    return usuarioCreado;
}

window.onload = function() { 
    alternarModo(JSON.parse(localStorage.getItem(constantes.oscuro)), "pantallaPerfil");

    let jugador = obtenerDatosUsuario();
    document.getElementById('nombre').value = jugador.nombre;
    document.getElementById('apellido').value = jugador.apellido;
    document.getElementById('correo').value = jugador.correo;
    document.getElementById('nick').value = jugador.nick;
};

function actualizarDatosUsuarioYContrasena() {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const contrasenaAntigua = document.getElementById('antigua-contrasena').value;
    let nuevaContrasena = document.getElementById('nueva-contrasena').value;
    let confirmacionNuevaContrasena = document.getElementById('confirmacion-nueva-contrasena').value;

    const jugador = obtenerDatosUsuario();

    const nombreRegex = /^[A-Za-z]{2,20}$/;
    const apellidoRegex = /^[A-Za-z]{2,30}$/;
    const correoRegex = /^[A-Za-z0-9_]{2,15}@[A-Za-z0-9_]{3,15}\.[A-Za-z0-9_]{2,4}$/;
    const contrasenaRegex = /^[a-zA-Z0-9*#$]{6,12}$/;

    var msg = document.getElementById('msg');

    msg.textContent = '';
    msg.style.color = "red";

    
    let nombreValido = nombreRegex.test(nombre);
    let apellidoValido = apellidoRegex.test(apellido);
    let correoValido = correoRegex.test(correo);
    let contrasenaValida = contrasenaRegex.test(contrasenaAntigua);

    let errores = '';

    if (!nombreValido) {
        errores += 'El nombre es incorrecto. ';
    }
    if (!apellidoValido) {
        errores += 'El apellido es incorrecto. ';
    }
    if (!correoValido) {
        errores += 'El correo es incorrecto. ';
    }

    if (nuevaContrasena !== '' || contrasenaAntigua !== '') {

        if (!contrasenaValida) {
            errores += 'La contraseña es incorrecto. ';
        }
        if (contrasenaAntigua !== jugador.contrasena) {
            errores += 'La contraseña antigua no coincide con la contraseña actual.';
        }
        if (nuevaContrasena === '') {
            errores += 'Debe proporcionar una nueva contraseña. ';
        }
        if (confirmacionNuevaContrasena === '') {
            errores += 'Debe confirmar la nueva contraseña. ';
        }
        
        if (nuevaContrasena !== confirmacionNuevaContrasena) {
            errores += 'Las contraseñas no coinciden. ';
        }
        if (nuevaContrasena === confirmacionNuevaContrasena) {
            jugador.contrasena = nuevaContrasena;
        }
    }    

    if (errores !== '') {
        msg.textContent = errores;
        return;
    }

    if (nombre !== '') {
        jugador.nombre = nombre;
    }
    if (apellido !== '') {
        jugador.apellido = apellido;
    }
    if (correo !== '') {
        jugador.correo = correo;
    }

    if (nuevaContrasena !== '') {
        jugador.contrasena = nuevaContrasena;
    }

    console.log("Nombre:", jugador.nombre,"Apellido:", jugador.apellido,"Correo:", jugador.correo,"Nick:", jugador.nick,"Contraseña", jugador.contrasena);
    
    guardarDatosUsuario(jugador);
}

// Eventos

document.getElementById('formulario-actualizar').addEventListener('submit', function(evento) {
    evento.preventDefault();
    actualizarDatosUsuarioYContrasena();
});

document.getElementById('formulario-cambiar-contraseña').addEventListener('submit', function(evento) {
    evento.preventDefault();
    actualizarDatosUsuarioYContrasena();
});

document.getElementById('cerrarSesion').addEventListener('click', function () {
    window.location.href = "../1-inicial/pantallaInicial.html";
});

document.getElementById('cerrarSesionBorrar').addEventListener('click', function () {
    localStorage.clear()
    window.location.href = "../1-inicial/pantallaInicial.html";
}); 
