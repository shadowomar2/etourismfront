// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB79ygUoD6Zjq75UyfTKHZF708Q0GkxTsY",
  authDomain: "etourism-f68b6.firebaseapp.com",
  projectId: "etourism-f68b6",
  storageBucket: "etourism-f68b6.appspot.com",
  messagingSenderId: "500249010442",
  appId: "1:500249010442:web:2b6af31d31deb2603a5af3",
  measurementId: "G-LTJ8XD09R2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);