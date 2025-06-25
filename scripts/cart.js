const cart = JSON.parse(localStorage.getItem("cart")) || [];
const badge = document.querySelector(".cart-count");
if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

const cartItemsContainer = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");
const checkoutBtn = document.getElementById("checkout-btn");

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalAmount.textContent = "";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("cart-item-card");

    const itemTotal = item.price * 80 * item.quantity;
    total += itemTotal;

    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <p>Size: ${item.size || "N/A"}</p>
        <p>Price: ₹${(item.price * 80).toFixed(2)}</p>
        <div class="quantity-controls">
          <button onclick="updateQuantity(${index}, -1)">−</button>
          <input type="text" value="${item.quantity}" readonly />
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <p>Item Total: ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemCard);
  });

  totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;
}

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
  const badge = document.querySelector(".cart-count");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) badge.textContent = count;
}

renderCart();






