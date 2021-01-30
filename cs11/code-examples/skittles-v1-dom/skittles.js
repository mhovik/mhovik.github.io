/**
  * Author: Melissa Hovik
  * CS 11 - JS
  * Skittles V1: DOM Manipulation
  * SOLUTION
  * A program to implement the Skittles Game (V1) where a user
  * can try to guess how many Skittles of a certain color are in a jar,
  * and can see results of incorrect/correct guesses.
  *
  * 1. Implement view switching functions
  * 2. Finish getRandomColor()
  *    - Get new randon game color based on the checked radio button value
  * 3. Finish fillJar()
  *    - Add skittles to the jar using random colors
  * 4. Finish clearJar()
  *    - When a user guesses correctly, end the game and clear the jar:
  * 5. When a skittle is double-clicked, remove it.
  */
(function() {
  "use strict";

  const MAX_SKITTLES = 154;
  const COLORS = ["red", "green", "blue", "gray", "purple", "pikachuyellow"];

  window.addEventListener("load", initialize);

  /**
   * Sets up the response functionality for the Start and
   * Guess buttons.
   */
  function initialize() {
    // Start button: Hide setup view, show game view, start a game with a new color
    id("start-btn").addEventListener("click", startGame);

    // Guess button: Calculate whether a user's guess count is correct
    id("guess-btn").addEventListener("click", makeGuess);

    // Reset button: Stop game, hide game view, show setup view
    id("reset-btn").addEventListener("click", resetGame);
  }

  /**
   * Starts the game, switching the game view and populating the Skittles
   * jar.
   */
  function startGame() {
    gameView();
    fillJar();
  }

  /**
   * Hides Game Setup with color count options/new game button and shows Game UI.
   */
  function gameView() {
    // Step 1: Implement view toggling
    id("game-view").classList.remove("hidden");
    id("menu-view").classList.add("hidden");
    id("results").textContent = "";
  }

  /**
   * Hides Game UI and shows Game Setup with color count options/start button.
   */
  function setupView() {
    id("game-view").classList.add("hidden");
    id("menu-view").classList.remove("hidden");
  }

  function resetGame() {
    // reset guess count to 0 for later games
    id("guess-count").textContent = 0;

    // clear the input box
    id("guess").value = "";
    // clear game color and results text
    id("color").textContent = "";
    id("results").textContent = "";
    clearJar();
    setupView();
  }

  /**
   * Selects a random color for the current game and fills jar with Skittles.
   */
  function fillJar() {
    // randomly select the game color
    let gameColor = getRandomColor();
    id("color").textContent = gameColor + " ";
    id("color").className = gameColor;

    let skittleCount = Math.ceil(Math.random() * MAX_SKITTLES);
    for (let i = 0; i < skittleCount; i++) {
      addSkittle();
    }
  }

  /**
   * Removes all Skittles from the #jar.
   */
  function clearJar() {
    let skittles = qsa(".skittle");
    for (let i = 0; i < skittles.length; i++) {
      skittles[i].remove();
      // can alternatively use:
      // skittles[i].parentNode.removeChid(skittles[i]);
    }
  }

  /**
   * Adds a Skittle elemet with a random color (based on number of colors
   * considered in current game) and adds it to the #jar.
   */
  function addSkittle() {
    let skittle = document.createElement("div");
    skittle.classList.add("skittle");
    let randomColor = getRandomColor();
    skittle.classList.add(randomColor);
    // extra feature: dblclick to remove a skittle!
    skittle.addEventListener("dblclick", eatSkittle);
    id("jar").appendChild(skittle);
  }

  /**
   * Ends the game, display a result message.
   */
  function endGame() {
    id("guess").value = "";
    id("results").textContent = "You won! Nice work :)";
  }

  /**
   * Processes a guessed Skittle count from the user. If input is negative,
   * diplays a temporary message saying so. Otherwise if the guess
   * was incorrect, displays a temporary message saying whether the guess
   * was high/low. Otherwise the user wins and a result message is shown
   * with how long it took them to guess correctly and the New Game button
   * is displayed.
   */
  function makeGuess() {
    let guessValue = parseInt(id("guess").value);
    if (guessValue < 0) {
      id("results").textContent = "You must enter a non-zero guess!";
    } else if (guessValue >= 0) { // make sure not undefined
      let correctCount = qsa(".skittle." + id("color").className).length;
      if (guessValue === correctCount) {
        endGame();
      } else {
        let resultMsg = "Not quite! (hint: your guess is a bit ";
        if (guessValue <= correctCount) {
          resultMsg += "low)";
        } else {
          resultMsg += "high)";
        }
        id("guess-count").textContent = parseInt(id("guess-count").textContent) + 1;
        id("results").textContent = resultMsg;
      }
    }
  }

  /**
   * Returns a random color from COLORS based on the bounds of the
   * number of colors currently selected by the user.
   * @returns {string} - random color name
   */
  function getRandomColor() {
    let colorCount = qs("input[name='color-count']:checked").value;
    return COLORS[parseInt(Math.random() * colorCount)];
  }

  /**
   * Removes a skittle from the jar and displays a result message.
   */
  function eatSkittle() {
    this.remove();
    id("results").textContent = ":O you ate a Skittle...";
  }

  /* ------------------------------ Helper Functions ------------------------------ */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
