(function() {
  "use strict";

  window.addEventListener("load", initialize);

  function initialize() {
    $("demo-btn").addEventListener("click", delayedMessage);
  }

  function delayedMessage() {
    $("output-text").innerText = "Wait for it...";
    setTimeout(sayHello, 5000);
  }
  
  function sayHello() { // called when the timer goes off
    $("output-text").innerText = "Hello!";
  }

  function $(id) {
    return document.getElementById(id);
  }

})();
