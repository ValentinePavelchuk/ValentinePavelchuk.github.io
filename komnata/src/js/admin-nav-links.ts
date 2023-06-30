const setActiveLink = (): void => {
    const currentURL: string = window.location.href;
    const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".admin-nav__item");

    for (let i = 0; i < links.length; i++) {
        const link: HTMLAnchorElement = links[i];

        if (link.href === currentURL) {
            link.classList.add("admin-nav__item--active");
            link.addEventListener("click", (event: Event) => {
                event.preventDefault();
            });
        }
    }
}
window.onload = setActiveLink;