// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA61PRiUysL7XS9wTa-a4MHrbuR7EcV7Wo",
  authDomain: "netflix-gpt-f26e3.firebaseapp.com",
  projectId: "netflix-gpt-f26e3",
  storageBucket: "netflix-gpt-f26e3.appspot.com",
  messagingSenderId: "416475053795",
  appId: "1:416475053795:web:ad8a7b04749aeb4ae04fd6",
  measurementId: "G-C61HGVLL4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();