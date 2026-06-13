const form = document.getElementById("formRegistro");

const nombreInput = document.getElementById("regNombre");
const apellidoInput = document.getElementById("regApellido");
const emailInput = document.getElementById("regEmail");
const telefonoInput = document.getElementById("regTelefono");
const paisSelect = document.getElementById("regPais");
const passInput = document.getElementById("regPass");
const pass2Input = document.getElementById("regPass2");
const terminosCheck = document.getElementById("regTerminos");

const nombreError = document.getElementById("regNombreError");
const apellidoError = document.getElementById("regApellidoError");
const emailError = document.getElementById("regEmailError");
const telefonoError = document.getElementById("regTelefonoError");
const paisError = document.getElementById("regPaisError");
const passError = document.getElementById("regPassError");
const pass2Error = document.getElementById("regPass2Error");
const terminosError = document.getElementById("regTerminosError");

function ocultarError(el) {
    el.classList.add("oculto");
}

function mostrarError(el, input) {
    el.classList.remove("oculto");
    if (input) input.classList.add("input-error");
}

function limpiarInputError(input) {
    if (input) input.classList.remove("input-error");
}

function validarEmailExistente(email) {
    return users.some((u) => u.email.toLowerCase() === email);
}

nombreInput.addEventListener("input", function () {
    ocultarError(nombreError);
    limpiarInputError(nombreInput);
});

apellidoInput.addEventListener("input", function () {
    ocultarError(apellidoError);
    limpiarInputError(apellidoInput);
});

emailInput.addEventListener("input", function () {
    ocultarError(emailError);
    limpiarInputError(emailInput);
});

telefonoInput.addEventListener("input", function () {
    ocultarError(telefonoError);
    limpiarInputError(telefonoInput);
});

paisSelect.addEventListener("change", function () {
    ocultarError(paisError);
    limpiarInputError(paisSelect);
});

passInput.addEventListener("input", function () {
    ocultarError(passError);
    limpiarInputError(passInput);
    if (!pass2Error.classList.contains("oculto")) {
        if (passInput.value === pass2Input.value) {
            ocultarError(pass2Error);
            limpiarInputError(pass2Input);
        }
    }
});

pass2Input.addEventListener("input", function () {
    ocultarError(pass2Error);
    limpiarInputError(pass2Input);
});

terminosCheck.addEventListener("change", function () {
    ocultarError(terminosError);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;

    // Nombre
    if (!nombreInput.value.trim() || nombreInput.value.trim().length < 2) {
        mostrarError(nombreError, nombreInput);
        if (valido) nombreInput.focus();
        valido = false;
    }

    // Apellido
    if (!apellidoInput.value.trim() || apellidoInput.value.trim().length < 2) {
        mostrarError(apellidoError, apellidoInput);
        if (valido) apellidoInput.focus();
        valido = false;
    }

    // Email
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
        emailError.textContent = "Ingresa un correo electrónico";
        mostrarError(emailError, emailInput);
        if (valido) emailInput.focus();
        valido = false;
    } else if (validarEmailExistente(email)) {
        emailError.textContent = "El correo ya está registrado";
        mostrarError(emailError, emailInput);
        if (valido) emailInput.focus();
        valido = false;
    } else {
        emailError.textContent = "Ingresa un correo electrónico";
    }

    // Teléfono
    const telRegex = /^[\d\s+().-]{9,20}$/;
    if (!telefonoInput.value.trim() || !telRegex.test(telefonoInput.value.trim())) {
        mostrarError(telefonoError, telefonoInput);
        if (valido) telefonoInput.focus();
        valido = false;
    }

    // País
    if (!paisSelect.value) {
        mostrarError(paisError, paisSelect);
        if (valido) paisSelect.focus();
        valido = false;
    }

    // Contraseña
    if (!passInput.value || passInput.value.length < 8) {
        mostrarError(passError, passInput);
        if (valido) passInput.focus();
        valido = false;
    }

    // Confirmar contraseña
    if (passInput.value !== pass2Input.value) {
        mostrarError(pass2Error, pass2Input);
        if (valido) pass2Input.focus();
        valido = false;
    }

    // Términos
    if (!terminosCheck.checked) {
        mostrarError(terminosError);
        if (valido) terminosCheck.focus();
        valido = false;
    }

    if (!valido) return;

    const nuevoUsuario = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        nombre: nombreInput.value.trim(),
        apellido: apellidoInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        telefono: telefonoInput.value.trim(),
        pais: paisSelect.value,
        password: passInput.value,
        rol: "user",
        fechaRegistro: new Date().toISOString()
    };

    users.push(nuevoUsuario);

    var guardados = localStorage.getItem("registeredUsers");
    var lista = guardados ? JSON.parse(guardados) : [];
    lista.push(nuevoUsuario);
    localStorage.setItem("registeredUsers", JSON.stringify(lista));

    window.location.href = "./login.html?cuenta=ok";
});
