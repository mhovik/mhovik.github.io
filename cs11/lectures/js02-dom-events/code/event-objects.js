"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    id("demo-btn").addEventListener("click", logClickData);
  }

  function logClickData(evt) {
    console.log("Button clicked!");
    console.log(evt.type); // "click"
    console.log(evt.currentTarget); // "#demo-btn"
    console.log(evt.timestamp); // timestamp the event was created (in milliseconds)
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
