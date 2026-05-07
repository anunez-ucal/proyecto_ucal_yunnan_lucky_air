document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.btn-menu-drawer');
    const navMenu = document.querySelector('.nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                cerrarTodo();
            } else {
                navMenu.classList.add('active');
                menuBtn.classList.add('is-active');
            }
        });

        // Manejo de Accordion en Móvil
        const dropdowns = navMenu.querySelectorAll('.dropdown');
        

        // Cerrar el menú al hacer clic en un enlace real
        navMenu.querySelectorAll('.nav-link, .dropdown-content a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#' && !link.classList.contains('back-btn')) {
                    cerrarTodo();
                }
            });
        });

        // Cerrar el menú si se hace clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                cerrarTodo();
            }
        });

        function cerrarTodo() {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('is-active');
            dropdowns.forEach(d => d.classList.remove('submenu-open'));
        }
    }
});
