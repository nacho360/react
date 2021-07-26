import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAzgHAO4asjNMQ4DovvpOotvw84wp5fU0o",
    authDomain: "react-8d26c.firebaseapp.com",
    projectId: "react-8d26c",
    storageBucket: "react-8d26c.appspot.com",
    messagingSenderId: "348502717893",
    appId: "1:348502717893:web:d5ed9a68bd48c5778a47ac"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.db = firebase.firestore()
  firebase.autenticacion = firebase.auth()
  console.log(firebase.database)
export default firebase