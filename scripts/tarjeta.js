document.addEventListener("DOMContentLoaded", function(){
  var metodoTarjeta = document.getElementById("metodoTarjeta");
  var formulario = document.getElementById("formTarjeta");

  if(!metodoTarjeta || !formulario){
    return;
  }

  var wasChecked = metodoTarjeta.checked;

  function sync(){
    if(metodoTarjeta.checked){
      formulario.hidden = false;
      formulario.setAttribute("aria-hidden", "false");
    }else{
      formulario.hidden = true;
      formulario.setAttribute("aria-hidden", "true");
    }
  }

  // Permitir "deseleccionar" el radio al hacer click nuevamente.
  metodoTarjeta.addEventListener("click", function(){
    if(wasChecked){
      metodoTarjeta.checked = false;
    }
    sync();
    wasChecked = metodoTarjeta.checked;
  });

  metodoTarjeta.addEventListener("change", function(){
    sync();
    wasChecked = metodoTarjeta.checked;
  });

  sync();
});
