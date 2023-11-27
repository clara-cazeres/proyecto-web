/* function listarNoticias() {
    fetch('http://localhost:3001/noticias')
        .then(response => response.json())
        .then(noticias => {
            const divNoticias = document.getElementById('div-noticias');
            noticias.forEach(noticia => {
                const article = document.createElement('article');
                article.innerHTML = `
                <img src="img/img-noticias/noticia-0/${noticia.portada}" alt="el kuelgue noticia">
                <h4>"${noticia.titulo}"</h4>
                <p class="nota">${noticia.fecha}</p>
            `;
                divNoticias.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
}
listarNoticias(); */

function listarNoticias() {
    fetch('http://localhost:3001/noticias')
        .then(response => response.json())
        .then(noticias => {
            const divNoticias = document.getElementById('div-noticias');
            noticias.forEach(noticia => {
                const article = document.createElement('article');
                article.innerHTML = `
                <img src="${noticia.portada}" alt="${noticia.titulo}">
                <h4>${noticia.titulo}</h4>
                <p class="nota">${noticia.fecha}</p>
                `;
                console.log(noticia.portada)
                divNoticias.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
}
listarNoticias();
