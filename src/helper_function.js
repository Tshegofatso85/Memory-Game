const { classNames, obj, idNames, strNames } = require("./helper_object");

function shuffleEmojis(emojis) {
  return emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
}

let timerInterval;

function startTimer() {
  const startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById(idNames.minutes).textContent = minutes;
    document.getElementById(idNames.seconds).textContent = seconds;
  }, 1000);
}

function oneSecondMessage(minutes, countFlippedCards) {
  return obj.message(
    minutes,
    idNames.minutes,
    "1",
    strNames.second,
    countFlippedCards
  );
}

function oneMinuteMessage(seconds, countFlippedCards) {
  return obj.message(
    "1",
    strNames.minute,
    seconds,
    idNames.seconds,
    countFlippedCards
  );
}

function oneMinuteAndOneSecondMessage(countFlippedCards) {
  return obj.message(
    "1",
    strNames.minute,
    "1",
    strNames.second,
    countFlippedCards
  );
}

function stopTimer(countFlippedCards) {
  clearInterval(timerInterval);
  const minutes = document.getElementById(idNames.minutes).textContent;
  const seconds = document.getElementById(idNames.seconds).textContent;
  const messageContainer = document.getElementById(idNames.overlayMessage);

  if (Number(minutes) === 1 && Number(seconds) === 1) {
    messageContainer.textContent =
      oneMinuteAndOneSecondMessage(countFlippedCards);
  } else if (Number(minutes) === 1) {
    messageContainer.textContent = oneMinuteMessage(seconds, countFlippedCards);
  } else if (Number(seconds) === 1) {
    messageContainer.textContent = oneSecondMessage(minutes, countFlippedCards);
  } else {
    messageContainer.textContent = obj.message(
      minutes,
      idNames.minutes,
      seconds,
      idNames.seconds,
      countFlippedCards
    );
  }

  document.getElementById(classNames.overlay).style.display = "flex";

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
    document.querySelector(`.${className}`).classList.add(strNames.blurred);
  });
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById(idNames.minutes).textContent = "0";
  document.getElementById(idNames.seconds).textContent = "0";
}

module.exports = {
  shuffleEmojis,
  startTimer,
  stopTimer,
  resetTimer,
};
