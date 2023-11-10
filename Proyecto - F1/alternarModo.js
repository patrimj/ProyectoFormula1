import { constantes } from './constantes.js';

/**
 *
 * @param {boolean} oscuro true: Cambiar a oscuro | false: Cambiar a claro.
 * @param {string} nombre Nombre del la pantalla en donde se cambiará el modo.
 */
export function alternarModo(oscuro, nombre) {
    let cabecera = document.getElementsByTagName('HEAD')[0];
    let comun;
    let especifico;

    document.querySelector('.comun').remove()
    document.querySelector('.especifico').remove()

    if (oscuro) {
        comun = crearEnlace(true, true);
        especifico = crearEnlace(false, true, nombre);
    } else {
        comun = crearEnlace(true, false);
        especifico = crearEnlace(false, false, nombre);
    }

    localStorage.setItem(constantes.oscuro, JSON.stringify(oscuro))

    cabecera.appendChild(comun);
    cabecera.appendChild(especifico);
}

/**
 *
 * @param {boolean} comun Indica si se referencia al archivo .css común del proyecto o al especifico de esa pantalla.
 * @param {boolean} oscuro Indica si se referencia al archivo .css del tema claro u oscuro.
 * @param {string} nombre Nombre del la pantalla en donde se cambiará el modo.
 * @returns {HTMLLinkElement} Elemento <link> referenciado que referencia al archivo .css.
 */
function crearEnlace(comun, oscuro, nombre = "") {
    let enlace = document.createElement('link');

    enlace.rel = 'stylesheet';

    enlace.type = 'text/css';

    if (comun) {
        enlace.classList.add('comun');
        enlace.href = '../Css/superComun';
    } else {
        enlace.classList.add('especifico')
        enlace.href = '../Css/'+ nombre;
    }

    if (!oscuro) {
        enlace.href += "Claro"
    }

    enlace.href += ".css" 

    console.log(enlace);

    return enlace
}
