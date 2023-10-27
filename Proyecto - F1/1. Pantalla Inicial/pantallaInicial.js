const correoInput = document.getElementById("correo");
const contrasenaInput = document.getElementById("contrasena");
const iniciarSesionBtn = document.getElementById("iniciar-sesion");

var usuario = {
    correo: '',
    contrasena: ''
};

// EVENTOS
iniciarSesionBtn.addEventListener('click', function(event) {
    event.preventDefault();//evita que se recargue la página
    cargarDatos();
});

// FUNCIONES
function cargarDatos(){

    /* si el correo y contraseña ya se han verificado en la página de registro no es necesario volver a verificarlos
    const correoRegex = /^[A-Za-z0-9_]{2,15}@[A-Za-z0-9_]{3,15}\.[A-Za-z0-9_]{2,4}$/;
    const contrasenaRegex = /^[a-zA-Z0-9*#$]{6,12}$/;*/

    //coge el usuario del registro de localStorage
    var usuarioJSON = localStorage.getItem('usuario'); 
    var usuarioCreado = JSON.parse(usuarioJSON);

    var msg = document.getElementById('msg'); 

    msg.textContent = '';
    msg.style.color = "red";

    //verifica si el usuario existe en el localStorage y si el correo y la contraseña son los mismos
    if (usuarioCreado !== null) {
        if (usuarioCreado.correo === correoInput.value && usuarioCreado.contrasena === contrasenaInput.value) {
            window.location.href = "/Proyecto - F1/3. Pantalla Inicio/pantallaInicio.html"; 
        } else if (usuarioCreado.correo !== correoInput.value) {
            msg.textContent = 'El correo no es correcto'; 
        } else {
            msg.textContent = 'La contraseña no es correcta'; 
        }
    } else {
        msg.textContent = 'El usuario no está registrado'; 
    }

    if (correoInput.value === '') {
        msg.textContent = 'Ingrese un correo';
    } else if (contrasenaInput.value === '') {
        msg.textContent = 'Ingrese una contraseña';
    }

    if (msg.textContent === '') { // cargamos los datos.
        usuario.correo = correoInput.value;
        usuario.contrasena = contrasenaInput.value;
        console.log("Correo del usuario:", usuario.correo,"Contraseña del usuario:", usuario.contrasena);

        var usuarioJSON = JSON.stringify(usuario);     
        localStorage.setItem('usuario', usuarioJSON); //
    }

    /*
    let correoValido = correoRegex.test(correoInput.value);
    let contrasenaValida = contrasenaRegex.test(contrasenaInput.value);

    if (!correoValido && !contrasenaValida) {
        msg.textContent = 'El correo y la contraseña no son correctos'; 
    } else if (!correoValido) {
        msg.textContent = 'El correo no es correcto'; 
    } else if (!contrasenaValida) {
        msg.textContent = 'La contraseña no es correcta'; 
    }

    if (msg.textContent === '') { // cargamos los datos.
        usuario.correo = correoInput.value;
        usuario.contrasena = contrasenaInput.value;
        console.log("Correo del usuario:", usuario.correo,"Contraseña del usuario:", usuario.contrasena);

        // si los datos del usuario en el inicio de sesión son correctos, se almacenan en el localStorage
        var usuarioJSON = JSON.stringify(usuario);    
        localStorage.setItem('usuario', usuarioJSON); 
    }*/
}
