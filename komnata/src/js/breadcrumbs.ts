const generateBreadcrumbs = (): void => {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part !== '');

    const breadcrumbs = pathParts.slice(0, -1).map((part, index) => {
        const breadcrumbURL = `/${pathParts.slice(0, index + 1).join('/')}`;
        return `<a class="breadcrumbs__item" href="${breadcrumbURL}">${part} /</a>`;
    });

    if(document.querySelector('.breadcrumbs')) {
        document.querySelector('.breadcrumbs')!.innerHTML = `<a class="breadcrumbs__item" href="/">Главная /</a> ${breadcrumbs.join(' / ')}`;
    }};

window.onload = generateBreadcrumbs;