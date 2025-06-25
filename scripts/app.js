// Show navigation menu on hamburger click
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Update cart badge on load
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".cart-count");
  if (badge) badge.textContent = count;
}
updateCartCount();

// Product Grid Population
const productGrid = document.getElementById("product-grid");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
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
  .catch(err => {
    console.error("Error loading products:", err);
    productGrid.innerHTML = "<p>Failed to load products. Try again later.</p>";
  });

