// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUgqinP8yepcKgtRC_5RVmmRV6E0_E9dI",
  authDomain: "mughal-real-estate.firebaseapp.com",
  projectId: "mughal-real-estate",
  storageBucket: "mughal-real-estate.appspot.com",
  messagingSenderId: "937205231339",
  appId: "1:937205231339:web:a1e9f172e87b7316a3d8ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;