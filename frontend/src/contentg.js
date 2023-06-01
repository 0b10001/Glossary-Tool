import { Timestamp } from "firebase/firestore";

//Notification of run
console.log("Chrome extension go?");

//create the popup
var div = document.createElement("div");
//add double click listener
document.addEventListener("dblclick", function(event) {
  //get selected tex
  var selectedText = window.getSelection().toString().trim();
  
  //if the selected text is not nothing then 
  if (selectedText !== "") {
    //load index1.html
    loadHTML(selectedText);

    //setting the div properties
    div.style.color = "black";
    div.style.backgroundColor = "white";
    div.style.position = "absolute";
    div.style.padding = "5px";// Calculate the maximum allowed left position
    // Calculate the threshold position
    var threshold = window.innerWidth * (2 / 3);
    // Set the left position of the div
    if (event.pageX > threshold) {
      // If event is too far to the right, position the div on the far left
      div.style.left = "10px";
    } else {
      // Position the div based on the event's position
      div.style.left = (event.pageX + 25) + "px";
    }
    
    // Set the top position of the div
    div.style.top = (event.pageY - div.offsetHeight + 15) + "px";

    //add div to the page
    document.body.appendChild(div);
  }
});

//inject the html into the div
function loadHTML(selectedText) {
    //get the url to the html
    var fileURL = chrome.runtime.getURL("dist/index1.html");

    //fetch the html
    fetch(fileURL)
    //its response
        .then(response => {
            //if response is okay then do so
            if (response.ok){
                //return the response's text
                return response.text();
            }
        })
        .then(data => { //take the response's text which taken as data
            //set the div's content
            div.innerHTML = data;
        })
        .then(() => {
            //set word in header
            document.getElementById('headerWord').innerHTML=selectedText;

            //on click listener
            document.getElementById('close').addEventListener('click', function(){
                //close the popup
                document.body.removeChild(div);
            });
            
            
           //send Message to get response
            chrome.runtime.sendMessage({ action: 'retrieveData' }, function(response) {
              // Handle the response from the background script
              const data = response.data;
              //if data is not undefined
              if (data){
                  //set signed In
                document.getElementById('iisI').innerHTML = data.signedIn;
                //set email
                document.getElementById('iieM').innerHTML = data.email;
              }else{
                 //set signed In
                 document.getElementById('iisI').innerHTML = "";
                 //set email
                 document.getElementById('iieM').innerHTML = "";
              }
            });

            // Create a link element for the CSS file
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = chrome.runtime.getURL('dist/style.css');

            // Append the link element to the document's head
            document.head.appendChild(link);

            // Inject the script file
            //create the script element
            const scriptElement = document.createElement('script');
            //get the url to the js file to use
            scriptElement.src = chrome.runtime.getURL('dist/main.bundle.js');
            //add the scirpt to the head of the html
            document.head.appendChild(scriptElement);
        })
        .catch(error => {
            //log any error that occurs
            console.error("Error:", error);
        });
}




