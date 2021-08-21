import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwf23k_oOVl2zdLebY6Hp_82golReGehg",
  authDomain: "react-courses-15b97.firebaseapp.com",
  projectId: "react-courses-15b97",
  storageBucket: "react-courses-15b97.appspot.com",
  messagingSenderId: "341687780163",
  appId: "1:341687780163:web:8a9dec0d58cb1ae3eba5f6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
