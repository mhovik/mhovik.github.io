/**
 * Demo of improved version of Lecture 19 Pre-Check code.
 */
const fs = require("fs");
const util = require("util");
const appendFile = util.promisify(fs.appendFile);

/**
 * This version fixes the race conditions we got in the precheck-logUsers.js solution and uses
 * appendFile instead of writeFile.
 */
async function logUsersAsync(clientList) {
  for (let client of clientList) {
    try {
      await appendFile("user-log2.txt", client + "\n");
    } catch (err) {
      console.error("There was an error: " + err);
    }
  }
}

/**
 * This version uses Promise.all and is best, since we only block the program once.
 */
async function logUsersAsyncParallel(clientList) {
  let promises = [];
  for (let client of clientList) {
    try {
      promises.push(appendFile("user-log2.txt", client + "\n"));
    } catch (err) {
      console.error("There was an error: " + err);
    }
  }
  await Promises.all(promises);
}

let users = ["Tal", "Manny", "Hudson"];
// logUserAsync(users)
logUsersAsyncParallel(users);
