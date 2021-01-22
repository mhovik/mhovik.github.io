(function() {
  "use strict";

  let timer = null;

  window.addEventListener("load", initialize);

  function initialize() {
    $("toggle-btn").addEventListener("click", toggleMessageInterval);
  }

  // 1. What does this function do?
  function toggleMessageInterval() { 
    if (timer === null) {
      timer = setInterval(sayHello, 1000);
    } else {
      clearInterval(timer);
      timer = null; // 2. Why is this line important?
    }
  }

  function sayHello() {
    $("output-text").innerText += "Hello!"
  }
  
  // our helper function
  function $(id) {
    return document.getElementById(id);
  }

})();
