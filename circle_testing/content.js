// Notification of run
console.log('Chrome extension go?');

// Add a listener for the "mouseup" event on the window object
if (typeof window !== 'undefined') {
  console.log('You are on the browser');
  window.addEventListener('mouseup', wordSelected);
} else {
  console.log('You are on the server');
}

// Get the selected text from the window object and send it to the background
function wordSelected() {
  const selectedText = window.getSelection().toString();
  console.log(selectedText);
  if (selectedText.length > 0) {
    const message = { text: selectedText };
    chrome.runtime.sendMessage(message);
  }
}

// Export the wordSelected function for testing purposes
module.exports = wordSelected ;

