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
  module.exports = { showImage };