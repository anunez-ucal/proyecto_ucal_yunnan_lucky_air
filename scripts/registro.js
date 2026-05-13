(function () {
  const form = document.getElementById("formRegistro");
  if (!form) return;

  const pass = document.getElementById("regPass");
  const pass2 = document.getElementById("regPass2");
  const err = document.getElementById("regPassError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!pass || !pass2) return;

    if (pass.value !== pass2.value) {
      if (err) {
        err.hidden = false;
      }
      pass2.setAttribute("aria-invalid", "true");
      pass2.focus();
      return;
    }

    if (err) err.hidden = true;
    pass2.removeAttribute("aria-invalid");

    // Sin backend por ahora: redirige al login con aviso
    window.location.href = "./login.html?cuenta=ok";
  });
})();
