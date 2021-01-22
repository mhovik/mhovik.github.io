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

async function newJSON(fileName) {
  try {
    let data = await readFile(fileName, "utf8");
    data = JSON.parse(data);
    let results = [];
    for (let name in data) {
      let moves = data[name].moves;
      let newMoves = [null, null, null, null];
      for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        newMoves[i] = {
          name : move.name,
          type : move.type
        }
      }
      console.log(newMoves);
      let pmon = {
        name : name,
        description : data[name].description,
        id : data[name].id,
        type : data[name].type,
        weakness : data[name].weakness,
        moves : newMoves
      };
      results.push(pmon);
    }
    results.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    let result = { "pokedex" : results };
    await writeFile("pokedex.json", JSON.stringify(result, null, 2), "utf8");
    console.log("Success!");
  } catch (err) {
    console.error(err);
  }
}

newJSON("pokedex151.json");
