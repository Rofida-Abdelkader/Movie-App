import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvCE7KuBjxHxJOx8n003piigixRWfkUds",
    authDomain: "movie-app-16434.firebaseapp.com",
    projectId: "movie-app-16434",
    storageBucket: "movie-app-16434.firebasestorage.app",
    messagingSenderId: "328385732729",
    appId: "1:328385732729:web:fe2bd02ba41671f24f34a8",
    measurementId: "G-ET9NV43RWH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);