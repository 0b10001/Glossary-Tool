console.log("op");
//BEGINNING OF LOCAL STORAGE CHECK (GET STATUS FOR USER)

//links
//sign in and sign out
const toSignIn = document.getElementById("signinPage");
const toSignOut = document.getElementById("signout");

//hide signOut and signIn
toSignOut.style.display="none";
toSignIn.style.display = "none";

//init email
let email = "";
//if there is somethin in the local Storage then
if(localStorage.length>0){
    //set email
    email = localStorage.getItem('email');
    //show signout
    toSignOut.style.display = "block";
}else{
    //sign in show
    toSignIn.style.display = "block";
}

//to adminpage
document.getElementById('adminPage').style.display="none";
//set admin
//initialize admin status
let adminLogged = false;

//admin signed in
if (email == "kganyago@lo.com"){
  //change status
  adminLogged = true;
  //make link visible
  document.getElementById('adminPage').style.display="block";
}
//END OF LOCAL STORAGE CHECK



//eventListener
toSignOut.addEventListener('click',signOut);
//sign Out by clearing the local storage where signedIn status is
function signOut(){
    //remove from global storage
    chrome.storage.sync.clear(function() {
        console.log('Synchronized storage cleared.');
      });
    //remove the data
    localStorage.removeItem('signedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('dateTime');
    //hide to adminpage
    document.getElementById('adminPage').style.display="none";
    //hide signOut
    toSignOut.style.display="none";
    //show sign in
    toSignIn.style.display = "block";
    alert("You are signed out");
}