function playSound(finalWord) {
  // Show loader
  loader.style.visibility = "visible";
  
  try {
    // Initiate the speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(finalWord);

    // Control the pitch, speed, and volume
    utterance.pitch = 1;
    utterance.rate = 0.5;
    utterance.volume = 2;

    // Speak
    speechSynthesis.speak(utterance);
    
    // Hide loader
    loader.style.visibility = "hidden";
  } catch (Exception) {
    // If it does not work, log the error
    console.log(Exception);
    
    // Hide loader
    loader.style.visibility = "hidden";
  }
}

function signOut() {
  // Remove the data
  localStorage.removeItem('signedIn');
  localStorage.removeItem('email');
  localStorage.removeItem('dateTime');
  
  alert("You are signed out");
}
function doClose(){
    //close the window on chrome
    window.close();
}

  function picture(word) 
      {
       //document.getElementById("output").innerHTML = "<b>Definition:</b> " + definition + "<br><b>Example:</b> " + example + "<br><b>Synonym:</b> " + synonym + "<br><b>What the word does not mean:</b> " + antonyms + "<br><br><b>Translations:</b><br>" + translations;
       const accessKey = "_MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI";
                const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${word}`;
                fetch(apiUrl, {
              headers: {
                Authorization: `Client-ID ${accessKey}`,
              },
            })
              .then(response => response.json())
              .then(data => {
                const photoUrl = data.results[0].urls.regular;
                const photoDescription = data.results[0].description;
            // Display the word definition, example, synonym, antonym, and photo
            document.getElementById("output").innerHTML = "<br><br><img src='" + photoUrl + "' alt='" + photoDescription + "'>";
  })
  .catch(error => console.error(error));
}
function searchWord(word) {
    const thesaurusApiKey = "27f79564-22f5-40fb-b470-349be9fe5935";
    const thesaurusUrl =
      "https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/" +
      word +
      "?key=" +
      thesaurusApiKey;
  
    return fetch(thesaurusUrl)
      .then((response) => response.json())
      .then((data) => {
        const synonym = data[0].meta.syns[0][0];
        const antonyms = data[0].meta.ants[0];
        const example = data[0].def[0].sseq[0][0][1].dt[1][1][0].t;
        const definition = data[0].shortdef[0];
  
        return { synonym, antonyms, example, definition };
      });
  }
  function fetchTranslations(word, languagePairs) {
    const requests = [];
  
    for (const pair of languagePairs) {
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${word}&langpair=en|${pair.code}`;
      requests.push(fetch(myMemoryUrl));
    }
  
    return Promise.all(requests)
      .then((responses) => Promise.all(responses.map((resp) => resp.json())))
      .then((data) => {
        let translations = "";
  
        for (let i = 0; i < data.length; i++) {
          const translation = data[i].responseData.translatedText;
          const languageName = languagePairs[i].name;
          translations += `${languageName}: ${translation}<br>`;
        }
  
        return translations;
      });
  }
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
 

  



module.exports = { playSound, signOut,doClose,picture,searchWord,fetchTranslations ,showImage };
