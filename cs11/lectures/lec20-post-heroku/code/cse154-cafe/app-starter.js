"use strict";
const express = require("express");
const fs = require("fs");
const util = require("util");
const glob = require("glob");

const globPromise = util.promisify(glob);
const readdirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);

const DEBUG = true;

const app = express();
app.use(express.static("public"));

// Returns an array image names in stock-img as a JSON response.
app.get("/images", (req, res) => {

});

// Returns an array of category names as a JSON response.
app.get("/categories", (req, res) => {

});

// Returns a collection of all categories and items served at the cafe
// If given an optional query parameter "in-stock=true", only includes items that are in stock.
app.get("/menu", async (req, res) => {
   // get category directories
   try {
     let contents = await readdirPromise("categories");
     let result = [];

     // for each category,
     for (let i = 0; i < contents.length; i++) {
       let category = contents[i];
       let items = await globPromise("categories/" + category + "/*/");
       result.push(items);
     }
     res.json(result);
   } catch (err) {
     if (DEBUG) {
       console.error(err);
     }
     res.status(500).send("Something went wrong on the server");
   }


});

app.post("/contact", (req, res) => {
  // get the POST parameters
  // check that they are passed
  // Add to messages.json

});

// Helper function for /contact
function processMsgParams(name, email, message) {
  let result = null;
  if (name && email && message) {
    result = {
      "name" : name,
      "email" : email,
      "message" : message,
      "timestamp" : new Date().toUTCString()
    };
  }
  return result;
}

// Adds a new item to the menu.
// Required POST parameters:
//   category - item category
//   name - item name
//   description - item description
// Optional POST parameter:
//   image - defaults to food.png otherwise
app.post("/addItem", (req, res) => {

});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
