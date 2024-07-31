const obj = {
  confetti: () => {
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 500);

    return interval;
  },

  emojis: [
    "😎",
    "😎",
    "🥶",
    "🥶",
    "🤯",
    "🤯",
    "😇",
    "😇",
    "🥳",
    "🥳",
    "😤",
    "😤",
    "🧐",
    "🧐",
    "🥰",
    "🥰",
  ],

  message: (minNum, minutes, secNum, seconds, countFlippedCards) => {
    return `Congratulations! You completed the game in ${minNum} ${minutes} and ${secNum} ${seconds} and It took you ${countFlippedCards} flips.`;
  },
};

const classNames = {
  card: "card",
  flipped: "flipped",
  matched: "matched",
  grid: "grid",
  timer: "timer",
  reset: "reset",
  overlay: "overlay",
  gridSize: "grid-size",
  gridSizeLabel: "grid-size-label",
  start: "start-button",
  inputGroup: "input-group",
};

const idNames = {
  minutes: "minutes",
  seconds: "seconds",
  restartButton: "restart-button",
  resetButton: "reset",
  message: "message",
  overlayMessage: "overlay-message",
  gridSize: "grid-size",
  gridSizeRow: "grid-size-row",
  gridSizeColumn: "grid-size-column",
  start: "start",
  numOfFlips: "numOfFlips",
};

const strNames = {
  minute: "minute",
  second: "second",
  blurred: "blurred",
};

module.exports = { classNames, obj, idNames, strNames };
