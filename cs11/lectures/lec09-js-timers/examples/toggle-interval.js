(function() {
  "use strict";

  let timerId = null; // we use null to indicate a timer is "off"

  window.addEventListener("load", init);

  function init() {
    id("toggle-btn").addEventListener("click", toggleMessageInterval);
  }

  // 1. What does this function do?
  function toggleMessageInterval() {
    if (timerId === null) { // timerId is off, start timer
      timerId = setInterval(sayHello, 500);
    } else { // timerId is not null, stop timer
      clearInterval(timerId);
      timerId = null; // 2. Why is this line important?
      // 3. What happens if you swap the two lines above?
    }
  }

  function sayHello() {
    id("output-text").textContent += "Hello!";
  }

  function id(idName) {
    return document.getElementById(idName);
  }

})();
