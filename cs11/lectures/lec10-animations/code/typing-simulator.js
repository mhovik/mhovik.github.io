"use strict";
// Part 1: Implement start feature
// Part 2: Implement reset feature
// - clear input/output
// - clear timer
// Part 3: Change Start to start/stop

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
    // Part 1: Implement start feature
    // Part 3: Change Start to start/stop
    let inputText = id("input-text").value;
    for (let i = 0; i < inputText.length; i++) {
      nextCharacter();
    }
  }

  /**
   * Resets the animation feature, clearing the input and output areas
   * and clearing the timer.
   *
   * Part 2: Implement reset feature
   * - clear input/output
   * - clear timer
   */
  function reset() {

  }

  /**
   * Appends next character in input text to output.
   */
  function nextCharacter() {
    let inputText = id("input-text").value;
    if (index >= inputText.length) {
      index = 0;
    }
    id("output").textContent += inputText[index];
    index++;
  }


  function id(idName) {
    return document.getElementById(idName);
  }

})();
