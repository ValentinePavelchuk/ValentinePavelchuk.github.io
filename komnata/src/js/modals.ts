type HTMLElementEvent<T extends HTMLElement> = Event & {
    target: T;
}

const overlayClassName = 'overlay';
const hiddenClassName = 'hidden';
const modalClassName = 'modal';
const overLays = document.querySelectorAll(`.${overlayClassName}`);
const openModalBtns = document.querySelectorAll('.open-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

const closeModal = (event: HTMLElementEvent<HTMLElement>) => {
    document.body.classList.remove('noscroll');
    if(event.target.classList.contains(overlayClassName)) {
        event.target.classList.add(hiddenClassName)
    }
    else {
        const parentOverlay = event.target.closest(`.${overlayClassName}`);
        parentOverlay.classList.add(hiddenClassName);
    }
}

const openModal = (event: HTMLElementEvent<HTMLElement>) => {
    document.body.classList.add('noscroll');
    const modal = document.querySelector(`.${event.target.dataset.modalname}`);
    const modalParentOverlay = modal.closest(`.${overlayClassName}`);
    modalParentOverlay.classList.remove(hiddenClassName);
}

openModalBtns.forEach(item => {
    item.addEventListener('click', (e: HTMLElementEvent<HTMLButtonElement>) => {
        openModal(e)
    })
})
closeModalBtns.forEach(item => {
    item.addEventListener('click', (e: HTMLElementEvent<HTMLElement>) => {
        closeModal(e)
    })
})
overLays.forEach(item => {
    item.addEventListener('click', (e: HTMLElementEvent<HTMLElement>) => {
        closeModal(e)
    })
})