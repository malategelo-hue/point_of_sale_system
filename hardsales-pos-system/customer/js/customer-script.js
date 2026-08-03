let cart = JSON.parse(localStorage.getItem('hardsalesCart')) || [];

function saveCart() {
    localStorage.setItem('hardsalesCart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if(existing) existing.qty += 1;
    else cart.push({ name, price, qty: 1 });
    saveCart();
    showNotification(`Added ${name} to cart!`);
}

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if(el) el.textContent = cart.reduce((s,i) => s + i.qty, 0);
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.cssText = `position:fixed; top:20px; right:20px; background:#16a34a; color:white; padding:12px 20px; border-radius:6px; z-index:999;`;
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

// Iba pang functions nandito na gaya ng dati...