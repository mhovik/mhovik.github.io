function startCountDown1() {
  for (let i = 10; i > 0; i--) {
    // wait 1 seconds, then:
    console.log(i + "...");
  }
  console.log("0!");
}

function startCountDown2() {
  let i = 10;
  setInterval(function() {
    console.log(i + "...");
    i--;
  }, 1000);
  console.log("0!");
}

function startCountDown3() {
  let i = 10;
  setInterval(function() {
    if (i === 0) {
      console.log("0!");
    } else {
      console.log(i + "...");
      i--;
    }
  }, 1000);
}

function startCountDown4() {
  let i = 10;
  let timerId = setInterval(function() {
    if (i === 0) {
      clearInterval(timerId);
      // why *don't* we need to set timerId to null in this case?
      console.log("0!");
    } else {
      console.log(i + "...");
      i--;
    }
  }, 1000);
}
