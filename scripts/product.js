const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productDetailContainer = document.querySelector(".product-detail-container");
let product = null;

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(data => {
    product = data;

    productDetailContainer.innerHTML = `
      <div class="zoom-container">
        <img class="product-image" src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-info">
        <h1>${product.title}</h1>
        <p class="price">₹${(product.price * 80).toFixed(2)}</p>
        <p>${product.description}</p>

        <label for="size-select">Select Size:</label>
        <select id="size-select" class="variation-select">
          <option value="S">S</option>
          <option value="M" selected>M</option>
          <option value="L">L</option>
        </select>

        <div class="quantity-selector">
          <button id="decrease">−</button>
          <input type="text" id="quantity" value="1" readonly />
          <button id="increase">+</button>
        </div>

        <p class="total-price" id="total-price">Total: ₹${(product.price * 80).toFixed(2)}</p>

        <button id="add-to-cart">Add to Cart</button>
      </div>
    `;

    const quantityInput = document.getElementById("quantity");
    const totalPrice = document.getElementById("total-price");

    document.getElementById("increase").onclick = () => {
      quantityInput.value = +quantityInput.value + 1;
      updatePrice();
    };
    document.getElementById("decrease").onclick = () => {
      if (quantityInput.value > 1) {
        quantityInput.value = +quantityInput.value - 1;
        updatePrice();
      }
    };

    function updatePrice() {
      totalPrice.textContent = `Total: ₹${(product.price * 80 * quantityInput.value).toFixed(2)}`;
    }

    document.getElementById("add-to-cart").addEventListener("click", () => {
      const size = document.getElementById("size-select").value;
      const qty = parseInt(quantityInput.value);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === product.id && item.size === size);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({ ...product, size, quantity: qty });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      alert("Added to cart!");
    });

    function updateCartBadge() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      const badge = document.querySelector(".cart-count");
      if (badge) badge.textContent = count;
    }

    updateCartBadge();
  });









