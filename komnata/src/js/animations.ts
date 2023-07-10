const animationElements = document.querySelectorAll<HTMLElement>('.animation-element');

const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add('fade-in-up', 'in-view');
            observer.unobserve(element);
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.3,
});

animationElements.forEach((element) => {
    observer.observe(element);
});