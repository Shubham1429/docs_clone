import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCP62lub1b01Hh0FjbAIaVXKAgpb6NF_T4",
    authDomain: "docs-ca99e.firebaseapp.com",
    projectId: "docs-ca99e",
    storageBucket: "docs-ca99e.appspot.com",
    messagingSenderId: "247664633938",
    appId: "1:247664633938:web:56754ea53f5c4197a5d78b"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();
  
  export { db }