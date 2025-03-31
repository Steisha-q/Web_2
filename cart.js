// Функція для відображення товарів у кошику
const updateCartList = () => {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Кошик порожній!</p>';
        return;
    }

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p class="cart-item-title"><strong>${product.name}</strong></p>
            <p class="cart-item-price">Ціна: ${product.price} грн</p>
            <p class="cart-item-quantity">Кількість: ${product.quantity}</p>
            <button class="remove-from-cart">Видалити</button>
        `;

        // Обробник натискання на кнопку видалення
        const removeButton = cartItem.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => {
            removeFromCart(product.id);
        });

        cartContainer.appendChild(cartItem);
    });
};

// Функція видалення товару з кошика
const removeFromCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartList();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.getElementById('total-price');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    totalPriceElement.textContent = `Загальна сума: ${totalPrice.toFixed(2)} грн`;
};

// Оновлення кошика
const updateCart = () => {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartContainer.innerHTML = '';
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name}</p>
            <p>${item.price} грн</p>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateTotalPrice();
};

updateCart();

// Обробка оформлення замовлення
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const customerName = document.getElementById('customer-name').value;
        const customerPhone = document.getElementById('customer-phone').value;

        if (customerName && customerPhone) {
            alert(`Замовлення оформлено!\nІм'я: ${customerName}\nТелефон: ${customerPhone}`);
            checkoutForm.reset();
            localStorage.removeItem('cartItems'); // Очистити кошик після оформлення
            updateCart();
        } else {
            alert('Будь ласка, заповніть всі поля!');
        }
    });
}


// Оновлення списку товарів при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateCartList);
