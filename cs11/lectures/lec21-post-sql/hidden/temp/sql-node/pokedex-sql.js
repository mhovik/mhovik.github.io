"use strict";

const mysql = require("promise-mysql");
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

let database;

async function getRows() {
  let result = [];
  try {
    let contents = await readFile("pokedex.json", "utf8");
    contents = JSON.parse(contents);
    for (let i = 0; i < contents.pokedex.length; i++) {
      let pokemon = contents.pokedex[i];
      let data = [];
      data.push(pokemon.id, pokemon.name, pokemon.description, pokemon.type, pokemon.weakness);
      let moves = pokemon.moves;
      for (let i = 0; i < 4; i++) {
        if (moves[i]) {
          data.push(moves[i].name);
        } else {
          data.push(null);
        }
      }
      result.push(data);
    }
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function populateDB() {
  let data = await getRows();
  let db = await getDB();
  try {
    let qry = "INSERT INTO pokedex (id, name, description, type, weakness, move1, move2, move3, move4) " +
              "VALUES ?";
    await db.query(qry, [data]);
    let rows = await db.query("SELECT * FROM pokedex");
    console.log(rows);
  } catch (err) {
    console.error(err);
  }
}

populateDB();
//getRows();

/**
 * Gets database object.
 * @returns Database object
 */
async function getDB() {
  if (!database) {
    database = await mysql.createConnection({
      host: "localhost",
      port: "8889",
      user: "root",
      password: "root",
      database: "pokedexdb"
    });
  }
  return database;
}
