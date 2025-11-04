import Cart from "./classes/cart.js";
import CartItem1 from "./classes/cart1.js";
import ApiServices from "./classes/apiService.js";

const api = new ApiServices();
const cart = new Cart();

const getListProducts = () => { 
    const promise = api.fetchData();
    promise
        .then((result) => { 
            renderProducts(result.data);
            
        })
        .catch((e) => { 
            console.log(e);
            
        });
}

export const getEle = (data) => { 
    return document.getElementById(data);
}

const filterProducts = (products, brandValue) => {
    if (brandValue === "0") return products;
    return products.filter(product => {
        if (brandValue === "1") return product.type === "Samsung";
        if (brandValue === "2") return product.type === "Apple";
        return true;
    });
};

getEle('filter').addEventListener('change', (event) => {
    const promise = api.fetchData();
    promise.then((result) => {
        const filteredProducts = filterProducts(result.data, event.target.value);
        renderProducts(filteredProducts);
    });
});

getListProducts();
const renderProducts = (data) => { 
    let content = "";
    for (let i = 0; i < data.length; i++) { 
        const p = data[i];
        content += `
        <div class="card">
            <img src="./assets/image.png" alt="error.jpg" />
            <div class="card__body">
              <div class="card__body-top">
                <div class="title">
                  <h2>${p.name}</h2>
                  <p>${p.desc}</p>
                  <h3>Specifications:</h3>
                  <p>- Brand: <span>${p.type}</span></p>
                  <p>- Screen: <span>${p.screen} px</span></p>
                  <p>- Back Camera: <span>${p.backCamera} px</span></p>
                  <p>- Front Camera: <span>${p.frontCamera} px</span></p>
                </div>
              </div>
              <div class="card__body-bot">
                <div class="price">
                  <h2>$${p.price}</h2>
                </div>
                <div class="buy">
                  <button onclick="addToCart('${p.id}', '${p.name}', ${p.price}, './assets/image.png')">
                    <i class="fa-solid fa-cart-shopping"> </i>Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
    }

    getEle("listProducts").innerHTML = content;
}

window.addToCart = (id, name, price, img) => {
    const cartItem = new CartItem1(id, name, price, img, 1);
    cart.addCart(cartItem);
    setLocalStorage();
    renderCart();
    document.querySelector('.cart').classList.add('active');
    document.querySelector('.overlay').classList.add('active');
};

window.updateQuantity = (productId, change, isIncrement = false) => {
    const cartItem = cart.mangGioHang.find(x => String(x.id) === String(productId));
    if (!cartItem) return;

    let newQuantity;
    
    if (isIncrement) {
        newQuantity = cartItem.quantity + 1;
    } else if (typeof change === 'string') {
        newQuantity = parseInt(change) || 0;
    } else {
        newQuantity = cartItem.quantity + parseInt(change);
    }
    newQuantity = Math.max(0, Math.min(10, newQuantity));

    if (newQuantity === 0) {
        cart.deleteCart(productId);
    } else {
        cart.updateQuantity(productId, newQuantity);
    }

    setLocalStorage();
    renderCart();
}

const renderCart = () => {
    const cartItems = document.getElementById('cartItem');
    if (cartItems) {
        cartItems.innerHTML = cart.renderCart();
    }
}

const setLocalStorage = () => {
    const dataString = JSON.stringify(cart.mangGioHang);
    localStorage.setItem("LIST_CART", dataString);
};

const getLocalStorage = () => {
    const dataString = localStorage.getItem("LIST_CART");
    if (!dataString) return true;
    const dataJson = JSON.parse(dataString);
    cart.mangGioHang = dataJson;
    renderCart();
};
getLocalStorage();

document.querySelector('.btn__order').addEventListener('click', () => {
    cart.clearCart();
    setLocalStorage();
    renderCart();
});
