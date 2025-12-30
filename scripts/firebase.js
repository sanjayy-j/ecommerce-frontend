import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWaSSykqqziYFkphwVz8zOA3RsNwGpI1w",
  authDomain: "ecomerce-frontend-fd027.firebaseapp.com",
  projectId: "ecomerce-frontend-fd027",
  storageBucket: "ecomerce-frontend-fd027.appspot.com",
  messagingSenderId: "865310167803",
  appId: "1:865310167803:web:8a414e8b307e83d01cd65e",
  measurementId: "G-ZJ7041LLCE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };




