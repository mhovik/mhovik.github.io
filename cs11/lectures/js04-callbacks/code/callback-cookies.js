/**
 * CSE 154 Summer 2019
 * demo demonstrating asynchronous program execution.
 * (Code from Pre-Check). Don't worry about this code, it just runs the
 * timers/output for the page demo simulating console output to easily compare
 * the two bakeCookie function executions.
 */
"use strict";
(function() {
  let timerId = null;
  let seconds = 0;
  const STEPS = [
    "Step 1: Adding chocolate chips (1s task)",
    "Step 2: Starting oven...",
    "Step 3: Oven ready (4s task)",
    "Step 4: Putting cookie dough in oven",
    "Step 5: Oven baking finished! (2s task)"
    // the last step has a variable, factor in functions
 ];

  window.addEventListener("load", init);

  function init() {
    id("btn1").addEventListener("click", restartTimer);
    id("btn1").addEventListener("click", bakeCookies);

    id("btn2").addEventListener("click", restartTimer);
    id("btn2").addEventListener("click", bakeCookies2);

    id("both").addEventListener("click", restartTimer);
    id("both").addEventListener("click", bakeCookies);
    id("both").addEventListener("click", bakeCookies2);
  }

  function toggleButtons(enable) {
    id("btn1").disabled = !enable;
    id("btn2").disabled = !enable;
    id("both").disabled = !enable;
  }

  function restartTimer() {
    toggleButtons(false /* disable */);
    let maxSeconds = 7;
    if (this.id === "btn1") { // only count to 4 seconds for bakeCookies
      maxSeconds = 4;
    }
    clearOutputs();
    timerId = setInterval(() => {
      seconds++;
      id("seconds").textContent = seconds;
      if (seconds === maxSeconds) {
        seconds = 0;
        clearInterval(timerId);
        timerId = null;
        toggleButtons(true /* re-enable */);
      }
    }, 1000);
  }

  function clearOutputs() {
    seconds = 0;
    id("seconds").textContent = seconds;
    clearInterval(timerId);
    timerId = null;
    id("output1").innerHTML = "";
    id("output2").innerHTML = "";
  }

  function bakeCookies() {
    let cookieState = "raw cookie dough";
    setTimeout(function() {
      logStep(1, 1);
    }, 1000);
    logStep(1, 2);

    setTimeout(function() {
      logStep(1, 3);
    }, 4000);
    logStep(1, 4);

    setTimeout(function() {
      logStep(1, 5);
      cookieState = "golden-brown cookie";
    }, 2000); // step 6 has a variable - can't use logStep
    let msg = "Step 6: Your " + cookieState + " is ready!";
    console.log(msg);
    id("output1").textContent += msg + "\n";
  }

  function bakeCookies2() {
    let cookieState = "raw cookie dough";
    setTimeout(function() {
      logStep(2, 1);
      logStep(2, 2);
      setTimeout(function() {
        logStep(2, 3);
        logStep(2, 4);
        setTimeout(function() {
          logStep(2, 5);
          cookieState = "golden-brown cookie";
          let msg = "Step 6: Your " + cookieState + " is ready!";
          console.log(msg);
          id("output2").textContent += msg + "\n";
        }, 2000);
      }, 4000);
    }, 1000);
  }

  function logStep(outputNum, stepNum) {
    console.log(STEPS[stepNum - 1]);
    id("output" + outputNum).textContent += STEPS[stepNum - 1] + "\n";
  }

  /**
  * Returns the element that has the ID attribute with the specified value.
  * @param {string} idName - element ID
  * @returns {object} DOM object asecondsociated with id.
  */
  function id(idName) {
    return document.getElementById(idName);
  }
})();
