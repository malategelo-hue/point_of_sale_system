// HardSales POS - Admin Scripts

// Default login details
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

// Check if admin is logged in
function checkAdminAuth() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin || isAdmin !== 'true') {
        alert('Please login as Admin first!');
        window.location.href = 'login.html';
    }
}

// --------------------------
// POS Terminal Functions
// --------------------------
let posCart = [];
let posTotal = 0;

function addItem(name, price) {
    posCart.push({ name, price });
    posTotal += price;
    updateCartDisplay();
}

function updateCartDisplay() {
    const list = document.getElementById('cart-list');
    const totalEl = document.getElementById('total-amount');
    
    if (!list || !totalEl) return;

    list.innerHTML = '';
    posCart.forEach(item => {
        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>₱ ${item.price.toFixed(2)}</span>
            </div>
        `;
    });
    totalEl.textContent = posTotal.toFixed(2);
}

function clearCart() {
    posCart = [];
    posTotal = 0;
    updateCartDisplay();
}

function processPayment() {
    if (posCart.length === 0) return alert('Cart is empty!');
    
    const transaction = {
        date: new Date().toLocaleString(),
        items: [...posCart],
        total: posTotal
    };

    // Save to sales history
    let sales = JSON.parse(localStorage.getItem('hardSales')) || [];
    sales.push(transaction);
    localStorage.setItem('hardSales', JSON.stringify(sales));

    alert(`Payment Success!\nTotal: ₱ ${posTotal.toFixed(2)}\nThank you!`);
    clearCart();
}

// --------------------------
// Inventory Functions
// --------------------------
function loadInventory() {
    let products = JSON.parse(localStorage.getItem('hardProducts')) || [
        { name: "Screwdriver Set", price: 250, stock: 45 },
        { name: "Hammer", price: 180, stock: 8 },
        { name: "Wrench", price: 95, stock: 3 },
        { name: "Pliers", price: 120, stock: 35 },
        { name: "Nails (1kg)", price: 85, stock: 60 },
        { name: "Paint Brush", price: 65, stock: 50 }
    ];

    localStorage.setItem('hardProducts', JSON.stringify(products));
    return products;
}

function addProduct() {
    const name = document.getElementById('prod-name').value;
    const price = parseFloat(document.getElementById('prod-price').value);
    const stock = parseInt(document.getElementById('prod-stock').value);

    if (!name || !price || !stock) return alert('Fill all fields!');

    let products = loadInventory();
    products.push({ name, price, stock });
    localStorage.setItem('hardProducts', JSON.stringify(products));

    alert('Product added!');
    location.reload();
}

function deleteProduct(index) {
    if (confirm('Delete this product?')) {
        let products = loadInventory();
        products.splice(index, 1);
        localStorage.setItem('hardProducts', JSON.stringify(products));
        location.reload();
    }
}

// --------------------------
// Run when page loads
// --------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Run auth check on all admin pages except login
    if (!window.location.pathname.includes('login.html')) {
        checkAdminAuth();
    }
});