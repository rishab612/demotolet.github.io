import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFEobfYWN3lMSLkrW9Tc8n-Xj2b9J9ZGs",
  authDomain: "roysrental-1783f.firebaseapp.com",
  projectId: "roysrental-1783f",
  storageBucket: "roysrental-1783f.appspot.com",
  messagingSenderId: "1047429265106",
  appId: "1:1047429265106:web:3c91f25014c53ca6e61f0b",
  measurementId: "G-ZYJ01EPRD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore reference
export const db = getFirestore(app);

// Firebase Storage reference
export const storage = getStorage(app);
