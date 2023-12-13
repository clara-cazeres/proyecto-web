function listarDiscografia() {
    fetch('http://localhost:3001/discografia')
        .then(response => response.json())
        .then(discos => {
            const divDiscografia = document.getElementById('discografia-container');
            discos.forEach(disco => {

                const fecha = new Date(disco.fecha);
                const year = fecha.getFullYear();
                
                const article = document.createElement('article');  

                article.innerHTML = `
                    <img src="https://res.cloudinary.com/dflzegwev/image/upload/v1701614049/fotos-discografia/${disco.portada}.jpg" alt="Portada del disco ${disco.nombre}">
                    <h5>${disco.nombre}</h5>
                    <p>${year} - ${disco.tipo}</p>
                `;
         
                divDiscografia.appendChild(article);

                                //ampliacion de cada disco
                                article.addEventListener('click', () => {
                    
                                    mostrarDetallesDelDisco(disco); 
                                });
            });
        })


        .catch(error => console.error('Error:', error));
}
listarDiscografia();


function mostrarDetallesDelDisco(disco) {
    const detallesDiv = document.getElementById('detalles-disco');
    console.log(disco); 
    
    if (!Array.isArray(disco.canciones)) {
        console.error('El disco no tiene una propiedad canciones válida:', disco);
        return;}

        console.log(disco.canciones)
    // Comenzamos con la estructura base de la tabla
    let cancionesHTML = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Reproducciones</th>
                    <th>Duración</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Iteramos sobre cada canción y agregamos una fila en la tabla para cada una
    disco.canciones.forEach((cancion, index) => {
        cancionesHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${cancion.titulo}</td>
                <td>${cancion.reproducciones}</td>
                <td>${cancion.duracion}</td>
            </tr>
        `;
    });

    // Cerramos la etiqueta tbody y la tabla
    cancionesHTML += `
            </tbody>
        </table>
    `;

    // Actualizamos el innerHTML del div de detalles con la información del disco y la tabla de canciones
    detallesDiv.innerHTML = `
        <img src="https://res.cloudinary.com/dflzegwev/image/upload/v1701614049/fotos-discografia/${disco.portada}.jpg" alt="Portada del disco ${disco.nombre}">
        <h2>${disco.nombre}</h2>
        ${cancionesHTML}
    `;

    // Ocultar otros discos
    document.getElementById('pagina-discografia').style.display = 'none';
}

/* 
function mostrarDetallesDelDisco(disco) {

    const detallesDiv = document.getElementById('detalles-disco');
    detallesDiv.innerHTML = `
        <img src="https://res.cloudinary.com/dflzegwev/image/upload/v1701614049/fotos-discografia/${disco.portada}.jpg" alt="Portada del disco ${disco.nombre}">
        <h2>${disco.nombre}</h2>
        <p>${disco.canciones}</p>
    `;
    // ocultar otros discos
    document.getElementById('pagina-discografia').style.display = 'none';
}
 */

/* //filtro busqueda en tiempo real
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
} */