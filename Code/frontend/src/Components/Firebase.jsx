
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBjzmTD1OpoWvnHHTSca0oClG3goOOk0RA",
    authDomain: "esp32-iot-00.firebaseapp.com",
    databaseURL: "https://esp32-iot-00-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp32-iot-00",
    storageBucket: "esp32-iot-00.firebasestorage.app",
    messagingSenderId: "104400817256",
    appId: "1:104400817256:web:1511e1696a4f9c9a7e7fdd",
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;


