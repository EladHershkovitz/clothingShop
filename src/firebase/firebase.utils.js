import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBHMKpUp2akuV3RtLJH_SSVCjsjdTqtw6Y",
  authDomain: "crwndb-61b36.firebaseapp.com",
  projectId: "crwndb-61b36",
  storageBucket: "crwndb-61b36.appspot.com",
  messagingSenderId: "924107188292",
  appId: "1:924107188292:web:7b7a314f00cc8bb6057411",
  measurementId: "G-RY2FH42TVS"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
