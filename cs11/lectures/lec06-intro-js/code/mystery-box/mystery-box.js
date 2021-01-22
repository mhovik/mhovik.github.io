/*
 * CSE 154 Summer 2019
 * Mystery Box!
 * Pre-Check and Lecture 5 Solution
 *
 * Implements the functionality of the Mystery Box webpage to
 * display a powerup icon whenever the mystery box button is clicked.
 */
"use strict";

window.addEventListener("load", init);

/**
 * Sets up the click event listener for the mystery box picture so that whenever
 * it is clicked, it will "open the box" to reveal what's inside.
 */
function init() {
  let boxBtn = document.getElementById("box-btn");
  boxBtn.addEventListener("click", openBox);
}

/**
 * Changes the image of the mystery box to reveal what's inside.
 */
function openBox() {
  // 1. Get the box image
  let box = document.getElementById("mystery-box");
  // 2. Change the box image's src attribute!
  box.src = "star.png";
  box.alt = "A Star";
}
