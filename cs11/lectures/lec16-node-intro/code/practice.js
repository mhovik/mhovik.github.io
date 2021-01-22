// It's a JS file just like we've seen - we don't use a module pattern
// we'll see why later
let msg = "Hello world!";
console.log(msg);

// can create functions and call them
function logDateMessage(month, day) {
  console.log("It's " + month + " " + day);
}
logDateMessage("July", 31);


// We have access to console.log in Node

// We don't have the DOM though!
// show document and window in REPL

// REPL
// Show autocomplete with Number.<tab><tab>

// Today: Modules, NPM, and basic web server
// Node comes with "core modules"
