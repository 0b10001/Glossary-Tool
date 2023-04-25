function test_wordSelected(wordSelectedFunction, window, console, chrome){
  window.getSelection = function() {
    return {
      toString: function() {
        return "test";
      }
    };
  };

  const backup = console.log;
  let logs = [];
  console.log = function(...args) {
    logs.push(args.join(" "));
  };

  const backupSendMessage = chrome.runtime.sendMessage;
  let messages = [];
  chrome.runtime.sendMessage = function(message) {
    messages.push(message);
  };

  wordSelected();
  
  if (logs.includes("test")) {
    console.log("Test passed: Selected text is printed to console");
  } else {
    console.log("Test failed: Selected text is not printed to console");
  }

  if (messages[0] && messages[0].text === "test") {
    console.log("Test passed: Message sent to background");
  } else {
    console.log("Test failed: Message not sent to background");
  }

  // Restore original functions
  console.log = backup;
  chrome.runtime.sendMessage = backupSendMessage;
}

// Run the test only when not in the browser environment
if (typeof window === 'undefined') {
  const main = require('./main.js');
  test_wordSelected(main.wordSelected, global, console, {runtime: {sendMessage: function() {}}});
}

