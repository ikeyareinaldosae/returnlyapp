// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxYRMRB7dv-8U_60Lip8tW8cos8c9WI6c", // Ensure there are no spaces or hidden characters
  authDomain: "sae-returnly.firebaseapp.com",
  projectId: "sae-returnly",
  storageBucket: "sae-returnly.firebasestorage.app",
  messagingSenderId: "746083375422",
  appId: "1:746083375422:web:a45f39422568ccda91b46f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
