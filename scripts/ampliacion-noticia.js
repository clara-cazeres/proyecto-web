function obtenerIdDeLaNoticia() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

function mostrarDetallesDeLaNoticia() {
    const idNoticia = obtenerIdDeLaNoticia();

    fetch(`http://localhost:3001/noticias/${idNoticia}`)
        .then(response => response.json())
        .then(noticia => {
            document.getElementById('titulo-noticia').innerText = noticia.titulo;
            document.getElementById('fecha-noticia').innerText = new Date(noticia.fecha).toLocaleDateString('es-ES');
            document.getElementById('extracto-noticia').innerText = noticia.extracto;
            document.getElementById('imagen-noticia').src = noticia.imagen;
            document.getElementById('texto-noticia').innerText = noticia.texto;
        })
        .catch(error => console.error('Error:', error));
}

mostrarDetallesDeLaNoticia();
