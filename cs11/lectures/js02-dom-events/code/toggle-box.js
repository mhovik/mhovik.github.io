"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    // hide box
    id("hide-btn").addEventListener("click", toggleBox);
    id("hide-btn").addEventListener("click", hello);
    id("show-btn").addEventListener("click", toggleBox);
  }

  function toggleBox(evt) {
    // find hidden button
    console.log(evt); 
    qs("button.hidden").classList.remove("hidden");
    let clickedBtn = evt.currentTarget;
    clickedBtn.classList.toggle("hidden");
    id("box").classList.toggle("hidden");
    console.log("toggle button clicked");
  }

  function hello(evt) {
    console.log(evt);
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function qs(query) {
    return document.querySelector(query);
  }
})();
