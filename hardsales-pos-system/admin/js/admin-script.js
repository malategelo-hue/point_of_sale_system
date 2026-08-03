let cart = [];
let total = 0;

function addItem(name, price) {
    cart.push({ name, price });
    total += price;
    updateCartDisplay();
}

function updateCartDisplay() {
    const list = document.getElementById('cart-list');
    list.innerHTML = '';
    cart.forEach(item => {
        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>₱ ${item.price.toFixed(2)}</span>
            </div>
        `;
    });
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function clearCart() {
    cart = [];
    total = 0;
    updateCartDisplay();
}

function processPayment() {
    if (cart.length === 0) return alert('Walang laman ang cart!');
    alert(Total na babayaran: ₱ ${total.toFixed(2)}\nMaraming salamat sa pagbili!);
    clearCart();
}