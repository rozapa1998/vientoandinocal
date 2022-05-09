// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE2_yetrKNzL-WhkdN7je1OmH30dL8nZ0",
  authDomain: "vientoandino-42f9d.firebaseapp.com",
  projectId: "vientoandino-42f9d",
  storageBucket: "vientoandino-42f9d.appspot.com",
  messagingSenderId: "136590356711",
  appId: "1:136590356711:web:a7995b2a77f7b290a2f242",
  measurementId: "G-W0G7KN9HBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);