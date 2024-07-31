const { shuffleEmojis } = require("../src/helper_function");
const { setGridSize } = require("../src/memory_game");
const { classNames, obj, idNames, strNames } = require("../src/helper_object");
const { mockObj } = require("./helpers/mock_helper_object");

const grid = document.querySelector(".grid");

describe("Memory Game", () => {
  beforeEach(function () {
    grid.innerHTML = "";
    document.getElementById(idNames.gridSizeRow).value = "4";
    document.getElementById(idNames.gridSizeColumn).value = "4";
    document.getElementById(idNames.minutes).innerHTML = "0";
    document.getElementById(idNames.seconds).innerHTML = "0";
    jasmine.clock().install();
    setGridSize();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it("should randomize the emojis", () => {
    const currentEmojis = [...obj.emojis];
    const randomizedEmojis = shuffleEmojis([...obj.emojis]);
    expect(randomizedEmojis).not.toEqual(currentEmojis);
  });

  it("should have the same emojis as the sorted emojis", () => {
    const randomizedEmojis = shuffleEmojis(obj.emojis);
    expect(randomizedEmojis.sort()).toEqual([...obj.emojis].sort());
  });

  it("should initially display 16 cards", () => {
    const cards = document.querySelectorAll(`.${classNames.card}`);
    expect(cards.length).toBe(16);
  });

  it("should be able to change the grid size", () => {
    const gridLength = document.querySelectorAll(`.${classNames.card}`).length;
    expect(gridLength).toBe(16);

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    const cards = document.querySelectorAll(`.${classNames.card}`);
    expect(cards.length).toBe(4);
  });

  it("should restart timer when the grid size is changed", () => {
    const baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    document.querySelectorAll(`.${classNames.card}`)[0].click();
    jasmine.clock().tick(3000);

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("3");

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("0");
  });

  it("should initially have all cards hidden", () => {
    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards.forEach((card) => {
      expect(card.classList.contains(classNames.flipped)).toBe(false);
      expect(card.classList.contains(classNames.matched)).toBe(false);
    });
  });

  it("should not flip more than 2 cards at a time", () => {
    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].click();
    cards[1].click();
    cards[2].click();

    expect(cards[0].classList.contains(classNames.flipped)).toBe(true);
    expect(cards[1].classList.contains(classNames.flipped)).toBe(true);
    expect(cards[2].classList.contains(classNames.flipped)).toBe(false);
  });

  it("should add flipped class on the clicked card", () => {
    const cards = document.querySelectorAll(`.${classNames.card}`);

    cards[0].click();
    expect(cards[0].classList.contains(classNames.flipped)).toBe(true);

    cards[1].click();
    expect(cards[1].classList.contains(classNames.flipped)).toBe(true);
  });

  it("should start timer on first click", () => {
    const baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].click();

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("0");

    jasmine.clock().tick(1000);

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("1");

    jasmine.clock().tick(1000);

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("2");
  });

  it("should remove flipped class if cards don't match", () => {
    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = obj.emojis.sort()[0];
    cards[1].innerHTML = obj.emojis.sort()[2];

    cards[0].click();
    cards[1].click();

    jasmine.clock().tick(1500);
    expect(cards[0].classList.contains(classNames.flipped)).toBe(false);
    expect(cards[1].classList.contains(classNames.flipped)).toBe(false);
  });

  it("should add matched class if cards match", () => {
    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = obj.emojis.sort()[0];
    cards[1].innerHTML = obj.emojis.sort()[1];

    cards[0].click();
    cards[1].click();

    jasmine.clock().tick(1500);

    expect(cards[0].classList.contains(classNames.matched)).toBe(true);
    expect(cards[1].classList.contains(classNames.matched)).toBe(true);
  });

  it("should display the number of flips on results message when it took 4 flips to complete the game", () => {
    spyOn(obj, "confetti");

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = mockObj.mockEmojis[0];
    cards[1].innerHTML = mockObj.mockEmojis[1];
    cards[2].innerHTML = mockObj.mockEmojis[2];
    cards[3].innerHTML = mockObj.mockEmojis[3];

    cards[0].click();
    cards[1].click();
    jasmine.clock().tick(1500);

    cards[2].click();
    cards[3].click();
    jasmine.clock().tick(3500);

    expect(document.getElementById(idNames.overlayMessage).innerHTML).toContain(
      "4 flips"
    );
  });

  it("should call confettiThrower when all cards match", () => {
    spyOn(obj, "confetti");

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = mockObj.mockEmojis[0];
    cards[1].innerHTML = mockObj.mockEmojis[1];
    cards[2].innerHTML = mockObj.mockEmojis[2];
    cards[3].innerHTML = mockObj.mockEmojis[3];

    cards[0].click();
    cards[1].click();
    jasmine.clock().tick(1500);

    cards[2].click();
    cards[3].click();
    jasmine.clock().tick(1500);

    expect(obj.confetti).toHaveBeenCalled();
  });

  it("should display message after timer ends", () => {
    const baseTime = new Date();
    jasmine.clock().mockDate(baseTime);
    spyOn(obj, "confetti");

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = mockObj.mockEmojis[0];
    cards[1].innerHTML = mockObj.mockEmojis[1];
    cards[2].innerHTML = mockObj.mockEmojis[2];
    cards[3].innerHTML = mockObj.mockEmojis[3];

    cards[0].click();
    cards[1].click();
    jasmine.clock().tick(1500);

    cards[2].click();
    jasmine.clock().tick(90000);

    cards[3].click();
    jasmine.clock().tick(1500);

    expect(document.getElementById(idNames.overlayMessage).innerHTML).toBe(
      obj.message("1", strNames.minute, "32", `${strNames.second}s`, "4")
    );
  });

  it("should restart game and reset timer when restart button is clicked", () => {
    const baseTime = new Date();
    jasmine.clock().mockDate(baseTime);
    spyOn(obj, "confetti");

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = mockObj.mockEmojis[0];
    cards[1].innerHTML = mockObj.mockEmojis[1];
    cards[2].innerHTML = mockObj.mockEmojis[2];
    cards[3].innerHTML = mockObj.mockEmojis[3];

    cards[0].click();
    cards[1].click();
    jasmine.clock().tick(91000);

    cards[2].click();
    cards[3].click();
    jasmine.clock().tick(1500);

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("1");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("32");

    document.getElementById(idNames.restartButton).click();

    document.querySelectorAll(`.${classNames.card}`).forEach((card) => {
      expect(card.classList.contains(classNames.matched)).toBe(false);
      expect(card.classList.contains(classNames.flipped)).toBe(false);
    });

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("0");
  });

  it("should restart game and reset timer when reset button is clicked", () => {
    const baseTime = new Date();
    jasmine.clock().mockDate(baseTime);
    spyOn(obj, "confetti");

    document.getElementById(idNames.gridSizeRow).value = "2";
    document.getElementById(idNames.gridSizeColumn).value = "2";
    document.getElementById(idNames.start).click();

    const cards = document.querySelectorAll(`.${classNames.card}`);
    cards[0].innerHTML = mockObj.mockEmojis[0];
    cards[1].innerHTML = mockObj.mockEmojis[1];
    cards[2].innerHTML = mockObj.mockEmojis[2];
    cards[3].innerHTML = mockObj.mockEmojis[3];

    cards[0].click();
    cards[1].click();
    jasmine.clock().tick(61000);

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("1");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("1");

    document.getElementById(idNames.resetButton).click();

    document.querySelectorAll(`.${classNames.card}`).forEach((card) => {
      expect(card.classList.contains(classNames.matched)).toBe(false);
      expect(card.classList.contains(classNames.flipped)).toBe(false);
    });

    expect(document.getElementById(idNames.minutes).innerHTML).toBe("0");
    expect(document.getElementById(idNames.seconds).innerHTML).toBe("0");
  });
});
