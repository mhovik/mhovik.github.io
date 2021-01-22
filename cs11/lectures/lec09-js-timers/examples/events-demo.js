(function() {
  "use strict";

  // A.
  // Source is window
  // Event is 'load'
  // Response is page initialization function
  // Output is "window loaded" to console (and other event setup)
  window.addEventListener("load", initialize); 

  // This function sets up all of the event listeners on DOM objects (remember we need
  // this so that the DOM is loaded and we can access them to attach event listeners!
  function initialize() {
    console.log("window loaded!");
    // B.
    // Source is myBtn
    // Event is 'click'
    // Response is showClickMsg function
    // Elements changed: #msg paragraph
    let myBtn = document.getElementById("btn");
    myBtn.addEventListener("click", showClickMsg);

    // C.
    // Source is msgP
    // Event is mouseover
    // Response is showMouseOverMsg
    let msgP = document.getElementById("msgP");
    msgP.addEventListener("mouseover", showMouseOverMsg);
  }

  function showMouseOverMsg() {
    // As briefly introduced in lecture, "this" is a keyword to access the source
    // element of a response function (in this case the #msg element). Since this
    // is the same element we are changing in the response, we can easiy refer to it with
    // "this"
    this.innerText = "You moved the mouse over me!";
    // same as document.getElementById("msgP").innerText = "You moved the mouse over me!";
    
  }

  function showClickMsg() {
    // We can't use "this" to get the msgP for scenario B, since the source element
    // was the #btn element and the element we want to change is #msg. So we access
    // it using document.getElementById as normal.
    document.getElementById("msgP").innerText = "You clicked the button!";
  }

})();
