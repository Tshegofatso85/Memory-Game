const {
  shuffleEmojis,
  startTimer,
  stopTimer,
  resetTimer,
} = require("./helper_function");
const { obj, classNames, idNames, strNames } = require("./helper_object");

let confettiInterval;

function restartGame() {
  resetTimer();

  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }

  document.getElementById(classNames.overlay).style.display = "none";

  const classNamesArr = [
    classNames.overlay,
    classNames.grid,
    classNames.timer,
    classNames.reset,
    classNames.gridSize,
    classNames.gridSizeLabel,
    classNames.start,
    classNames.inputGroup,
  ];

  classNamesArr.forEach((className) => {
    document.querySelector(`.${className}`).classList.remove(strNames.blurred);
  });

  const grid = document.querySelector(`.${classNames.grid}`);

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function checkForMatch(firstCard, secondCard, countFlippedCards, row, column) {
  if (firstCard.innerHTML === secondCard.innerHTML) {
    firstCard.classList.add(classNames.matched);
    secondCard.classList.add(classNames.matched);
  }

  if (
    document.querySelectorAll(`.${classNames.matched}`).length ===
    obj.emojis.slice(0, row * column).length
  ) {
    stopTimer(countFlippedCards);
    confettiInterval = obj.confetti();
  } else {
    firstCard.classList.remove(classNames.flipped);
    secondCard.classList.remove(classNames.flipped);
  }
}

function appendFlippedCards(box) {
  if (box.classList.contains(classNames.matched)) return [null, null];
  box.classList.add(classNames.flipped);

  const flippedCards = document.querySelectorAll(`.${classNames.flipped}`);
  const firstCard = flippedCards[0];
  const secondCard = flippedCards[1];

  return [firstCard, secondCard];
}

function gridDisplay(row, column) {
  document.querySelector(
    `.${classNames.grid}`
  ).style.gridTemplateColumns = `repeat(${column}, 1fr)`;
  document.querySelector(
    `.${classNames.grid}`
  ).style.gridTemplateRows = `repeat(${row}, 1fr)`;

  document.getElementById(idNames.gridSizeRow).value = row;
  document.getElementById(idNames.gridSizeColumn).value = column;
  document.getElementById(idNames.numOfFlips).innerHTML = 0;
}

function setUpGame(row = 4, column = 4) {
  let countFlippedCards = 0;
  const randomizedEmojis = shuffleEmojis(obj.emojis.slice(0, row * column));
  let isComparing = false;
  let isFirstClick = true;

  gridDisplay(row, column);

  for (let i = 0; i < randomizedEmojis.length; i++) {
    let box = document.createElement("div");
    box.className = classNames.card;
    box.innerHTML = randomizedEmojis[i];

    box.addEventListener("click", () => {
      if (
        isComparing ||
        box.classList.contains(classNames.flipped) ||
        box.classList.contains(classNames.matched)
      )
        return;

      if (isFirstClick) {
        startTimer();
        isFirstClick = false;
      }

      countFlippedCards++;
      document.getElementById(idNames.numOfFlips).innerHTML = countFlippedCards;

      const [firstCard, secondCard] = appendFlippedCards(box);

      if (firstCard && secondCard) {
        isComparing = true;
      }

      setTimeout(() => {
        if (firstCard && secondCard) {
          checkForMatch(firstCard, secondCard, countFlippedCards, row, column);
          isComparing = false;
        }
      }, 1500);
    });

    document.querySelector(`.${classNames.grid}`).appendChild(box);
  }
}

function setGridSize() {
  let row = document.getElementById(idNames.gridSizeRow).value || 4;
  let column = document.getElementById(idNames.gridSizeColumn).value || 4;

  if (row < 2 || column < 2 || row > 4 || column > 4) {
    alert("Minimum grid should be 2x2 and Maximum grid should be 4x4");
    [row, column] = [4, 4];

    document.getElementById(idNames.gridSizeRow).value = row;
    document.getElementById(idNames.gridSizeColumn).value = column;
  } else if (row == 3 && column == 3) {
    alert(
      "Grid size cannot be 3x3. Select a grid with an even number of cards"
    );
    [row, column] = [3, 4];

    document.getElementById(idNames.gridSizeRow).value = row;
    document.getElementById(idNames.gridSizeColumn).value = column;
  }

  setUpGame(row, column);
}

document.getElementById(idNames.resetButton).addEventListener("click", () => {
  restartGame();
  setUpGame();
});

document.getElementById(idNames.restartButton).addEventListener("click", () => {
  restartGame();
  setGridSize();
});

document.getElementById(idNames.start).addEventListener("click", () => {
  restartGame();
  setGridSize();
});

setGridSize();

module.exports = { setUpGame, setGridSize, restartGame };
