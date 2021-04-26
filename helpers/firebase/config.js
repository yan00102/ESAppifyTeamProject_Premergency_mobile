/**
 *
 * config.js
 * Jongsu An
 * Feb 14, 2021
 *
 * firebase is initialized and instantiated
 *
 */

import "expo-firestore-offline-persistence";
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcx6yM2h0rn2FDVjv-2piuJJloS8AcetM",
  authDomain: "es-appify.firebaseapp.com",
  databaseURL: "https://es-appify-default-rtdb.firebaseio.com",
  projectId: "es-appify",
  storageBucket: "es-appify.appspot.com",
  messagingSenderId: "176760775348",
  appId: "1:176760775348:web:80af22f3a1088b03d22de1",
  measurementId: "G-2RDJZQMBCY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
