/**
 * Solution code for Skittles V2: Timers
 */
"use strict";
  let seconds = 0;
(function() {
  // the Skittle colors available for the game
  const COLORS = ["red", "green", "blue", "purple", "pikachuyellow", "gray"];
  const MAX_SKITTLES = 50;
  let timer = null;

  window.addEventListener("load", init);

  /**
   * Sets up the button event listeners to start and reset a Skittles game.
   * There are two "views" which are toggled depending on the button clicked.
   * When the start button is clicked:
   * - the game view is shown and the game setup view is hidden. A new jar is filled.
   * When the reset button is clicked:
   * - the game view is hidden and the game-setup is shown. The jar is cleared.
   */
  function init() {
    id("start-btn").addEventListener("click", startGame);
    id("reset-btn").addEventListener("click", backToMain);
    id("guess-btn").addEventListener("click", makeGuess);
  }

  /**
   * Starts a game, filling the jar with skittles and switching from the setup view to "game view".
   */
  function startGame() {
    let newGameColor = getRandomColor();
    id("color").textContent = newGameColor + " ";
    // use className as the string class attribute when we want to clear the old classes.
    id("color").className = newGameColor;

    fillJar();
    changeViews();
    timer = setInterval(() => {
      seconds++;
    }, 1000);

  }

  /**
   * Resets a game, showing the main menu (setup view) and clearing the jar.
   */
  function backToMain() {
    resetGame();
    changeViews();
  }

  /**
   * Fills the jar with between 1 and 50 (inclusive) randomly-colored skittles.
   */
  function fillJar() {
    // Math.ceil always rounds up, so we get a value in the inclusive range [1, 50]
    let skittleCount = Math.ceil(Math.random() * MAX_SKITTLES);
    for (let i = 0; i < skittleCount; i++) {
      let skittle = gen("div"); // gen is another good shorthand function!
      skittle.classList.add("skittle");
      skittle.classList.add(getRandomColor());
      skittle.addEventListener("dblclick", eatSkittle);
      id("jar").appendChild(skittle);
    }
  }

  /**
   * Removes the clicked skittles from the jar, demonstrating removeChild.
   */
  function eatSkittle() {
    this.parentNode.removeChild(this);
  }

  /**
   * Removes all skittles from the jar, demonstrating removing all elements from a parent.
   */
  function clearJar() {
    id("jar").innerHTML = "";
  }

  /**
   * Returns a random color string from the COLORS array. For now, we consider all colors, but we will
   * uses the radio buttons to limit the number of colors in a game (2, 4, or 6).
   */
  function getRandomColor() {
    // value is "2", "4", or "6"
    let colorCount = parseInt(qs("input[name='color-count']:checked").value);
    let randomIndex = Math.floor(Math.random() * colorCount);
    return COLORS[randomIndex];
  }

  /**
   * Check whether the user has guessed correctly, updating the guess count and message.
   * Disable the #guess-btn if correct (game is over).
   */
  function makeGuess() {
    // Need to also check that the input guess is non-empty.
    if (!id("guess").value) {
      id("results").textContent = "Please enter a number to guess.";
    } else if (checkGuess()) { // correct case
      id("results").textContent = "You guessed correctly in " + seconds + " seconds!";
      id("guess-btn").disabled = true;
      id("guess").disabled = true;
      clearInterval(timer);
      timer = null;
      seconds = 0;
    } else { // incorrect case
      // How could we provide a better hint?
      id("results").textContent = "Not quite. Try again!";
      id("guess").value = ""; // clear guess input
      id("guess-count").innerText = parseInt(id("guess-count").innerText) + 1;
    }
  }

  /**
   * Returns true if the user has guessed the correct number of green skittles,
   * otherwise false.
   * @returns {boolean} true if the user has made a correect guess for the number
   * of skittles having the current game color (as defined by the #color span in the heading).
   */
  function checkGuess() {
    // the input value is a string (e.g. "4") so need to parseInt
    let guessValue = parseInt(id("guess").value);
    let gameColor = id("color").textContent.trim();
    return guessValue === qsa(".skittle." + gameColor).length;
  }

  /**
   * A new function to clear all of the inputs from an old game and re-enable any
   * disabled elements.
   */
  function resetGame() {
    // re-enable #guess-btn and #guess inputs for future games
    id("guess-btn").disabled = false;
    id("guess").disabled = false;

    // clear old guesses and results
    id("guess-count").textContent = 0;
    id("results").textContent = "";
    id("guess").value = "";

    clearJar();
  }

  /**
   * Hides the current view and shows the hidden view to switch between setup and game mode.
   */
  function changeViews() {
    id("game-setup").classList.toggle("hidden");
    id("game-play").classList.toggle("hidden");
  }

  /**
   * Removes a clicked skittle from the Jar, breaking all the rules :(
   */
  function eatSkittle() {
    this.parentNode.removeChild(this);
    id("results").textContent = "You ate a Skittle... :O";
  }

  /** ------------------------------ Helper Shorthand Functions ------------------------------ */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tagname.
   * @param {string} tagName - name of element to create and return.
   * @returns {object} new DOM element with the given tagname.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
