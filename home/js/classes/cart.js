class Cart { 
    constructor() { 
        this.mangGioHang = [];
    }

    addCart(product) { 
        const idx = this.findIndex(product.id);
        if (idx !== -1) {
            this.mangGioHang[idx].quantity += 1;
        } else {
            this.mangGioHang.push(product);
        }
    }

    findIndex(id) { 
        return this.mangGioHang.findIndex(item => item.id === id);
    }

    deleteCart(id) { 
        const idx = this.findIndex(id);
        if (idx !== -1) {
            this.mangGioHang.splice(idx, 1);
        }
    }

    updateQuantity(id, quantity) { 
        const idx = this.findIndex(id);
        if (idx !== -1) {
            this.mangGioHang[idx].quantity = quantity;
        }
    }

    clearCart() {
        this.mangGioHang = [];
        this.renderCart();
    }

    getTotal() {
        return this.mangGioHang.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    renderCart() {
        let content = "";
        const total = this.getTotal();
        
        const cartTotalElement = document.querySelector('.cart__total .total-amount');
        if (cartTotalElement) {
            cartTotalElement.textContent = '$' + total;
        }
        
        this.mangGioHang.forEach(item => {
            content += `
            <div class="cart__item" data-id="${item.id}">
                <img src="${item.img}" alt="${item.name}" />
                <div class="cart__info">
                    <p class="cart__name">${item.name}</p>
                    <p class="cart__price">$${item.price}</p>
                </div>
                <div class="number__input">
                    <button onclick="updateQuantity('${item.id}', -1)">−</button>
                    <p class="quantity-display">${item.quantity}</p>
                    <button onclick="updateQuantity('${item.id}', 1, true)">+</button>
                </div>
            </div>`;
        });
        return content;
    }
}


export default Cart;