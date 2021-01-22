(function() {
  "use strict";

  window.addEventListener("load", initialize);

  function initialize() {
    id("demo-btn").addEventListener("click", delayedMessage);
  }

  function delayedMessage() {
    id("output-text").textContent = "Wait for it...";
    setTimeout(sayHello, 3000);
  }
  
  function sayHello() { // called when the timer goes off
    id("output-text").textContent = "Hello!";
  }

  function id(idName) {
    return document.getElementById(idName);
  }

})();
