// makes a "fake" request
function makeRequest(request) {
  // 75% chance things go well.
}

function makeRequestPromise(request) {
  return new Promise(function(resolve, reject) {
  // A request takes 2 seconds
  setTimeout(() => {
    console.log("Done with request: " + request);
    if (Math.random() < 0.75) {
      resolve("success");
    } else {
      reject(new Error("error in step: " + request));
    }
    }, 2000);
  });
}

/*
function order() {
  let responsePizza = requestPizza(name, options);
  let isOk = inspectPizza(responsePizza);
  if (isOk) {
    eatPizza(responsePizza);
  }
  giveCard();
}
*/

/*
function requestPizza(name, options) {
  */


function promiseOrder() {
  let request1 = makeRequestPromise("Step 1");
  let request2 = makeRequestPromise("Step 2");
  let request3 = makeRequestPromise("Step 3");
  request1.then(request2).then(request3).then(console.log).catch((reason) => {
    console.log(reason);
  });

  /*
  setTimeout(function() {
    makeRequest("Requesting menu...");
    setTimeout(function() {
      makeRequest("Ordering pizza...");
      setTimeout(function() {
        makeRequest("Checking pizza...");
        setTimeout(function() {
          makeRequest("Eating pizza...");
          setTimeout(function() {
            makeRequest("Paying for pizza...");
            setTimeout(function() {
              let response = makeRequest("Done! Heading home.");
              console.log(response);
            });
          });
        });
      });
    });
  });
  */
}

function order() {
  setTimeout(function() {
    makeRequest("Requesting menu...");
    setTimeout(function() {
      makeRequest("Ordering pizza...");
      setTimeout(function() {
        makeRequest("Checking pizza...");
        setTimeout(function() {
          makeRequest("Eating pizza...");
          setTimeout(function() {
            makeRequest("Paying for pizza...");
            setTimeout(function() {
              let response = makeRequest("Done! Heading home.");
              console.log(response);
            });
          });
        });
      });
    });
  });
}
