type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
}

const overlayClassName = 'overlay';
const hiddenClassName = 'hidden';
const modalClassName = 'modal';
const closeClassName = 'close-modal';
const openClassName = 'open-modal';
const noScrollClassName = 'noscroll';
const overLays = document.querySelectorAll(`.${overlayClassName}`);
const openModalBtns = document.querySelectorAll(`.${openClassName}`);
const closeModalBtns = document.querySelectorAll(`.${closeClassName}`);

const closeModal = (event: HTMLElementEvent<HTMLElement>) => {
    const target = event.target;
    if(target.matches(`.${overlayClassName}`) || target.closest(`.${closeClassName}`)) {
        document.body.classList.remove(noScrollClassName);
        const parentOverlay = target.closest(`.${overlayClassName}`);
        parentOverlay.classList.add(hiddenClassName);
    }
};

const openModal = (event: HTMLElementEvent<HTMLElement>) => {
    event.preventDefault();
    overLays.forEach((item) => {
        item.classList.add(hiddenClassName);
    })
    const currentTarget = event.currentTarget as HTMLElement;
    document.body.classList.add(noScrollClassName);
    const modal = document.querySelector(`.${currentTarget.dataset.modalname}`);
    const modalParentOverlay = modal.closest(`.${overlayClassName}`);
    modalParentOverlay.classList.remove(hiddenClassName);
}

openModalBtns.forEach(item => {
    item.addEventListener('click', (e: HTMLElementEvent<HTMLButtonElement>) => {
        openModal(e)
    })
})

overLays.forEach(item => {
    item.addEventListener('click', (e: HTMLElementEvent<HTMLElement>) => {
        closeModal(e)
    })
})