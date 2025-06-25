const productGrid = document.getElementById("product-grid");
const cartBadge = document.querySelector(".cart-count");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>₹${(product.price * 80).toFixed(2)}</p>
        <button onclick="location.href='product.html?id=${product.id}'">View Details</button>
      `;
      productGrid.appendChild(card);
    });
  });

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = count;
}

updateCartCount();


