/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ (() => {

eval("//on recwiving message do this\r\nchrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {\r\n    if (request.action === 'retrieveData') {\r\n      if (chrome.storage.local.length>0){\r\n        console.log(\"ooo\")\r\n      }\r\n      // Retrieve the data from local storage\r\n      chrome.storage.sync.get(['signedIn','email'], function(result) {\r\n        //set data to be sent back\r\n        const data = {\r\n          //set data\r\n          signedIn: result.signedIn,\r\n          email: result.email\r\n        };\r\n        // Send the retrieved data back to the content script\r\n        sendResponse({ data: data });\r\n        console.log(data);\r\n      });\r\n  \r\n      // Return true to indicate that the response will be sent asynchronously\r\n      return true;\r\n    }\r\n  });\r\n  \n\n//# sourceURL=webpack://try/./src/background.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background.js"]();
/******/ 	
/******/ })()
;
