(function() {
  "use strict";

  let timer = null;

  window.addEventListener("load", initialize);

  function initialize() {
    $("demo-btn").addEventListener("click", repeatedMessage);
  }

  function repeatedMessage() { 
    timer = setInterval(sayHello, 1000);
  }
  
  function sayHello() { // called when the timer goes off (repeated in an interval)
    $("output-text").innerText += "Hello!"
  }

  // our helper function
  function $(id) {
    return document.getElementById(id);
  }

})();
