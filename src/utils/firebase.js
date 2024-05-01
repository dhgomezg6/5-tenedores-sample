// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { apiKey } from './firebaseApiKey';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "tenedores-fe96d.firebaseapp.com",
  projectId: "tenedores-fe96d",
  storageBucket: "tenedores-fe96d.appspot.com",
  messagingSenderId: "343081523367",
  appId: "1:343081523367:web:211299ba566c151e0c6382"
};

let firebaseApp;
console.log(apiKey);

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0]; // Si ya está inicializada, usa esa instancia
}

// Initialize Firebase
export const initFirebase = firebaseApp;