(function() {
  let greenSkittles = 0;
  let jar = null;

  window.addEventListener("load", init);

  function init() {
    let j = document.getElementById("jar");
    let startBtn = document.getElementById("start-btn");

    startBtn.addEventListener("click", function() {
      toggleViews();
      let skittleString = "";
      for (let i = 0; i <= 50; i++) {
        skittleString += "<div class='skittle green'></div>";
      }
      j.innerHMTL = skittleString;
      greenSkittles = 50;
    });
  }

  // Assume toggleViews/id are defined
  function toggleViews() {
    id("menu-view").classList.toggle("hidden");
    id("game-view").classList.toggle("hidden");
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
