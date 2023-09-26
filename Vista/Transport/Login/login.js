// resolver conflicto con "<" desconocido al agregarlo al html en formato src "../Index/index.html"


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) { // Verifica que el formulario existe
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); 

            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === "admin" && password === "1234") {
                window.location.href = "../Index/index.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        });
    } else {
        console.error("El elemento 'login-form' no se encuentra en el DOM.");
    }
});
