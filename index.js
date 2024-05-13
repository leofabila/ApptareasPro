const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'

let LIST

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' })

const fechaTarea = document.getElementById('fecha-tarea');

fechaTarea.addEventListener('change', function () {
    const fechaSeleccionada = this.value;
    console.log('Fecha seleccionada:', fechaSeleccionada);

    // Aquí puedes realizar acciones con la fecha seleccionada, como guardarla en tu lista de tareas
});


/*LIST.push({
    nombre: tarea,
    descripcion: descripcion,
    id: id,
    realizado: false,
    eliminado: false
})*/



// funcion de agregar tarea 

function agregarTarea(tarea, descripcion, id, realizado, eliminado) {
    if (eliminado) { return } // si existe eliminado es true si no es false 

    const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck

    const LINE = realizado ? lineThrough : ''

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</strong><br>
                        ${descripcion}
                    </p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend", elemento)

}

/*function agregarTarea(tarea, descripcion, id, realizado, eliminado) {
    if (eliminado) {
        return;
    }

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">
                <strong>${tarea}</strong><br>
                ${descripcion}
            </p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}*/

// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true //Si
    // console.log(LIST)
    // console.log(LIST[element.id])
    // console.log(LIST[element.id].realizado)
}

function tareaEliminada(element) {
    // console.log(element.parentNode)
    // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)
}





// crear un evento para escuchar el enter y para habilitar el boton 

/*botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        input.value = ''
    }

})*/

/*botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    const descripcion = document.getElementById('descripcion').value;

    if (tarea) {
        agregarTarea(tarea, descripcion, id, false, false);
        LIST.push({
            nombre: tarea,
            descripcion: descripcion,
            id: id,
            realizado: false,
            eliminado: false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
        input.value = '';
        document.getElementById('descripcion').value = ''; // Limpiar el campo de descripción después de agregar la tarea
    }
});*/

botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaSeleccionada = fechaTarea.value; // Obtener la fecha seleccionada

    if (tarea) {
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
        document.getElementById('descripcion').value = '';
        fechaTarea.value = ''; // Limpiar el campo de fecha después de agregar la tarea
    }
});


document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
            localStorage.setItem('TODO', JSON.stringify(LIST))

            input.value = ''
            id++
            console.log(LIST)
        }
    }

})




lista.addEventListener('click', function (event) {
    const element = event.target
    const elementData = element.attributes.data.value
    console.log(elementData)

    if (elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if (elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})




let data = localStorage.getItem('TODO')
if (data) {
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.descripcion, item.id, item.realizado, item.eliminado)
    })
}

// Eliminar una tarea de la lista y actualizar localStorage
function eliminarTarea(id) {
    LIST = LIST.filter(tarea => tarea.id !== id); // Filtrar la tarea con el ID que deseas eliminar
    localStorage.setItem('TODO', JSON.stringify(LIST)); // Actualizar localStorage con la lista filtrada
}

localStorage.clear(); // Esto eliminará todos los datos de localStorage

const diferenciaDias = Math.ceil((new Date(fechaTarea) - new Date()) / (1000 * 60 * 60 * 24));
if (diferenciaDias > 0 && diferenciaDias <= 3) {
    setTimeout(() => {
        new Notification('Recordatorio', {
            body: `Tienes una tarea pendiente "${tarea}" que vence pronto.`
        });
    }, diferenciaDias * 24 * 60 * 60 * 1000); // tiempo en milisegundos hasta la notificación
}

// Función para mostrar la primera notificación después de 
function mostrarNotificacion1() {
    setTimeout(function () {
        alert("No se te olvide anotar tu tarea en TareaProFCAeI");
    }, 500); // milisegundos
}

// Función para mostrar la segunda notificación después de 
function mostrarNotificacion2() {
    setTimeout(function () {
        alert("Termina tu tarea a tiempo con TareasProFCAeI");
    }, 60000); // 1 minuto en milisegundos
}

// Llama a las funciones para iniciar las notificaciones
mostrarNotificacion1();
mostrarNotificacion2();


const menu = document.querySelector('.menu');

document.querySelector('#menu-icon').addEventListener('click', () => {
    menu.classList.toggle('open');
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !event.target.matches('#menu-icon')) {
        menu.classList.remove('open');
    }
}) 
