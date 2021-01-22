(function() {
  const MAX_SKITTLES = 120;
  window.addEventListener("load", init);

  function init() {
    let startBtn = document.getElementById("start-btn");

    startBtn.addEventListener("click", function() {
      toggleViews();
      let skittleString = "";
      for (let i = 0; i <= MAX_SKITTLES; i++) {
        let skittle = document.createElement("div");
        skittle.classList.add("skittle", "green");
        id("jar").appendChild(skittle);
      }
    });
  }

  // Assume toggleViews/id are defined
  function toggleViews() {
    id("game-setup").classList.toggle("hidden");
    id("game-play").classList.toggle("hidden");
  }

  function id(idName) {
    return document.getElementById(idName);
  }
})();
