"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to our store!");
});

// /search?term=puzzle
app.get("/search", (req, res) => {
  let searchTerm = req.query.term;
  if (searchTerm) {
    res.cookie("last_search", searchTerm, { expires: new Date(Date.now() + 3 * 24 * 60 * 60000) });
  }
  res.json( {"results" : [searchTerm + " products"]});
})

app.get("/makeCookie", (req, res) => {
  res.cookie("logged-in", "true", { expires: new Date(Date.now() + 10000)});
  res.type("text");
  res.send("You're logged in!");
});

app.get("/getCookies", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
})

app.post("/login", (req, res) => {
  if (req.cookies["logged-in"] && req.cookies["logged-in"] === "true") {
    res.json({ "msg" : "Here's your notes!"});
  } else {
    res.status(400).send("You're not logged in");
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

const PORT = process.env.PORT || 8001;
app.listen(PORT);
