// Activity: How would we break this UI down into functions?
"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    // (Given) When [#answer-btn] is clicked, call [showAnswer]
    id("answer-btn").addEventListener("click", showAnswer);
    // When the #start-btn is clicked, fillJar should be called.
    id("start-btn").addEventListener("click", fillJar);
  }

  // Shows the number of green skittles on the page in a paragraph under the jar.
  // This is just to make sure we can get familiar with accessing DOM elements with querySelectorAll
  // and using classList to add/remove classes (like the .hidden class)
  function showAnswer() {
    // 1. Write the statement to get all green skittles
    let greenSkittles = document.querySelectorAll(".green.skittle");
    // 2. Update textContent of #count to include length of green skittles collection from 1.
    id("count").textCount = greenSkittles.length;
    // 3. Show p tag.
    qs("p").classList.remove("hidden");
  }

  // When [] is clicked, this function should be called to fill the jar on the page.
  function fillJar() {
    // This function should:
    // 1. hide []
    // 2. show []
    // 3. Add 12 green skittles to the [] element.
  }

  // Part 5: Get a random color for a skittle (we'll add more colors soon!)
  function getRandomColor() {
    let COLORS = ["red", "green", "blue"];
    // 5.1. Get a random integer number using length of COLORS. Hint: Use Math.random() to get a number between [0, 1).

    // 5.2 Return a string at the random index of COLORS
  }

  /* ------------------------------ Provided Helper Functions ------------------------------ */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
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
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
