// Funcion login

const API_URL = "http://localhost:3001"
const USER_KEY = "user"
console.log(`${API_URL}/usuario/login`);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("form-login");
    const errorField = document.querySelector(".mensaje-error");
    const logoutButton = document.getElementById("bt-logout");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("Formulario interceptado");

            const { username, password } = e.target;
            console.log("Datos de usuario:", username.value, password.value);

            const loginURL = `${API_URL}/usuario/login`
            const body = JSON.stringify({
                username: username.value,
                password: password.value
            });

            fetch(loginURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            }).then((response) => {
                console.log("Respuesta del servidor:", response);
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 404) {
                    errorField.innerHTML = "Usuario no encontrado";
                } else if (response.status === 401) {
                    errorField.innerHTML = "Contraseña incorrecta";
                } else {
                    errorField.innerHTML = "Error en la autenticación";
                }
            }).then((data) => {
                if (data) {
                    console.log("Datos recibidos:", data);
                    localStorage.setItem(USER_KEY, JSON.stringify(data));
                    window.location.href = "restricted.html";
                }
            }).catch((err) => {
                errorField.innerHTML = "Ocurrió un error al iniciar sesión";
                console.error("Error:", err);
            });            

    });
    }

    if(logoutButton){
        logoutButton.addEventListener("click", ()=>{
            localStorage.removeItem(USER_KEY);
            window.location.href = "usuario.html"
        })
    }
});


//Funcion Sign Up

document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('form-signup');
    const errorMsg = document.querySelector('.mensaje-error');
    const modalSuccess = document.getElementById('modal-success');
    const btHome = document.getElementById('bt-home');

    document.addEventListener('submit', function (event) {
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
        fetch('http://localhost:3001/usuario/signup', {
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
                btHome.addEventListener('click', function () {
                    window.location.href = 'index.html'; // Cambia esto a tu página de inicio
                });
            })
            .catch(error => {
                // Mostrar mensaje de error basado en la respuesta del servidor
                errorMsg.textContent = error.message;
            });
    });
});




