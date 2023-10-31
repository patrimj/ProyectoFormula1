
function guardarDatosUsuario(jugador) {
    var usuarioJSON = JSON.stringify(jugador);
    localStorage.setItem('jugador', usuarioJSON);
}

function obtenerDatosUsuario() {
    var usuarioJSON = localStorage.getItem('usuario'); 
    var usuarioCreado = JSON.parse(usuarioJSON);
    return usuarioCreado;
}

window.onload = function() { // Cuando se cargue la página se ejecuta la función que rellena los campos con los datos del usuario guardados en el localStorage
    let jugador = obtenerDatosUsuario();
    document.getElementById('nombre').value = jugador.nombre;
    document.getElementById('apellido').value = jugador.apellido;
    document.getElementById('correo').value = jugador.correo;
    document.getElementById('nick').value = jugador.nick;
}

function actualizarDatosUsuarioYContrasena() {

    // cogemos los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const contrasenaAntigua = document.getElementById('antigua-contrasena').value;
    let nuevaContrasena = document.getElementById('nueva-contrasena').value;
    let confirmacionNuevaContrasena = document.getElementById('confirmacion-nueva-contrasena').value;

    // datos actuales del usuario
    const jugador = obtenerDatosUsuario();

    // validaciones
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

    // Si se proporcionó una nueva contraseña, es decir si además de modificar el perfil quiere cambiar la contraseña
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

    //si no hay errores, se actualizan los datos del usuario
    if (errores !== '') {
        msg.textContent = errores;
        return;
    }

    // actualizamos los datos del usuario si se han modificado, si no se han modificado se queda el valor que ya tenía
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
    
    // Guarda los nuevos datos del usuario en el localStorage
    guardarDatosUsuario(jugador);
}

// Eventos

document.getElementById('formulario-actualizar').addEventListener('submit', function(evento) {
    evento.preventDefault();
    actualizarDatosUsuarioYContrasena();
});// este evento se ejecuta cuando se pulsa el botón de actualizar

document.getElementById('formulario-cambiar-contraseña').addEventListener('submit', function(evento) {
    evento.preventDefault();
    actualizarDatosUsuarioYContrasena();
});// este evento se ejecuta cuando se pulsa el botón de cambiar contraseña

  