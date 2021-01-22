"use strict";

const mysql = require("promise-mysql");

// See what's logged in the filterDemo() function!
// Note that we could easily extend the DB query functionality to be executed in an Express app.get endpoint.
filterDemo();

/**
 * Example of using SQL in Node.js. Just like with fs functions, we have to handle
 * possible errors in a database connection. With async/await, we use try/catch.
 * This demo includes two SQL SELECT queries on the pokedex table in a pokedexdb.
 * The first query is the SQL equivalent solution of filtering a pokedex JSON from Monday,
 * returning the single result that matches (Articuno). The second query is an example
 * that returns two records (rows) in the query.
 * If you want to practice with this demo, see Wednesday's slides for links to the pokedex.csv dataset which
 * can be imported in phpMyAdmin into a new pokedexdb database you create.
 */
async function filterDemo() {
  let db;
  try {
    db = await getDB();
    // SQL solution to Monday's filter exercise, returning 1 matched row in the result
    let qry = "SELECT name, id, type, weakness FROM pokedex " +
              "WHERE name LIKE '%a%' AND id < 145 AND weakness = 'rock' " +
              "ORDER BY type, name DESC";

    // An example query with 2 rows matched in the result
    let qry2 = "SELECT name, type FROM pokedex LIMIT 2;"
    let rows = await db.query(qry2);
    console.log(rows);
  } catch (err) {
    console.error("Something went wrong with the database!");
  }
  if (db) { // db will be undefined if an error occured on line 18 (getDB).
    // we must always close the DB connection after creating a connection,
    // even when there was an error in a query.
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
  let db = await mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "pokedexdb"
  });
  return db;
}
