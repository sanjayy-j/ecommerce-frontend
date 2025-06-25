console.log("E-Commerce Website Loaded");

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const productGrid = document.getElementById('product-grid');
productGrid.innerHTML = `<p>Loading products...</p>`; // ✅ Add this loading line

// Fetch from FakeStore API
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(products => {
    productGrid.innerHTML = ''; // Clear loading message

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>₹${(product.price * 80).toFixed(2)}</p>
        <button>Add to Cart</button>
      `;

      productGrid.appendChild(card);
    });
  })
  .catch(error => {
    productGrid.innerHTML = `<p style="color:red;">Failed to load products. Try again later.</p>`;
    console.error('Error loading products:', error);
  });
