function sometimesSuccessfulPromise(msg) {
  return Promise(function(resolve, rejected) {
    if (Math.random() < 0.5) {
      resolve("Fulfilled! Here's your message back: " + msg);
    } else {
      rejected("Rejected");
    }
  }
}

// Using the promise
let p2 = new p().then(console.log);


// Always fulfills the promise, calling resolve in 1 second.
function alwaysYesIn1Second(resolve, reject) {
  // this function is always certain, don't need to handle reject
  setTimeout(() => resolve("Yes"), 1000);
}

function maybeNoIn1Second(resolve, reject) {
 setTimeout(() => {
   if (Math.random() < 0.5) {
     resolve("Success! You get a duck.");
   } else {
     reject(Error("You lost, no duck."));
   }
  }, 1000);
}

// a Promise constructor
function maybePromise() {
  return new Promise(maybeNoIn1Second);
}