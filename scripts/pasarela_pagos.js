function selectMethod(el) {
    document.querySelectorAll('.method-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  
  function formatCard(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.match(/.{1,4}/g)?.join('  ') || v;
  }
  
  function formatExpiry(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 3) v = v.substring(0, 2) + ' / ' + v.substring(2);
    input.value = v;
  }
  
  function toggleCvc(icon) {
    const inp = document.getElementById('cvc');
    if (inp.type === 'password') {
      inp.type = 'text';
      icon.classList.replace('ti-eye', 'ti-eye-off');
    } else {
      inp.type = 'password';
      icon.classList.replace('ti-eye-off', 'ti-eye');
    }
  }
  
  function handlePay() {
    const btn = document.getElementById('payBtn');
    btn.classList.add('loading');
    btn.innerHTML = '<div class="spinner"></div> Procesando pago...';
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.innerHTML = '<i class="ti ti-lock"></i> Confirmar y pagar — $487.00';
      document.getElementById('successOverlay').classList.add('show');
    }, 2200);
  }
  
  function verMiReserva() {
    window.location.href = '../index.html';
  }
  