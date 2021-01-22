"use strict";

/**
 * Example of using glob module with various pattern formats.
 */
const fs = require("fs");
const glob = require("glob");

// For promisified version of glob
const util = require("util");
const globPromise = util.promisify(glob);

/**
 * Standard callback-version of glob.
 */
function callbackGlob(pathPattern) {
  glob(pathPattern, (err, matches) => {
    if (err) {
      console.error("Error when globbing: " + pathPattern);
    } else {
      console.log("Found data:", matches);
    }
  });
}

/**
 * Promisified version of glob with async/await.
 */
async function asyncGlob(pathPattern) {
  try {
    let matches = await globPromise(pathPattern);
    console.log("Found data:", matches);
  } catch (err) {
    console.error("Error when globbing: " + pathPattern);
  }
}

const path = "data/*";
// const path = "data/example1.txt";
// const path = "data/*.txt";
// const path = "**/*example*"; // ** recursively matches the directory
// const path = "data/**/*example*";

// callbackGlob(path);
asyncGlob(path);
