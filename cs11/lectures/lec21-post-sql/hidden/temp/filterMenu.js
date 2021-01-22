"use strict";

const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function prettify(fileName) {
  try {
    let data = await readFile(fileName, "utf8");
    data = JSON.parse(data);
    await writeFile("menu2.json", JSON.stringify(data, null, 2), "utf8");
    console.log("Success!");
  } catch (err) {
    console.error(err);
  }
}
