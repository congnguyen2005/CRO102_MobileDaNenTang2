import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8sJehNDw_0v7rXKNCRU6IOQ7UDd8PKV8",
    authDomain: "asm-cro102.firebaseapp.com",
    projectId: "asm-cro102",
    storageBucket: "asm-cro102.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
  };  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
