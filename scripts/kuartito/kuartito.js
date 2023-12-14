console.log("Script cargado");

// funcion mostrar info del show 
function cargarInfoShow(showId) {
    console.log("Llamando a cargarInfoShow con showId:", showId);
    fetch(`http://localhost:3001/shows/${showId}`)
        .then(response => response.json())
        .then(show => {
            document.getElementById('show-fecha').textContent = formatearFecha(show.fecha);
            document.getElementById('show-lugar').textContent = show.lugar;
            document.getElementById('show-ciudad-pais').textContent = `${show.ciudad}, ${show.pais}`;
            document.getElementById('show-integrantes').textContent = '100';  // Ajusta según sea necesario
            console.log("Datos del show cargados:", show);
            mostrarImagenes(show.images);
        })
        .catch(error => console.error('Error en cargarInfoShow:', error));
}

//obtener el id de la url 
function obtenerShowIdDeURL() {
    const parametrosURL = new URLSearchParams(window.location.search);
    return parametrosURL.get('showId');
}
//formatear fecha para mostrarla 
function formatearFecha(fecha) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

//mostrar las imagenes subidas
function mostrarImagenes(images) {
    const photosContainer = document.getElementById("photos");
    images.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        photosContainer.appendChild(img);
    });
}

//muestra la info del show y contiene el fetch para subir las fotos
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    const showId = obtenerShowIdDeURL();
    if (showId) {
        cargarInfoShow(showId);
        cargarComentarios(showId);
    } else {
        console.error("No se encontró showId en la URL.");
        return;
    }
   

    const uploadButton = document.getElementById("upload");
    const photos = document.getElementById("photos");


    uploadButton.addEventListener("click", (e) => {
        console.log("Click en el botón de subida.");
        e.preventDefault();
        const files = document.querySelector("[type=file]").files;
        if (!files.length) {
            console.error("No se seleccionó ningún archivo.");
            return;
        }
        const formData = new FormData();
        formData.append("image", files[0]);
        formData.append("showId", showId);
        console.log("ShowId a enviar:", showId);

        fetch("http://localhost:3001/uploads-show-pic", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Hubo un problema con la consulta");
                }
                return response.json();
            })
            .then(data => {
                if (data.imageUrl) {
                    const img = document.createElement("img");
                    img.src = data.imageUrl;
                    photos.appendChild(img);
                    console.log("Imagen subida:", data.imageUrl);
                } else {
                    console.error("No se recibió la URL de la imagen");
                }
            })
            .catch(error => {
                console.error("Hubo un problema subiendo la foto:", error);
            });
    });
});

//mostrar comentarios subidos
function cargarComentarios(showId) {
    fetch(`http://localhost:3001/comentarios/${showId}`)
        .then(response => response.json())
        .then(comentarios => {
            const divComentarios = document.querySelector('#div-comentarios');
            divComentarios.innerHTML = ''; 
            
            comentarios.forEach(comentario => {
                const pComentario = document.createElement('p');
                pComentario.textContent = comentario.texto;
                divComentarios.appendChild(pComentario);
            });
        })
        .catch(error => console.error('Error al cargar comentarios:', error));
}



//comentarios
document.getElementById('enviar-comentario').addEventListener('click', function () {
    const comentarioTexto = document.getElementById('texto-comentario').value;
    const showId = obtenerShowIdDeURL();

    fetch("http://localhost:3001/comentarios", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comentario: comentarioTexto,
            showId: showId,
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
            const divComentarios = document.querySelector('#div-comentarios');
            const pComentario = document.createElement('p'); 
            pComentario.textContent = comentarioTexto; 
            divComentarios.appendChild(pComentario); 
            

        })
        .catch(error => {
            console.error('Error:', error);
            // mostrar un mensaje al usuario
        });
});
