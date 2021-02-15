/**
 * @author Melissa Hovik
 * CSE 154 Summer 2019
 * Lecture 10 - Callbacks and Timers
 * An example demonstrating setInterval/clearInterval with a little
 * text animation feature. What kind of variations can you think of?
 * Note that this solution has a bug when the text is empty! Can you find/fix it?
 */
"use strict";

(function() {
  let index = 0; // keep track of current character index
  let timerId = null;

  window.addEventListener("load", init);

  /**
   * Sets up the main event listeners to toggle a text animation when clicking the
   * animate button and allow a user to reset (clear) the animated text when
   * clicking the reset button.
   */
  function init() {
    id("animate-btn").addEventListener("click", animateText);
    id("reset-btn").addEventListener("click", reset);
  }

  /**
   * Toggles typing animation - if animation is already in progress,
   * pauses it. Otherwise,starts animation.
   */
  function animateText() {
    if (timerId === null) { // start a new timer
      // let's choose to disable the input until a user clicks reset
      id("input-text").disabled = true;
      timerId = setInterval(nextCharacter, 500);
    } else { // "pause" the animation
      clearInterval(timerId);
      timerId = null;
    }
  }

  /**
   * Resets the animation feature, clearing the input and output areas
   * and clearing the timer.
   */
  function reset() {
    clearInterval(timerId);
    timerId = null;
    index = 0;
    // Allow a user to input new text for a new animation.
    id("output").textContent = "";
    id("input-text").value = "";
    id("input-text").disabled = false;
  }

  /**
   * Appends next character in input text to output. Note there are a few
   * ways to implement this, and it's a good exercise to think about different
   * variations you could add. What if we wanted to pause on certain letters?
   * e.g. punctuation? Could you animate two paragraphs of text?
   */
  function nextCharacter() {
    let inputText = id("input-text").value;
    if (index >= inputText.length) {
      index = 0; // let's restart the loop over characters in this version.
    }
    id("output").textContent += inputText[index];
    index++;
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
