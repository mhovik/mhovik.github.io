/**
 * Example of reading text and JSON files with the core fs module.
 */
const fs = require("fs");

// Syntax: readFile(fileName, (error, result) callback)
fs.readFile("example.txt", "utf8", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    // Note that result.split throws an error if we don't specify the encoding type as utf-8
    console.log(result);
  }
});

/*
console.log("Done reading file!");

let contents = fs.readFileSync("example.txt");
console.log(contents);
// let lines = contents.split("\n");
// console.log("First line: " + contents[0]);

// Example reading/parsing JSON
fs.readFile("package.json", "utf-8", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    const contents = JSON.parse(result);
    console.log(contents);
  }
});

fs.readdir("data", (err, contents) => {
  if (err) {
    console.error(err);
  } else {
    console.log(contents);
  }
});
*/
