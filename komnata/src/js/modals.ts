const overlayClassName = 'overlay';
const hiddenClassName = 'hidden';
const modalClassName = 'modal';
const closeClassName = 'close-modal';
const openClassName = 'open-modal';
const noScrollClassName = 'noscroll';
const overLays = document.querySelectorAll(`.${overlayClassName}`);
const openModalBtns = document.querySelectorAll(`.${openClassName}`);
const closeModalBtns = document.querySelectorAll(`.${closeClassName}`);

const closeModal = () => {
    document.body.classList.remove(noScrollClassName);
    overLays.forEach((overlay) => {
        overlay.classList.add(hiddenClassName);
    });
};

const openModal = (event: Event) => {
    event.preventDefault();
    closeModal();
    document.body.classList.add(noScrollClassName);
    const currentTarget = event.currentTarget as HTMLElement;
    const modal = document.querySelector(`.${currentTarget.dataset.modalname}`);
    const modalParentOverlay = modal.closest(`.${overlayClassName}`);
    modalParentOverlay.classList.remove(hiddenClassName);
}

openModalBtns.forEach(item => {
    item.addEventListener('click', (e: Event) => {
        openModal(e)
    })
})

overLays.forEach(item => {
    item.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if(target.matches(`.${overlayClassName}`) || target.closest(`.${closeClassName}`)) {
            closeModal()
        }
    })
})

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal()
    }
})