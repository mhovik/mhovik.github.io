(function() {
  "use strict";

  window.addEventListener("load", function() {
    document.querySelectorAll("form").forEach(function(form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        let names = [];
        for (let i = 0; i < this.elements.length; i++) {
          names.push(this.elements[i].name);
        }
        alert("You submitted a form with data for " + names.toString());
      });
    });
  });

  function $(id) { return document.getElementById(id); }
})();
