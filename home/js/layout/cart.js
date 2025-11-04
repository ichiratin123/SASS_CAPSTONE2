const openBtn = document.querySelector('.open-cart');
const overlay = document.querySelector('.overlay');
const cart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart__close');

openBtn.addEventListener('click', () => {
  overlay.classList.add('active');
  cart.classList.add('active');
});

const closeCart = () => {
  overlay.classList.remove('active');
  cart.classList.remove('active');
};

overlay.addEventListener('click', closeCart);
closeBtn.addEventListener('click', closeCart);
