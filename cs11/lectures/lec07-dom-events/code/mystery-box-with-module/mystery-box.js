/**
 * Melisssa Hovik
 * CSE 154 Summer 2019
 * Mystery Box Solution using Module Pattern shown in Lecture 7
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
