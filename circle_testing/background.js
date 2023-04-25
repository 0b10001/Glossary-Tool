// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "changeColor") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: "document.body.style.backgroundColor = '" + request.color + "';"}
      );
    });
  }
});
