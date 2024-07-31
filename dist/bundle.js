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

/***/ "./src/helper_function.js":
/*!********************************!*\
  !*** ./src/helper_function.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { classNames, obj, idNames, strNames } = __webpack_require__(/*! ./helper_object */ \"./src/helper_object.js\");\n\nfunction shuffleEmojis(emojis) {\n  return emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));\n}\n\nlet timerInterval;\n\nfunction startTimer() {\n  const startTime = Date.now();\n\n  timerInterval = setInterval(() => {\n    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);\n    const minutes = Math.floor(elapsedTime / 60);\n    const seconds = elapsedTime % 60;\n    document.getElementById(idNames.minutes).textContent = minutes;\n    document.getElementById(idNames.seconds).textContent = seconds;\n  }, 1000);\n}\n\nfunction oneSecondMessage(minutes, countFlippedCards) {\n  return obj.message(\n    minutes,\n    idNames.minutes,\n    \"1\",\n    strNames.second,\n    countFlippedCards\n  );\n}\n\nfunction oneMinuteMessage(seconds, countFlippedCards) {\n  return obj.message(\n    \"1\",\n    strNames.minute,\n    seconds,\n    idNames.seconds,\n    countFlippedCards\n  );\n}\n\nfunction oneMinuteAndOneSecondMessage(countFlippedCards) {\n  return obj.message(\n    \"1\",\n    strNames.minute,\n    \"1\",\n    strNames.second,\n    countFlippedCards\n  );\n}\n\nfunction stopTimer(countFlippedCards) {\n  clearInterval(timerInterval);\n  const minutes = document.getElementById(idNames.minutes).textContent;\n  const seconds = document.getElementById(idNames.seconds).textContent;\n  const messageContainer = document.getElementById(idNames.overlayMessage);\n\n  if (Number(minutes) === 1 && Number(seconds) === 1) {\n    messageContainer.textContent =\n      oneMinuteAndOneSecondMessage(countFlippedCards);\n  } else if (Number(minutes) === 1) {\n    messageContainer.textContent = oneMinuteMessage(seconds, countFlippedCards);\n  } else if (Number(seconds) === 1) {\n    messageContainer.textContent = oneSecondMessage(minutes, countFlippedCards);\n  } else {\n    messageContainer.textContent = obj.message(\n      minutes,\n      idNames.minutes,\n      seconds,\n      idNames.seconds,\n      countFlippedCards\n    );\n  }\n\n  document.getElementById(classNames.overlay).style.display = \"flex\";\n\n  const classNamesArr = [\n    classNames.overlay,\n    classNames.grid,\n    classNames.timer,\n    classNames.reset,\n    classNames.gridSize,\n    classNames.gridSizeLabel,\n    classNames.start,\n    classNames.inputGroup,\n  ];\n\n  classNamesArr.forEach((className) => {\n    document.querySelector(`.${className}`).classList.add(strNames.blurred);\n  });\n}\n\nfunction resetTimer() {\n  clearInterval(timerInterval);\n  document.getElementById(idNames.minutes).textContent = \"0\";\n  document.getElementById(idNames.seconds).textContent = \"0\";\n}\n\nmodule.exports = {\n  shuffleEmojis,\n  startTimer,\n  stopTimer,\n  resetTimer,\n};\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-222-memory-game-in-vanilla-js-javascript/./src/helper_function.js?");

/***/ }),

/***/ "./src/helper_object.js":
/*!******************************!*\
  !*** ./src/helper_object.js ***!
  \******************************/
/***/ ((module) => {

eval("const obj = {\n  confetti: () => {\n    const duration = 15 * 1000,\n      animationEnd = Date.now() + duration,\n      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };\n\n    function randomInRange(min, max) {\n      return Math.random() * (max - min) + min;\n    }\n\n    const interval = setInterval(function () {\n      const timeLeft = animationEnd - Date.now();\n\n      if (timeLeft <= 0) {\n        return clearInterval(interval);\n      }\n\n      const particleCount = 50 * (timeLeft / duration);\n\n      confetti(\n        Object.assign({}, defaults, {\n          particleCount,\n          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },\n        })\n      );\n\n      confetti(\n        Object.assign({}, defaults, {\n          particleCount,\n          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },\n        })\n      );\n    }, 500);\n\n    return interval;\n  },\n\n  emojis: [\n    \"😎\",\n    \"😎\",\n    \"🥶\",\n    \"🥶\",\n    \"🤯\",\n    \"🤯\",\n    \"😇\",\n    \"😇\",\n    \"🥳\",\n    \"🥳\",\n    \"😤\",\n    \"😤\",\n    \"🧐\",\n    \"🧐\",\n    \"🥰\",\n    \"🥰\",\n  ],\n\n  message: (minNum, minutes, secNum, seconds, countFlippedCards) => {\n    return `Congratulations! You completed the game in ${minNum} ${minutes} and ${secNum} ${seconds} and It took you ${countFlippedCards} flips.`;\n  },\n};\n\nconst classNames = {\n  card: \"card\",\n  flipped: \"flipped\",\n  matched: \"matched\",\n  grid: \"grid\",\n  timer: \"timer\",\n  reset: \"reset\",\n  overlay: \"overlay\",\n  gridSize: \"grid-size\",\n  gridSizeLabel: \"grid-size-label\",\n  start: \"start-button\",\n  inputGroup: \"input-group\",\n};\n\nconst idNames = {\n  minutes: \"minutes\",\n  seconds: \"seconds\",\n  restartButton: \"restart-button\",\n  resetButton: \"reset\",\n  message: \"message\",\n  overlayMessage: \"overlay-message\",\n  gridSize: \"grid-size\",\n  gridSizeRow: \"grid-size-row\",\n  gridSizeColumn: \"grid-size-column\",\n  start: \"start\",\n  numOfFlips: \"numOfFlips\",\n};\n\nconst strNames = {\n  minute: \"minute\",\n  second: \"second\",\n  blurred: \"blurred\",\n};\n\nmodule.exports = { classNames, obj, idNames, strNames };\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-222-memory-game-in-vanilla-js-javascript/./src/helper_object.js?");

/***/ }),

/***/ "./src/memory_game.js":
/*!****************************!*\
  !*** ./src/memory_game.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  shuffleEmojis,\n  startTimer,\n  stopTimer,\n  resetTimer,\n} = __webpack_require__(/*! ./helper_function */ \"./src/helper_function.js\");\nconst { obj, classNames, idNames, strNames } = __webpack_require__(/*! ./helper_object */ \"./src/helper_object.js\");\n\nlet confettiInterval;\n\nfunction restartGame() {\n  resetTimer();\n\n  if (confettiInterval) {\n    clearInterval(confettiInterval);\n    confettiInterval = null;\n  }\n\n  document.getElementById(classNames.overlay).style.display = \"none\";\n\n  const classNamesArr = [\n    classNames.overlay,\n    classNames.grid,\n    classNames.timer,\n    classNames.reset,\n    classNames.gridSize,\n    classNames.gridSizeLabel,\n    classNames.start,\n    classNames.inputGroup,\n  ];\n\n  classNamesArr.forEach((className) => {\n    document.querySelector(`.${className}`).classList.remove(strNames.blurred);\n  });\n\n  const grid = document.querySelector(`.${classNames.grid}`);\n\n  while (grid.firstChild) {\n    grid.removeChild(grid.firstChild);\n  }\n}\n\nfunction checkForMatch(firstCard, secondCard, countFlippedCards, row, column) {\n  if (firstCard.innerHTML === secondCard.innerHTML) {\n    firstCard.classList.add(classNames.matched);\n    secondCard.classList.add(classNames.matched);\n  }\n\n  if (\n    document.querySelectorAll(`.${classNames.matched}`).length ===\n    obj.emojis.slice(0, row * column).length\n  ) {\n    stopTimer(countFlippedCards);\n    confettiInterval = obj.confetti();\n  } else {\n    firstCard.classList.remove(classNames.flipped);\n    secondCard.classList.remove(classNames.flipped);\n  }\n}\n\nfunction appendFlippedCards(box) {\n  if (box.classList.contains(classNames.matched)) return [null, null];\n  box.classList.add(classNames.flipped);\n\n  const flippedCards = document.querySelectorAll(`.${classNames.flipped}`);\n  const firstCard = flippedCards[0];\n  const secondCard = flippedCards[1];\n\n  return [firstCard, secondCard];\n}\n\nfunction gridDisplay(row, column) {\n  document.querySelector(\n    `.${classNames.grid}`\n  ).style.gridTemplateColumns = `repeat(${column}, 1fr)`;\n  document.querySelector(\n    `.${classNames.grid}`\n  ).style.gridTemplateRows = `repeat(${row}, 1fr)`;\n\n  document.getElementById(idNames.gridSizeRow).value = row;\n  document.getElementById(idNames.gridSizeColumn).value = column;\n  document.getElementById(idNames.numOfFlips).innerHTML = 0;\n}\n\nfunction setUpGame(row = 4, column = 4) {\n  let countFlippedCards = 0;\n  const randomizedEmojis = shuffleEmojis(obj.emojis.slice(0, row * column));\n  let isComparing = false;\n  let isFirstClick = true;\n\n  gridDisplay(row, column);\n\n  for (let i = 0; i < randomizedEmojis.length; i++) {\n    let box = document.createElement(\"div\");\n    box.className = classNames.card;\n    box.innerHTML = randomizedEmojis[i];\n\n    box.addEventListener(\"click\", () => {\n      if (\n        isComparing ||\n        box.classList.contains(classNames.flipped) ||\n        box.classList.contains(classNames.matched)\n      )\n        return;\n\n      if (isFirstClick) {\n        startTimer();\n        isFirstClick = false;\n      }\n\n      countFlippedCards++;\n      document.getElementById(idNames.numOfFlips).innerHTML = countFlippedCards;\n\n      const [firstCard, secondCard] = appendFlippedCards(box);\n\n      if (firstCard && secondCard) {\n        isComparing = true;\n      }\n\n      setTimeout(() => {\n        if (firstCard && secondCard) {\n          checkForMatch(firstCard, secondCard, countFlippedCards, row, column);\n          isComparing = false;\n        }\n      }, 1500);\n    });\n\n    document.querySelector(`.${classNames.grid}`).appendChild(box);\n  }\n}\n\nfunction setGridSize() {\n  let row = document.getElementById(idNames.gridSizeRow).value || 4;\n  let column = document.getElementById(idNames.gridSizeColumn).value || 4;\n\n  if (row < 2 || column < 2 || row > 4 || column > 4) {\n    alert(\"Minimum grid should be 2x2 and Maximum grid should be 4x4\");\n    [row, column] = [4, 4];\n\n    document.getElementById(idNames.gridSizeRow).value = row;\n    document.getElementById(idNames.gridSizeColumn).value = column;\n  } else if (row == 3 && column == 3) {\n    alert(\n      \"Grid size cannot be 3x3. Select a grid with an even number of cards\"\n    );\n    [row, column] = [3, 4];\n\n    document.getElementById(idNames.gridSizeRow).value = row;\n    document.getElementById(idNames.gridSizeColumn).value = column;\n  }\n\n  setUpGame(row, column);\n}\n\ndocument.getElementById(idNames.resetButton).addEventListener(\"click\", () => {\n  restartGame();\n  setUpGame();\n});\n\ndocument.getElementById(idNames.restartButton).addEventListener(\"click\", () => {\n  restartGame();\n  setGridSize();\n});\n\ndocument.getElementById(idNames.start).addEventListener(\"click\", () => {\n  restartGame();\n  setGridSize();\n});\n\nsetGridSize();\n\nmodule.exports = { setUpGame, setGridSize, restartGame };\n\n\n//# sourceURL=webpack://tshegofatso-kgokong-222-memory-game-in-vanilla-js-javascript/./src/memory_game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/memory_game.js");
/******/ 	
/******/ })()
;