/*
 * CSE 154 Spring 2019
 * Lecture 10
 * Mystery Box Exercise: Animated!
 *
 * Implements the functionality of the Mystery Box webpage to randomly
 * display a powerup icon whenever the mystery box image is clicked.
 * NEW FEATURE COMING SOON: Animations!
 */
(function() {
  "use strict";
  const IMG_PATH = "img/";
  const POWER_UPS = ["bee-mushroom.png", "fire-flower.png", "ice-flower.png",
                     "star.png", "super-mushroom.png"];

  window.addEventListener("load", init);

  /**
   * Sets up the click event listener for the mystery box picture so that whenever
   * it is clicked, it will show a new random powerup image. 
   */
  function init() {
    let box = document.getElementById("mystery-box");
    box.addEventListener("click", showRandomPowerup); 

    // TODO #1: How would you change the program to animate the powerup box when the box is clicked so
    // that showRandomPowerup is called every 0.5 seconds?
    
    // TODO #2: What if you wanted to implement a "toggle" feature such that clicking
    // the box turns on/off the animation?



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
