
//fetching components from the html file by id
const popUp = document.getElementById('popUp');
const btn1 = document.getElementById('btn1');
const headerWord = document.getElementById('headerWord');
const definition = document.getElementById('definition');
const egSentence = document.getElementById('egSentence');
const simWords = document.getElementById('simWords');
const notMean = document.getElementById('notMean');
const language = document.getElementById('languageDD');
const translation = document.getElementById('translation');
const pictureWord = document.getElementById('wordPic');
const soundIcon = document.getElementById('sound');
const videoIcon= document.getElementById('video');
const imageIcon = document.getElementById('image');
const closeIcon = document.getElementById('close');
let bgpage = chrome.extension.getBackgroundPage();
let word = bgpage.word;
let w=word.trim();

//if there is whitespace show error
if (/\s/.test(w)){
    alert("Double click only one word please");
    window.stop();
}else{
    
    headerWord.innerHTML = w;
    definition.innerHTML = "Definition: ".bold()     +"A hot drink made by infusing the dried crushed leaves of the tea plant in boiling water.";
    egSentence.innerHTML = "Example sentence: ".bold()     +"She drank her tea";
    simWords.innerHTML = "Word[s] with similar meaning: ".bold()      +"cuppa, brew";
    notMean.innerHTML = "What the word does NOT mean here: ".bold()        +"The letter 'T' a golf tee";
    translation.innerHTML = ":"       +"teye";

    var img = document.createElement("img");
    img.src = "tea.jpeg";
    pictureWord.appendChild(img);
}




function getData(word){

}


//Up clicking the word this runs,then popup after it
function setData(){
    
    /*<img src="tea.jpeg" alt="Word's picture">*/
}

//Up clicking the sound icon this runs
function doSound(){
    headerWord.innerHTML = "sound";

}

//Up clicking the video icon this runs
function doVideo(){
    headerWord.innerHTML = "video";

}

//Up clicking the image icon this runs
function doImage(){
    headerWord.innerHTML = "image";

}

//Up clicking the close icon this runs
function doClose(){
    headerWord.innerHTML = "close";

}


//Get translation of the word
function getTranslation(){
    
}

//On Click EventListeners
//btn1.addEventListener('click',setData);
soundIcon.addEventListener('click',doSound);
imageIcon.addEventListener('click',doImage);
videoIcon.addEventListener('click',doVideo);
closeIcon.addEventListener('click',doClose);