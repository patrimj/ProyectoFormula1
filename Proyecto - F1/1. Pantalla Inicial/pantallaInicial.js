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
    const correoRegex = /^[A-Za-z0-9_]{2,15}@[A-Za-z0-9_]{3,15}\.[A-Za-z0-9_]{2,4}$/;
    const contrasenaRegex = /^[a-zA-Z0-9_@\$]{6,12}$/;

    var msg = document.getElementById('msg'); 

    // Reinicializa el mensaje de error antes de realizar las validaciones.
    msg.textContent = '';
    msg.style.color = "red";

    let correoValido = correoRegex.test(correoInput.value);
    let contrasenaValida = contrasenaRegex.test(contrasenaInput.value);

    if (!correoValido && !contrasenaValida) {
        msg.textContent = 'El correo y la contraseña no son correctos'; 
    } else if (!correoValido) {
        msg.textContent = 'El correo no es correcto'; 
    } else if (!contrasenaValida) {
        msg.textContent = 'La contraseña no es correcta'; 
    }

    if (msg.textContent === '') { 
        // Si no hay mensajes de error, almacena los datos del usuario.
        usuario.correo = correoInput.value;
        usuario.contrasena = contrasenaInput.value;
        console.log("Datos del usuario:", usuario);
    }

//JSON

    var usuarioJSON = JSON.stringify(usuario);    // Convierte el objeto en una cadena JSON
    localStorage.setItem('usuario', usuarioJSON); // Almacena la cadena JSON en el localStorage
}