"use strict";

const mysql = require("promise-mysql");
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

let database;

async function getRows() {
  let result = [];
  try {
    let menu = await readFile("menu.json", "utf8");
    menu = JSON.parse(menu);
    for (let category in menu.categories) {
      let items = menu.categories[category];
      for (let i = 0; i < items.length; i++) {
        let data = Object.values(items[i]);
        data[3] = Math.floor(Math.random() * 10);
        data.splice(1, 0, category);
        result.push(data);
      }
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
    await db.query("INSERT INTO menu (name, category, description, image, qty) " +
                   "VALUES ?", [data]);
    let rows = await db.query("SELECT * FROM menu");
    console.log(rows[2]);
    db.end();
  } catch (err) {
    console.error(err);
  }
}

populateDB();
//getRows();

async function queryDB() {
  try {
    let db = await getDB();
    let result = await db.query("INSERT INTO menu (name, description, qty, image) " +
             "VALUES ('Coffee', 'The classic.', 10, 'coffee.png')");
    console.log(result);
    let rows = await db.query("SELECT * FROM menu");
    console.log(rows);
  } catch (err) {
    console.error(err);
  }
}

// queryDB();

/**
 * Gets database object from the cse154cafe database.
 * @returns Connected database object.
 */
async function getDB() {
  let db = await mysql.createConnection({
      host: "localhost",
      port: "8889",
      user: "root",
      password: "root",
      database: "cse154cafe"
    });
  }
  return db;
}
