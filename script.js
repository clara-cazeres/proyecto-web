const divPrueba = document.querySelector("#prueba-listar")

function listarShows(){
    fetch('http://localhost:3001/shows')
    .then(response => response.json())
    .then(data =>{
        data.forEach(show =>{
            divPrueba.innerHTML += `
            <h3>${show}</h3> `
            console.log(show)
        })
    })
    .catch(error => {
        console.error('Error:', error);
    })
};

listarShows();