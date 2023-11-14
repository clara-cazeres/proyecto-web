function listarDiscografia() {
    fetch('http://localhost:3001/discografia')
        .then(response => response.json())
        .then(discos => {
            const divDiscografia = document.getElementById('discografia-container');
            discos.forEach(disco => {
                const div = document.createElement('div');
                div.innerHTML = `Nombre: ${disco.nombre} - Fecha: ${disco.fecha}`;
                divDiscografia.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}
listarDiscografia();



//filtro busqueda en tiempo real
let inputBuscar = document.querySelector("#input_buscar");

inputBuscar.addEventListener("keyup", filtrarPorTexto);

function filtrarPorTexto() {
    let textoIngresado = inputBuscar.value;
    let discosFiltrados = [];

    for (let i = 0; i <= discos.length - 1; i++) {
        if (discos[i].nombre.toUpperCase().includes(textoIngresado.toUpperCase()) || discos[i].fecha.toUpperCase().includes(textoIngresado.toUpperCase())) {
            discosFiltrados.push(discos[i])
        }
    }

    listarDiscografia();
}