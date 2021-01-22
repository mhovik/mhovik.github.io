/**
 * Example of appending to a new file with the core fs module.
 */
"use strict";
const fs = require("fs");

// Syntax: writeFile(fileName, data, (error) callback)
fs.appendFile("example.txt", "Another line\n", (err) => {
  if (err) {
    console.error("Something went wrong when writing the file...");
  } else {
    console.log("example.txt appended to successfully!");
  }
});
