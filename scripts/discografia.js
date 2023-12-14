let discos = []; // Almacena los datos de discos

// Función para obtener y mostrar todos los discos
function listarDiscografia() {
    fetch('http://localhost:3001/discografia')
        .then(response => response.json())
        .then(datosDiscos => {
            discos = datosDiscos; // Almacena los datos de discos
            renderizarDiscografia(discos); // Muestra todos los discos inicialmente
        })
        .catch(error => console.error('Error:', error));
}

// Función para renderizar la discografía en la página
function renderizarDiscografia(discosParaRenderizar) {
    const divDiscografia = document.getElementById('discografia-container');
    divDiscografia.innerHTML = ''; // Limpia el contenido actual

    discosParaRenderizar.forEach(disco => {
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
}

// Función para filtrar la discografía según el texto ingresado
function filtrarPorTexto() {
    let textoIngresado = inputBuscar.value.toUpperCase();
    let discosFiltrados = discos.filter(disco =>
        disco.nombre.toUpperCase().includes(textoIngresado) ||
        disco.fecha.toUpperCase().includes(textoIngresado)
    );
    renderizarDiscografia(discosFiltrados);
}

// Evento para el input de búsqueda
let inputBuscar = document.querySelector("#input-buscar");
inputBuscar.addEventListener("keyup", filtrarPorTexto);

// Llama a la función
listarDiscografia();

