/**
 * Example of reading text files with the core fs module 3 ways 
 * (callbacks, promisification, and async/await).
 */
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

// Syntax: readFile(fileName, (error, result) callback)
function readFileCallback() {
  fs.readFile("example.txt", "utf8", (err, contents) => {
    if (err) {
      handleError(err);
    } else {
      printContents(contents);
    }
  });
}

// Promisified version
function readFilePromisified() {
  const readFilePromise = readFile("example.txt", "utf8");
  readFilePromise
    .then(printContents)
    .then(() => { console.log("Done reading file!") })
    .catch(handleError);
}

async function readFileAsync() {
  try {
    const contents = await readFile("example.txt", "utf8");
    printContents(contents);
    console.log("Done reading file!");
  } catch (err) {
    handleError(error);
  }
}

function printContents(contents) {
  console.log("File contents:");
  console.log(contents);
}

function handleError(err) {
  console.log("There was an error: " + err);
}

readFileCallback();
readFilePromisified();
readFileAsync();
