function obtenerIdDelDisco() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

function mostrarDetallesDelDisco() {
    const idDisco = obtenerIdDelDisco();

    fetch(`http://localhost:3001/discografia/${idDisco}`)
        .then(response => response.json())
        .then(disco => {
            // Actualizar título y detalles del disco
            document.getElementById('nombre-disco').innerText = disco.nombre;
            document.getElementById('year-tipo-disco').innerText = `${new Date(disco.fecha).getFullYear()} - ${disco.tipo}`;
            
            // Actualizar la imagen de la portada
            const imagen = document.getElementById('imagen-disco');
            imagen.src = `https://res.cloudinary.com/dflzegwev/image/upload/v1701614049/fotos-discografia/${disco.portada}.jpg`;
            imagen.alt = `Portada del disco ${disco.nombre}`;

            // Actualizar el iframe de Spotify
            const spotifyIframe = document.getElementById('spotify-iframe');
            if (disco.linkspotify) {
                spotifyIframe.src = disco.linkspotify;
                spotifyIframe.style.display = 'block';
            } else {
                spotifyIframe.style.display = 'none';
            }

            // Listar las canciones
            const ulCanciones = document.getElementById('canciones-disco');
            ulCanciones.innerHTML = ''; // Limpiar contenido anterior
            disco.canciones.forEach(cancion => {
                const li = document.createElement('li');
                li.innerText = cancion;
                ulCanciones.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

mostrarDetallesDelDisco();
