// I-save ang cart sa browser memory para hindi mawala kapag nagpalit ng pahina
let cart = JSON.parse(localStorage.getItem('hardsalesCart')) || [];

// I-update at i-save ang cart
function saveCart() {
    localStorage.setItem('hardsalesCart', JSON.stringify(cart));
}

// Magdagdag ng produkto sa cart
function addToCart(name, price) {
    // Tignan kung meron na ang produkto
    const existing = cart.find(item => item.name === name);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    
    saveCart();
    alert("${name}" ay idinagdag sa cart!);
}

// Magbawas o magdagdag ng dami sa cart.html
function changeQty(index, num) {
    cart[index].qty += num;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    if (typeof updateCartDisplay === 'function') updateCartDisplay();
}

// Magtanggal ng produkto sa cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    if (typeof updateCartDisplay === 'function') updateCartDisplay();
}

// Ipakita ang laman ng cart sa cart.html
function updateCartDisplay() {
    const list = document.getElementById('cart-items');
    const count = document.getElementById('item-count');
    const totalEl = document.getElementById('grand-total');
    
    if (!list || !count || !totalEl) return;

    if (cart.length === 0) {
        list.innerHTML = <p style="text-align:center; color:#666; padding:30px;">Your cart is empty</p>;
        count.textContent = "0 item(s)";
        totalEl.textContent = "0.00";
        return;
    }

    list.innerHTML = '';
    let total = 0;
    let items = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        items += item.qty;

        list.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>₱ ${item.price.toFixed(2)} each</p>
                </div>
                <div class="qty-group">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
                <div class="item-price">₱ ${subtotal.toFixed(2)}</div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    count.textContent = ${items} item(s);
    totalEl.textContent = total.toFixed(2);
}

// Kapag binuksan ang cart page, ipakita agad ang laman
if (document.getElementById('cart-items')) {
    updateCartDisplay();
}