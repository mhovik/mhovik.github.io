(function() {
  window.onload = function() {
    $("change-dims").onclick = function() {
      let width = parseInt($("box-width").value);
      let height = parseInt($("box-height").value);
      if (!width || width < 0) {
        $("error-msg").innerText = "Please enter a non-negative numerical value for width";
      } else if (!height || height < 0) {
        $("error-msg").innerText = "Please enter a non-negative numerical value for height";
      } else {
        $("error-msg").innerText = "";
        $("box-model").style.width = width + "px";
        $("box-model").style.height = height + "px";
      }
      $("box-width").value = parseInt(window.getComputedStyle($("box-model")).getPropertyValue("width"));
      $("box-height").value = parseInt(window.getComputedStyle($("box-model")).getPropertyValue("height"));
    };
  };

  function $(id) {
    return document.getElementById(id);
  }

})();

