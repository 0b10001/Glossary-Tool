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

/***/ "./src/contentg.js":
/*!*************************!*\
  !*** ./src/contentg.js ***!
  \*************************/
/***/ (() => {

eval("//Notification of run\r\nconsole.log(\"Chrome extension go?\");\r\n\r\n//initialising the selectedText variable\r\nlet selectedText = \"\";\r\n\r\n//if there is a window do this\r\nif(typeof window!=='undefined'){\r\n    //Notification of being on the browser\r\n    console.log('you are on the browser');\r\n\r\n    //The window after we select a word with our cursor, what it should then do\r\n    window.addEventListener('mouseup', wordSelected);\r\n\r\n    function wordSelected(){\r\n        //Get the selected text from the window\r\n        let selectedText = window.getSelection().toString();\r\n        \r\n        //output it\r\n        console.log(selectedText);\r\n\r\n        //if there is something in the variable\r\n        if(selectedText.length>0){\r\n            //create message to send to background\r\n            let message ={\r\n                text: selectedText\r\n            };\r\n\r\n            //send the message\r\n            chrome.runtime.sendMessage(message);\r\n        }\r\n    }\r\n}else{\r\n    // not on the browser\r\n    console.log('you are on the server');\r\n}\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://try/./src/contentg.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/contentg.js"]();
/******/ 	
/******/ })()
;