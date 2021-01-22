"use strict";

const mysql = require("promise-mysql");
//const mysql = require("mysql2/promise");
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const express = require("express");
const app = express();




let db;

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
    console.error(err.message);
  }
}

// populateDB();
//getRows();

app.get("/", async (req, res) => {
  res.json(await queryDB());
})

async function queryDB() {
  try {
    db = await getDB();
    let query = "SELECT * FROM pokedex WHERE name='Pikachu';";
    let rows = await db.query(query);
    return rows;
  } catch (err) {
    console.log(err.message);
  }
  if (db) {
    db.end();
  }
}

/**
 * Gets database object.
 * @returns Database object
 */
async function getDB() {
  let db = await mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "pokedexdb"
  });
  return db;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
