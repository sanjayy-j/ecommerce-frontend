// Get cart data
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const badge = document.querySelector(".cart-count");
if (badge) {
  badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

const cartItemsContainer = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalAmount.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * 80 * item.quantity;
    total += itemTotal;

    const itemCard = document.createElement("div");
    itemCard.classList.add("cart-item-card");

    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" loading="lazy" decoding="async" />
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <p><strong>Size:</strong> ${item.size || "N/A"}</p>
        <p><strong>Price:</strong> ₹${(item.price * 80).toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="qty-btn" data-index="${index}" data-change="-1">−</button>
          <input type="text" value="${item.quantity}" readonly />
          <button class="qty-btn" data-index="${index}" data-change="1">+</button>
        </div>
        <p><strong>Item Total:</strong> ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemCard);
  });

  totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;
}

// 🔄 Event delegation for quantity and remove
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("qty-btn")) {
    const index = parseInt(e.target.dataset.index);
    const change = parseInt(e.target.dataset.change);
    updateQuantity(index, change);
  }

  if (e.target.classList.contains("remove-btn")) {
    const index = parseInt(e.target.dataset.index);
    removeItem(index);
  }
});

function updateQuantity(index, change) {
  if (cart[index].quantity + change < 1) return;
  cart[index].quantity += change;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".cart-count");
  if (badge) badge.textContent = count;
}

renderCart();







