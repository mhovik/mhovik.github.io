"use strict";

const mysql = require("promise-mysql");

filterDemo();

// Example of using SQL in Node.js. Just like with fs functions, we have to handle
// possible errors in a database connection. With async/await, we use try/catch.
async function filterDemo() {
  let db;
  try {
    db = await getDB();
    let qry = "SELECT name, id, type, weakness FROM pokedex " +
              "WHERE name LIKE '%r%' AND id < 145 AND weakness = 'rock' " +
              "ORDER BY type, name DESC";
    let rows = await db.query(qry);
    console.log(JSON.stringify(rows));
  } catch (err) {
    console.error("Something went wrong with the database!");
  }
  if (db) {
    db.end();
  }
}

/**
 * Establishes a database connection to the pokedexdb and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @returns {Object} - The database object for the connection.
 */
async function getDB() {
  let database = await mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "pokedexdb"
  });
  return database;
}
