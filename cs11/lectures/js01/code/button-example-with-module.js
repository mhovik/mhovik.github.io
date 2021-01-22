/*
 * We'll learn this tomorrow, but you must wrap your JS code into a "module" pattern and
 * then attach your main code into a "load" event listener for the window. This
 * makes sure that the JavaScript code has access to the document elements (like the
 * button), which are loaded only when the page is done loading.
 */
(function() { 

  /* When everything is loaded, get the button and add a click event listener to call
   * changeImage when the button is clicked */
  window.onload = function() {
    let demoButton = document.getElementById("demo-btn");
    demoButton.addEventListener("click", changeImage);
  };

  /*
   * Whenever called, this function changes the src attribute of the <img> on our page.
   * The only time this function is used is in the demoButton click handler, so this makes
   * sure the image is changed whenever the demo button is clicked.
   */
  function changeImage() {
    let pokeballImg = document.getElementById("pokeball");
    pokeballImg.src = "images/mystery.gif";
  }
  
})(); 
