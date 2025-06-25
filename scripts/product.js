// Extract product ID
const productId = new URLSearchParams(window.location.search).get('id');
const productContainer = document.getElementById("product-detail");
let product = null;
let quantity = 1;
let selectedSize = "M"; // default

// Update cart badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector(".cart-count");
  if (badge) badge.textContent = count;
}

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(data => {
    product = data;

    productContainer.innerHTML = `
      <div class="product-page">
        <div class="product-image zoom-container">
          <img src="${product.image}" alt="${product.title}" id="zoom-img">
        </div>
        <div class="product-info">
          <h1>${product.title}</h1>
          <p class="price">₹<span id="price">${(product.price * 80).toFixed(2)}</span></p>
          <p>${product.description}</p>

          <label for="size">Size:</label>
          <select id="size">
            <option value="S">S</option>
            <option value="M" selected>M</option>
            <option value="L">L</option>
          </select>

          <div class="quantity-selector">
            <button id="decrease">−</button>
            <span id="qty">1</span>
            <button id="increase">+</button>
          </div>

          <button id="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;

    // Quantity logic
    const qtySpan = document.getElementById("qty");
    const priceEl = document.getElementById("price");

    document.getElementById("increase").onclick = () => {
      quantity++;
      qtySpan.textContent = quantity;
      priceEl.textContent = (product.price * 80 * quantity).toFixed(2);
    };

    document.getElementById("decrease").onclick = () => {
      if (quantity > 1) {
        quantity--;
        qtySpan.textContent = quantity;
        priceEl.textContent = (product.price * 80 * quantity).toFixed(2);
      }
    };

    document.getElementById("size").onchange = (e) => {
      selectedSize = e.target.value;
    };

    // Add to cart logic
    document.getElementById("add-to-cart").addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === product.id && item.size === selectedSize);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity, size: selectedSize });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert("Added to cart!");
    });

    updateCartCount();
  })
  .catch(err => {
    console.error("Error loading product:", err);
    productContainer.innerHTML = `<p>Product not found.</p>`;
  });






