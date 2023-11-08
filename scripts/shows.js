const tablaShows = document.querySelector("#tabla-shows");

//funciones generales
function limpiarTabla() {
    tablaShows.innerHTML = "";
    tablaShows.innerHTML = `
    <thead>
    <tr>
        <th>Fecha</th>
        <th>Lugar</th>
        <th>Tickets</th>
        <th>Kuartito</th>
    </tr>
    </thead>`
}

function agregarFilaShow(show) {
    const fecha = new Date(show.fecha);
    const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'long' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

    const fila = document.createElement("tr");
    fila.innerHTML += `
    <td>${fechaFormateada}</td>
    <td>${show.lugar} - ${show.ciudad}, ${show.pais}</td>
    <td><a class="bt-tabla" href="${show.entradas}">
        <p>comprar</p>
        <span class="material-symbols-outlined">
            local_activity
        </span>
    </a>
    </td>
    <td>
        <div class="bt-tabla link-kuartito"> 
            <p>ingresar</p>
            <span class="material-symbols-outlined">arrow_forward</span>
        </div>
    </td>
    `;
    tablaShows.appendChild(fila);
}

function agregarEventListenersADinamicos() {
    const botonesAbrirKuartito = document.querySelectorAll(".link-kuartito");
    const botonesCerrarKuartito = document.querySelectorAll(".cerrar-modal")
    botonesAbrirKuartito.forEach(boton => {
        boton.addEventListener('click', abrirVentanaModal);
    });
    botonesCerrarKuartito.forEach(boton => {
        boton.addEventListener('click', cerrarVentanaModal);
    });
}


//listar todos los elementos

function listarShows(tipo = '') {
    let url = 'http://localhost:3001/shows';
    if (tipo !== '') {
        url += `?tipo=${tipo}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            limpiarTabla();
            data.forEach(show => {
                agregarFilaShow(show);
            });
            agregarEventListenersADinamicos();
        })
        .catch(error => console.error('Error:', error));
}


listarShows();

//filtros por fecha

document.getElementById('fechas-pasadas').addEventListener('change', () => listarShows('pasadas'));

document.getElementById('fechas-proximas').addEventListener('change', () => listarShows('proximas'));

document.getElementById('todas-fechas').addEventListener('change', () => listarShows());


//kuartito ventana modal

let ventanaModal = document.querySelector(".fondo-modal");

function abrirVentanaModal() {
  ventanaModal.classList.remove("ocultar");
  ventanaModal.classList.add("mostrar-modal");
}
function cerrarVentanaModal() {
    ventanaModal.classList.remove("mostrar-modal")
    ventanaModal.classList.add("ocultar");
}