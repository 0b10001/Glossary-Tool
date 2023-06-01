//importing firebase
import {initializeApp} from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


//our firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-TNh57VzJUFuYlFC9YEkV0CpWEXyIvFQ",
    authDomain: "glossary--tool.firebaseapp.com",
    projectId: "glossary--tool",
    storageBucket: "glossary--tool.appspot.com",
    messagingSenderId: "779250629314",
    appId: "1:779250629314:web:8b39974fb23604e446595b",
    measurementId: "G-9XDY3QX4WE"
};


//initialize firebase app
initializeApp(firebaseConfig);






// Get elements from the form and form itself
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const signInForm = document.querySelector('form');

//getting the loader
const loader = document.querySelector(".loader");

//hide loader
loader.style.visibility = "hidden";

//get feedback element
const feedback = document.getElementById("feedback");
// Add sign in event listener to the form
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //load
  loader.style.visibility = "visible";
  //initialize email
  let email = emailField.value;
  //initialize password
  let password = passwordField.value;
  //initialize loggedIn status
  let signedIn = false;
  //inirialize dateTime
  let dateTime;
  //get the authentication
  const auth = getAuth();
  //sign in with the details
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed in 
    signedIn = true;
    // set dateTime
    dateTime = new Date();
    //set the user's credentials
    const user = userCredential.user;

    //set data in globabl storage
    // Define the data object to be stored
    var data = {
      signedIn: signedIn,
      email: email
      // Add more key-value pairs as needed
    };

    // Set the data in synchronized storage
    chrome.storage.sync.set(data, function() {
      console.log('Data set in synchronized storage:', data);
    });

    //set the data in the local storage
    localStorage.setItem('signedIn',signedIn);
    localStorage.setItem('email',email);
    localStorage.setItem('dateTime',dateTime);

    //move to definition html3
    window.location.href = "/dist/GlossaryTool.html";

    //show signed in
    feedback.innerHTML="Signed in";
    //color feedback
    feedback.style.color = "green";
    
    
  }).catch((error) => {
    //initiate errcode and errMessage
    const errorCode = error.code;
    const errorMessage = error.message;
    //if password is wrong notify user
    if (errorCode === 'auth/wrong-password') {
      //user notified
      feedback.innerHTML="Incorrect password";
      //hide loader
      loader.style.visibility = "hidden";
    } else {
      //if email not found notify user
      if (errorCode === 'auth/user-not-found') {
         //user notified
        feedback.innerHTML="User is not registered";
        //hide loader
        loader.style.visibility = "hidden";
      }else{
        //if its not a password or email error, then show what error is
        console.log(errorCode, errorMessage);
        feedback.innerHTML = "Non-password nor user error encountered";
        //hide loader
        
        loader.style.visibility = "hidden";

      }
    }
  });
  
});

