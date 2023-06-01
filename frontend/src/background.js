//on recwiving message do this
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'retrieveData') {
      if (chrome.storage.local.length>0){
        console.log("ooo")
      }
      // Retrieve the data from local storage
      chrome.storage.sync.get(['signedIn','email'], function(result) {
        //set data to be sent back
        const data = {
          //set data
          signedIn: result.signedIn,
          email: result.email
        };
        // Send the retrieved data back to the content script
        sendResponse({ data: data });
        console.log(data);
      });
  
      // Return true to indicate that the response will be sent asynchronously
      return true;
    }
  });
  
