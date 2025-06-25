const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderSummary = document.getElementById("order-summary");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

// Display cart summary
let total = 0;
if (cart.length === 0) {
  orderSummary.innerHTML = "<p>Your cart is empty.</p>";
  checkoutTotal.textContent = "";
} else {
  cart.forEach(item => {
    const itemTotal = item.price * 80 * item.quantity;
    total += itemTotal;

    const summaryItem = document.createElement("div");
    summaryItem.classList.add("cart-item-card");
    summaryItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <p>Size: ${item.size}</p>
        <p>Qty: ${item.quantity}</p>
        <p>Item Total: ₹${itemTotal.toFixed(2)}</p>
      </div>
    `;
    orderSummary.appendChild(summaryItem);
  });

  checkoutTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Handle form submission
checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Order placed successfully!");

  // Optional: clear cart after checkout
  localStorage.removeItem("cart");

  // Redirect to home
  window.location.href = "index.html";
});


