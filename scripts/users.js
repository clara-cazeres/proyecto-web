//Mostrar Login & Sign Up

const formSignUp = document.querySelector("#form-signup");
const formLogin = document.querySelector("#form-login");
const titulo = document.querySelector("#titulo-user");

document.querySelector('#bt-redirigir-login').addEventListener("click", function(){
    formSignUp.classList.add("ocultar");
    formLogin.classList.remove("ocultar");
    titulo.textContent = 'Iniciar sesión';
});

document.querySelector('#bt-redirigir-signup').addEventListener("click", function(){
    formLogin.classList.add("ocultar");
    formSignUp.classList.remove("ocultar");
    titulo.textContent = 'Registrarme'
});


// Funcion login

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('bt-login');
    const errorMsg = document.querySelector('.mensaje-error');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();

        const username = document.getElementById('input-usarname1').value;
        const password = document.getElementById('input-password1').value;

        // verificar si los campos están vacíos
        if (!username || !password) {
            errorMsg.textContent = 'Debes ingresar nombre de usuario y contraseña';
            return;
        }

        // enviar solicitud al back
        fetch(`http://localhost:3001/users/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
            method: 'GET'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('401');
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            // si está ok, redirijo al usuario (como figura que queda loggeado?)
            window.location.href = 'index.html';
        })
        .catch(error => {
            if (error.message === '401') {
                errorMsg.textContent = 'Nombre de usuario o contraseña incorrectos';
            } 
            else if(error.messaje === '404'){
                errorMsg.textContent = 'Usuario no encontrado';    
            }
            else {
                errorMsg.textContent = 'Error en el servidor';
            }
        });
    });
});


//Funcion Sign Up

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('form-signup');
    const errorMsg = signupForm.querySelector('.mensaje-error');
    const modalSuccess = document.getElementById('modal-success');
    const btHome = document.getElementById('bt-home');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('input-username2').value;
        const email = document.getElementById('input-email').value;
        const password = document.getElementById('input-password2').value;

        // Verificar si los campos están vacíos
        if (!username || !email || !password) {
            errorMsg.textContent = 'Todos los campos son obligatorios';
            return;
        }

        // Enviar solicitud al backend
        fetch('http://localhost:3001/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 400) {
                return response.text().then(text => { throw new Error(text) });
            } else {
                throw new Error('Error en el servidor');
            }
        })
        .then(data => {

            console.log('Usuario registrado:', data);
            // Mostrar pop-up de éxito
            modalSuccess.style.display = 'flex';

            // Evento de clic para el botón del pop-up
            btHome.addEventListener('click', function() {
                window.location.href = 'index.html'; // Cambia esto a tu página de inicio
            });
        })
        .catch(error => {
            // Mostrar mensaje de error basado en la respuesta del servidor
            errorMsg.textContent = error.message;
        });
    });
});




