
//window.onload= setupExtDoubleClick( 'http://dictionary.cambridge.org/', 'british', false, null, 5, 'popup' ) 

/*$(document).ready(function() {
    $("#definition button").click(function() {
        $(this).parent().hide(200);
    });
    $("#container p").dblclick(function() {
        var txt = getSelectedText();
        //$.get("/php/data/define.php", { q: txt }, function(data) { 
            var $dataDiv = $("<div>"+data+"</div>").addClass("data");
            $("#definition").show(200)
                .contents("h3").text("Definition of: "+txt).parent()
                .contents("div.data").replaceWith($dataDiv).parent();
       // });
    });
});
This one can be used when the HTML file has the elements followed by the hashes  */ 


//will tell which word was seleted, pop-up
$(document).dblclick(function(e) {
    var t = getSelectedText();
    /*window.onload=function(){
       openPopup();
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


