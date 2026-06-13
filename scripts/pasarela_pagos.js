const PAYMENT = {
  base: 462,
  insurance: 25,
  method: 'card',
};

let redirectInterval = null;
let lastCardRaw = '';

// ── UTILIDADES ──
function getActiveMethod() {
  const tab = document.querySelector('.method-tab.active');
  return tab?.dataset.method || 'card';
}

function formatMoney(amount) {
  return '$' + amount.toFixed(2);
}

function getTotalAmount() {
  const insuranceOn = document.getElementById('includeInsurance')?.checked ?? true;
  return PAYMENT.base + (insuranceOn ? PAYMENT.insurance : 0);
}

function updateTotalsUI() {
  const total = getTotalAmount();
  const formatted = formatMoney(total);
  const hero = document.getElementById('heroTotal');
  const summary = document.getElementById('summaryTotal');
  const insVal = document.getElementById('insuranceVal');

  if (hero) hero.innerHTML = `<sup>$</sup>${total.toFixed(2)}`;
  if (summary) summary.textContent = formatted;
  if (insVal) {
    insVal.classList.toggle('insurance-off', !document.getElementById('includeInsurance')?.checked);
  }
  updatePayButton();
}

function updatePayButton() {
  const btnText = document.getElementById('payBtnText');
  const btn = document.getElementById('payBtn');
  if (!btnText || !btn) return;

  const total = formatMoney(getTotalAmount());
  const method = getActiveMethod();
  const labels = {
    card: `Confirmar y pagar — ${total}`,
    paypal: `Pagar con PayPal — ${total}`,
    transfer: `Confirmar transferencia — ${total}`,
  };

  if (!btn.classList.contains('loading')) {
    btnText.textContent = labels[method] || labels.card;
  }
}

function setFieldValid(el, valid) {
  if (!el || el.tagName === 'INPUT' && el.type === 'checkbox') return;
  el.classList.toggle('field-valid', valid);
  if (valid) {
    el.style.borderColor = '';
    clearFieldError(el);
  }
}

// ── 1. SELECCIÓN DE MÉTODO DE PAGO ──
function selectMethod(el) {
  document.querySelectorAll('.method-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  PAYMENT.method = el.dataset.method || 'card';

  const cardSection = document.getElementById('cardFormSection');
  const paypalPanel = document.getElementById('altMethodPaypal');
  const transferPanel = document.getElementById('altMethodTransfer');

  const isCard = PAYMENT.method === 'card';

  cardSection?.classList.toggle('hidden', !isCard);
  paypalPanel?.classList.toggle('hidden', PAYMENT.method !== 'paypal');
  transferPanel?.classList.toggle('hidden', PAYMENT.method !== 'transfer');

  updatePayButton();
  updateFormState();
}


// ── 2. MÁSCARA DE TARJETA (oculta 12, muestra últimos 4) ──
function maskCardDisplay(digits) {
  const chars = digits.split('').map((d, i) => (i < 12 ? '•' : d));
  const str = chars.join('');
  return str.match(/.{1,4}/g)?.join('  ') || '';
}

function getCardRaw(input) {
  return input?.dataset.rawDigits || '';
}

function setCardRaw(input, raw) {
  const prev = input.dataset.rawDigits || '';
  input.dataset.rawDigits = raw;
  input.value = maskCardDisplay(raw);

  if (prev !== raw) {
    clearCvcOnCardChange();
    detectCardType(raw);
    lastCardRaw = raw;
  }

  setFieldValid(input, validateCardNum(input.value));
  updateFormState();
}

function initCardInput() {
  const input = document.getElementById('cardnum');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    const raw = getCardRaw(input);

    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      if (raw.length < 16) setCardRaw(input, raw + e.key);
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      setCardRaw(input, raw.slice(0, -1));
      return;
    }

    if (e.key === 'Delete') {
      e.preventDefault();
      setCardRaw(input, '');
    }
  });

  input.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').substring(0, 16);
    setCardRaw(input, pasted);
  });
}


// ── 3. DETECCIÓN DEL TIPO DE TARJETA ──
function detectCardType(number) {
  const badges = document.querySelectorAll('.card-badge');
  badges.forEach(b => {
    b.style.opacity = '0.4';
    b.style.fontWeight = '600';
  });

  if (/^4/.test(number)) {
    badges[0].style.opacity = '1';
    badges[0].style.fontWeight = '800';
  } else if (/^5[1-5]/.test(number)) {
    badges[1].style.opacity = '1';
    badges[1].style.fontWeight = '800';
  } else if (/^3[47]/.test(number)) {
    badges[2].style.opacity = '1';
    badges[2].style.fontWeight = '800';
  } else if (/^3(?:0[0-5]|[68])/.test(number)) {
    badges[3].style.opacity = '1';
    badges[3].style.fontWeight = '800';
  } else if (number.length === 0) {
    badges.forEach(b => {
      b.style.opacity = '1';
      b.style.fontWeight = '600';
    });
  }
}


// ── 4. FORMATO Y VALIDACIÓN DE VENCIMIENTO ──
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 3) v = v.substring(0, 2) + ' / ' + v.substring(2);
  input.value = v;
  validateExpiry(input);
  setFieldValid(input, isExpiryValid(input));
  updateFormState();
}

function isExpiryValid(input) {
  const val = input.value.replace(/\s/g, '');
  if (val.length < 5) return false;

  const [mm, yy] = val.split('/');
  const month = parseInt(mm, 10);
  const year = 2000 + parseInt(yy, 10);
  const now = new Date();

  if (month < 1 || month > 12) return false;

  return !(
    year < now.getFullYear() ||
    (year === now.getFullYear() && month < now.getMonth() + 1)
  );
}

function validateExpiry(input) {
  if (input.value.replace(/\s/g, '').length < 5) {
    input.style.borderColor = '';
    clearFieldError(input);
    return;
  }

  if (!isExpiryValid(input)) {
    input.style.borderColor = '#ef4444';
    input.classList.remove('field-valid');
    showFieldError(input, 'Fecha inválida o expirada');
  } else {
    input.style.borderColor = '';
    clearFieldError(input);
  }
}


// ── 5. CVC: solo números y limpiar al cambiar tarjeta ──
function clearCvcOnCardChange() {
  const cvc = document.getElementById('cvc');
  if (!cvc || !cvc.value) return;
  cvc.value = '';
  setFieldValid(cvc, false);
  cvc.style.borderColor = '';
  clearFieldError(cvc);
}

function initCvcInput() {
  const cvc = document.getElementById('cvc');
  if (!cvc) return;

  cvc.addEventListener('input', () => {
    cvc.value = cvc.value.replace(/\D/g, '').substring(0, 4);
    setFieldValid(cvc, validateCvc(cvc.value));
    updateFormState();
  });
}


// ── 6. NOMBRES: sin números ──
function initNameInputs() {
  ['fname', 'lname'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', () => {
      el.value = el.value.replace(/[0-9]/g, '');
      setFieldValid(el, validateName(el.value));
      updateFormState();
    });
  });
}

function validateName(val) {
  return val.trim().length >= 2 && !/[0-9]/.test(val);
}


// ── 7. TOGGLE MOSTRAR / OCULTAR CVC ──
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


// ── 8. VALIDACIONES ──
function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function validateCardNum() {
  const input = document.getElementById('cardnum');
  return getCardRaw(input).length === 16;
}

function validateCvc(val) {
  return /^\d{3,4}$/.test(val);
}

function showFieldError(input, msg) {
  clearFieldError(input);
  const err = document.createElement('span');
  err.className = 'field-error';
  err.style.cssText = 'color:#ef4444;font-size:11px;margin-top:4px;display:block;';
  err.textContent = msg;
  input.closest('.input-wrap, .form-field')?.appendChild(err);
}

function clearFieldError(input) {
  const wrap = input.closest('.input-wrap, .form-field');
  wrap?.querySelectorAll('.field-error').forEach(e => e.remove());
}

function isFieldFilled(id) {
  const el = document.getElementById(id);
  if (!el) return true;
  if (el.tagName === 'SELECT') return el.value !== '';
  return el.value.trim() !== '';
}

function isFormComplete() {
  const terms = document.getElementById('terms');
  if (!terms?.checked) return false;

  const common = ['fname', 'lname', 'email', 'country'];
  if (!common.every(id => isFieldFilled(id))) return false;
  if (!validateName(document.getElementById('fname')?.value || '')) return false;
  if (!validateName(document.getElementById('lname')?.value || '')) return false;
  if (!validateEmail(document.getElementById('email')?.value || '')) return false;

  if (getActiveMethod() !== 'card') return true;

  const cardnum = document.getElementById('cardnum');
  const expiry = document.getElementById('expiry');
  const cvc = document.getElementById('cvc');

  return (
    validateCardNum() &&
    isExpiryValid(expiry) &&
    validateCvc(cvc?.value || '')
  );
}

function updateFormState() {
  const btn = document.getElementById('payBtn');
  if (!btn || btn.classList.contains('loading')) return;

  const complete = isFormComplete();
  btn.disabled = !complete;
  btn.classList.toggle('disabled', !complete);
  updatePayButton();
}

function initValidation() {
  const rules = [
    { id: 'fname', msg: 'Ingresa tu nombre', fn: validateName },
    { id: 'lname', msg: 'Ingresa tu apellido', fn: validateName },
    { id: 'email', msg: 'Ingresa un correo válido', fn: validateEmail },
    { id: 'cardnum', msg: 'El número debe tener 16 dígitos', fn: () => validateCardNum(), cardOnly: true },
    { id: 'cvc', msg: 'El CVC debe tener 3 o 4 dígitos', fn: validateCvc, cardOnly: true },
    { id: 'expiry', msg: 'Fecha inválida o expirada', fn: (_, el) => isExpiryValid(el), cardOnly: true },
    { id: 'country', msg: 'Selecciona un país' },
  ];

  rules.forEach(({ id, msg, fn, cardOnly }) => {
    const el = document.getElementById(id);
    if (!el) return;

    const fieldValid = () => {
      if (id === 'cardnum') return validateCardNum();
      if (id === 'expiry') return isExpiryValid(el);
      if (fn) return fn(el.value, el);
      return el.tagName === 'SELECT' ? el.value !== '' : el.value.trim() !== '';
    };

    const check = () => {
      if (cardOnly && getActiveMethod() !== 'card') return;
      setFieldValid(el, fieldValid());
      updateFormState();
    };

    el.addEventListener('blur', () => {
      if (cardOnly && getActiveMethod() !== 'card') return;
      const valid = fieldValid();

      if (!valid) {
        el.classList.remove('field-valid');
        el.style.borderColor = '#ef4444';
        showFieldError(el, msg);
      } else {
        setFieldValid(el, true);
      }
      updateFormState();
    });

    el.addEventListener('input', () => {
      el.style.borderColor = '';
      clearFieldError(el);
      check();
    });

    if (el.tagName === 'SELECT') {
      el.addEventListener('change', check);
    }
  });

  document.getElementById('terms')?.addEventListener('change', () => {
    const terms = document.getElementById('terms');
    terms.style.outline = terms.checked ? '' : '';
    updateFormState();
  });

  document.getElementById('email')?.addEventListener('input', function () {
    setFieldValid(this, validateEmail(this.value));
    updateFormState();
  });
}


// ── 9. VALIDACIÓN GENERAL ANTES DE PAGAR ──
function validateAll() {
  let valid = true;
  const method = getActiveMethod();

  const holderFields = [
    { id: 'fname', label: 'Nombre' },
    { id: 'lname', label: 'Apellido' },
    { id: 'email', label: 'Correo electrónico' },
    { id: 'country', label: 'País de emisión' },
  ];

  holderFields.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const empty = el.tagName === 'SELECT' ? !el.value : !el.value.trim();
    if (empty) {
      el.style.borderColor = '#ef4444';
      el.classList.remove('field-valid');
      showFieldError(el, `${label} es requerido`);
      valid = false;
    }
  });

  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  if (fname && !validateName(fname.value)) {
    fname.style.borderColor = '#ef4444';
    showFieldError(fname, 'El nombre no debe contener números');
    valid = false;
  }
  if (lname && !validateName(lname.value)) {
    lname.style.borderColor = '#ef4444';
    showFieldError(lname, 'El apellido no debe contener números');
    valid = false;
  }

  const email = document.getElementById('email');
  if (email && !validateEmail(email.value)) {
    email.style.borderColor = '#ef4444';
    showFieldError(email, 'Ingresa un correo válido');
    valid = false;
  }

  if (method === 'card') {
    const cardFields = [
      { id: 'cardnum', label: 'Número de tarjeta', check: validateCardNum },
      { id: 'expiry', label: 'Fecha de vencimiento', check: (el) => isExpiryValid(el) },
      { id: 'cvc', label: 'CVC', check: (el) => validateCvc(el.value) },
    ];

    cardFields.forEach(({ id, label, check }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!check(el)) {
        el.style.borderColor = '#ef4444';
        el.classList.remove('field-valid');
        showFieldError(el, `${label} es requerido o inválido`);
        valid = false;
      }
    });
  }

  const terms = document.getElementById('terms');
  if (!terms?.checked) {
    terms.style.outline = '2px solid #ef4444';
    valid = false;
    showToast('Debes aceptar los Términos y Condiciones', 'error');
  } else {
    terms.style.outline = '';
  }

  return valid;
}


// ── 10. PROCESAR PAGO ──
function handlePay() {
  if (!isFormComplete() || !validateAll()) return;

  const btn = document.getElementById('payBtn');
  const btnText = document.getElementById('payBtnText');
  const total = formatMoney(getTotalAmount());

  btn.disabled = true;
  btn.classList.add('loading');
  btn.innerHTML = '<div class="spinner"></div> Procesando pago...';

  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="ti ti-lock"></i> <span id="payBtnText"></span>';
    updatePayButton();
    updateFormState();
    showSuccessModal();
  }, 2200);
}


// ── 11. MODAL DE ÉXITO: cuenta regresiva y copiar referencia ──
function showSuccessModal() {
  const overlay = document.getElementById('successOverlay');
  overlay?.classList.add('show');
  startRedirectCountdown();
}

function startRedirectCountdown() {
  const el = document.getElementById('successCountdown');
  let seconds = 5;

  if (redirectInterval) clearInterval(redirectInterval);

  const tick = () => {
    if (el) {
      el.textContent = seconds > 0
        ? `Redirigiendo automáticamente en ${seconds} s…`
        : 'Redirigiendo…';
    }
    if (seconds <= 0) {
      clearInterval(redirectInterval);
      verMiReserva();
      return;
    }
    seconds -= 1;
  };

  tick();
  redirectInterval = setInterval(tick, 1000);
}

function copyReference() {
  const code = document.getElementById('refCode')?.textContent?.trim() || 'LA-2026-KMG48291';
  const refEl = document.getElementById('successRef');

  const onSuccess = () => {
    refEl?.classList.add('copied');
    showToast('Referencia copiada al portapapeles', 'success');
    setTimeout(() => refEl?.classList.remove('copied'), 2000);
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(code).then(onSuccess).catch(() => fallbackCopy(code, onSuccess));
  } else {
    fallbackCopy(code, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    onSuccess?.();
  } catch {
    showToast('No se pudo copiar. Referencia: ' + text, 'error');
  }
  ta.remove();
}

function initSuccessModal() {
  document.getElementById('successRef')?.addEventListener('click', copyReference);
}


// ── 12. TOAST DE NOTIFICACIÓN ──
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();

  const colors = { error: '#ef4444', success: '#10b981', info: '#3b82f6' };

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${colors[type]};
    color: white;
    padding: 12px 24px;
    border-radius: 99px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ── 13. REDIRIGIR ──
function verMiReserva() {
  if (redirectInterval) clearInterval(redirectInterval);
  window.location.href = '../index.html';
}


// ── INICIALIZAR ──
document.addEventListener('DOMContentLoaded', () => {
  initCardInput();
  initCvcInput();
  initNameInputs();
  initValidation();
  initSuccessModal();

  document.getElementById('includeInsurance')?.addEventListener('change', updateTotalsUI);

  updateTotalsUI();
  updateFormState();
});
