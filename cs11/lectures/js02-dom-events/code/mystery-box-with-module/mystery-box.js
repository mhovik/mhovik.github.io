/**
 * @author: Melisssa Hovik
 * CS 11 JS
 * Mystery Box Solution using Module Pattern 
 */
"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    let btn = document.getElementById("box-btn");
    btn.addEventListener("click", openBox);
  }

  function openBox() {
    let boxImg = document.getElementById("mystery-box");
    boxImg.src = "star.png";
    boxImg.alt = "A star!";
  }
})();
