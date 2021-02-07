var firebaseConfig = {
    apiKey: "AIzaSyAyNkhpvGQ3mp0RgxVlcbg9yMzj11BlmRk",
    authDomain: "bulleye2020.firebaseapp.com",
    projectId: "bulleye2020",
    storageBucket: "bulleye2020.appspot.com",
    messagingSenderId: "863783688405",
    appId: "1:863783688405:web:fa68121b817b1b30ebea5c",
    measurementId: "G-33FY1DYKG4"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storageRef = firebase.storage().ref();