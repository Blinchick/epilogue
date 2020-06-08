// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrz7n6Ua5IC0fSw6zA4-6ODK3oY7kok5Q",
    authDomain: "epilogue-v2.firebaseapp.com",
    databaseURL: "https://epilogue-v2.firebaseio.com",
    projectId: "epilogue-v2",
    storageBucket: "epilogue-v2.appspot.com",
    messagingSenderId: "609448869081",
    appId: "1:609448869081:web:fc4acc06a4835626ddd2c8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;