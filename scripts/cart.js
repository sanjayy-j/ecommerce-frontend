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
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>Size: ${item.size || 'N/A'}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ₹${(item.price * 80).toFixed(2)}</p>
        <p>Subtotal: ₹${(item.price * 80 * item.quantity).toFixed(2)}</p>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
    total += item.price * 80 * item.quantity;
  });

  totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;
}


