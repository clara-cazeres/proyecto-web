function listarDiscografia() {
    fetch('http://localhost:3001/discografia')
        .then(response => response.json())
        .then(discos => {
            const divDiscografia = document.getElementById('discografia-container');
            discos.forEach(disco => {
                const div = document.createElement('div');
                div.innerHTML = `Nombre: ${disco.nombre} - Fecha: ${disco.fecha}`;
                divDiscografia.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}
listarDiscografia();