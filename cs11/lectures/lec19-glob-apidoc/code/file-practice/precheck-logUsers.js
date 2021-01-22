/**
 * Demo of Lecture 19 Pre-Check code - what's wrong with it?
 */
const fs = require("fs");

// this function intends to log active users to a single file.
// in this case, we are worried about the order, so ensure it is preserved.
function logUsers(clientList) {
  for (let client of clientList) {
    fs.appendFile("user-log.txt", client + "\n", (err) => {
      if (err) {
        console.error(err + "\nFailed to log user.");
      }
    });
  }
}

let users = ["Tal", "Manny", "Hudson"];
logUsers(users); // take a look at user-log.txt!
