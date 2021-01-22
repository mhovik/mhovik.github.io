/**
 * CYU #3 
 * Scoping
 *
 * This program will throw an error when cyu-scoping.html links to it
 * and the page is loaded. 
 * 1. Will anything be output before the error?
 * 2. Where/why is there an error? 
 * 3. What happens if you swap lines 12 and 19?
 */
let clicks = 0;
testClick();

function testClick() {
  clicks++;
  console.log("You've clicked the button " + clicks + " times!");
}

document.getElementById("btn").addEventListener("click", testClick);
