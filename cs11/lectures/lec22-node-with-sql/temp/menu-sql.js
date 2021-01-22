"use strict";

const mysql = require("promise-mysql");
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
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

//populateDB();
//getRows();

async function queryDB() {
  let db;
  try {
    db = await getDB();
    //let rows = await db.query("SELECT name, category FROM menu ORDER BY name");
    let rows = await db.execute("SELECT author, creation_time FROM blog_posts WHERE author = ?", ["dubs"]);
    let creation = rows[0]["author"];
    console.log(creation);
    console.log(typeof(creation));
    console.log(typeof(rows[0]["author"]));
    console.log(new Date(creation).toUTCString());
  } catch (err) {
    console.error(err);
  }
  if (db) {
    db.end();
  }
}

(async () => { await queryDB()})();

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
    database: "blogdb"
  });
  return db;
}
