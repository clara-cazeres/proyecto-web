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
                    <img src="${noticia.portada}" alt="Portada de la noticia ${noticia.titulo}">
                    <h4>${noticia.titulo}</h4>
                    <p class="nota">${fechaFormateada}</p>
                `;

                divNoticias.appendChild(article);

                // Añadir un manejador de eventos para redirigir a la página de detalles
                article.addEventListener('click', () => {
                    window.location.href = `ampliacion-noticia.html?id=${noticia._id}`;
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

listarNoticias();


/* function listarNoticias() {
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
 */
