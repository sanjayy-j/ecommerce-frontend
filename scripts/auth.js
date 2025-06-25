// scripts/auth.js
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// 🔐 Sign Up
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = signupForm.name.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Save display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      alert("Signup successful!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  });
}

// 🔓 Log In
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Login error: " + error.message);
    }
  });
}






