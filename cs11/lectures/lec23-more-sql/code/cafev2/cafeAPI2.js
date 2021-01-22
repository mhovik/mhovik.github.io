/**
 * CSE 154 Summer 2019
 * Solution API for a theoretical cafe.
 *
 * An API that can provide items from the cafe menu,
 * and submit cafe orders for processing.
 * *** Endpoint Documentation ***
 * Endpoint: /menu
 * Description: Provides all items on the menu, sorted into categories.
 *              Items within each category are in alphabetical order.
 * Request Type: GET
 * Response Type: JSON
 * Example Request: /menu
 * Example Response:
 * {
 *   "Bakery": [
 *     {
 *       "name": "Blueberry Scone",
 *       "subcategory": "Scones",
 *       "price": 3.50
 *     },
 *     ...
 *   ],
 *   ...
 * }
 * *************************************
 * Endpoint: /menu/:category
 * Description: Responds with an alphabetically-sorted list of menu items in the :category.
 * Request Type: GET
 * Response Type: JSON
 * Example Request: /menu/Bakery
 * Example Response:
 * [
 *   {
 *     "name": "Blueberry Scone",
 *     "subcategory": "Scones",
 *     "price": 3.50
 *   },
 *   ...
 * ]
 * Error Handling: If there are no items for the given category, responds in text with 400 status.
 * *************************************
 * Endpoint: /order
 * Description: Sends an order up to the server to be processed later.
 * Request Type: POST
 * Required Parameters: phone_number AND/OR email, item_name, qty, tip
 * Response Type: Text
 * Example Request: /order {phone_number: "18007833637", item_name: "Blueberry Scone",
 *                          qty: 2, tip: 0.50}
 * Example Response: Your order has been processed!
 * Error Handling: Responds in text with 400 if the required parameters are not passed, or
 *                 if there is no item in the database for the given item_name.
 */

"use strict";

const express = require("express");
const mysql = require("promise-mysql");
const multer = require("multer"); // Handles form-data requests.
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

const INVALID_PARAM_ERROR = 400;
const FILE_ERROR = 500;
const SERVER_ERROR = "Something went wrong on the server.";

// Gets all menu items (JSON), organized by category alphabetically.
app.get("/menu", async function(req, res) {
  let menu;
  try {
    menu = await queryCafe("SELECT name, category, subcategory, price FROM menu ORDER BY name;");
    res.json(processMenu(menu));
  } catch (err) {
    res.type("text");
    console.log(err);
    res.status(FILE_ERROR).send(SERVER_ERROR);
  }
});

app.post("/users", async (req, res) => {
  let db;
  try {
    db = await getDB();
    let user = req.body.username;
    let pw = req.body.password;
    if (!(user && pw)) {
      res.status(400).send("Missing user and pw");
      db.end();
    }
    let qry = "SELECT * FROM users WHERE username= ? AND password = ?;"
    let result = await db.query(qry, [user, pw]);
    if (result.length === 0) {
      res.status(400).send("user not found");
      db.end();
    } else {
      res.send(result);
      db.end();
    }
  } catch (err) {
    console.error(err);
    res.send(err);
    if (db) {
      db.end();
    }
  }
});

// Gets all menu items (JSON) in a given :category.
app.get("/menu/:category", async function(req, res) {
  try {
    let qry = "SELECT name, subcategory, price FROM menu WHERE category = '" + req.params.category;
    let menu = await queryCafe(qry);
    if (menu.length === 0) {
      res.type("text");
      res.status(INVALID_PARAM_ERROR).send("There are no records for that category!");
    } else {
      res.json(menu);
    }
  } catch (err) {
    console.error(err.message);
    console.error(err.sql);
    res.type("text");
    res.status(FILE_ERROR).send(SERVER_ERROR);
  }
});

// POSTs an order to the server.
app.post("/order", verifyOrder, async function(req, res) {
  res.type("text");
  let email = req.body.email;
  let phone = req.body["phone_number"];
  let itemName = req.body["item_name"];
  let qty = req.body["qty"];
  let tip = req.body["tip"];
  let db;
  try {
    db = await getDB();
    // This works, but has security vulnerabilities - we will learn a better solution on Friday!
    let itemRecord = await db.query("SELECT price FROM menu WHERE name = '" + itemName + "';");
    if (itemRecord.length === 0) {
      res.status(INVALID_PARAM_ERROR).send("There is no menu item matching the given name.");
    } else {
      let totalPrice = itemRecord[0]["price"] * parseInt(qty) + parseFloat(tip);

      // Here I use placeholders to manage the uncertainty of the input.
      let query = prepareQuery(email, phone, itemName, qty, totalPrice);
      await db.query(query);
      db.end();
      res.send("Your order has been processed!");
    }
  } catch (err) {
    if (db) {
      db.end();
    }
    res.status(FILE_ERROR).send(SERVER_ERROR);
  }
});

/**
 * Establishes a database connection and returns the database object.
 * @returns {Object} - The database object for the connection.
 */
async function getDB() {
  let db = await mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "cafe"
  });
  return db;
}

/**
 * Returns the menu items from the database as an array of objects.
 * @param {string} query - The MySQL query to send to the database.
 * @returns {array} - The menu items
 */
async function queryCafe(query) {
  let db, result;
  try {
    db = await getDB();
    result = await db.query(query);
    db.end();
    return result;
  } catch (err) {
    if (db) {
      db.end();
    }
    // Throw an error here to be caught in the calling function.
    throw err;
  }
}

/**
 * Takes an array of menu items and processes it into a category to item array mapping.
 * @param {array} menu - An array of menu items with fields category, subcategory, name, price.
 * @returns {object} - The formatted menu object.
 */
function processMenu(menu) {
  let result = {};
  for (let i = 0; i < menu.length; i++) {
    let name = menu[i]["name"];
    let subcategory = menu[i]["subcategory"];
    let price = menu[i]["price"];
    let category = menu[i]["category"];
    if (!result[category]) {
      result[category] = []; // Initialize an array at this category.
    }
    result[category].push({name: name, subcategory: subcategory, price: price});
  }
  return result;
}

/**
 * Verifies that the body parameters of an order are set.
 * @param {object} req - The request
 * @param {object} res - The response
 * @param {callback} next - A callback to the next middleware function.
 */
function verifyOrder(req, res, next) {
  if ((req.body.email || req.body["phone_number"]) && req.body["item_name"] &&
      req.body.qty && req.body.tip) {
    next();
  } else {
    res.type("text");
    res.status(INVALID_PARAM_ERROR).send("Missing required parameters!");
  }
}

/**
 * Prepares the SQL query for inserting items. Note that we'll learn a much simpler and more secure approach
 * to this soon!
 * @param {string} phone - The phone number. May be null.
 * @param {string} email - The email. May be null.
 * @param {string} itemName - The name of the ordered item.
 * @param {number} qty - The number of items ordered.
 * @param {number} totalPrice - The total price of the order.
 * @returns {string} - The final SQL query.
 */
function prepareQuery(phone, email, itemName, qty, totalPrice) {
  let sql = "INSERT INTO orders(phone_number, email, item_name, qty, total_price) " +
            "VALUES (_PHONE_NUM_, _EMAIL_, '" + itemName + "', " + qty + ", " + totalPrice + ");";
  if (email) {
    sql = sql.replace("_EMAIL_", "'" + email + "'");
  } else {
    sql = sql.replace("_EMAIL_", "NULL");
  }
  if (phone) {
    sql = sql.replace("_PHONE_NUM_", "'" + phone + "'");
  } else {
    sql = sql.replace("_PHONE_NUM_", "NULL");
  }
  return sql;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
