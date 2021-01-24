"use strict";

(function() {
    // 'load'
    window.addEventListener('load', init);

    function init() {
        // get button
        // attach a click event to the changeImage callback
        btn = document.getElementById('demo-btn');
        btn.addEventListener('click', changeImage);
        // let btn = document.querySelector('#demo-btn');
        // let btn = document.querySelector('button');
    }


    // change images/pokeball.jpg to images/mystery.gif
    function changeImage() {
        let pokeball = document.getElementById('pokeball');
        pokeball.alt = 'Dancing Pikachu';
        pokeball.src = 'images/mystery.gif';
    }
})();
