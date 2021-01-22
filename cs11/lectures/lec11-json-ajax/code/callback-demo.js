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
    askQ(question, outputYes, noFn, handleError1);
  }

  function askQ(qText, yesFn, noFn, handleError) {
    let answer = prompt(qText);
    if (answer === "yes") {
      yesFn();
    } else if (answer === "no") {
      noFn();
    } else {
      handleError(answer);
    }
  }

  function logYes() {
    console.log("You answered yes!");
  }

  function outputYes() {
    id("output").textContent = "You answered yes!";
  }

  function noFn() {
    console.log("You answered no!");
  }

  function handleError1(myAnswer) {
    console.log("I don't know what " + myAnswer + " means.");
    processQuestion();
  }

  // Helper functions
  function id(idName) {
    return document.getElementById(idName);
  }

})();
