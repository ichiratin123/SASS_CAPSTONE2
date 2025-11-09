const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btn = document.getElementById('open__modal');
const closeBtn = document.querySelector('.modal .close');

const openModal = () => {
    overlay.classList.add('active');
    modal.classList.add('active');
};

const closeModal = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    modal.style.removeProperty('display');
};

btn.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);