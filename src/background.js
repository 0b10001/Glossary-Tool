//Notification of the backgorund running
console.log('background running');

//Listen for a message from the content.js and adding an eventlistener to the message
chrome.runtime.onMessage.addListener(receiver);

//Word in the background
window.word = "Glossary Tool";

//when message is received do this
function receiver(request, sender, sendResponse){
    //show what we are receiving
    console.log(request);

    //Set the new background word to be the receieved word
    window.word = request.text;

}
