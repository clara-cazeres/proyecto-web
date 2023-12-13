//Mostrar Login & Sign Up

const formSignUp = document.querySelector("#form-signup");
const formLogin = document.querySelector("#form-login");
const titulo = document.querySelector("#titulo-user");

document.querySelector('#bt-redirigir-login').addEventListener("click", function () {
    formSignUp.classList.add("ocultar");
    formLogin.classList.remove("ocultar");
    titulo.textContent = 'Iniciar sesión';
});

document.querySelector('#bt-redirigir-signup').addEventListener("click", function () {
    formLogin.classList.add("ocultar");
    formSignUp.classList.remove("ocultar");
    titulo.textContent = 'Registrarme'
});