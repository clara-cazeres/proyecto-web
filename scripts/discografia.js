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

                // Ampliación de cada disco
                article.addEventListener('click', () => {
                    window.location.href = `ampliacion-disco.html?id=${disco._id}`; 
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

listarDiscografia();


/* function listarDiscografia() {
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
listarDiscografia(); */



/* function mostrarDetallesDelDisco(disco) {

    const detallesDiv = document.getElementById('detalles-disco');
    detallesDiv.innerHTML = `
        <img src="https://res.cloudinary.com/dflzegwev/image/upload/v1701614049/fotos-discografia/${disco.portada}.jpg" alt="Portada del disco ${disco.nombre}">
        <h2>${disco.nombre}</h2>
        <p>${disco.canciones}</p>
    `;
    console.log(disco.nombre)
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