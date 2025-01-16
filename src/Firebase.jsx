import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFmqpTRA7pIAdaHzZCoDm2WTZMlgCz5PQ",
    authDomain: "louisvuitton-5e80a.firebaseapp.com",
    projectId: "louisvuitton-5e80a",
    storageBucket: "louisvuitton-5e80a.firebasestorage.app",
    messagingSenderId: "479342497848",
    appId: "1:479342497848:web:cfbe88b37e88b6196796cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
};