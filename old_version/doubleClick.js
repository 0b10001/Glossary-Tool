//Not completed. (Open pop-up method)
//might need to create modal to use this code with. Don't think toggletip will work. 

//will tell which word was seleted, pop-up
$(document).dblclick(function(e) {
    var t = getSelectedText();
    /*window.onload=function(){
       //openPopup(); 
    }
    function openPopup(){
        $()
    }*/
    alert("Selected text: "+t);
});

function getSelectedText(){
    if(window.getSelection)
        return window.getSelection().toString();
    else if(document.getSelection)
        return document.getSelection();
    else if(document.selection)
        return document.selection.createRange().text;
    return "";
}


