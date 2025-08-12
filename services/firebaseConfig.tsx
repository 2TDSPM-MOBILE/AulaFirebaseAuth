import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Irá pegar o getReactNativePersistence sem a necessidade de tipagem
const {getReactNativePersistence} = require("firebase/auth") as any

const firebaseConfig = {
  apiKey: "AIzaSyAjqgzfaa2cda6oTM6o_aSt_lYUGc5Syck",
  authDomain: "projetoaulafirebase-27e46.firebaseapp.com",
  projectId: "projetoaulafirebase-27e46",
  storageBucket: "projetoaulafirebase-27e46.firebasestorage.app",
  messagingSenderId: "357350969979",
  appId: "1:357350969979:web:06785ff36accb3a36488de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage)
})

export {auth}