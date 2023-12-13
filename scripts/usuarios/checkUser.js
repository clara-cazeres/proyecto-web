const nonRestrictedPaths = ["/index.html", "/discografia.html", "/shows.html", "/noticias.html", "/usuario.html"];

const USER_KEY = "user"

const loginPath = "usuario.html"
const restrictedPath = "kuartito.html"

const checkLoginStatus = () => {
    const userData = localStorage.getItem(USER_KEY);
    const actualPath = window.location.pathname;
    const isRestrictedPath = !nonRestrictedPaths.some((path) =>
        actualPath.includes(path)
    );
    //si NO esta logueado y esta en una ruta restringida lo manda al login
    if (!userData && isRestrictedPath) {
        window.location.href = loginPath;
    }

    if (userData) {
        //si esta logueado y estamos en la pag del login mando a restricted
        if (window.location.pathname.includes(loginPath)) {
            window.location.href = restrictedPath;
            return;
        }

        //si esta logueado, mostramos y ocultamos botones
        setHeaderUserDetails(userData);
    }
};

window.onload = checkLoginStatus;

const setHeaderUserDetails = (userData) => {
    const headerUserData = document.getElementById("user-header");
    const userButton = document.getElementById("user-icon");
    const logoutButton = document.getElementById("bt-logout");

    const {username} = JSON.parse(userData);

    const headerHtml = `
    <p id="userChip">${username}</p>`

    headerUserData.innerHTML = headerHtml;
    userButton.style.display = "none";
    logoutButton.style.display = "block";
}