function listarNoticias() {
    fetch('http://localhost:3001/noticias')
        .then(response => response.json())
        .then(noticias => {
            const divNoticias = document.getElementById('div-noticias');
            noticias.forEach(noticia => {
                const fecha = new Date(noticia.fecha);
                const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
                const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(fecha);

                const article = document.createElement('article');
                article.innerHTML = `
                <img src="${noticia.portada}.jpg" alt="${noticia.portada}">
                <h4>${noticia.titulo}</h4>
                <p class="nota">${fechaFormateada}</p>
                `;
                console.log(`ruta noticia.portada:${noticia.portada} `)
                divNoticias.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
}
listarNoticias();

