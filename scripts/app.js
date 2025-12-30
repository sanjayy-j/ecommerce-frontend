import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const productGrid = document.getElementById("product-grid");
const cartBadge = document.querySelector(".cart-count");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

// Load products from API
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

// Update cart badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) cartBadge.textContent = count;
}
updateCartCount();

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn?.classList.add("hidden");
    logoutBtn?.classList.remove("hidden");
  } else {
    loginBtn?.classList.remove("hidden");
    logoutBtn?.classList.add("hidden");
  }
});

// Logout handler
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Logout error: " + error.message);
  }
});
// Display username if logged in
const username = localStorage.getItem("username");
if (username) {
  const greetSpan = document.createElement("span");
  greetSpan.classList.add("user-greet");
  greetSpan.textContent = `Hi, ${username}`;
  document.querySelector(".header-right")?.appendChild(greetSpan);
}




