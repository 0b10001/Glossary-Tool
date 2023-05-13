//import {initializeApp} from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase project configuration
    apiKey: "AIzaSyA-TNh57VzJUFuYlFC9YEkV0CpWEXyIvFQ",
    authDomain: "glossary--tool.firebaseapp.com",
    projectId: "glossary--tool",
    storageBucket: "glossary--tool.appspot.com",
    messagingSenderId: "779250629314",
    appId: "1:779250629314:web:8b39974fb23604e446595b",
    measurementId: "G-9XDY3QX4WE"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const form = document.getElementById('signup-form');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User account created successfully
        const user = userCredential.user;
        // You can redirect to another page or perform some action here
        console.log(user)
      })
      .catch((error) => {
        // Handle errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });