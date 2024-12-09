import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDYFlXA3Smb-HY0JpFjap0xj0bRpNNNBLo",
  authDomain: "pastelaria-login.firebaseapp.com",
  databaseURL: "https://pastelaria-login-default-rtdb.firebaseio.com",
  projectId: "pastelaria-login",
  storageBucket: "pastelaria-login.appspot.com",
  messagingSenderId: "708197995888",
  appId: "1:708197995888:web:df1a6c8d2c59009ca6ebb5"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
const db = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export { db };

