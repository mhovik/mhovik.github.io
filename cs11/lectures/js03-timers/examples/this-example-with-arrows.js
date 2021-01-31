"use strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    id("btn1").addEventListener("click", namedFunction);

    id("btn2").addEventListener("click", function(evt) {
      console.log("this === " + this); // this === #btn2
      id("line1").textContent = "this === " + this + " (id: " + this.id + ")";
    });

    id("btn3").addEventListener("click", (evt) => {
      console.log("this === " + this); // this === window
      id("line1").textContent = "this === " + this;
      id("line1").textContent = "this === " + this + " (id: " + this.id + ")";
    });
  }

  function namedFunction() {
    console.log("this === " + this); // this === #btn1
    id("line1").textContent = "this === " + this + " (id: " + this.id + ")";
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
