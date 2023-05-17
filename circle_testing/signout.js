function signOut(){
    //remove the data
    localStorage.removeItem('signedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('dateTime');
    alert("You are signed out");
  }
  module.exports = { signOut };