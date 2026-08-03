// ======================================
// FIREBASE CONFIG - DOGMY v9+ (Formato Modular)
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvNv-orEONgHGAo_SfNi90YzI1VjyCzKw",
  authDomain: "dogmy-app.firebaseapp.com",
  databaseURL: "https://dogmy-app-default-rtdb.firebaseio.com",
  projectId: "dogmy-app",
  storageBucket: "dogmy-app.firebasestorage.app",
  messagingSenderId: "834388766661",
  appId: "1:834388766661:web:89a4b05628d74b45a3e5ac"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage };
