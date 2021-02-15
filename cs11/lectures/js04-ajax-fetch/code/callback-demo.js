/**
 * An example of different ways to assign callback functions.
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

  /**
   * V1 of a simple function to take a string question and do 3 different things
   * based on the answer. What if we could generalize the "3 different things"
   * as function parameters to askQ?
   * @param {string} qText -  question to ask user (should be yes/no question).
   */
  function askQ(qText) {
    let answer = prompt("Input an answer to : " + qText);
    if (answer === "yes") {
      console.log("You answered yes!");
    } else if (answer === "no") {
      console.log("You answered no!");
    } else {
      console.log("I don't know what " + answer + " means.");
    }
    id("output").textContent = "Check out the console!";
  }

  // TODO: Write a function askQ2 to turn askQ into a higher-order function
  // meaning it takes callback functions as arguments.
  function askQ2(qText, yesFn, noFn, handleError) {
    
  }


  // Thes functions below will be used to call askQ2 (we could use other functions
  // as well since we've now parameterized askQ2 with functions!)
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
