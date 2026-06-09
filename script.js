document.querySelectorAll('nav').forEach((nav) => {
    const toggle = nav.querySelector('.menu-toggle');
    const links = nav.querySelectorAll('.navright a');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('menu-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});
