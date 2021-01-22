"use strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    let container = id("container");
    let col1 = id("column1");
    let box2 = id("box2");
    console.log(container.children);
    console.log(column1.firstElementChild);
    console.log(container.firstElementChild.firstElementChild);
    console.log(box2.nextElementSibling);
    console.log(box2.previousElementSibling);
    console.log(box2.parentNode);
    console.log(box2.parentNode.firstElementChild);
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
