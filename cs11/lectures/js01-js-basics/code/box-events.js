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
    let box = document.getElementById("box");
    box.addEventListener("mouseover", mouseOverResponse);
    box.addEventListener("dblclick", turnOffBox);
  }

  function mouseOverResponse() {
    console.log("You moved the mouse over a box!");
  }

  function turnOffBox() {
    let box = document.getElementById("box");
    box.removeEventListener("mouseover", mouseOverResponse);
  }
})();
