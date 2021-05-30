import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAD5KJX550axFlIkrtOmasckuzj1tOrihY",
    authDomain: "ship-firebase.firebaseapp.com",
    projectId: "ship-firebase",
    storageBucket: "ship-firebase.appspot.com",
    messagingSenderId: "592718893546",
    appId: "1:592718893546:web:5ce6fe937f80abe1fe6293"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
