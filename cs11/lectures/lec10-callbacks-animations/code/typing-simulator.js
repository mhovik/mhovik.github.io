"use strict";
// Part 1: Implement start feature
// - clear input/output
// - clear timer
// Part 2: Change Start to start/stop
// Part 3: Implement reset feature (try on your own!)

(function() {
  window.addEventListener("load", init);

  function init() {
    id("animate-btn").addEventListener("click", animateText);
    id("reset-btn").addEventListener("click", reset);
  }

  /**
   * Toggles typing animation - if animation is already in progress,
   * pauses it. Otherwise, starts animation.
   */
  function animateText() {
    // Part 1: Implement start feature: Add the character at index 0 to output,
    // and at each tick update index and keep adding the next character

    // Part 2: Change Start to start/stop - what should happen
    // when we pause animation? Restart at index 0 or keep the current index?
  }

  // Part 3: Implement reset: Clear the text, output, and timer.
  function reset() {

  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

})();
