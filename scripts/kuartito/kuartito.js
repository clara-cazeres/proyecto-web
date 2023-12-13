


document.getElementById('enviar-comentario').addEventListener('click', function() {
    const comentarioTexto = document.getElementById('texto-comentario').value;
    const customShowId = `${customId}`; // Asegúrate de reemplazar esto con el ID real del show

    fetch('/comentarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comentario: comentarioTexto,
            showId: customShowId
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        // Comprobamos si la respuesta es JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json(); // Es un JSON
        } else {
            throw new Error('Respuesta no JSON: ' + contentType);
        }
    })
    .then(data => {
        document.getElementById('texto-comentario').value = ''; // Limpia el textarea
        
        // Actualiza la UI
        const divComentarios = document.createElement('div');
        divComentarios.textContent = comentarioTexto;
        document.querySelector('.interaccion-usuario').appendChild(divComentarios);
    })
    .catch(error => {
        console.error('Error:', error);
        // mostrar un mensaje al usuario
    });
});
