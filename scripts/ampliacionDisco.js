const params = new URLSearchParams(window.location.search);
const discoId = params.get('discoId');


console.log(discoId)


function obtenerDetallesDisco() {
    fetch(`http://localhost:3001/discografia/${discoId}`)
        .then(response => response.json())
        .then(disco => {
            // Aquí usas la información del disco para actualizar el DOM
            document.getElementById('titulo-disco').textContent = disco.nombre;
            document.getElementById('portada-disco').src = disco.portada;
            console.log("Datos del disco:", disco)
        })
        .catch(error => console.error('Error:', error));
}

obtenerDetallesDisco();
