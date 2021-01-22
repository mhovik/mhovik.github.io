"use strict";

const mysql = require("promise-mysql");
const express = require("express");
const app = express();

const INVALID_PARAM_ERROR_CODE = 400;
const PUBLIC_PORT = 8000;

let database;

app.get("/bestreads/description", async (req, res) => {
  res.set("Content-Type", "text/plain");
  if (req.query["title"]) {
    if (await bookExists(req.query["title"])) {
      let description = await getDescription(req.query["title"]);
      res.send(description);
    } else {
      res.status(INVALID_PARAM_ERROR_CODE).send("Error: Book by name of " + req.query["title"] +
                                                " does not exist.");
    }
  } else {
    res.status(INVALID_PARAM_ERROR_CODE).send("Error: Please remember to add the \
                          title parameter when using description");
  }
});

app.get("/bestreads/info", async (req, res) => {
  if (req.query["title"]) {
    if (await bookExists(req.query["title"])) {
      res.set("Content-Type", "application/json");
      let info = await getInfo(req.query["title"]);
      res.json(info);
    } else {
      res.set("Content-Type", "text/plain");
      res.status(INVALID_PARAM_ERROR_CODE).send("Error: Book by name of " + req.query["title"] +
                                                " does not exist.");
    }
  } else {
    res.set("Content-Type", "text/plain");
    res.status(INVALID_PARAM_ERROR_CODE).send("Error: Please remember to use the mode of info with \
                                               a title");
  }
});

app.get("/bestreads/reviews", async (req, res) => {
  if (req.query["title"]) {
    if (await bookExists(req.query["title"])) {
      res.set("Content-Type", "application/json");
      let reviews = await getReviews(req.query["title"]);
      res.json(reviews);
    } else {
      res.set("Content-Type", "text/plain");
      res.status(INVALID_PARAM_ERROR_CODE).send("Error: Book by name of " + req.query["title"] +
                                                " does not exist.");
    }
  } else {
    res.set("Content-Type", "text/plain");
    res.status(INVALID_PARAM_ERROR_CODE).send("Error: Please remember to use the mode of reviews \
                                               with a title");
  }
});

app.get("/bestreads/books", async (req, res) => {
  res.set("Content-Type", "application/json");
  let books = await getBooks();
  res.json(books);
});

/**
 * Get book description
 * @param {string} title - Book title
 * @returns {promise} - Promise
 */
async function getDescription(title) {
  try {
    let db = await getDB();
    let desc = await db.query("SELECT description FROM books WHERE folder=" + mysql.escape(title) +
                              ";");
    return desc[0]["description"];
  } catch (err) {
    console.error(err);
  }
}

/**
 * Get book info
 * @param {string} title - Book title
 * @returns {promise} - Promise
 */
async function getInfo(title) {
  try {
    let db = await getDB();
    let info = await db.query("SELECT title, author FROM books WHERE folder=" +
                                mysql.escape(title) + ";");
    return info[0];
  } catch (err) {
    console.error(err);
  }
}

/**
 * Get book reviews
 * @param {string} title - Book title
 * @returns {promise} - Promise
 */
async function getReviews(title) {
  try {
    let db = await getDB();
    let reviews = await db.query("SELECT name, score, text FROM reviews WHERE folder=" +
                                  mysql.escape(title) + ";");
    return reviews;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Get books
 * @returns {promise} - Promise
 */
async function getBooks() {
  try {
    let db = await getDB();
    let books = await db.query("SELECT folder, title FROM books;");
    return {
      "books": books
    };
  } catch (err) {
    console.error(err);
  }
}

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
      database: "bestreads"
    });
  }
  return database;
}

/**
 * Checks if book exists.
 * @param {string} title - Book title to check
 * @returns Whether book exists.
 */
async function bookExists(title) {
  let db = await getDB();
  let books = await db.query("SELECT title FROM books WHERE folder=" + mysql.escape(title) + ";");
  return books.length > 0;
}

app.use(express.static("public"));
app.listen(PUBLIC_PORT);
