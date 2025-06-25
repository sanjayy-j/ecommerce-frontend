// Update cart count badge in header
const badge = document.querySelector(".cart-count");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (badge) {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
}

const cartItemsContainer = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");

if (cart.length === 0) {
  cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  totalAmount.textContent = "";
} else {
  let total = 0;

  cart.forEach(item => {
    const itemPrice = item.price * 80;
    const itemTotal = item.quantity * itemPrice;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <h3>${item.title}</h3>
          <p>Price per unit: ₹${itemPrice.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Subtotal: ₹${itemTotal.toFixed(2)}</p>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;
}

