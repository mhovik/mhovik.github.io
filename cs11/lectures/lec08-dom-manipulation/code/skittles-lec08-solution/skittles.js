/**
 * Solution Code for Lecture 8
 * Note that we haven't yet implemented the game! We've used this version to test adding a skittle
 * to the jar each time #start-btn is clicked, but we'll eventually want to fill the whole jar with
 * a bunch of skittles, not just one, and hide/show the two views to start/restart a game.
 *
 * Disclaimer: This file is not yet complete (it does not have JSDoc comments for example) to help
 * be consistent with the different parts for the Lecture 8 Pre-Check.
 */
"use strict";
(function() {
  // 1.1. Setting up the window load event listener to call init when page is loaded
  window.addEventListener("load", init);

  function init() {
    id("answer-btn").addEventListener("click", showAnswer);
    // 2.1. When #start-btn is clicked, fillJar should be called.
    id("start-btn").addEventListener("click", fillJar);
  }

  function showAnswer() {
    // 3.1. Write the statement to get all green skittles
    let greenSkittles = qsa(".green.skittle").length;

    // 3.2. Update textContent of #count to include length of green skittles collection.
    id("count").textContent = greenSkittles;

    // 3.3. Show p tag.
    qs("#game-play p").classList.remove("hidden");
  }

  // Part 4: Planning out the populating of skittles in the jar (we'd eventually like
  //         to fill the jar automatically when the page is loaded!).
  function fillJar() {
    // Create and add one "test" skittle (a div element with the classes ".skittle" and ".green")

    // 4.1. Use document.createElement to create a new div
    let skittle = document.createElement("div");
    // 4.2. Use classList to add classes to a new div
    skittle.classList.add("skittle");
    skittle.classList.add("green");
    // V2: Make a randomly-colored skittle!
    // let randomColor = getRandomColor();
    // skittle.classList.add(randomColor);

    // 4.3. Use parentEl.appendChild(childEl) to add the new skittle div to the jar
    id("jar").appendChild(skittle);
  }

  // Part 5: Get a random color for a skittle (we'll add more colors soon!)
  function getRandomColor() {
    // Note: This constant should be a program constant at the top of module pattern.
    const COLORS = ["red", "green", "blue"];
    let randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
  }

  /* ------------------------------ Provided Shorthand Functions ------------------------------ */
  // Note: These are the three provided shorthand functions shown in lecture/section. You may use these
  // in your own JS, but these are the only functions you are allowed to use in your own work as an
  // exception to the course Academic Conduct policy. These are also useful examples of JSDoc comments!
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

})();
