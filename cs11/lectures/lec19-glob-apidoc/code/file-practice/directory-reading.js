"use strict";

/**
 * Example of reading directory paths with fs.readdir.
 */
const fs = require("fs");

// Promisifying readdir
const util = require("util");
const readdir = util.promisify(fs.readdir);

/**
 * Standard callback-version of fs.readdir.
 */
function callbackReaddir(path) {
  fs.readdir(path, (err, paths) => {
    if (err) {
      console.error("Error reading directory at: " + path);
    } else {
      console.log(path + " directory contents: ");
      console.log(paths);
    }
  });
}

/**
 * Promisified version of fs.readdir with async/await.
 */
async function asyncReaddir(path) {
  try {
    // promisified readdir, defined at top of file
    let paths = await readdir(path);
    console.log(path + " directory contents: ");
    console.log(paths);
  } catch (err) {
    console.error("Error reading directory at: " + path);
  }
}

// Both calls output: ['example.json', 'example1.txt', 'example2.txt', 'example_folder']
// callbackReaddir("data");
asyncReaddir("data");
