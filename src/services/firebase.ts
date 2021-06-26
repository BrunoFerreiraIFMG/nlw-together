import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore'; //database

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };


 /*const firebaseConfig = {
    apiKey: "AIzaSyCVWyENL6MICKsFXBm_S3MAUwZuH6h59Sw",
    authDomain: "letmeask-68040.firebaseapp.com",
    projectId: "letmeask-68040",
    storageBucket: "letmeask-68040.appspot.com",
    messagingSenderId: "163523439289",
    appId: "1:163523439289:web:497a0ef53f1444ea6b0968"
  };*/
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const database = firebase.firestore(); //database


  export {firebase, auth, database}