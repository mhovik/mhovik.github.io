/**
 * A program to implement the Skittles Game (V1) where a user
 * can try to guess how many Skittles of a certain color are in a jar,
 * and can see results of incorrect/correct guesses.
 *
 * 1. Implement view switching functions
 * 2. Finish getRandomColor()
 *    - Get new random game color based on the checked radio button value
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
   * Sets up the initial event listeners for the Start, Restart, and Guess buttons.
   */
  function initialize() {
    // Start button: Hide setup view, show game view, start a game with a new color
    // Guess button: Calculate whether a user's guess count is correct
    // (Later) Reset button: Stop game, hide game view, show setup view
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
  }

  /**
   * Adds a Skittle (div) element with a random color (based on number of colors
   * considered in current game) to the #jar.
   */
  function addSkittle() {
    // TODO: Create a skittle div with a random color class
    // TODO: Add to the jar!
  }

  /**
   * (Provided): Removes all Skittles from the Jar.
   */
  function clearJar() {
    // Three ways to remove children:
    // Way 1: parentNode.removeChild(child)
    // Way 2: childNode.remove()
    // Way 3: parentNode.innerHTML = "";
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
    
    // fillJar

    // Switch views when game is started
    // gameView();
  }

  /**
   * Ends the game, display a result message.
   */
  function endGame() {
    // TODO: What do we neeed to clear? Provide a result message: "You won! Nice work :)"
  }

  /**
   * Stops the game, switching back to menu view.
   */
  function resetGame() {
    // reset guess count to 0 for later games
    // clear input box
    // clear game color and results text
    // Go back to setupView
    setupView();
  }

  /* ----------------------- User-Guessing Functions --------------------- */

  /**
   * Processes a guessed Skittle count from the user. If input is negative,
   * diplays a message saying so. Otherwise if the guess was incorrect, displays a
   * message saying whether the guess was high/low. Otherwise the user wins!
   */
  function makeGuess() {

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