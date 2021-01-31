"use strict";
(function() {
  let timerId = null; // we use null to indicate a timer is "off"

  window.addEventListener("load", init);

  function init() {
    id("demo-btn").addEventListener("click", repeatedMessage);
  }

  function repeatedMessage() {
    timerId = setInterval(sayHello, 500);
  }

  function sayHello() { // called when the timer goes off (repeated in an interval)
    id("output-text").textContent += "Hello!"
  }

  // our helper function
  function id(idName) {
    return document.getElementById(idName);
  }

})();
