// popup.js
document.getElementById("red").addEventListener("click", function() {
  chrome.runtime.sendMessage({type: "changeColor", color: "red"});
});

document.getElementById("green").addEventListener("click", function() {
  chrome.runtime.sendMessage({type: "changeColor", color: "green"});
});

document.getElementById("blue").addEventListener("click", function() {
  chrome.runtime.sendMessage({type: "changeColor", color: "blue"});
});
