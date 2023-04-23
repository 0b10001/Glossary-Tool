
import {initializeApp} from 'firebase/app';
import {
    collection,getFirestore,getDocs, onSnapshot
} from 'firebase/firestore';
import {
  getStorage,listAll,ref,getDownloadURL
}from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyA-TNh57VzJUFuYlFC9YEkV0CpWEXyIvFQ",
    authDomain: "glossary--tool.firebaseapp.com",
    projectId: "glossary--tool",
    storageBucket: "glossary--tool.appspot.com",
    messagingSenderId: "779250629314",
    appId: "1:779250629314:web:8b39974fb23604e446595b",
    measurementId: "G-9XDY3QX4WE"
};

console.log("were here")


//initialize firebase app
initializeApp(firebaseConfig);

//variable to sllow us to make references to the storage on firebase
const storage = getStorage(initializeApp(firebaseConfig));

//initialize services
const db = getFirestore();

//collection reference
const WordscolRef = collection(db, 'words');

//initialize the array that will sotre the word once its found
let wordDetails = []

//fetching components from the html file by id
const popUp = document.getElementById('popUp');
const btn1 = document.getElementById('btn1');
const headerWord = document.getElementById('headerWord');
const definition = document.getElementById('definition');
const egSentence = document.getElementById('egSentence');
const simWords = document.getElementById('simWords');
const notMean = document.getElementById('notMean');
const language = document.getElementById("language");
const translation = document.getElementById('translation');
const pictureWord = document.getElementById('wordPic');
const soundIcon = document.getElementById('sound');
const videoIcon= document.getElementById('video');
const imageIcon = document.getElementById('image');
const closeIcon = document.getElementById('close');


//Hiding the video clickable images since they are not functional as of yet
videoIcon.style.visibility="hidden";

//Hide  the word picture at first
pictureWord.style.visibility='visible';



//Going into the background page where the word is
let bgpage = chrome.extension.getBackgroundPage();

//initialising our word to be the word from the background page
let word = bgpage.word;


//removing spaces from the beginning and end of the word
let finalWord=word.trim();

//making the word lowercase since our words in the wordlist are all lowercase
finalWord=finalWord.toLowerCase();

//if there is no word then window in Chrome must stop running
if (word==null){
    window.stop();
}

//if there is whitespace in show error
if (/\s/.test(finalWord)){
    alert("Double click only one word please");
    //stop the window
    window.stop();
}else{
    //run through the wordlist
    let wordFound = false;
    wordDetails = [];


    //real time collection data
    onSnapshot(WordscolRef,(snapshot) =>{
        snapshot.docs.every((doc)=>{
            if (({id:doc.id}.id) == finalWord){
                wordFound = true;
                //showing the translation since the word is available in our database
                document.getElementById('trans').style.visibility="visible";

                //making sound and image visible
                soundIcon.style.visibility="visible";
                imageIcon.style.visibility="visible";
                wordDetails.push({...doc.data(), id:doc.id});

                //Make the word in the header our final word
                headerWord.innerHTML = finalWord;

                //if the definition column in wordlist is not empty then populate the field
                if(wordDetails[0].Definition!="" && wordDetails[0].Definition!="N\/A"){
                    definition.innerHTML = "Definition: ".bold() + wordDetails[0].Definition;
                }

                //if the example column in wordlist is not empty then populate the field
                if(wordDetails[0].Example!="" &&  wordDetails[0].Example!="N\/A"){
                    egSentence.innerHTML = "Example sentence: ".bold() + wordDetails[0].Example;
                }

                //if the similar column in wordlist is not empty then populate the field
                if(wordDetails[0].Synonym!="" && wordDetails[0].Synonym!="N\/A"){
                    simWords.innerHTML = "Word[s] with similar meaning: ".bold() + wordDetails[0].Synonym;
                }

                //if the notMean column in wordlist is not empty then populate the field
                if(wordDetails[0].WhatWordDoesNotMeanHere!=""&& wordDetails[0].WhatWordDoesNotMeanHere!="N\/A"){
                    notMean.innerHTML = "What the word does NOT mean here: ".bold() + wordDetails[0].WhatWordDoesNotMeanHere;
                }
                //stop the loop
                return false;
            }
            //continue loop
            return true;
        })
    })
    if (wordFound == false){
      //since word is not found, just have the word selected as the header
      headerWord.innerHTML = finalWord;

      //Display when this this word is not in our array
      definition.innerHTML = "Word not available".bold();
      //hiding the translation since the word is not available in our database
      document.getElementById('trans').style.visibility="hidden";
      //hiding sound,video and image since the word is not there
      videoIcon.style.visibility="hidden";
      soundIcon.style.visibility="hidden";
      imageIcon.style.visibility="hidden";
    }
}

//Do this when the language clicked changes
language.onchange = function(){
  
  //setting the const that will change
  let lang = this.value;
  
  //switching the values that the dropdown can take on
  switch (true){
    case lang == "Afrikaans":
      //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Afrikaans!=""&& wordDetails[0].Afrikaans!="N\/A"){
        translation.innerHTML = wordDetails[0].Afrikaans;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;
     
    case lang == "isiNdebele":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].isiNdebele!=""&& wordDetails[0].isiNdebele!="N\/A"){
        translation.innerHTML = wordDetails[0].isiNdebele;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "isiXhosa":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].isiXhosa!=""&& wordDetails[0].isiXhosa!="N\/A"){
        translation.innerHTML = wordDetails[0].isiXhosa;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "isiZulu":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].isiZulu!=""&& wordDetails[0].isiZulu!="N\/A"){
        translation.innerHTML = wordDetails[0].isiZulu;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Sepedi":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Sepedi!=""&& wordDetails[0].Sepedi!="N\/A"){
        translation.innerHTML = wordDetails[0].Sepedi;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Sesotho":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Sesotho!=""&& wordDetails[0].Sesotho!="N\/A"){
        translation.innerHTML = wordDetails[0].Sesotho;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Setswana":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Setswana!=""&& wordDetails[0].Setswana!="N\/A"){
        translation.innerHTML = wordDetails[0].Setswana;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "siSwati":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].siSwati!=""&& wordDetails[0].siSwati!="N\/A"){
        translation.innerHTML = wordDetails[0].siSwati;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Tshivenḓa":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Tshivenḓa!=""&& wordDetails[0].Tshivenḓa!="N\/A"){
        translation.innerHTML = wordDetails[0].Tshivenḓa;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Xitsonga":
      //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Xitsonga!=""&& wordDetails[0].Xitsonga!="N\/A"){
        translation.innerHTML = wordDetails[0].Xitsonga;
      }
      else {
        //say ther is no translation
        translation.innerHTML = "no translation";
      }
      break;
    
  }

}


//when thumbs down is clciked do this
function incBad(){
  //field going to change
  const fieldChange = {Bad: increment(1)};
  //update the document
  updateDoc(doc(db, "words", finalWord),fieldChange);
  
  //make the icons hidden
  goodIcon.style.visibility="hidden";
  badIcon.style.visibility="hidden";
}

//when thumbs up is clciked do this
function incGood(){
  //field going to change
  const fieldChange = {Good: increment(1)};
  //update the document
  updateDoc(doc(db, "words", finalWord),fieldChange);

  //make the icons hidden
  goodIcon.style.visibility="hidden";
  badIcon.style.visibility="hidden";
}

//Upon clicking the image icon this runs
function showImage(){
}

//when sound icon is clicked this will run
function playSound(){
  
  try{
    //initiate the speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(finalWord);

    //control the pitch, speed and volume
    utterance.pitch = 1;
    utterance.rate = 0.5;
    utterance.volume = 2;

    //speak
    speechSynthesis.speak(utterance);
    
  }catch(Exception){
    //if it does not work , log the error
     console.log(Exception);
  }
}


//when video icon is clicked this will run
function playVideo(){
}

//Upon clicking the close icon this runs
function doClose(){
    //close the window on chrome
    window.close();

}

//on click listeners
closeIcon.addEventListener('click',doClose);
imageIcon.addEventListener('click',showImage);
videoIcon.addEventListener('click',playVideo);
soundIcon.addEventListener('click',playSound);
goodIcon.addEventListener('click',incGood);
badIcon.addEventListener('click',incBad);
