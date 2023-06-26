function toggleBurgerMenu() {
    const burgerMenu = document.querySelector('.header-burger');
    const menuItems = document.querySelector('.header-nav');

    burgerMenu.classList.toggle('open');
    menuItems.classList.toggle('show');
}

const burgerMenu = document.querySelector('.header-burger');
burgerMenu.addEventListener('click', toggleBurgerMenu);