const form = document.getElementById("formLogin");

const emailInput = document.getElementById("loginEmail");
const passInput = document.getElementById("loginPass");
const recordarmeCheck = document.getElementById("recordarme");
const submitBtn = form.querySelector(".btn-login");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!emailInput || !passInput) return;

    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;

    // Buscar coincidencia en la base de datos
    const foundUser = users.find(
        (user) => user.email.toLowerCase() === email && user.password === password
    );

    if (!foundUser) {
        console.error("Credenciales incorrectas");
       // mostrar error
        return;
    }

    // Guardar datos en la sesión activa (sin contraseña por seguridad)
    const sessionData = {
        id: foundUser.id,
        nombre: foundUser.nombre,
        apellido: foundUser.apellido,
        email: foundUser.email,
        telefono: foundUser.telefono,
        pais: foundUser.pais,
        rol: foundUser.rol
    };

    localStorage.setItem("activeUser", JSON.stringify(sessionData));

    const redirectUrl = form.getAttribute("action") || "./pasarela_pagos.html#medios";
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 1000);
});
