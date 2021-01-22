(function() {
  "use strict";
  let timer = null;

  window.addEventListener("load", function() {
    document.getElementById("demo-btn").onclick = delayedMessage;
    document.getElementById("demo-btn2").onclick = delayMsg2;
    document.getElementById("demo-btn3").onclick = delayedMultiply;
    //document.getElementById("text-input").onmouseout = booyah;
  });
  
  function delayedMessage() {
    document.getElementById("output-text").innerText = "Wait for it...";
    setTimeout(sayHello, 5000);
  }
  
  function sayHello() { // called when the timer goes off
    document.getElementById("output-text").innerText = "Hello!";
  }

  function delayMsg2() {
    if (timer === null) {
      timer = setInterval(sayHello2, 1000);
    } else {
      clearInterval(timer);
      timer = null;
    }
  }
  
  function sayHello2() {
    document.getElementById("output-text2").innerText += "Hello..."
  }

  function delayedMultiply() {
    setTimeout(multiply, 2000, 6, 7);
  }

  function multiply(a, b) {
    alert(a * b);
  }

  function hello() { // booyah knows what object it was called on
    this.value = "hello";
  }
})();
