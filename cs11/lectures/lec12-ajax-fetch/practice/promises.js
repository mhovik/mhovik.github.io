
/*
console.log("reading menu...");
let orderRequest = "";
let orderStatus = ""; // will be pending, success, or failure
let orderResponse = null;
*/

// an oreo cookie is instant.
function getCookieDough() {
  return "raw cookie dough";
}

function eatCookie(cookieState) {
  console.log("Your " + cookieState + " is ready! Enjoy!");
}

function bakeCookies() {
    let cookieState = getCookieDough();
    setTimeout(function() {
        console.log("Adding chocolate chips (1s task)");
    }, 1000);
    console.log("Starting oven...");

    setTimeout(function() {
        console.log("Oven ready (4s task)");
    }, 4000);
    console.log("Putting cookie dough in oven");

    setTimeout(function() {
        console.log("Oven baking finished! (2s task)");
        cookieStatee = "golden-brown cookie";
    }, 2000);
    eatCookie(cookieState);
}

function bakeCookies2() {
    let cookieState = getCookieDough();
    console.log("Adding chocolate chips (1s task)");
    console.log("Starting oven...");
    setTimeout(function() {
        setTimeout(function() {
            console.log("Oven ready (4s task)");
            console.log("Putting cookie dough in oven");
            setTimeout(function() {
                console.log("Oven baking finished ready! (2s task)");
                cookieState = "golden-brown cookie";
                eatCookie(cookieState);
            }, 2000);
        }, 4000);
    }, 1000);
}

function makeDelayPromise(delayMs) {
  let delayPromise = new Promise(function (res, rej) => {
    setTimeout(() => {
      res("Done!");
    }, delayMs);
  });
  return delayPromise;
}



function step1() {
  setTimeout(() => {
    console.log("Adding chocolate chips (1s task)");
  })
}

function bakeCookies3() {
  let cookieState = getCookieDough();

}
//bakeCookies();
//console.log();
bakeCookies2();

/*

setTimeout(function(){
  orderRequest = "Pizza";
  console.log("Took long enough. You chose " + orderRequest);
  requestFood(orderRequest);
  console.log("Status of order: " + orderStatus);
}, 3000); // simulate choosing an item to request to take 3ss

setTimeout(() => {
  finishCooking();
  console.log("Status of order: " + orderStatus);
}, 2000);
// simulate the cooking to take 2ss

setTimeout(function() {
  finishFood(orderRequest);
  console.log("Waiter arrived! Here's your " + orderRequest);
  console.log("Status of order: " + orderStatus);
}, 1000); // a waiter takes 1s to walk to your table

setTimeout(function() {
  console.log("5ss have passed");
  setTimeout(function(){
    console.log('4ss have passed');
    setTimeout(function(){
      console.log('3ss has passed');
    }, 3000);
  }, 4000);
}, 5000);

function requestFood(foodName) {
  console.log("The kitchen has received your order of " + foodName);
  orderStatus = "pending";
}

function finishCooking(foodName) {
  console.log("The kitchen finished your order!");
  orderStatus = "success";
  return orderRequest + " (cooked)";
}
*/
