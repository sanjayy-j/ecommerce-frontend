console.log("E-Commerce Website Loaded");

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Update Cart Badge on Load
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const badge = document.querySelector(".cart-count");
if (badge) {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
}

// Product Grid Population
const productGrid = document.getElementById("product-grid");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

    card.innerHTML = `
    <a href="product.html?id=${product.id}">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>₹${(product.price * 80).toFixed(2)}</p>
    </a>
    <button onclick="window.location.href='product.html?id=${product.id}'">View Details</button>
    `;

      productGrid.appendChild(card);
    });
  })
  .catch((error) => {
    productGrid.innerHTML = `<p>Failed to load products. Try again later.</p>`;
    console.error("Error loading products:", error);
  });
