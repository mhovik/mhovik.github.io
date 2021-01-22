"use strict";

async function queryDB() {
    // let's query!
}

queryDB();

/**
 * Gets database object.
 * @returns Database object connected to the pokedexdb.
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
