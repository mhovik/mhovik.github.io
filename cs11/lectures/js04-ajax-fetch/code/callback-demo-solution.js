/**
 * An example of craeting our own callback functions.
 */
(function() {
  "use strict";
  window.addEventListener("load", init);

  function init() {
    id("q-btn").addEventListener("click", processQuestion);
  }

  function processQuestion() {
    let question = id("q-text").value;
    askQ2(question, yesFn2, noFn, handleError2);
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

  function askQ2(qText, yesFn, noFn, handleError) {
    let answer = prompt(qText);
    if (answer === "yes") {
      // yesFn();
      yesFn2();
    } else if (answer === "no") {
      noFn();
    } else {
      handleError("I don't know what " + answer + " means.");
    }
  }

  function yesFn() {
    console.log("You answered yes!");
  }

  function yesFn2() {
    id("output").textContent = "You answered yes!";
  }

  function noFn() {
    console.log("You answered no!");
  }

  function handleError(answer) {
    console.log("I don't know what " + answer + "means.");
  }

  function handleError2(answer) {
    console.log("I don't know what " + answer + "means.");
    console.log("Please try again.");
    processQuestion();
  }

  // Helper functions
  function id(idName) {
    return document.getElementById(idName);
  }

})();
