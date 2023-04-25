// Notification of run
console.log("Chrome extension go?");

// Initialising the selectedText variable
let selectedText = "";

function wordSelected() {
  // Get the selected text from the window
  selectedText = window.getSelection().toString();
  
  // Output it
  console.log(selectedText);

  // If there is something in the variable
  if (selectedText.length > 0) {
    // Create message to send to background
    let message = {
      text: selectedText
    };

    // Send the message
    chrome.runtime.sendMessage(message);
  }
}

// If there is a window, do this
if (typeof window !== 'undefined') {
  // Notification of being on the browser
  console.log('you are on the browser');

  // The window after we select a word with our cursor, what it should then do
  window.addEventListener('mouseup', wordSelected);

} else {
  // Not on the browser
  console.log('you are on the server');
}

