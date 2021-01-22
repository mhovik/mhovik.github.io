/**
 * CYU #2
 * Scoping
 * 
 * Suppose the following JS is defined (linked in the <head> of cyu-scoping.html).
 * Which of the following will give errors when executed in the browser Console
 * for the cyu-scoping.html page?
 *
 * 1. > window;
 * 2. > document;
 * 3. > document.getElementById("btn");
 * 4. > clicks;
 * 5. > testClick();
 */
(function() {
  "use strict";

  let clicks = 0;

  window.addEventListener("load", init);
  
  function init() {
    document.getElementById("btn").addEventListener("click", testClick);
  }
  
  function testClick() {
    clicks++;
    console.log("You've clicked the button " + clicks + " times!");
  }
})();
