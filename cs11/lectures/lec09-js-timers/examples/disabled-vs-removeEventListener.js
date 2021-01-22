"use strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    id("btn1").addEventListener("click", sayHello);
    id("btn1").addEventListener("mouseover", sayHello);
    id("btn1").addEventListener("click", function() {
        this.disabled = true;
    });

    id("btn2").addEventListener("click", sayHello);
    id("btn2").addEventListener("mouseover", sayHello);
    id("btn2").addEventListener("click", function() {
        this.removeEventListener("click", sayHello);
    });
  }

  function sayHello(evt) {
    console.log(this.id + " says hello!");
    id("line1").textContent = this.id + " says hello!";
    console.log("Event type: " + evt.type)
    id("line2").textContent = "Event type: " + evt.type;
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
