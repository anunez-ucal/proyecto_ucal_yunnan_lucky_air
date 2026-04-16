// Variables para el carrusel
let currentSlideIndex = 0;

// Cambiar slide
function changeSlide(n) {
    showSlides(currentSlideIndex += n);
}

// Mostrar slide específico
function currentSlide(n) {
    showSlides(currentSlideIndex = n - 1);
}

// Mostrar slide
function showSlides(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');

    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Auto-avance del carrusel cada 5 segundos
setInterval(() => {
    changeSlide(1);
}, 5000);

// Inicializar carrusel
showSlides(currentSlideIndex);
