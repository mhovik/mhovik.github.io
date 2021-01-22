/**
 * CSE 154 | Spring 2019
 * Melissa Hovik
 *
 * 1. Implement view switching functions: gameView() and setupView()
 * 2. Finish getRandomColor()
 *    - Get new random game color based on the checked radio button value
 *
 * Extra practice (appending/removing from the DOM) on your own:
 *    - Try to finish all of the TODOs for more practice to meet the expected behavior of the
 *      demo video!
 */
(function() {
  "use strict";

  window.addEventListener("load", init);

  /**
   * Sets up the initial event listeners for the Start, Restart, and Guess buttons.
   */
  function init() {
  }

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
