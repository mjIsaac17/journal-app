import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// var firebaseConfigTesting = {
//   apiKey: "AIzaSyADqkldb960pCL8rvne9J_DRRUx-8ZpWvo",
//   authDomain: "react-course-testing-47838.firebaseapp.com",
//   projectId: "react-course-testing-47838",
//   storageBucket: "react-course-testing-47838.appspot.com",
//   messagingSenderId: "440218701162",
//   appId: "1:440218701162:web:801e5ce0462e698c5fa913",
// };

// if (process.env.NODE_ENV === "test") {
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   //development / production
//   firebase.initializeApp(firebaseConfig);
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
