// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "nextblog-bf782.firebaseapp.com",
  projectId: "nextblog-bf782",
  storageBucket: "nextblog-bf782.appspot.com",
  messagingSenderId: "114884154654",
  appId: "1:114884154654:web:c9bfe5949f82e7d2af250f",
  measurementId: "G-TBRX4PRBS0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };