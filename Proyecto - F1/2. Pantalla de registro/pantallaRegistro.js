const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellidos");
const correoInput = document.getElementById("correo");
const nickInput = document.getElementById("nick");
const contrasenaInput = document.getElementById("contrasena");
const confirmarContrasenaInput = document.getElementById("confirmacion-contrasena");
const registrarseBtn = document.getElementById("registrarse");

var usuarioCreado = {
    nombre: '',
    apellido: '',
    correo: '',
    nick: '',
    contrasena: ''
};

registrarseBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que se recargue la página
    cargarDatos();
    if (usuarioCreado.nombre !== '' && usuarioCreado.apellido !== '' && usuarioCreado.correo !== '' && usuarioCreado.nick !== '' && usuarioCreado.contrasena !== '') {
        let usuarioJSON = JSON.stringify(usuarioCreado);
        localStorage.setItem('usuario', usuarioJSON); 
        window.location.href = "../1. Pantalla Inicial/pantallaInicial.html";
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
    if (!nickValido) {
        errores += 'El nick es incorrecto. ';
    }
    if (!contrasenaValida) {
        errores += 'La contraseña es incorrecto. ';
    }
    if (contrasenaInput.value !== confirmarContrasenaInput.value) {
        errores += 'Las contraseñas no coinciden. ';
    }

    if (errores !== '') {
        msg.textContent = errores;
        return;
    }
    // Cargar los datos del usuario
    usuarioCreado.nombre = nombreInput.value;
    usuarioCreado.apellido = apellidoInput.value;
    usuarioCreado.correo = correoInput.value;
    usuarioCreado.nick = nickInput.value;
    usuarioCreado.contrasena = contrasenaInput.value;
    console.log("Nombre:", usuarioCreado.nombre,"Apellido:", usuarioCreado.apellido,"Correo:", usuarioCreado.correo,"Nick:", usuarioCreado.nick,"Contraseña", usuarioCreado.contrasena);
}    




