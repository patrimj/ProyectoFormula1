const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const correoInput = document.getElementById("correo");
const nickInput = document.getElementById("nick");
const contrasenaInput = document.getElementById("contrasena");
const confirmarContrasenaInput = document.getElementById("confirmar-contrasena");
const registrarseBtn = document.getElementById("registrarse");

var usuarioCreado = {
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: ''
};

registrarseBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que se recargue la página
    cargarDatos();
    if (usuarioCreado.nombre !== '' && usuarioCreado.apellido !== '' && usuarioCreado.correo !== '' && usuarioCreado.contrasena !== '') {
        window.location.href = "/Proyecto - F1/1. Pantalla Inicial/pantallaInicial.html"; 
    }
});

// Validación de datos
function cargarDatos(){
    const nombreRegex = /^[A-Za-z]{2,20}$/;
    const apellidoRegex = /^[A-Za-z]{2,30}$/;
    const correoRegex = /^[A-Za-z0-9_]{2,15}@[A-Za-z0-9_]{3,15}\.[A-Za-z0-9_]{2,4}$/;
    const nickRegex = /^[A-Za-z0-9_]{4,10}$/;
    const contrasenaRegex = /^[a-zA-Z0-9*#$]{6,12}$/;

    var msg = document.getElementById('msg'); 

    msg.textContent = '';
    msg.style.color = "red";

    let nombreValido = nombreRegex.test(nombreInput.value);
    let apellidoValido = apellidoRegex.test(apellidoInput.value);
    let correoValido = correoRegex.test(correoInput.value);
    let nickValido = nickRegex.test(nickInput.value);
    let contrasenaValida = contrasenaRegex.test(contrasenaInput.value);

    if (!nombreValido && !apellidoValido && !correoValido && !nickValido && !contrasenaValida) {
        msg.textContent = 'El nombre, apellido, correo, nick y contraseña no son correctos'; 
    } else if (!nombreValido) {
        msg.textContent = 'El nombre no es correcto'; 
    } else if (!apellidoValido) {
        msg.textContent = 'El apellido no es correcto'; 
    } else if (!correoValido) {
        msg.textContent = 'El correo no es correcto'; 
    } else if (!nickValido) {
        msg.textContent = 'El nick no es correcto'; 
    } else if (!contrasenaValida) {
        msg.textContent = 'La contraseña no es correcta'; 
    }

    if (msg.textContent === '') { // cargamos los datos.
        usuarioCreado.nombre = nombreInput.value;
        usuarioCreado.apellido = apellidoInput.value;
        usuarioCreado.correo = correoInput.value;
        usuarioCreado.contrasena = contrasenaInput.value;
        console.log("Nombre del usuario:", usuarioCreado.nombre,"Apellido del usuario:", usuarioCreado.apellido,"Correo del usuario:", usuarioCreado.correo,"Contraseña del usuario:", usuarioCreado.contrasena);
    }

}    
//JSON

var usuarioJSON = JSON.stringify(usuarioCreado); 
localStorage.setItem('usuario', usuarioJSON); 



