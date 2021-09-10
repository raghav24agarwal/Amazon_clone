import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUrylvM-EKnr6-of0IMccU8MMePvylFGE",
    authDomain: "react-project-dfa1f.firebaseapp.com",
    projectId: "react-project-dfa1f",
    storageBucket: "react-project-dfa1f.appspot.com",
    messagingSenderId: "698119543117",
    appId: "1:698119543117:web:d0ebbf1badb5aa1c957f04",
    measurementId: "G-T6BVTS7XJ1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };