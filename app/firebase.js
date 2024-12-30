// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
// Optionally import other Firebase services as needed
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database"; 

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBFT26ETajAyBE6UES5zZw8IVZj5iniXFw",
  databaseURL: 'https://studyapp-cce71-default-rtdb.firebaseio.com/',
  authDomain: "studyapp-cce71.firebaseapp.com",
  projectId: "studyapp-cce71",
  storageBucket: "studyapp-cce71.apspot.com",
  messagingSenderId: "504082197043",
  appId: "1:504082197043:android:666b06d4d8131680885146",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Set persistence to AsyncStorage
});

// Export auth for use in other files
export { auth };
