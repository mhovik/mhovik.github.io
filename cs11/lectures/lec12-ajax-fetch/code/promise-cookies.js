/* A demo demonstrating asynchronous program execution. */
"use strict";

  function taskOutput1() {
    setTimeout(function() {
      console.log("Step 1 finished (1 second task)");
    }, 1000);

    setTimeout(function() {
      console.log("Step 2 finished (4 second task)");
    }, 4000);

    setTimeout(function() {
      console.log("Step 3: finished (2 second task)");
    }, 2000);
    console.log("All done!");
  }

  function taskOutput2() {
    setTimeout(function() {
      console.log("Step 1 finshed (1 second)");
      setTimeout(function() {
        console.log("Step 2 finsihed (4 seconds)");
        setTimeout(function() {
          console.log("Step 3 finished (2 seconds)");
        }, 2000);
      }, 4000);
    }, 1000);
  }
