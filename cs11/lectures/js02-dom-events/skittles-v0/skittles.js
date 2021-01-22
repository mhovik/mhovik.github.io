/**
 * CSE 154 | Spring 2019
 * Melissa Hovik
 *
 * A program to implement the Skittles Game (V1) where a user
 * can try to guess how many Skittles of a certain color are in a jar,
 * and can see results of incorrect/correct guesses.
 *
 * 1. Implement view switching functions: gameView() and setupView()
 * 2. Finish getRandomColor()
 *    - Get new randon game color based on the checked radio button value
 *
 * Extra practice (appending/removing from the DOM) on your own:
 *    - Try to finish all of the TODOs for more practice to meet the expected behavior of the
 *      demo video!
 */
(function() {
  "use strict";

  const MAX_SKITTLES = 154;
  const COLORS = ["red", "green", "blue", "gray", "purple", "pikachuyellow"];

  window.addEventListener("load", initialize);

  /**
   * Sets up the initial event listeners for the Start, Restart, and Guess buttons.
   */
  function initialize() {
    // Start button: Hide setup view, show game view, start a game with a new color
    id("start-btn").addEventListener("click", startGame);

    // Guess button: Calculate whether a user's guess count is correct
    id("guess-btn").addEventListener("click", makeGuess);

    // Reset button: Stop game, hide game view, show setup view
    id("reset-btn").addEventListener("click", resetGame);
  }

  /* ----------------------- View-Switching Functions --------------------- */
  /**
   * Hides Main Menu View (#setup-view) and shows Game UI (#game-view).
   */
  function gameView() {
    // TODO: How do we hide/show the views?
    // Hint: Use the .hidden class!
  }

  /**
   * Hides Game UI and shows Main Menu View.
   */
  function setupView() {
    // TODO: How do we hide/show the views?
    // Hint: Use the .hidden class!
  }

  /* ----------------------- Skittle-Adding Functions --------------------- */
  /**
   * Returns a random color from COLORS based on the bounds of the
   * number of colors currently selected by the user.
   * @returns {string} - random color name
   */
  function getRandomColor() {
    let colorCount = qs("input[name='color-count']:checked").value;
    // TODO: How do we get a random value from the COLORS array?

    // Remember: We only want at most colorCount colors in the Jar!
    // Hint: Math.random() returns a value from 0 to 1
  }

  /**
   * Selects a random color for the current game and fills jar with Skittles.
   */
  function fillJar() {
    // fill the jar with a random number of skittles!
    let skittleCount = Math.ceil(Math.random() * MAX_SKITTLES);
    for (let i = 0; i < skittleCount; i++) {
      addSkittle();
    }
  }

  /**
   * Adds a Skittle (div) element with a random color (based on number of colors
   * considered in current game) to the #jar.
   */
  function addSkittle() {
    let skittle = document.createElement("div");
    skittle.classList.add("skittle");
    let randomColor = getRandomColor();
    skittle.classList.add(randomColor);
    // TODO: Add to the jar!
  }

  /**
   * (Provided): Removes all Skittles from the Jar.
   */
  function clearJar() {
    // Recall three ways to remove children:
    // Way 1: parentNode.removeChild(child)
    // Way 2: childNode.remove()
    // Way 3: parentNode.innerHTML = "";
    let skittles = qsa(".skittle");
    for (let i = 0; i < skittles.length; i++) {
      skittles[i].remove();
      // can alternatively use:
      // skittles[i].parentNode.removeChild(skittles[i]);
    }
  }

  /* ----------------------- Start/End Game Functions --------------------- */
  /**
   * Starts the game, switching to game view and populating the Skittles jar.
   */
  function startGame() {
    // TODO: Update the color #span to have:
    // - a class name of a randomly-chosen color
    // - updated text with the color
    let gameColor = getRandomColor();
    
    fillJar();

    // Switch views when game is started
    gameView();
  }

  /**
   * (Provided): Ends the game, display a result message.
   */
  function endGame() {
    id("guess").value = "";
    id("color").textContent = "";
    id("results").innerText = "You won! Nice work :)";
  }

  /**
   * (Provided): Stops the game, switching back to menu view.
   */
  function resetGame() {
    // reset guess count to 0 for later games
    id("guess-count").innerText = 0;

    // clear input box
    id("guess").value = "";

    // clear game color and results text
    id("color").innerText = "";
    id("results").innerText = "";

    setupView();
  }

  /* ----------------------- User-Guessing Functions --------------------- */

  /**
   * (Provided): Processes a guessed Skittle count from the user. If input is negative,
   * diplays a message saying so. Otherwise if the guess was incorrect, displays a
   * message saying whether the guess was high/low. Otherwise the user wins!
   */
  function makeGuess() {
    let guessValue = parseInt(id("guess").value);
    if (guessValue < 0) {
      id("results").innerText = "You must enter a non-zero guess!";
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
        id("results").innerText = resultMsg;
      }
    }
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
