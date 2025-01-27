// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALEfNMGJI89UIvhazbyA552XbxdYZO4JU",
  authDomain: "b10a10-hero-movie.firebaseapp.com",
  projectId: "b10a10-hero-movie",
  storageBucket: "b10a10-hero-movie.firebasestorage.app",
  messagingSenderId: "471684047168",
  appId: "1:471684047168:web:8494e86f18f888e6b35aa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;
