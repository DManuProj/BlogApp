// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "fullstack-blog-a6ef4.firebaseapp.com",
  projectId: "fullstack-blog-a6ef4",
  storageBucket: "fullstack-blog-a6ef4.appspot.com",
  messagingSenderId: "751886509482",
  appId: "1:751886509482:web:9a308526328b22775db7d3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
