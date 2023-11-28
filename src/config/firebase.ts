import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";

const firebaseOptions: FirebaseOptions = {
  apiKey: "AIzaSyCdyazOIRzRB1-pwKuKPW5kuYVSQxhUXLw",
  authDomain: "fanbasetix-80be9.firebaseapp.com",
  projectId: "fanbasetix-80be9",
  storageBucket: "fanbasetix-80be9.appspot.com",
  messagingSenderId: "528320406846",
  appId: "1:528320406846:web:5c40101a0144059b2b386f",
  measurementId: "G-SP6WD351RK",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseOptions);

export { app };
