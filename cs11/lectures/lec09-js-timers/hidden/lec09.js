(function() {
  window.addEventListener("load", init);

  function init() {
    id("btn1").addEventListener("click", namedFunction);

    id("btn2").addEventListener("click", function(evt) {
      id("this-example-arrows-output").textContent = ("this === " + this + " (id: " + this.id + ")"); // this === #btn2
    });

    id("btn3").addEventListener("click", (evt) => {
      id("this-example-arrows-output").textContent = ("this === " + this + " (id: " + this.id + ")"); // this === window
    });
  }

  function namedFunction() {
    id("this-example-arrows-output").textContent = ("this === " + this + " (id: " + this.id + ")"); // this === #btn1
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

})();
