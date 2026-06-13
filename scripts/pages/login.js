const form = document.getElementById("formLogin");

const emailInput = document.getElementById("loginEmail");
const passInput = document.getElementById("loginPass");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const recordarmeCheck = document.getElementById("recordarme");
const submitBtn = form.querySelector(".btn-login");

function limpiarErrores() {
    emailError.classList.add("oculto");
    passError.classList.add("oculto");
    emailInput.classList.remove("input-error");
    passInput.classList.remove("input-error");
}

emailInput.addEventListener("input", function () {
    emailError.classList.add("oculto");
    emailInput.classList.remove("input-error");
});

passInput.addEventListener("input", function () {
    passError.classList.add("oculto");
    passInput.classList.remove("input-error");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    limpiarErrores();

    if (!emailInput || !passInput) return;

    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;

    const userByEmail = users.find(
        (user) => user.email.toLowerCase() === email
    );

    if (!userByEmail) {
        emailError.classList.remove("oculto");
        emailInput.classList.add("input-error");
        emailInput.focus();
        return;
    }

    if (userByEmail.password !== password) {
        passError.classList.remove("oculto");
        passInput.classList.add("input-error");
        passInput.focus();
        return;
    }

    const sessionData = {
        id: userByEmail.id,
        nombre: userByEmail.nombre,
        apellido: userByEmail.apellido,
        email: userByEmail.email,
        telefono: userByEmail.telefono,
        pais: userByEmail.pais,
        rol: userByEmail.rol
    };

    localStorage.setItem("activeUser", JSON.stringify(sessionData));

    const redirectUrl = form.getAttribute("action") || "./pasarela_pagos.html#medios";
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 1000);
});
