const correoInput = document.getElementById("correo");
const contrasenaInput = document.getElementById("contrasena");
const iniciarSesionBtn = document.getElementById("iniciar-sesion");

var usuario = {
    correo: '',
    contrasena: ''
};

// EVENTOS
iniciarSesionBtn.addEventListener('click', function(event) {
    event.preventDefault();
    cargarDatos();
});

// FUNCIONES
function cargarDatos(){

    var usuarioJSON = localStorage.getItem('usuario'); 
    var usuarioCreado = JSON.parse(usuarioJSON);

    var msg = document.getElementById('msg'); 

    msg.textContent = '';
    msg.style.color = "red";

    if (usuarioCreado !== null) {
        if (usuarioCreado.correo === correoInput.value && usuarioCreado.contrasena === contrasenaInput.value) {
            window.location.href = "../3-inicio/pantallaInicio.html";
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

    if (msg.textContent === '') { 
        usuario.correo = correoInput.value;
        usuario.contrasena = contrasenaInput.value;
        console.log("Correo del usuario:", usuario.correo,"Contraseña del usuario:", usuario.contrasena);

        usuarioJSON = JSON.stringify(usuario);
        localStorage.setItem('login', usuarioJSON); 
    }

}
