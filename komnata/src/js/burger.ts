const headerBurgerBtn = document.querySelector('.header-burger');
const burgerMenu = document.querySelector('.burger-nav');
const burgerClose = document.querySelector('.burger-nav__close');
const burgerOverlay = document.querySelector('.burger-nav-overlay')
const toggleBurgerMenu = () => {
    document.body.classList.toggle('noscroll');
    document.documentElement.classList.toggle('noscroll');
    burgerOverlay.classList.toggle('hidden');
    burgerMenu.classList.toggle('burger-nav--open');
}

headerBurgerBtn.addEventListener('click', toggleBurgerMenu);
burgerClose.addEventListener('click', toggleBurgerMenu);
burgerOverlay.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.matches('.burger-nav-overlay')) {
        toggleBurgerMenu()
    }
})