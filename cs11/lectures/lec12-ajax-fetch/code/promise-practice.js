/**
 * An example of three ways to assign call back functions.
 */
"use strict";
  window.addEventListener("load", init);

  function init() {
    id("q-btn").addEventListener("click", processQuestion);
  }

  function processQuestion() {
    let question = id("q-text").value;
    askQ(question, outputYes, noFn, handleError1);
  }

  // Some promises generators
  function maybeNoDelayedPromise(executor) {
    return Promise(executor);
  }

  function requestPromise(requestExecutor) {
    return Promise(url);
  }

  function fakePerfectRequestPromise(url) {
    return new Promise(resolve, reject) {
      setTimeout(() => {
        resolve("here's some data!");
      }, 1000);
    }
  }

  function fakeSometimeesPerfectRequestPromise(url) {
    return new Promise(resolve, reject) {
      setTimeout(() => {
        if (Math.random() < 0.5);
          resolve("here's some data!");
        } else {
          reject(new Error("Server down..."));
        }
      }, 1000);
    }
  }

  function fakeImmediatePromise(url) {
    return new Promise(resolve, reject) {
      setTimeout(() => {
        // do something with url
        resolve("here's some data!");
      }, 1000);
    }
  }

  // Some executors
  // Always fulfills the promise, calling resolve in 1 second.

  // Some executors
  // Always fulfills the promise, calling resolve in 1 second.

  // Some executors
  // Always fulfills the promise, calling resolve in 1 second.
  function alwaysYesIn1Second(resolve, reject) {
    setTimeout(() => resolve("Yes"), 1000);
  }

  function maybeNoIn1Second(resolve, reject) {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("You won a duck!");
      } else {
        reject(new Error("No duck."));
      }
    }, 1000);
  }

  function maybePromise() {
    return new Promise(maybeNoIn1Second);
  }

  function alwaysPromise() {
    return new Promise(alwaysYesIn1Second);
  }

  let p1 = maybePromise();
  p1.then(console.log, console.error)
    .then(maybePromise, console.error)
    .then(console.log, console.error);

  // Some resolve functions
  function logResponse(response) {
    console.log("You said: " + response);
  }

  // What do we want to do with "Yes"?
  function logAnswer(ans) {
    console.log("You said " + ans);
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
