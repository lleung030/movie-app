// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4fqzYh4qog3YaZG3hplL7OPayInTLwMk",
  authDomain: "movie-app-daf71.firebaseapp.com",
  projectId: "movie-app-daf71",
  storageBucket: "movie-app-daf71.appspot.com",
  messagingSenderId: "450113602495",
  appId: "1:450113602495:web:4546ec67034b4d72fad70a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);