import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Firebase configuration details
const firebaseConfig = {
    apiKey: "AIzaSyBDmSHp9nFm9DmWGYdlf-xMhikoNZmuphU",
    authDomain: "toters-4db9c.firebaseapp.com",
    projectId: "toters-4db9c",
    storageBucket: "toters-4db9c.firebasestorage.app",
    messagingSenderId: "681214086367",
    appId: "1:681214086367:web:9b797eca2c07266ad02d6a",
    measurementId: "G-63CRFB5FDE"
};
// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };