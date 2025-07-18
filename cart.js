// Carrito
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const addCartBtns = document.querySelectorAll('.add-cart-btn');

let cart = [];

function updateCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <input type="number" min="1" value="${item.quantity}" data-idx="${idx}" class="qty-input"/>
        <span>Q${item.price}</span>
        <span>Q${item.price * item.quantity}</span>
        <button class="remove-btn" data-idx="${idx}">Quitar</button>
      </div>
    `;
  });
  cartTotalDiv.innerHTML = "Total: Q" + total;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

addCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name');
    const price = parseInt(btn.getAttribute('data-price'));
    const idx = cart.findIndex(item => item.name === name);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCart();
  });
});

cartBtn.addEventListener('click', () => {
  cartModal.style.display = 'flex';
  updateCart();
});

closeCart.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Cambiar cantidad y quitar producto
cartItemsDiv.addEventListener('input', (e) => {
  if (e.target.classList.contains('qty-input')) {
    const idx = e.target.getAttribute('data-idx');
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    cart[idx].quantity = val;
    updateCart();
  }
});
cartItemsDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const idx = e.target.getAttribute('data-idx');
    cart.splice(idx, 1);
    updateCart();
  }
});

// Cierra modal si das click fuera del carrito
window.onclick = function(event) {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
}
