// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvutztPHYDqkOvFceKLp-WBE1HBJxBs3g",
  authDomain: "jobman-acc43.firebaseapp.com",
  projectId: "jobman-acc43",
  storageBucket: "jobman-acc43.appspot.com",
  messagingSenderId: "47557223052",
  appId: "1:47557223052:web:0b554b579717a74a88d1a9",
  measurementId: "G-5H612YQ4JV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
