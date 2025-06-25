// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productDetailContainer = document.querySelector(".product-detail-container");
let product = null;

// Fetch single product data
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    product = data;

    productDetailContainer.innerHTML = `
      <div class="product-page">
        <div class="product-image zoom-container">
          <img id="zoom-image" src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
          <h1>${product.title}</h1>
          <p class="price">₹<span id="price">${(product.price * 80).toFixed(2)}</span></p>

          <label for="size-select">Size:</label>
          <select id="size-select">
            <option value="S">Small</option>
            <option value="M" selected>Medium</option>
            <option value="L">Large</option>
          </select>

          <div class="quantity-selector">
            <button id="decrease">−</button>
            <span id="quantity">1</span>
            <button id="increase">+</button>
          </div>

          <p class="total-price">Total: ₹<span id="total">${(product.price * 80).toFixed(2)}</span></p>

          <button id="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;

    let quantity = 1;
    const quantitySpan = document.getElementById("quantity");
    const totalPrice = document.getElementById("total");
    const unitPrice = product.price * 80;

    document.getElementById("increase").onclick = () => {
      quantity++;
      quantitySpan.textContent = quantity;
      totalPrice.textContent = (unitPrice * quantity).toFixed(2);
    };

    document.getElementById("decrease").onclick = () => {
      if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        totalPrice.textContent = (unitPrice * quantity).toFixed(2);
      }
    };

    document.getElementById("add-to-cart").addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const selectedSize = document.getElementById("size-select").value;

      const existing = cart.find(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (!existing) {
        cart.push({ ...product, quantity, size: selectedSize });
      } else {
        existing.quantity += quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      const badge = document.querySelector(".cart-count");
      if (badge) badge.textContent = count;

      alert("Added to cart!");
    });

    // Zoom
    const zoomImage = document.getElementById("zoom-image");
    zoomImage.addEventListener("mousemove", function (e) {
      const { left, top, width, height } = zoomImage.getBoundingClientRect();
      const x = ((e.pageX - left - window.scrollX) / width) * 100;
      const y = ((e.pageY - top - window.scrollY) / height) * 100;
      zoomImage.style.transformOrigin = `${x}% ${y}%`;
      zoomImage.style.transform = "scale(2)";
    });
    zoomImage.addEventListener("mouseleave", function () {
      zoomImage.style.transform = "scale(1)";
      zoomImage.style.transformOrigin = "center";
    });
  })
  .catch((err) => {
    productDetailContainer.innerHTML = `<p>Product not found.</p>`;
    console.error("Error:", err);
  });





