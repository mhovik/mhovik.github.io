/*
 * CS 11
 * Lecture 10
 * Mystery Box Exercise: Animated!
 *
 * Implements the functionality of the Mystery Box webpage to randomly
 * display powerup icons whenever the mystery box image is clicked, toggling
 * the animation whenever the button is clicked again.
 */
(function() {
  "use strict";
  const IMG_PATH = "img/";
  const POWER_UPS = ["bee-mushroom.png", "fire-flower.png", "ice-flower.png",
                     "star.png", "super-mushroom.png"];
  const SPEED = 500;

  let timerId = null; // why do we need to keep track of a timerId?

  window.addEventListener("load", init);

  /**
   * Sets up the click event listener for the mystery box picture so that whenever
   * it is clicked, it toggle the mystery box animation.
   */
  function init() {
    let box = document.getElementById("mystery-box");
    // What if we wanted to animate the powerup box?
    box.addEventListener("click", toggleAnimation);
  }

  /**
   * Toggles the mystery box animation.
   */
  function toggleAnimation() {
    if (!timerId) {   // animation is not in progress
      timerId = setInterval(showRandomPowerup, SPEED);
    } else {
      clearInterval(timerId);
      timerId = null; // what happens if you move this line before clearInterval(timerId)?
    }
  }

  /*
   * Changes the image of the mystery box to a random powerup!
   */
  function showRandomPowerup() {
    let box = document.getElementById("mystery-box");
    let randomIndex = parseInt(POWER_UPS.length * Math.random());
    box.src = IMG_PATH + POWER_UPS[randomIndex];
  }
})();
