console.log("Script cargado");

// Función para cargar la información del show
function cargarInfoShow(showId) {
    console.log("Llamando a cargarInfoShow con showId:", showId);
    fetch(`http://localhost:3001/shows/${showId}`)
        .then(response => response.json())
        .then(show => {
            document.getElementById('show-fecha').textContent += formatearFecha(show.fecha);
            document.getElementById('show-lugar').textContent += show.lugar;
            document.getElementById('show-ciudad-pais').textContent += `${show.ciudad}, ${show.pais}`;
            document.getElementById('show-asistentes').textContent += show.asistentes;
            console.log("Datos del show cargados:", show);
        })
        .catch(error => console.error('Error en cargarInfoShow:', error));
}

function obtenerShowIdDeURL() {
    const parametrosURL = new URLSearchParams(window.location.search);
    return parametrosURL.get('showId');
}

function formatearFecha(fecha) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// SUBIR IMAGENES
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOMContentLoaded");

    const showId = obtenerShowIdDeURL();
    if (showId) {
        cargarInfoShow(showId);
    } else {
        console.error("No se encontró showId en la URL.");
    }

    const uploadButton = document.getElementById("upload");
    if (!uploadButton) {
        console.error("El botón de subida no se encontró.");
        return;
    }
    const photos = document.getElementById("photos");
    if (!photos) {
        console.error("El contenedor de fotos no se encontró.");
        return;
    }

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

        fetch("http://localhost:3001/uploads-show-pic", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("hubo un problema con la consulta");
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


//comentarios
document.getElementById('enviar-comentario').addEventListener('click', function () {
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
