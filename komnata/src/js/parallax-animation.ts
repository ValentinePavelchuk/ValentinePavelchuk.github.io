const mainSection = document.querySelector('.main') as HTMLElement;
const mainBgElem = document.querySelector('.main-bg__item') as HTMLElement;
const applyParallax = (section: HTMLElement): void => {
    const handleMouseMove = (e: MouseEvent) => {
        const { width, height } = section.getBoundingClientRect();
        const offX = e.pageX - width * 0.5;
        const offY = e.pageY - height * 0.5;
        const x = offX / 100;
        const y = offY / 100;
        mainBgElem.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };
    const handleResize = () => {
        if (window.innerWidth >= 960) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            mainBgElem.style.transform = `unset`;
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
};

if (mainSection && mainBgElem) {
    applyParallax(mainSection);
}