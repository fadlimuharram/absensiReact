import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import firestore from "firebase/firestore";
const settings = { timestampsInSnapshots: true };
var config = {
  apiKey: "AIzaSyBuADRs8qht-5rvYd6AREDHHtMovh8qQ2Y",
  authDomain: "fadlimwsrestaurant.firebaseapp.com",
  databaseURL: "https://fadlimwsrestaurant.firebaseio.com",
  projectId: "fadlimwsrestaurant",
  storageBucket: "fadlimwsrestaurant.appspot.com",
  messagingSenderId: "124575072515"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);
export default firebase;
