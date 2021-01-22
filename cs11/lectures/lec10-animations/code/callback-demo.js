/**
 * An example of three ways to assign call back functions.
 */
"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    id("q-btn").addEventListener("click", processQuestion);
  }

  function processQuestion() {
    let question = id("q-text").value;
    askQ(question);
  }

  function askQ(qText) {
    let answer = prompt(qText);
    if (answer === "yes") {
      console.log("You answered yes!");
    } else if (answer === "no") {
      console.log("You answered no!");
    } else {
      console.log("I don't know what " + answer + " means.");
    }
  }

  // Helper functions
  function id(idName) {
    return document.getElementById(idName);
  }

})();
