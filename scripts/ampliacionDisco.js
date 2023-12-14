function obtenerIdDelDisco() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

function mostrarDetallesDelDisco() {
    const idDisco = obtenerIdDelDisco();

    fetch(`http://localhost:3001/discografia/${idDisco}`)
        .then(response => response.json())
        .then(disco => {
            document.getElementById('nombre-disco').innerText = disco.nombre;
            document.getElementById('ano-disco').innerText = new Date(disco.fecha).getFullYear();
            document.getElementById('tipo-disco').innerText = disco.tipo;
            
            // Actualizar la imagen de la portada
            const imagen = document.getElementById('imagen-disco');
            imagen.src = `https://res.cloudinary.com/dflzegwev/image/upload/v1701614049/fotos-discografia/${disco.portada}.jpg`;
            imagen.alt = `Portada del disco ${disco.nombre}`;

            // Actualizar el enlace a Spotify
            const linkSpotify = document.getElementById('link-spotify');
            if (disco.linkspotify) {
                linkSpotify.href = disco.linkspotify;
                linkSpotify.style.display = 'block';
            } else {
                linkSpotify.style.display = 'none';
            }

            // Listar las canciones
            const divCanciones = document.getElementById('canciones-disco');
            divCanciones.innerHTML = ''; // Limpiar contenido anterior
            disco.canciones.forEach(cancion => {
                const p = document.createElement('p');
                p.innerText = cancion;
                divCanciones.appendChild(p);
            });
        })
        .catch(error => console.error('Error:', error));
}

mostrarDetallesDelDisco();
