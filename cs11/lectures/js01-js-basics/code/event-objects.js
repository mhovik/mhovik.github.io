/*
 * Author: Melissa Hovik
 * CS 11 JS Winter 2021
 * DOM and Event Listener Example
 * Example of adding different types of event listeners and removing an event listener.
 * Note that this program isn't completely documented with JSDoc!
 */
"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    id("demo-btn").addEventListener("click", logClickData);
  }

  /**
   * Logs information about the click event.
   * @param {*} evt 
   */
  function logClickData(evt) {
    console.log("Button clicked!");
    console.log(evt.type); // "click"
    console.log(evt.currentTarget); // "#demo-btn"
    console.log(evt.timestamp); // timestamp the event was created (in milliseconds)
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
