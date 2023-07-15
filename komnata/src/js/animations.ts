const animationElements = document.querySelectorAll<HTMLElement>('.anim-elem');

const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            const animationElements = section.querySelectorAll<HTMLElement>('.anim-elem');

            animationElements.forEach((element, index) => {
                const animationClasses = element.classList.value?.split(' ') || [];
                const delay = index * 150; // Adjust the delay time in milliseconds
                setTimeout(() => {
                    element.classList.add(...animationClasses, 'in-view');
                }, delay);

                observer.unobserve(element);
            });
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.3,
});

const sections = document.querySelectorAll<HTMLElement>('section');

sections.forEach((section) => {
    observer.observe(section);
});
