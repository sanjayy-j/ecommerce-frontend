const cart = JSON.parse(localStorage.getItem("cart")) || [];
const badge = document.querySelector(".cart-count");
if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

const orderSummary = document.getElementById("order-summary");
const totalDisplay = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

if (cart.length === 0) {
  orderSummary.innerHTML = "<p>Your cart is empty.</p>";
  totalDisplay.textContent = "";
  checkoutForm.querySelector("button").disabled = true;
} else {
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "checkout-item";
    const itemTotal = item.price * 80 * item.quantity;
    total += itemTotal;

    div.innerHTML = `
      <p><strong>${item.title}</strong> (x${item.quantity}) — ₹${itemTotal.toFixed(2)}</p>
    `;
    orderSummary.appendChild(div);
  });

  totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Dummy confirmation for now
  alert("Order placed successfully!");

  // Clear cart and redirect
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

