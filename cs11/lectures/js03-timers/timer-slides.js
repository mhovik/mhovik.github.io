(function() {
  "use strict";
  let timer = null;
  let ticks = 0;

  window.addEventListener("load", function() {
    id("demo-btn").onclick = delayedMessage;
    id("demo-btn2").onclick = delayMsg2;
    id("demo-btn-toggle").onclick = delayMsg3;
    id("demo-btn3").onclick = delayedMultiply;
  });

  function delayedMessage() {
    id("output-text").innerText = "Wait for it...";
    setTimeout(sayHello, 3000);
  }

  function sayHello() { // called when the timer goes off
    id("output-text").innerText = "Hello!";
  }

  function delayMsg2() {
    if (timer === null) {
      timer = setInterval(sayHello2, 1000);
    } else if (ticks >= 100) {
      clearInterval(timer);
      timer = null;
      ticks = 0;
    } else {
      ticks++;
    }
  }

  function delayMsg3() {
    if (timer === null) {
      timer = setInterval(function() {
        id("output-text-toggle").innerText += "Hello!" },
      1000);
    } else {
      clearInterval(timer);
      timer = null;
    }
  }

  function sayHello2() {
    id("output-text2").innerText += "Hello!";
  }

  function delayedMultiply() {
    setTimeout(multiply, 2000, 6, 7);
  }

  function multiply(a, b) {
    alert(a * b);
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
