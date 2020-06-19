import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDmzagAOurJ3ddhd84GyEwgKoG6H3qCI7k",
    authDomain: "tournaments-ed816.firebaseapp.com",
    databaseURL: "https://tournaments-ed816.firebaseio.com",
    projectId: "tournaments-ed816",
    storageBucket: "tournaments-ed816.appspot.com",
    messagingSenderId: "851789157105",
    appId: "1:851789157105:web:4ef7fb4311bc723a098f50",
    measurementId: "G-3X84XLMD4E"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

firebase.firestore();
export default firebase;