console.log("Chrome extension go?");
let selectedText = "";
if(typeof window!=='undefined'){
    console.log('you are on the browser');

    window.addEventListener('mouseup', wordSelected);

    function wordSelected(){
        let selectedText = window.getSelection().toString();
        
        console.log(selectedText);
        if(selectedText.length>0){
            let message ={
                text: selectedText
            };
            chrome.runtime.sendMessage(message);
        }
    }
}else{
    console.log('you are on the server');
}




