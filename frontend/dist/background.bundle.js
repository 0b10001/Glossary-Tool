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

eval("//Notification of the backgorund running\r\nconsole.log('background running');\r\n\r\n//Listen for a message from the content.js and adding an eventlistener to the message\r\nchrome.runtime.onMessage.addListener(receiver);\r\n\r\n//Word in the background\r\nwindow.word = \"Glossary Tool\";\r\n\r\n//when message is received do this\r\nfunction receiver(request, sender, sendResponse){\r\n    //show what we are receiving\r\n    console.log(request);\r\n\r\n    //Set the new background word to be the receieved word\r\n    window.word = request.text;\r\n\r\n}\n\n//# sourceURL=webpack://try/./src/background.js?");

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