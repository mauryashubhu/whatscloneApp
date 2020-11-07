import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAB2vOQnqU_Z3EMqjdE-r9icy2hwHKG4yY",
  // authDomain: "whats-app-clone-54a52.firebaseapp.com",
  // databaseURL: "https://whats-app-clone-54a52.firebaseio.com",
  // projectId: "whats-app-clone-54a52",
  // storageBucket: "whats-app-clone-54a52.appspot.com",
  // messagingSenderId: "27271371842",
  // appId: "1:27271371842:web:916b4949ef82ac36cd61db",
  // measurementId: "G-5JTBF1GTYN"
};

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAB2vOQnqU_Z3EMqjdE-r9icy2hwHKG4yY",
  authDomain: "whats-app-clone-54a52.firebaseapp.com",
  databaseURL: "https://whats-app-clone-54a52.firebaseio.com",
  projectId: "whats-app-clone-54a52",
  storageBucket: "whats-app-clone-54a52.appspot.com",
  messagingSenderId: "27271371842",
  appId: "1:27271371842:web:916b4949ef82ac36cd61db",
  measurementId: "G-5JTBF1GTYN"
});
var db = firebaseApp.firestore();
const auth =firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, };
export default db; 