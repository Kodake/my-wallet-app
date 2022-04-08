import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAKJVQeoqKOtldwtyOb4Tv13nSOOq4cVbc",
    authDomain: "genericdb-c3969.firebaseapp.com",
    projectId: "genericdb-c3969",
    storageBucket: "genericdb-c3969.appspot.com",
    messagingSenderId: "1033232488652",
    appId: "1:1033232488652:web:ea35cae947b47492ec8a69"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth }