//get loader from html
const loader = document.querySelector(".loader");

//get the logged table
const LoggedTable = document.getElementById("Ranked");

//disable logged table
LoggedTable.style.display = "none";

//BEGINNING OF MENU
//getting the hamburger on our page
const hamburger = document.querySelector(".hamburger");

//onclick event listener
hamburger.addEventListener('click',showMenu);

//show the menu when hambuger is clicked
function showMenu(){
    //getting the navigation bar
    const navBar = document.querySelector(".nav-bar");
    //activiting its usability
    navBar.classList.toggle("active");
}
//END OF MENU



//BEGINNING OF SWITCHING TABS
//immeditaly the window open do this
window.onload = () =>{
    //show all words
    showAllWords();

    //hide loader
    document.querySelector(".LoaderDefine").style.visibility="hidden";

    //get the tab switchers and its funtion from htm
    const tab_switchers = document.querySelectorAll('[data-switcher]');

    //looop through all tabs
    for (let i = 0; i<tab_switchers.length; i++){
        //get individual tab_switcher
        const tab_switcher = tab_switchers[i];
        //get the page id from the chosen tab, get anything with data
        const page_id = tab_switcher.dataset.tab;
        //onclick eventListener
        tab_switcher.addEventListener('click', () => {
            //get the active tab and remove the is-active
            document.querySelector('.tabs .tab.is-active').classList.remove('is-active');
            //add the is-active to the chosen tab
            tab_switcher.parentNode.classList.add('is-active')
            //call swithPage
            swithPage(page_id);
        });
    }
}

//switch page
function swithPage(page_id){
    //get the current page
    const current_page = document.querySelector('.pages .page.is-active');
    //remove its activeness
    current_page.classList.remove('is-active');

    //set next page
    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    //activate next page
    next_page.classList.add('is-active');
}
//END OF SWITCHING TABS


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
const WordlogRef = collection(db, 'WordLog');
//END OF ESTABLISHING DATABASE CONNECTION

//BEGINNING OF DISPLAYING WORDS IN TABLES
//get show all Words
const btnShowAll = document.getElementById('allWords');
//get show Logged words
const btnshowLogged = document.getElementById('loggedWords');

//create on click listener
btnShowAll.addEventListener('click',showAllWords);
btnshowLogged.addEventListener('click',showLoggedWords);

//show logged words function
function showLoggedWords(){
    //get word table
   const wordT = document.getElementById('Ranked');
   
   // Clear the table by removing all rows
   while (wordT.rows.length > 1) {
       //delete row
       wordT.deleteRow(1);
   }
    //show loader
    loader.style.visibility = "visible";

    //enable button showall
    btnShowAll.style.display="block";
    //make logged words button disable
    btnshowLogged.style.display="none";

    //hide tables
    document.getElementById('Detail').style.display="none";  
    document.getElementById('Word').style.display="none"; 

    //show Log table
    LoggedTable.style.display="block";

    //change text
    document.getElementById('status').innerHTML = "Logged words".bold();

    //initialize list to carry words
    const Wordss = [];
    onSnapshot(WordlogRef,(snapshot)=>{
        //go through every document until the word is found
        snapshot.docs.every((doc, index) => {
            //get the ranking straight here
            //add the data of the found document to the wordDetails list
            Wordss.push(doc.data().Word);
       
            //if at the end of the words
            if (index === snapshot.docs.length - 1) {
                //initialize word object
                const wordCount = {};
  
                // Count the occurrences of each word
                Wordss.forEach(function(word) {
                    if (wordCount[word]) {
                        //increment count
                        wordCount[word]++;
                    } else {
                        //set to one
                        wordCount[word] = 1;
                    }
                });
                // Convert wordCount object to an array of [word, count] pairs
                const wordCountArray = Object.entries(wordCount);

                // Sort the array in descending order based on the count
                wordCountArray.sort(function(a, b) {
                    //sort
                    return b[1] - a[1];
                });

                // Print the words and their counts
                wordCountArray.forEach(function([word, count]) {
                    //create a new row to host the td
                    const tr = document.createElement('tr');
                    //set the class name of the tr
                    tr.classList.add('W');

                    //create a new td to host the word
                    const tdWord = document.createElement('td');

                    //set tdWord
                    tdWord.innerHTML = word;

                    //create a new td to host the word
                    const tdCount = document.createElement('td');
                    
                    //set tdCount
                    tdCount.innerHTML = count;

                    //add the Word to the tr
                    tr.appendChild(tdWord);
                    //add the Count to the tr
                    tr.appendChild(tdCount);

                    //get table
                    const Ranked = document.getElementById('Ranked'); 
                    //add the row to the table
                    Ranked.querySelector('tbody').appendChild(tr);
                });
                
            }
            //continue loop
            return true;
        });

    });
    //hide loader
    loader.style.visibility = "hidden";
}

//getting all the words and placing them in th table
function showAllWords(){
    //show loader
    loader.style.visibility = "visible";

    //get word table
   const wordT = document.getElementById('Word');
   
    // Clear the table by removing all rows
    while (wordT.rows.length > 0) {
        //delete row
        wordT.deleteRow(0);
    }
        
    //disable show all button
    btnShowAll.style.display = "none";
    //enable show logged
    btnshowLogged.style.display="block";

    //hide table
    LoggedTable.style.display="none";

     //show tables
     document.getElementById('Detail').style.display="block";  
     document.getElementById('Word').style.display="block"; 
     
    //change text
    document.getElementById('status').innerHTML = "All words".bold();
    //run through the wordlist
    //real time collection data, on any change
    onSnapshot(WordscolRef,(snapshot)=>{
        //go through every document until the word is found
        snapshot.docs.every((doc) => {
            //create a new row to host the td
            const tr = document.createElement('tr');
            //set the class name of the tr
            tr.classList.add('W');

            //create a new td to host the word
            const td = document.createElement('td');

            //create <a> tag
            const a = document.createElement('a');
            //set tag's id
            a.id = ({id:doc.id}.id);
            //set a's href
            a.href = "";
            //set the a's text
            a.innerHTML=({id:doc.id}.id);

            //add the a to td
            td.appendChild(a);
            //add the td to the tr
            tr.appendChild(td);

            //get table
            const Table = document.getElementById('Word'); 
            //add the row to the table
            Table.querySelector('tbody').appendChild(tr);

            //continue loop
            return true;
        });
        //hide loader
        loader.style.visibility = "hidden";
    });
    
}
//END OF DISPLAYING WORDS IN TABLES


//BEGINNING OF SHOWING DETAILS
// Get the parent element that wraps all the <a> tags
const Table = document.getElementById('Table');


// Attach a click event listener to the parent element
Table.addEventListener('click',function(event){
    
    //show loader
    loader.style.visibility = "visible";
    // Check if the clicked element is an <a> tag
    if (event.target.tagName === 'A') {
        // Retrieve the ID of the clicked <a> tag
        const clickedLinkId = event.target.id;

        //get table
        const tableW = document.getElementById('Word');
        //get tags
        const tags = tableW.getElementsByTagName('a');
        //traverse tags
        for (let i = 0; i < tags.length; i++) {
            //color to purple
            tags[i].style.color = "purple";
        }

        //check clicked to 
        document.getElementById(clickedLinkId).style.color = "red";

        //call setDetails
        setDetails(clickedLinkId);
        // Prevent the default behavior (page reload)
        event.preventDefault();
    }
    //hide loader
    loader.style.visibility ="hidden";
    
});



//set Details here
function setDetails(clickedLinkId){
    //initialize the array that will store the word's details once its found
    let wordDetails = []
    //show loader
    loader.style.visibility = "visible";
    //set ref to word
    const docRef = doc(db,'words',clickedLinkId);
    try{
        //get then document
        onSnapshot(docRef, (doc) => {
            //add the data of the found document to the wordDetails list
            wordDetails.push({...doc.data(), id:doc.id});

            //if field not None
            if (wordDetails[0].Definition != "None"){
                 //set Definition
                document.getElementById('Definition').innerHTML = wordDetails[0].Definition;
            }else{
                //set Definition
                document.getElementById('Definition').innerHTML = "";
            }
           
            //if field not None
            if (wordDetails[0].Example != "None"){
                //set Example
               document.getElementById('egSen').innerHTML = wordDetails[0].Example;
            }else{
               //set Example
               document.getElementById('egSen').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].WhatWordDoesNotMeanHere != "None"){
                //set NotMean
                document.getElementById('NotMean').innerHTML = wordDetails[0].WhatWordDoesNotMeanHere;
            }else{
                //set NotMean
                document.getElementById('NotMean').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Synonym != "None"){
                //set Similar
                document.getElementById('Similar').innerHTML = wordDetails[0].Synonym;
            }else{
                //set Similar
                document.getElementById('Similar').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Graphic != "None"){
                //set Graphic
                document.getElementById('Graphic').innerHTML = wordDetails[0].Graphic;
            }else{
                //set Graphic
                document.getElementById('Graphic').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Movie != "None"){
                //set Movie
                document.getElementById('Movie').innerHTML = wordDetails[0].Movie;
            }else{
                //set Movie
                document.getElementById('Movie').innerHTML = "";
            }

             //if field not None
             if (wordDetails[0].Afrikaans != "None"){
                //set Afrikaans
                document.getElementById('Afrikaans').innerHTML = wordDetails[0].Afrikaans;
            }else{
                //set Afrikaans
                document.getElementById('Afrikaans').innerHTML = "";
            }
            
            //if field not None
            if (wordDetails[0].isiNdebele != "None"){
                //set isiNdebele
                document.getElementById('isiNdebele').innerHTML = wordDetails[0].isiNdebele;
            }else{
                //set isiNdebele
                document.getElementById('isiNdebele').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].isiXhosa != "None"){
                //set isiXhosa
                document.getElementById('isiXhosa').innerHTML = wordDetails[0].isiXhosa;
            }else{
                //set isiXhosa
                document.getElementById('isiXhosa').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].isiZulu != "None"){
                //set isiZulu
                document.getElementById('isiZulu').innerHTML = wordDetails[0].isiZulu;
            }else{
                //set isiZulu
                document.getElementById('isiZulu').innerHTML = "";
            }

             //if field not None
             if (wordDetails[0].Sepedi != "None"){
                //set Sepedi
                document.getElementById('Sepedi').innerHTML = wordDetails[0].Sepedi;
            }else{
                //set Sepedi
                document.getElementById('Sepedi').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Sesotho != "None"){
                //set Sesotho
                document.getElementById('Sesotho').innerHTML = wordDetails[0].Sesotho;
            }else{
                //set Sesotho
                document.getElementById('Sesotho').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Setswana != "None"){
                //set Setswana
                document.getElementById('Setswana').innerHTML = wordDetails[0].Setswana;
            }else{
                //set Setswana
                document.getElementById('Setswana').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].siSwati != "None"){
                //set siSwati
                document.getElementById('siSwati').innerHTML = wordDetails[0].siSwati;
            }else{
                //set siSwati
                document.getElementById('siSwati').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Tshivenda != "None"){
                //set Tshivenda
                document.getElementById('Tshivenda').innerHTML = wordDetails[0].Tshivenda;
            }else{
                //set Tshivenda
                document.getElementById('Tshivenda').innerHTML = "";
            }

            //if field not None
            if (wordDetails[0].Xitsonga != "None"){
                //set Xitsonga
                document.getElementById('Xitsonga').innerHTML = wordDetails[0].Xitsonga;
            }else{
                //set Xitsonga
                document.getElementById('Xitsonga').innerHTML = "";
            }
            
            //set Good
            document.getElementById('numUp').innerHTML = wordDetails[0].Good;

            //set Bad
            document.getElementById('numDown').innerHTML = wordDetails[0].Bad;
        });
    }catch{
        console.error(error);
    } //log error 
    
   
    //hide loader
    loader.style.visibility = "hidden";
}
//END OF SHOWING DETAILS

//BEGINNING OF ADD NEW WORD

//get  components in the deifne word page
const defineWordbtn = document.getElementById('DefineOpt');
//get components 
const updatebtn = document.getElementById('Update');
const dropdownDiv = document.getElementById('GB');
//get element
const submitbtn =document.getElementById('Submit');
//get the components of edit
const editWordbtn = document.getElementById('EditOpt');


//add enventlistener
defineWordbtn.addEventListener('click',defineWordOpt);
//call function
defineWordOpt();
function defineWordOpt(){
    //clear searchbox
    document.getElementById('Search').value = "";
    //change name
    document.getElementById('DW').innerHTML = "Define a word";

    //clear errors
    ClearErrors();
    
    //clear boxes
    ClearBoxes();

    //hide them
    defineWordbtn.style.display="none";
    updatebtn.style.display="none";
    dropdownDiv.style.display="none";

    //hide certian view
    editWordbtn.style.display = "block";
    submitbtn.style.display = "block";

    document.getElementsByClassName('err').innerHTML ="";

    //make word input work
    document.getElementById('InWord').disabled = false;
}
//on click listener when submiy is clicked

submitbtn.addEventListener('click',submit);
//submit fumction
function submit(){
    //show loader
    document.querySelector(".LoaderDefine").style.visibility="visible";
    //validate first
    if(Validation() == true){
        //submit to firebase
        //initialise the values going into firestore
        const info = {
            Definition: document.getElementById('InDef').value,
            Example: document.getElementById('InEg').value, 
            Synonym: document.getElementById('InSim').value, 
            WhatWordDoesNotMeanHere: document.getElementById('InNotMean').value,
            Graphic: document.getElementById('InGraphic').value,
            Movie: document.getElementById('InMovie').value,
            Afrikaans: document.getElementById('InAfrikaans').value,
            isiNdebele: document.getElementById('InisiNdebele').value,
            isiXhosa: document.getElementById('InisiXhosa').value,
            isiZulu: document.getElementById('InisiZulu').value,
            Sepedi: document.getElementById('InSepedi').value,
            Sesotho: document.getElementById('InSesotho').value,
            Setswana: document.getElementById('InSetswana').value,
            siSwati: document.getElementById('InsiSwati').value,
            Tshivenda: document.getElementById('InTshivenda').value,
            Xitsonga: document.getElementById('InXitsonga').value,
            Bad: Number(0),
            Good: Number(0)
        }
        //try to set document
        try{
            //set a new document called finalWord that will hold the details
            setDoc(doc(db, "words", document.getElementById('InWord').value),info);

            //clear boxes
            ClearBoxes();

            //hide loader
            document.querySelector(".LoaderDefine").style.visibility="hidden";
        }
        catch(Exception){
            //print error
            console.log(Exception);
            //hide loader
            document.querySelector(".LoaderDefine").style.visibility="hidden";
            //Word not found in api's so show message
            document.getElementById("errO").innerHTML="error with adding document, please try again";
        }
    }

}

//validate inputs
function Validation(){
    let nErr = 0;
    //Word validation
    // set Word input
    let inWord = document.getElementById('InWord').value;
    //no spaces and length bigger or equal 1
    if (/\s/.test(inWord) || inWord.length<1){
        //show error
        document.getElementById("errWord").innerHTML = "Word must not have spaces";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errWord").innerHTML = "";
    }
    //Def validation
    // set Def input
    let inDef = document.getElementById('InDef').value;
    //if Definition is smaller than length 5
    if (inDef.length<5){
        //show error
        document.getElementById("errDef").innerHTML = "Definiton must be a sentence";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errDef").innerHTML = "";
    }

    //Eg validation
    // set Eg input
    let inEg = document.getElementById('InEg').value;
    //if length is smaller than 5
    if (inEg.length<5){
        //show error
        document.getElementById("errEg").innerHTML = "Example sentence must be a sentence";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errEg").innerHTML = "";
    }

    //Similar meaning validation
    // set Sim  input
    let inSim = document.getElementById('InSim').value;
    //no validation yet
    if (1 == 2){
        //show error
        document.getElementById("errSim").innerHTML = "Similar meaning";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errSim").innerHTML = "";
    }
    
    //NotMean validation
    // set NotMean input
    let inNotMean = document.getElementById('InNotMean').value;
    //no validation yet
    if (1 == 2){
        //show error
        document.getElementById("errNotMean").innerHTML = "Not Mean Here";
        //increase nErr 
        nErr++;
    }else{ 
        //clear error
        document.getElementById("errNotMean").innerHTML = "";
    }
   
    //Media urls
    //test valid url function 
    const isValidUrl = urlString=> {
    //make pattern we are looking for
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }
    //Graphic validation
    // set Graphic input
    let inGraphic = document.getElementById('InGraphic').value;
    //if value is entered and the value is valid url
    if ((inGraphic != "") && (isValidUrl(inGraphic) == false) ){
        //show error
        document.getElementById("errGraphic").innerHTML = "Graphic must be a valid url";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errGraphic").innerHTML = "";
    }
    
    //Movie validation
   // set Movie input
   let inMovie = document.getElementById('InMovie').value;
   //if value is entered and the value is valid url
   if ((inMovie != "") && (isValidUrl(inMovie) == false) ){
       //show error
       document.getElementById("errMovie").innerHTML = "Movie must be a valid url";
       //increase nErr 
       nErr++;
    }else{
        //clear error
        document.getElementById("errMovie").innerHTML = "";
    }
   
    //Translations
    let hasNumber = /\d/;
     //Afrikaans validation
    // set Afrikaans input
    let inAfrikaans = document.getElementById('InAfrikaans').value;
    //if value is entered and the value has a number
    if ((inAfrikaans != "") && (hasNumber.test(inAfrikaans)) ){
        //show error
        document.getElementById("errAfrikaans").innerHTML = "Afrikaans translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errAfrikaans").innerHTML = "";
    }
    
     //Setswana validation
    // set Setswana input
    let inSetswana = document.getElementById('InSetswana').value;
    //if value is entered and the value has a number
    if ((inSetswana != "") && (hasNumber.test(inSetswana)) ){
        //show error
        document.getElementById("errSetswana").innerHTML = "Setswana translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errSetswana").innerHTML = "";
    }
    
     //Sepedi validation
    // set Sepedi input
    let inSepedi = document.getElementById('InSepedi').value;
    //if value is entered and the value has a number
    if ((inSepedi != "") && (hasNumber.test(inSepedi)) ){
        //show error
        document.getElementById("errSepedi").innerHTML = "Sepedi translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errSepedi").innerHTML = "";
    }
    
     //Sesotho validation
    // set Sesotho input
    let inSesotho = document.getElementById('InSesotho').value;
    //if value is entered and the value has a number
    if ((inSesotho != "") && (hasNumber.test(inSesotho)) ){
        //show error
        document.getElementById("errSesotho").innerHTML = "Sesotho translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errSesotho").innerHTML = "";
    }
    
     //siSwati validation
    // set siSwati input
    let insiSwati = document.getElementById('InsiSwati').value;
    //if value is entered and the value has a number
    if ((insiSwati != "") && (hasNumber.test(insiSwati)) ){
        //show error
        document.getElementById("errsiSwati").innerHTML = "siSwati translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errsiSwati").innerHTML = "";
    }
  
     //tshivenda validation
    // set isiXhosa input
    let inisiXhosa = document.getElementById('InisiXhosa').value;
    //if value is entered and the value has a number
    if ((inisiXhosa != "") && (hasNumber.test(inisiXhosa)) ){
        //show error
        document.getElementById("errisiXhosa").innerHTML = "isiXhosa translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errisiXhosa").innerHTML = "";
    }
    
    //isiNdebele validation
    // set isiNdebele input
    let inisiNdebele = document.getElementById('InisiNdebele').value;
    //if value is entered and the value has a number
    if ((inisiNdebele != "") && (hasNumber.test(inisiNdebele)) ){
        //show error
        document.getElementById("errisiNdebele").innerHTML = "isiNdebele translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errisiNdebele").innerHTML = "";
    }
    
     //isiZulu validation
    // set isiZulu input
    let inisiZulu = document.getElementById('InisiZulu').value;
    //if value is entered and the value has a number
    if ((inisiZulu != "") && (hasNumber.test(inisiZulu)) ){
        //show error
        document.getElementById("errisiZulu").innerHTML = "isiZulu translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errisiZulu").innerHTML = "";
    }
    
    //tshivenda validation
    // set Tshivenda input
    let inTshivenda = document.getElementById('InTshivenda').value;
    //if value is entered and the value has a number
    if ((inTshivenda != "") && (hasNumber.test(inTshivenda)) ){
        //show error
        document.getElementById("errTshivenda").innerHTML = "Tshivenda translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errTshivenda").innerHTML = "";
    }
    
    //xitsonga validation
    // set Xitsonga input
    let inXitsonga = document.getElementById('InXitsonga').value;
    //if value is entered and the value has a number
    if ((inXitsonga != "") && (hasNumber.test(inXitsonga)) ){
        //show error
        document.getElementById("errXitsonga").innerHTML = "Xitsonga translation should not have a number";
        //increase nErr 
        nErr++;
    }else{
        //clear error
        document.getElementById("errXitsonga").innerHTML = "";
    }
    
    //if no errors
    if (nErr == 0){
        //all valid so true
        return true;
    }else{
        //hide loader
        document.querySelector(".LoaderDefine").style.visibility="hidden";
        //>0 errors so false
        return false;
    }
}
//END OF ADD NEW WORD


//BEGINNING OF EDIT WORD
//create onlick listener
editWordbtn.addEventListener('click',editWordOpt);
function editWordOpt(){
    //change name
    document.getElementById('DW').innerHTML = "Edit a word";

    //clear dropdown
    const dropd = document.getElementById('badWords');

    // Clear dropdown except for the first option
    for (let i = dropd.options.length - 1; i > 0; i--) {
        //remove option
        dropd.remove(i);
    }

    //clear errors
    ClearErrors();
    
    //clear boxes
    ClearBoxes();

    //hide certian view
    editWordbtn.style.display = "none";
    submitbtn.style.display = "none";

    //show the needed update components
    defineWordbtn.style.display="block";
    updatebtn.style.display="block";

    //fill the drop down
    fillDropDown();
    //show the dropdown
    dropdownDiv.style.display="block";

    //word input disabled
    document.getElementById('InWord').disabled = true;

}

//filling the dropdown with words with more negative than posisive
function fillDropDown(){
    //initialize details
    let Details = [];
    try{
         //run through the wordlist
        //real time collection data, on any change
        onSnapshot(WordscolRef,(snapshot)=>{
            //initialize bad words
            let BadWords = [];
            //go through every document until the word is found
            snapshot.docs.every((doc, index) => {
                //add the data of the found document to the wordDetails list
                Details.push({...doc.data(), id:doc.id});

                //if bad bigger than good
                if (Details[0].Bad > Details[0].Good){
                    //get difference
                    const diff = Math.abs(Details[0].Bad - Details[0].Good);
                    //put bad word and it diff
                    BadWords.push({word: {id:doc.id}.id, difference: diff})
                }   
                //when list at end
                if (index === snapshot.docs.length - 1) {
                    // Sort the array based on the difference in descending order
                    BadWords.sort((a, b) => b.difference - a.difference);

                    //for all words in sorted list
                    BadWords.forEach((word) => {
                        //create new option
                        const option = document.createElement('option');
                        //set its text
                        option.text = word.word;
                        //set its value
                        option.value = word.word;
                        //put the option is the dropdown
                        document.getElementById('badWords').appendChild(option);
                    });
                    
                }

                //clear Details
                Details.length = 0;
                //continue true
                return true;
            });
        });


    }catch(Exception){
        //log the exception
        console.log(Exception);
    }
}

//item clicked in the dropdown
//get the dropdown
const dropDownB = document.getElementById('badWords');

//its onchange listener
dropDownB.addEventListener('change',detailsInBoxes);

//enter details in boxes
function detailsInBoxes(){
    //clear errors
    ClearErrors();

    //init selected value
    let ValueW ="";
    
    //if search is empty
    if (document.getElementById("SW").value ==""){
        //get selected value
        ValueW = dropDownB.value;
    }else{
        //get search value
        ValueW = document.getElementById("SW").value;
    }
    //go to database and set the words in the boxes
    const docRef = doc(db,'words',ValueW);
    try{
        //get then document
        onSnapshot(docRef, (doc) => {
            //clear wordDetails
            let wordDetails = [];
            //add the data of the found document to the wordDetails list
            wordDetails.push({...doc.data(), id:doc.id});

            //if def and example undefined
            if (!wordDetails[0].Definition && !wordDetails[0].Example){
                //error
                document.getElementById('errSearch').innerHTML = "Word not found";
                //back
                return;
            }

            //if example sentence is None
            if (wordDetails[0].Definition == "None"){
                //set Definition
                document.getElementById('InDef').value = "";
            }else{
                //set Definition
                document.getElementById('InDef').value = wordDetails[0].Definition;
            }

            //if example sentence is None
            if (wordDetails[0].Example == "None"){
                //set example sentence
                document.getElementById('InEg').value = "";
            }else{
                //set example sentence
                document.getElementById('InEg').value = wordDetails[0].Example;
            }

            //if NotMean is None
            if (wordDetails[0].WhatWordDoesNotMeanHere == "None"){
                //set NotMean
                document.getElementById('InNotMean').value = "";
            }else{
                //set NotMean
                document.getElementById('InNotMean').value = wordDetails[0].WhatWordDoesNotMeanHere;
            }

            //if similiar is None
            if (wordDetails[0].Synonym == "None"){
                //set similiar
                document.getElementById('InSim').value = "";
            }else{
                //set similiar
                document.getElementById('InSim').value = wordDetails[0].Synonym;
            }

            //if Graphic is None
            if (wordDetails[0].Graphic == "None"){
                //set Graphic
                document.getElementById('InGraphic').value = "";
            }else{
                //set Graphic
                document.getElementById('InGraphic').value = wordDetails[0].Graphic;
            }

            //if Movie is None
            if (wordDetails[0].Movie == "None"){
                //set Movie
                document.getElementById('InMovie').value = "";
            }else{
                //set Movie
                document.getElementById('InMovie').value = wordDetails[0].Movie;
            }

            //if Afrikaans is None
            if (wordDetails[0].Afrikaans=="None"){
                //set Afrikaans
                document.getElementById('InAfrikaans').value = "";
            }else{
                 //set Afrikaans
                 document.getElementById('InAfrikaans').value = wordDetails[0].Afrikaans;
            }
           
            //if isiNdebele is None
            if (wordDetails[0].isiNdebele=="None"){
                //set isiNdebele
                document.getElementById('InisiNdebele').value = "";
            }else{
                 //set isiNdebele
                 document.getElementById('InisiNdebele').value = wordDetails[0].isiNdebele;
            }

            //if isiXhosa is None
            if (wordDetails[0].isiXhosa=="None"){
                //set isiXhosa
                document.getElementById('InisiXhosa').value = "";
            }else{
                 //set isiXhosa
                 document.getElementById('InisiXhosa').value = wordDetails[0].isiXhosa;
            }

            //if isiZulu is None
            if (wordDetails[0].isiZulu=="None"){
                //set isiZulu
                document.getElementById('InisiZulu').value = "";
            }else{
                 //set isiZulu
                 document.getElementById('InisiZulu').value = wordDetails[0].isiZulu;
            }

            //if Sepedi is None
            if (wordDetails[0].Sepedi=="None"){
                //set Sepedi
                document.getElementById('InSepedi').value = "";
            }else{
                 //set Sepedi
                 document.getElementById('InSepedi').value = wordDetails[0].Sepedi;
            }

            //if Sesotho is None
            if (wordDetails[0].Sesotho=="None"){
                //set Sesotho
                document.getElementById('InSesotho').value = "";
            }else{
                 //set Sesotho
                 document.getElementById('InSesotho').value = wordDetails[0].Sesotho;
            }

            //if Setswana is None
            if (wordDetails[0].Setswana=="None"){
                //set Setswana
                document.getElementById('InSetswana').value = "";
            }else{
                 //set Setswana
                 document.getElementById('InSetswana').value = wordDetails[0].Setswana;
            }

            //if siSwati is None
            if (wordDetails[0].siSwati=="None"){
                //set siSwati
                document.getElementById('InsiSwati').value = "";
            }else{
                 //set siSwati
                 document.getElementById('InsiSwati').value = wordDetails[0].siSwati;
            }

            //if Tshivenda is None
            if (wordDetails[0].Tshivenda=="None"){
                //set Tshivenda
                document.getElementById('InTshivenda').value = "";
            }else{
                 //set Tshivenda
                 document.getElementById('InTshivenda').value = wordDetails[0].Tshivenda;
            }

            //if Xitsonga is None
            if (wordDetails[0].Xitsonga=="None"){
                //set Xitsonga
                document.getElementById('InXitsonga').value = "";
            }else{
                //set Xitsonga
                document.getElementById('InXitsonga').value = wordDetails[0].Xitsonga;
            }
        });
    }catch(Exception){
        //log  error
        console.log(Exception);
        
    }
}

//add search functionality
//get search button
const Searchbtn = document.getElementById('Search');
//set value
Searchbtn.value="Search";
//onclick event listener
Searchbtn.addEventListener("click", SearchWord);

//get word
function SearchWord(){
    //if there is word, no word show error
    if (document.getElementById("SW").value == ""){
        //alert the user
        document.getElementById('errSearch').innerHTML = "Enter word";
    }else{
        //if there is whitespace in word, show error
        if (/\s/.test(document.getElementById("SW").value)){
            //alert the user
            document.getElementById('errSearch').innerHTML = "Word must not have spaces";
        }else{
            //items into boxes
            detailsInBoxes();
        }
    }
    
   
}

//dropdown focus
document.getElementById("SW").addEventListener('focus', function(){
    //index to dropdown 0
    dropDownB.selectedIndex = 0;
});
//search focus
dropDownB.addEventListener('focus', function(){
    //clear search
    document.getElementById("SW").value = "";
});


//add event handler
updatebtn.addEventListener("click", Update);
//function for when update clicked
function Update(){
     //show loader
     document.querySelector(".LoaderDefine").style.visibility="visible";
            
    if(Validation() == true){
        //submit to firebase
        //initialise the values going into firestore
        const info = {
            Definition: document.getElementById('InDef').value,
            Example: document.getElementById('InEg').value, 
            Synonym: document.getElementById('InSim').value, 
            WhatWordDoesNotMeanHere: document.getElementById('InNotMean').value,
            Graphic: document.getElementById('InGraphic').value,
            Movie: document.getElementById('InMovie').value,
            Afrikaans: document.getElementById('InAfrikaans').value,
            isiNdebele: document.getElementById('InisiNdebele').value,
            isiXhosa: document.getElementById('InisiXhosa').value,
            isiZulu: document.getElementById('InisiZulu').value,
            Sepedi: document.getElementById('InSepedi').value,
            Sesotho: document.getElementById('InSesotho').value,
            Setswana: document.getElementById('InSetswana').value,
            siSwati: document.getElementById('InsiSwati').value,
            Tshivenda: document.getElementById('InTshivenda').value,
            Xitsonga: document.getElementById('InXitsonga').value,
            Bad: Number(0),
            Good: Number(0)
        }
        //try to set document
        try{
            //update document called finalWord that holds the details
            updateDoc(doc(db, "words", document.getElementById('InWord').value),info);

            //clear boxes
            ClearBoxes();

            //hide loader
            document.querySelector(".LoaderDefine").style.visibility="hidden";
        }
        catch(Exception){
            //print error
            console.log(Exception);
            //hide loader
            document.querySelector(".LoaderDefine").style.visibility="hidden";
            //Word not found in api's so show message
            document.getElementById("errO").innerHTML="error with adding document, please try again";
        }
    }
}
//BEGINNING OF EDIT WORD

//CLEAR INPUTBOXES
function ClearBoxes(){
    document.getElementById('InWord').value = "";
    document.getElementById('InDef').value = "";
    document.getElementById('InEg').value = ""; 
    document.getElementById('InSim').value = "";
    document.getElementById('InNotMean').value = "";
    document.getElementById('InGraphic').value = "";
    document.getElementById('InMovie').value = "";
    document.getElementById('InAfrikaans').value = "";
    document.getElementById('InisiNdebele').value = "";
    document.getElementById('InisiXhosa').value = "";
    document.getElementById('InisiZulu').value = "";
    document.getElementById('InSepedi').value = "";
    document.getElementById('InSesotho').value = "";
    document.getElementById('InSetswana').value = "";
    document.getElementById('InsiSwati').value = "";
    document.getElementById('InTshivenda').value = "";
    document.getElementById('InXitsonga').value = "";
}

//CLEAR INPUTERRoRs
function ClearErrors(){
    //all spans
    const spans = document.getElementsByClassName('err');

    // Loop through each span and clear its innerHTML
    for (let i = 0; i < spans.length; i++) {
        //clear inner html
        spans[i].innerHTML = "";
    }
}


//cancel
const Cancelbtn = document.getElementById('Cancel');
//onclick for cancel
Cancelbtn.addEventListener('click', Reload);
//Reload
function Reload(){
    //clear
    ClearBoxes();
    //reset dropdown
    dropDownB.selectedIndex = 0;
}


//BEGINNING OF ADD NEW USER
//hiide loader
document.querySelector(".LoaderN").style.visibility="hidden";

//get button
const SubmitNew = document.getElementById('SubmitN');
//prepare for create user
//import auth and create new
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//onclcik eventlistener
SubmitNew.addEventListener('click', SubmitUser);
//submit new user
function SubmitUser(){
    //show loader
    document.querySelector(".LoaderN").style.visibility="visible";
    if (validateUserInfo() == true){
        //get authentication direction
        const auth = getAuth();

        //create user with email and password
        createUserWithEmailAndPassword(auth, document.getElementById('InEmail').value, document.getElementById('InVPass').value)
        .then((userCredentials) => {
            //show feedback
            alert("New user created");
            //clear boxes
            CancelNewUser();
        }).catch((error)=>{
            //log error
            console.log(error);
            //show user error
            document.getElementById('errAuth').innerHTML = "Something went wrong, try again please"
        })
    }

    //hide loader
    document.querySelector(".LoaderN").style.visibility="hidden";
}

//validate input
function validateUserInfo(){
    //number of errors
    let nErr = 0;
    //email is NOT valid
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('InEmail').value))){
        //increase error count
        nErr++
        //show error
        document.getElementById('errEmail').innerHTML = "Inavlid email format";
    }else{
        //remove error
        document.getElementById('errEmail').innerHTML = "";
    }

    //if passowrd not 6 or more
    if (document.getElementById('InPass').value.length<6){
        //increase error count
        nErr++
        //show error
        document.getElementById('errPass').innerHTML = "Password must be longer than 5 characters";
    }else{
        //remove error
        document.getElementById('errPass').innerHTML = "";
    }

    //if passwords dont match
    if (document.getElementById('InPass').value != document.getElementById('InVPass').value){
        //increase error count
        nErr++
         //show error
         document.getElementById('errVPass').innerHTML = "Passwords should match";
    }else{
        //remove error
        document.getElementById('errVPass').innerHTML = "";
    }

    //if no errors
    if(nErr == 0){
        //return true, no erros
        return true;
    }else{
        //return false, errors present
        return false;
    }
}

//add onclick listener to cancel button
document.getElementById('CancelN').addEventListener('click',CancelNewUser)

//cancel it
function CancelNewUser(){
    //clear email input
    document.getElementById('InEmail').value = "";
    //clear password input
    document.getElementById('InPass').value = "";
    //clear verify password input
    document.getElementById('InVPass').value = "";
}
//END OF ADD NEW USER

