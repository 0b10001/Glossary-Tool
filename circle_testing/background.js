// background.js

// Log notification of the background running
console.log('Background running');

// Listen for a message from content.js and add an event listener to the message
chrome.runtime.onMessage.addListener(receiver);

// Word in the background
window.word = "Glossary Tool";

// When message is received, execute this function
function receiver(request, sender, sendResponse) {
  // Log the received message
  console.log(request);

  // Set the new background word to be the received word
  window.word = request.text;
}

