"use strict";

const fs = require("fs");
const glob = require("glob");
const util = require("util");
const path = require("path");
const readdir = util.promisify(fs.readdir);
const globPromise = util.promisify(glob);

console.log("In office-hours.js!");

// let contents = await readdir("data");

async function readdirExample(path) {
  let contents = await readdir(path);
  console.log(contents);
}

async function globExample(pathPattern) {
  let contents = await globPromise(pathPattern);
  if (contents.length === 0) {
    console.log("No matches found for pattern: " + pathPattern);
  } else {
    for (let i = 0; i < contents.length; i++) {
      //console.log("basename for " + contents[i] + ": " + path.basename(contents[i]));
    }
    console.log(contents);
  }
}

readdirExample("data/example_folder");
// ["example_folder", "example.json", "example1.txt", "example2.txt"]
globExample("data/example*[.txt|.json]", { "dot" : true});
// ["data/example_folder", "data/example.json", ...]
