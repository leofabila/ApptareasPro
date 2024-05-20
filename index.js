const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const descripcionInput = document.getElementById('descripcion'); // Asume que hay un input con id 'descripcion'
const botonEnter = document.querySelector('#boton-enter');
const fechaTarea = document.getElementById('fecha-tarea'); // Asume que hay un input de tipo fecha con id 'fecha-tarea'

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';

let LIST = [];
let id = 0;

// Creación de fecha actualizada
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' });

// Función de agregar tarea
function agregarTarea(tarea, descripcion, fecha, id, realizado, eliminado) {
    if (eliminado) return;

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">
                <strong>${tarea}</strong><br>
                ${descripcion}<br>
                <small>${fecha}</small>
            </p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función de tarea realizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = !LIST[element.id].realizado;
    localStorage.setItem('TODO', JSON.stringify(LIST));
}

// Función de tarea eliminada
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
    localStorage.setItem('TODO', JSON.stringify(LIST));
}

// Crear un evento para escuchar el enter y para habilitar el botón
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    const descripcion = descripcionInput.value;
    const fechaSeleccionada = fechaTarea.value;

    if (tarea && descripcion && fechaSeleccionada) {
        agregarTarea(tarea, descripcion, fechaSeleccionada, id, false, false);
        LIST.push({
            nombre: tarea,
            descripcion: descripcion,
            fecha: fechaSeleccionada,
            id: id,
            realizado: false,
            eliminado: false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
        input.value = '';
        descripcionInput.value = '';
        fechaTarea.value = '';
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        botonEnter.click();
    }
});

lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
});

let data = localStorage.getItem('TODO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.descripcion, item.fecha, item.id, item.realizado, item.eliminado);
    });
}

function eliminarTarea(id) {
    LIST = LIST.filter(tarea => tarea.id !== id);
    localStorage.setItem('TODO', JSON.stringify(LIST));
}

// Mostrar notificaciones temporizadas
function mostrarNotificacion(mensaje, tiempo) {
    setTimeout(function () {
        alert(mensaje);
    }, tiempo);
}

mostrarNotificacion("No se te olvide anotar tu tarea en TareaProFCAeI", 300000); // 5 minutos
mostrarNotificacion("Termina tu tarea a tiempo con TareasProFCAeI", 60000); // 1 minuto

// Manejo del menú
const menu = document.querySelector('.menu');
document.querySelector('#menu-icon').addEventListener('click', () => {
    menu.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !event.target.matches('#menu-icon')) {
        menu.classList.remove('open');
    }
});
