//Notification of run
console.log("Chrome extension go?");

//initialising the selectedText variable
let selectedText = "";

//if there is a window do this
if(typeof window!=='undefined'){
    //Notification of being on the browser
    console.log('you are on the browser');

    //The window after we select a word with our cursor, what it should then do
    window.addEventListener('mouseup', wordSelected);

    function wordSelected(){
        //Get the selected text from the window
        let selectedText = window.getSelection().toString();
        
        //output it
        console.log(selectedText);

        //if there is something in the variable
        if(selectedText.length>0){
            //create message to send to background
            let message ={
                text: selectedText
            };

            //send the message
            chrome.runtime.sendMessage(message);
        }
    }
}else{
    // not on the browser
    console.log('you are on the server');
}




