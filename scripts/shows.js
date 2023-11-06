const tablaShows = document.querySelector("#tabla-shows");

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
    const fila = document.createElement("tr");
    fila.innerHTML += `
    <td>${show.fecha}</td>
    <td>${show.lugar} - ${show.ciudad}, ${show.pais}</td>
    <td><a class="bt-tabla" href="${show.entradas}">
    <p>comprar</p>
    <span class="material-symbols-outlined">
        local_activity
    </span>
    </a>
    </td>
    <td>
    <a class="bt-tabla" href="">
        <p>ingresar</p>
            <span class="material-symbols-outlined">arrow_forward</span>
    </a>
    </td>
`;
    tablaShows.appendChild(fila);
}

function listarShows() {
    fetch('http://localhost:3001/shows')
        .then(response => response.json())
        .then(data => {
            limpiarTabla(); //limpio la tabla
            //itero sobre los registros devueltos por el backend
            data.forEach(show => {
                agregarFilaShow(show);
            });
        })
        .catch(error => console.error('Error:', error));
}

listarShows();
/* function listarShows() {
    fetch('http://localhost:3001/shows')
        .then(response => response.json())
        .then(shows => {
            const showsContainer = document.getElementById('prueba-listar');
            shows.forEach(show => {
                const div = document.createElement('div');
                div.innerHTML = `Ciudad: ${show.ciudad} - Fecha: ${show.fecha}`;
                showsContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}
listarShows(); */


