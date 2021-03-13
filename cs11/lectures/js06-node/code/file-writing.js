/**
 * Example of writing to a new file with the core fs module.
 */
"use strict";
const fs = require("fs");
let data = { "msg" : "Hello again"}

// Syntax: writeFile(fileName, data, (error) callback)
fs.writeFile("new-file.txt", JSON.stringify(data), (err) => {
  if (err) {
    console.error("Something went wrong when writing the file...");
  } else {
    console.log("new-file.txt written to successfully!");
  }
});
