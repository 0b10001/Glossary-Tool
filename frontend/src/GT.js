//importing firebase
import {initializeApp} from 'firebase/app';

//imports from firestore
import {
    collection,getFirestore,getDocs, onSnapshot,setDoc,doc,updateDoc, increment
} from 'firebase/firestore';

//imports from firebase's storage
import {
  getStorage,listAll,ref,getDownloadURL
}from 'firebase/storage';



//our firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-TNh57VzJUFuYlFC9YEkV0CpWEXyIvFQ",
    authDomain: "glossary--tool.firebaseapp.com",
    projectId: "glossary--tool",
    storageBucket: "glossary--tool.appspot.com",
    messagingSenderId: "779250629314",
    appId: "1:779250629314:web:8b39974fb23604e446595b",
    measurementId: "G-9XDY3QX4WE"
};


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
const goodIcon = document.getElementById('Good');
const badIcon = document.getElementById('Bad');
//const DefDiv = document.getElementsByClassName('definitions');
//const video = document.getElementById('wordVid');
//const vidDiv = document.getElementById('VidofWord');


//Hiding the video clickable images since they are not functional as of yet
videoIcon.style.visibility="hidden";

//hide the video at first
videoIcon.style.visibility='hidden';
///video.style.visibility='hidden';
//vidDiv.style.visibility='hidden';


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

//if there is whitespace in word, show error
if (/\s/.test(finalWord)){
    //alert the user
    alert("Double click only one word please");
    //stop the window
    window.stop();
}else{
    //run through the wordlist
    let wordFound = false;
    //initialise list that will carry the wordDetails object
    wordDetails = [];


    //real time collection data, on any change
    onSnapshot(WordscolRef,(snapshot) =>{
        //go through every document until the word is found
        snapshot.docs.every((doc)=>{
            if (({id:doc.id}.id) == finalWord){
                //if the word is found, do this

                //set the wordfound boolean to true
                wordFound = true;
                
                //showing the translation since the word is available in our database
                document.getElementById('trans').style.visibility="visible";

                //make the video and image icons hidden since they are not functional
                imageIcon.style.visibility="hidden";
                videoIcon.style.visibility="hidden";
                
                //add the data of the found document to the wordDetails list
                wordDetails.push({...doc.data(), id:doc.id});
                

                //Make the word in the header our final word
                headerWord.innerHTML = finalWord;
                

                //if the definition column in wordlist is not empty then populate the field
                if(wordDetails[0].Definition!="" && wordDetails[0].Definition!="None"){
                    definition.innerHTML = "Definition: ".bold() + wordDetails[0].Definition;
                }

                //if the example column in wordlist is not empty then populate the field
                if(wordDetails[0].Example!="" &&  wordDetails[0].Example!="None"){
                    egSentence.innerHTML = "Example sentence: ".bold() + wordDetails[0].Example;
                }

                //if the similar column in wordlist is not empty then populate the field
                if(wordDetails[0].Synonym!="" && wordDetails[0].Synonym!="None"){
                    simWords.innerHTML = "Word[s] with similar meaning: ".bold() + wordDetails[0].Synonym;
                }

                //if the notMean column in wordlist is not empty then populate the field
                if(wordDetails[0].WhatWordDoesNotMeanHere!=""&& wordDetails[0].WhatWordDoesNotMeanHere!="None"){
                    notMean.innerHTML = "What the word does NOT mean here: ".bold() + wordDetails[0].WhatWordDoesNotMeanHere;
                }
                //stop the loop
                return false;
            }
            //continue loop
            return true;
        })
    })
    //delay the program by a second
    delay(1000);
    
    if (wordFound == false){
      //if wordFound is still false then do this

      //initialise details
      //add word with details into firestore
      findDetailsaddDocument();
        
      //since word is not found, just have the word selected as the header
      headerWord.innerHTML = finalWord;

      //Display when this this word is not in our array
      definition.innerHTML = "Word not available".bold();
        
      //hiding the translation since the word is not available in our database
      document.getElementById('trans').style.visibility="hidden";
        
      //hiding video and image since the word is not there
      videoIcon.style.visibility="hidden";
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
      if(wordDetails[0].Afrikaans!=""&& wordDetails[0].Afrikaans!="None"){
        translation.innerHTML = wordDetails[0].Afrikaans;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;
     
    case lang == "isiNdebele":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].isiNdebele!=""&& wordDetails[0].isiNdebele!="None"){
        translation.innerHTML = wordDetails[0].isiNdebele;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "isiXhosa":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].isiXhosa!=""&& wordDetails[0].isiXhosa!="None"){
        translation.innerHTML = wordDetails[0].isiXhosa;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "isiZulu":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].isiZulu!=""&& wordDetails[0].isiZulu!="None"){
        translation.innerHTML = wordDetails[0].isiZulu;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Sepedi":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Sepedi!=""&& wordDetails[0].Sepedi!="None"){
        translation.innerHTML = wordDetails[0].Sepedi;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Sesotho":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Sesotho!=""&& wordDetails[0].Sesotho!="None"){
        translation.innerHTML = wordDetails[0].Sesotho;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Setswana":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Setswana!=""&& wordDetails[0].Setswana!="None"){
        translation.innerHTML = wordDetails[0].Setswana;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "siSwati":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].siSwati!=""&& wordDetails[0].siSwati!="None"){
        translation.innerHTML = wordDetails[0].siSwati;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Tshivenda":
       //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Tshivenda!=""&& wordDetails[0].Tshivenda!="None"){
        translation.innerHTML = wordDetails[0].Tshivenda;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;

    case lang == "Xitsonga":
      //set the translation on the popup if there translation colum for that row is not empty
      if(wordDetails[0].Xitsonga!=""&& wordDetails[0].Xitsonga!="None"){
        translation.innerHTML = wordDetails[0].Xitsonga;
      }
      else {
        //say there is no translation
        translation.innerHTML = "no translation";
      }
      break;
    
  }

}


function findDetailsaddDocument(){
            //initialise the translation array
            const translationarray = [];

            //initialise the definition, synonym, antonyms and example
            var def = "";
            var synonym= "";
            var antonyms = "";
            var example ="";

            //API key for dictionary api
            var thesaurusApiKey = "27f79564-22f5-40fb-b470-349be9fe5935";

            //initialise the url that will be sent with the word and key in it
            var thesaurusUrl = "https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/" + finalWord + "?key=" + thesaurusApiKey ;
            //fetch the data
            return fetch(thesaurusUrl)
            .then(response => response.json())
              
              .then(data => {
                //set data and use it
                // Get the first synonym from the first definition
                synonym = data[0].meta.syns[0][0];
                
                //get antonyms
                antonyms = data[0].meta.ants[0];
                
                //get the example and modify it
                example = data[0].def[0].sseq[0][0][1].dt[1][1][0].t;
                example = example.replace(/\{it\}/g, '').replace(/\{\/it\}/g, '');
                
                //get the definition of the word
                def = data[0].shortdef[0];

               
                
                
            // Second API: Get translations using mymemory API
            //initialise the requests list
            const requests = [];

            //initialise the language pairs, the format of how they will be searched
            const languagePairs = [
              {code: 'af', name: 'Afrikaans'},
              {code: 'xh', name: 'Xhosa'},
              {code: 'zu', name: 'Zulu'},
              {code: 'st', name: 'Sotho'},
              {code: 'tn', name: 'Tswana'},
              {code: 'nso', name: 'Sepedi'},
              {code:'nr', name: 'Ndebele'},
              {code:'ts', name: 'Venda'},
              {code:'ve', name: 'Swati'},
              {code:'ts', name: 'Tsonga'}
            ];

            //initialise the myMemoryUrl and then use it to fetch translations for each language
            for (const pair of languagePairs) {
              const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${finalWord}&langpair=en|${pair.code}`;
              requests.push(fetch(myMemoryUrl));
            }
           
            //wait until they are all done
            Promise.all(requests)
              .then(responses => Promise.all(responses.map(resp => resp.json())))
              //set the data that is gotten after response
              .then(data => {
                
                //initialise translations
                let translations = '';

                for (let i = 0; i < data.length; i++) {
                  //go through the data and get the different translations

                  //set each translation
                  const translation = data[i].responseData.translatedText;

                  //Set the language corresponding to the translation
                  const languageName = languagePairs[i].name;

                  //increment the translations list
                  translations += `${languageName}: ${translation}<br>`;

                  //push into the translation array that will be primarly used to store the objects with the languages and translations
                  translationarray.push({ language: languageName, translation: translation });

                }
                
                  //See what type your outputs are and what they hold 
                // console.log(typeof synonym,synonym);
                // console.log(typeof antonyms, antonyms);
                // console.log(typeof example, example);
                // console.log(typeof def, def);
                // console.log(translationarray);
















                //try to set document
                try{
                  //set a new document called finalWord that will hold the details
                  setDoc(doc(db, "words", finalWord),info);
                  }
                catch(Exception){
                  //print error
                  console.log(Exception);
                }
              }).catch(error => console.error(error)); //log error
             
          }).catch(error => console.error(error)); //log error
           
          // Empty the translations array after psrocessing
          translationarray.length = 0;
}

                



//delay the running time
function delay(time){
  //return what will only be returned after the time
  return new Promise(resolve => setTimeout(resolve,time));
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
