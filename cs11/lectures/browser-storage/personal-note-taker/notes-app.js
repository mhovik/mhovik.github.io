"use strict";

/**
 * Author: Melissa Hovik
 *
 * Sample code from 08.17.19 OH to demonstrate using cookies. This also includes an example
 * of adding a note to the db using the logged_in/username cookies we set to motivate
 * avoiding the requirement of logging in again each time a user visits the page.
 * In this example, the cookies last 3 days.
 *
 * This code is not fully documented.
 */
const express = require("express");
const cookieParser = require("cookie-parser"); // Requires npm install cookie-parser (in package.json)
const multer = require("multer");
const mysql = require("promise-mysql");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());
app.use(cookieParser());

const SERVER_ERROR = "Something went wrong on the server.";
const COOKIE_EXP_TIME = 3 * 24 * 60 * 60 * 1000; // login cookies last 3 days.

app.use(express.static("public"));

// This is too long of a function, but shows how to set/check login cookies.
app.post("/login", async (req, res) => {
  res.type("text");
  if (req.cookies["logged_in"] && req.cookies.username) {
    res.send("Welcome back " + req.cookies.username + "!");
  } else {
    let username = req.body.username;
    let pw = req.body.password;

    let db;
    try { // this could be much cleaner with a middleware helper function. Ask in OH for a better solution!
      db = await getDB();
      res.type("text");
      if (username && pw) {
        let qry = "SELECT username FROM users WHERE username = ? AND password = ?";
        let results = await db.query(qry, [username, pw]);
        if (results.length === 1) {
          // set new login cookies to remember successful login
          let expDate = new Date(Date.now() + COOKIE_EXP_TIME); // 3 days from now
          res.cookie("logged_in", "true", { expires: expDate });
          // Equivalent: res.cookie("logged_in", "true", { maxAge: COOKIE_EXP_TIME) });
          res.cookie("username", username, { expires: expDate });
          res.send("You're logged in!");
        } else {
          res.status(400).send("Invalid username and password");
        }
      } else {
        res.status(400).send("Missing required username and/or password POST parameters.");
      }
    } catch(err) {
      res.status(500).send(SERVER_ERROR);
    }
    if (db) {
      db.end();
    }
  }
});

// An example of clearing cookies.
app.post("/logout", (req, res) => {
  req.clearCookie("logged_in"); // no error if the cookie doesn't exist.
  req.clearCookie("username");
  res.send("Successfully logged out!");
});

// an example of getting data only if a user has already logged in.
app.get("/notes", (req, res, next) => {
  if (req.cookies["logged_in"] && req.cookies.username) {
    next(); // calls getNotes on line 81, which is the next (and last) middleware function in the route's function list.
  } else {
    res.status(400).send("Please login to retrieve your personal notes stored on our database.");
  }
}, getNotes);

/**
 * Adds a new note to the database for the logged-in user, using the login cookies so that
 * a user doesn't have to submit a username for each POST request. Note that this means
 * a login cookie has been created previously in POST /login within the last 3 days.
 * Required POST parameter: note (e.g. "Saturday OH")
 * Optional POST parameter: tag (e.g. "cse154")
 */
app.post("/newNote", async (req, res) => {
  if (!req.cookies["logged_in"]) {
    res.status(400).send("Please login to retrieve your personal notes stored on our database.");
  } else if (!req.body.note) {
    res.status(400).send("Missing required 'note' POST parameter.");
  } else {
    // req.body.tag is undefined if not passed.
    let result = await addNote(req.body.note, req.body.tag);
    res.status(result.status).send(result.msg);
  }
});

// Helper middleware function example, called in app.use.
async function getNotes(req, res) {
  //let notes = await getNotes(req.cookies.username);
  let username = req.cookies.username;
  let db;
  try {
    db = await getDB();
    let qry = "SELECT note, tag FROM notes WHERE username = ? ORDER BY note";
    let result = await db.query(qry, [username]);
    res.json({ "notes" : result });
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
  if (db) {
    db.end();
  }
}

// This is a server-side implementation of addNote, which we implemented on the client-side with localSorage.
// As discussed in OH, it would be best to build a cart of products using localStorage, and then add everything
// in the cart in one request once the client is done. In this example, we could instead have addNotes to add
// all notes that were created in localStorage, and you should think about the trade-offs of doing so vs.
// making a request to add each note at a time.
async function addNote(note, tag) {
  let tagValue = "NULL";
  if (tag) {
    tagValue = tag;
  }
  let qry = "INSERT INTO notes (note, tag) VALUES(?, ?)";
  let db;
  let result = { status : 200, msg : "" }; // stays empty if an error occurs, check in calling function.
  try {
    db = await getDB();
    let success = await db.query(qry, [note, tagValue]);
    if (success) {
      result.msg = "Successfully added your note to the database!";
    } else {
      result.status = 400;
      result.msg = "Couldn't add your note to the database.";
    }
  } catch {
    result.status = 500;
    result.msg = SERVER_ERROR;
  }
  return result;
}

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
    database: "notesdb"
  });
  return db;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
