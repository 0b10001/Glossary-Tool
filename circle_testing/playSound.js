function playSound(finalWord){
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
  module.exports = { playSound };