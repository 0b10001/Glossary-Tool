//BEGINNING OF LOCAL STORAGE CHECK (GET STATUS FOR USER)
//initialize signedin,email, and dateTime
let signedIn = false;
let email = "";
let dateTime;

//if there is somethin in the local Storage then
if(localStorage.length>0){
  //set signedin,email, and dateTime
  signedIn = localStorage.getItem('signedIn');
  email = localStorage.getItem('email');
  dateTime = localStorage.getItem('dateTime');
}
//END OF LOCAL STORAGE CHECK


//BEGINNING OF THE VIEW (COMPONENTS ON THE HTML)
//fetching components from the html file by id
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
const loader = document.querySelector(".loader");
const toSignIn = document.getElementById("signinPage");
const toSignOut = document.getElementById("signout");

//hide signOut and signIn
toSignOut.style.display="none";
toSignIn.style.display = "none";

//hide the word picture at first
pictureWord.style.visibility='hidden';

//hide the video at first
videoIcon.style.visibility='hidden';
//END OF THE VIEW (COMPONENTS ON THE HTML)


//BEGINNING OF WORKING WITH THE SELECTED WORD HERE
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
//initialize wordFound
let wordFound = false;

//initialize the array that will store the word's details once its found
let wordDetails = []


//BEGINNING OF WORKING WITH DATABASE CONNECTION
//importing firebase
import {initializeApp} from 'firebase/app';

//imports from firestore
import {
    collection,getFirestore,getDoc, onSnapshot,setDoc,doc,updateDoc, increment, Timestamp,addDoc
} from 'firebase/firestore';

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

//initialize services
const db = getFirestore();

//collection reference
const WordscolRef = collection(db, 'words');
//END OF ESTABLISHING DATABASE CONNECTION


//if there is whitespace in word, show error
if (/\s/.test(finalWord)){
    //alert the user
    alert("Double click only one word please");
    //stop the window
    window.stop();
}else{
    //run through the wordlist
    //real time collection data, on any change
    onSnapshot(WordscolRef,(snapshot)=>{
          //go through every document until the word is found
          snapshot.docs.every((doc) => {
              if (({id:doc.id}.id) == finalWord){
                //if the word is found, do this

                //set the wordfound boolean to true
                wordFound = true;

                //hide loader
                loader.style.visibility="hidden";
              

                //showing the translation since the word is available in our database
                document.getElementById('trans').style.visibility="visible";

                //making sound icon visble
                soundIcon.style.visibility="visible";

                //making rating icons visisble
                goodIcon.style.visibility="visible";
                badIcon.style.visibility="visible";

                //make the video and image icons hidden since they are not functional
                imageIcon.style.visibility="hidden";
                videoIcon.style.visibility="hidden";

                //add the data of the found document to the wordDetails list
                wordDetails.push({...doc.data(), id:doc.id});

                //Make the word in the header our final word
                headerWord.innerHTML = finalWord;

                if(wordDetails[0].Graphic!="" && wordDetails[0].Graphic!="None"){
                  //if there is a graphic show the icon for image
                  imageIcon.style.visibility="visible";
                }

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
                
                //if signedIn do this
                if (signedIn == "true"){
                  //show signOut
                  toSignOut.style.display = "block";
                  //add the data into log database if signedin
                  logRequest();
                }
                else{//if not signed in do this
                  //show signIn
                  toSignIn.style.display = "block";
                }
                //stop the loop
                return false;
            }
            //continue loop
            return true;
        })
    })
    if (wordFound == false){
      //if wordFound is still false then do this
      //look for specific word to be sure
      //SET ITS REF
      const docRef = doc(db,'words',finalWord);

      //get the document 
      getDoc(docRef).then((doc) => {
        if (!doc.data()) {
          //if word does not exist then add document
          //initialise details
          //add word with details into firestore after checking if its not there again
          findDetailsaddDocument();
        }
      })
      //since word is not found, just have the word selected as the header
      headerWord.innerHTML = finalWord;

      //hiding the translation since the word is not available in our database
      document.getElementById('trans').style.visibility="hidden";

      //hiding video and image since the word is not there
      videoIcon.style.visibility="hidden";
      imageIcon.style.visibility="hidden";

      //hiding good and bad since the word is not there
      goodIcon.style.visibility="hidden";
      badIcon.style.visibility="hidden";
    }
}
//END OF WORKING WITH SELECTED WORD

//BEGINNING OF FUNCTIONS CALLED IN PROCESS
//Getting a word not present in the database
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
  fetch(thesaurusUrl)
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

      //#################################
      //initialize definition
      let defi = "";
      if (def){
        //if value from api search not undefined use the value
        defi = def;
      }

      //initialize example
      let eg = "";
      if (example){
        //if value from api search not undefined use the value
        eg = example;
      }

      //initialize synonym
      let syn = "";
      if (synonym){
        //if value from api search not undefined use the value
        syn = synonym;
      }

      //initialize not mean here
      let notMeanHere = "";
      if(antonyms){
        //if value from api search not undefined use the value
        notMeanHere = antonyms;
      }
      //initialise media
      let Graphic = "";
      let Movie = "";

      //initailise languages
      let Afrikaans = "";
      let isiNdebele =  "";
      let isiXhosa = "";
      let isiZulu = "";
      let Sepedi = "";
      let Sesotho =  "";
      let Setswana =  "";
      let siSwati =  "";
      let Tshivenda =  "";
      let Xitsonga =  "";

      if (translationarray[0] && translationarray[0].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        Afrikaans = translationarray[0].translation;
      }
      if (translationarray[6] && translationarray[6].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        isiNdebele =  translationarray[6].translation;
      }
      if (translationarray[1] && translationarray[1].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        isiXhosa = translationarray[1].translation;
      }
      if (translationarray[2] && translationarray[2].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        isiZulu = translationarray[2].translation;
      }
      if (translationarray[5] && translationarray[5].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        Sepedi =  translationarray[5].translation;
      }
      if (translationarray[3] && translationarray[3].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        Sesotho =  translationarray[3].translation;
      }
      if (translationarray[4] && translationarray[4].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        Setswana =  translationarray[4].translation;
      }
      if (translationarray[8] && translationarray[8].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        siSwati =  translationarray[8].translation;
      }
      if (translationarray[7] && translationarray[7].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        Tshivenda =  translationarray[7].translation;
      }
      if (translationarray[9] && translationarray[9].translation){
        //if the object at that index exists and the translation at the index exists then use it and set translation
        Xitsonga =  translationarray[9].translation;
      }
      //initialise the reviews good and bad
      let Bad = 0;
      let Good = 0;

      //see the values set
        //console.log(defi,eg,syn,notMeanHere,Graphic,Movie,Afrikaans,isiNdebele,
        //isiXhosa,isiZulu,Sepedi,Sesotho,Setswana,siSwati,Tshivenda,Xitsonga,Bad,Good);

        //get picture
      try{
        //set access key and upiUrl
        const accessKey = "_MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI";
        const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${finalWord}`;

        //fetch the data in terms of the apiUrl
        fetch(apiUrl, {
          //set header with authorization
          headers:{
            Authorization: `Client-ID ${accessKey}`,
          },
          }).then(response => { //response is then used
              if (!response.ok) { //if response is lower than 400 then throw error
                throw new Error(response.status);
              }
              return response.json(); //show the json

              }).then(data => { 
                //if the data and data results  and the url and the regular are all defined then do this
                if (data && data.results[0] && data.results[0].urls && data.results[0].urls.regular){
                  //set photo url to the retreived url
                  Graphic = data.results[0].urls.regular;
                }
                          
                //initialise the values going into firestore from the ones set above
                const info = {
                  Definition: defi,
                  Example: eg, 
                  Synonym: syn, 
                  WhatWordDoesNotMeanHere: notMeanHere,
                  Graphic: Graphic,
                  Movie: Movie,
                  Afrikaans: Afrikaans,
                  isiNdebele: isiNdebele,
                  isiXhosa: isiXhosa,
                  isiZulu: isiZulu,
                  Sepedi: Sepedi,
                  Sesotho: Sesotho,
                  Setswana: Setswana,
                  siSwati: siSwati,
                  Tshivenda: Tshivenda,
                  Xitsonga: Xitsonga,
                  Bad: Number(Bad),
                  Good: Number(Good)
                }
                //#####################################
              
                //try to set document
                try{
                  //set a new document called finalWord that will hold the details
                  setDoc(doc(db, "words", finalWord),info);
                  //newWordDone = true;
                  }
                catch(Exception){
                  //print error
                  console.log(Exception);
                  //hide loader
                  loader.classList.add("loader-hidden");
                  //Word not found in api's so show message
                  definition.innerHTML="Word cannot be found".bold();
                }
                
              }).catch(error => { //if there is error
                if (error.message === "403") {
                  // Handle the 403 Forbidden error
                  console.log("Access denied: You don't have permission to access this resource");
                } else {
                  // Handle other errors
                  console.error(error);
                }
              });
      }
      catch(Exception){
        //print error
        console.log(Exception);
      }
    }).catch(error => {
      console.error(error);
      //hide loader
      loader.classList.add("loader-hidden");
      //Word not found in api's so show message
      definition.innerHTML="Word cannot be found".bold();
    }); //log error
   
}).catch(error => {
  console.error(error);
  //hide loader
  loader.classList.add("loader-hidden");
  //Word not found in api's so show message
  definition.innerHTML="Word cannot be found".bold();
}); //log error
 
// Empty the translations array after processing
translationarray.length = 0; 
}

//Logging a word if the user is signed in
function logRequest(){
  //initialize info going into document
  const info = {
    Word: finalWord,
    dateTime: Timestamp.fromDate(new Date()),
    UserEmail: email,
    Definition: wordDetails[0].Definition,
    Example: wordDetails[0].Example, 
    Synonym: wordDetails[0].Synonym, 
    WhatWordDoesNotMeanHere: wordDetails[0].WhatWordDoesNotMeanHere,
    Graphic: wordDetails[0].Graphic,
    Movie: wordDetails[0].Movie,
    Afrikaans: wordDetails[0].Afrikaans,
    isiNdebele: wordDetails[0].isiNdebele,
    isiXhosa: wordDetails[0].isiXhosa,
    isiZulu: wordDetails[0].isiZulu,
    Sepedi: wordDetails[0].Sepedi,
    Sesotho: wordDetails[0].Sesotho,
    Setswana: wordDetails[0].Setswana,
    siSwati: wordDetails[0].siSwati,
    Tshivenda: wordDetails[0].Tshivenda,
    Xitsonga: wordDetails[0].Xitsonga,
    Bad: Number(wordDetails[0].Bad),
    Good: Number(wordDetails[0].Good)
  }
  //try to set document
  try{
    //set ref to collection
    const WordLogcolRef = collection(db, 'WordLog');
    //add a new document with unique id that will hold the details
    addDoc(WordLogcolRef,info);
  }catch(Exception){
    //print error
    console.log(Exception);
  }
}
//END OF FUNCTIONS CALLED IN PROCESS


//BEGINNING OF ON CLICK FUNCTIONS
//on click listener
closeIcon.addEventListener('click',doClose);
imageIcon.addEventListener('click',showImage);
videoIcon.addEventListener('click',playVideo);
soundIcon.addEventListener('click',playSound);
goodIcon.addEventListener('click',incGood);
badIcon.addEventListener('click',incBad);
toSignOut.addEventListener('click',signOut);

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

//initialize backClicked
let badClicked = 0;
//when thumbs down is clciked do this
function incBad(){
  //increment badClicked
  badClicked++;

  //if good clicked, unclick it
  if (goodClicked % 2 != 0){
    //decrease goodClicked;
    goodClicked--;
    //if clicked for second time then remove border
    //set the border when clicked
    goodIcon.style.border = "none";
    goodIcon.style.borderRadius = "0%";
    //field going to change, decrease the rating
    const fieldChange = {Good: increment(-1)};
    //update the document
    updateDoc(doc(db, "words", finalWord),fieldChange);
  }
  if (badClicked % 2 == 0){
    //if clicked for second time then remove border
    //set the border when clicked
    badIcon.style.border = "none";
    badIcon.style.borderRadius = "0%";
    //field going to change, decrease the rating
    const fieldChange ={Bad: increment(-1)};
    //update the document
    updateDoc(doc(db, "words", finalWord),fieldChange);
  }else{
    //set the border when clicked
    badIcon.style.border = "1px solid red";
    //make the border a circle
    badIcon.style.borderRadius = "50%";
    //field going to change, increase rating
    const fieldChange = {Bad: increment(1)};
    //update the document
    updateDoc(doc(db, "words", finalWord),fieldChange);}
}

//initialize goodClicked
let goodClicked=0;
//when thumbs up is clciked do this
function incGood(){
  //increment goodClicked
  goodClicked++;
  
  //if bad clicked unclick it
  if (badClicked % 2 != 0){
    //decrease badClicked;
    badClicked--;
    //if clicked for second time then remove border
    //set the border when clicked
    badIcon.style.border = "none";
    badIcon.style.borderRadius = "0%";
    //field going to change, decrease the rating
    const fieldChange ={Bad: increment(-1)};
    //update the document
    updateDoc(doc(db, "words", finalWord),fieldChange);
  }
  if (goodClicked % 2 == 0){
    //if clicked for second time then remove border
    //set the border when clicked
    goodIcon.style.border = "none";
    goodIcon.style.borderRadius = "0%";
    //field going to change, decrease the rating
    const fieldChange = {Good: increment(-1)};
    //update the document
    updateDoc(doc(db, "words", finalWord),fieldChange);
  }else{
    //set the border when clicked
    goodIcon.style.border = "1px solid green";
    //make the border a circle
    goodIcon.style.borderRadius = "50%";
    //field going to change, increase rating
    const fieldChange = {Good: increment(1)};
    //update the document
    updateDoc(doc(db, "words", finalWord),fieldChange);
  }
}

//Upon clicking the image icon this runs
function showImage(){
  if(pictureWord.style.visibility=='visible'){
    //clear picture src
    pictureWord.src="";
    //hide the image
    pictureWord.style.visibility='hidden';
  }else{
    //if no picture showing then this
    //try doing this
    //hide loader
    loader.style.visibility="visible";
    try{
      //initialise reference from firestore
      const ImageRef = wordDetails[0].Graphic;

      //set the img's src to the image ref
      pictureWord.src=ImageRef;

      //show the image
      pictureWord.style.visibility='visible';
      //hide loader
      loader.style.visibility="hidden";
    }catch(Exception){
      //log the error
      console.log(Exception);
      //hide loader
      loader.style.visibility="hidden";
    }
  }
}

//when sound icon is clicked this will run
function playSound(){
  //show loader
  loader.style.visibility="visible";
  try{
    //initiate the speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(finalWord);

    //control the pitch, speed and volume
    utterance.pitch = 1;
    utterance.rate = 0.5;
    utterance.volume = 2;

    //speak
    speechSynthesis.speak(utterance);
    //hide loader
    loader.style.visibility="hidden";
    
  }catch(Exception){
    //if it does not work , log the error
     console.log(Exception);
     //hide loader
     loader.style.visibility="hidden";
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

//sign Out by clearing the local storage where signedIn status is
function signOut(){
  //remove the data
  localStorage.removeItem('signedIn');
  localStorage.removeItem('email');
  localStorage.removeItem('dateTime');
  alert("You are signed out");
}
//END OF ON CLICK FUNCTIONS
