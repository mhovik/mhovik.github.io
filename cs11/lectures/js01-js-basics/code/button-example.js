/**
 * @author Melissa Hovik
 * CS 11 - JS
 * Example Code for Lecture 1 (JS Basics)
 * 
 * You must wrap your JS code into a "module" pattern and
 * then attach your main code into a "load" event listener for the window. This
 * makes sure that the JavaScript code has access to the document elements (like the
 * button), which are loaded only when the page is done loading.
 */
"use strict";

(function() {
    /* 'load' event fires when the page DOM is populated
     * When everything is loaded, get the button and add a click event listener to call
     * changeImage when the button is clicked */
    window.addEventListener('load', init);

    function init() {
        // get button
        // attach a click event to the changeImage callback
        btn = document.getElementById('demo-btn');
        btn.addEventListener('click', changeImage);
        // Could also use:
        // let btn = document.querySelector('#demo-btn');
        // let btn = document.querySelector('button');
    }


    /**
     * Changes the src attribute of the <img> on our page.
     * The only time this function is used is in the btn click handler (assigned in init), 
     * so this makes sure the image is changed whenever the button is clicked.
     * Exercise: How could you change this to toggle between the pokeball image and the pikachu gif?
     */
    function changeImage() {
        let pokeball = document.getElementById('pokeball');
        // The alt attribute for img tags defines the "alt text" which is important
        // for accessibility when users cannot see the image (or when the image fails
        // to load for whatever reason).
        pokeball.alt = 'Dancing Pikachu';
        // change images/pokeball.jpg to images/mystery.gif
        pokeball.src = 'images/mystery.gif';
    }
})();