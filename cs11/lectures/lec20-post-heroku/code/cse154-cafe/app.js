"use strict";
const express = require("express");
const fs = require("fs");
const util = require("util");
const glob = require("glob");
const multer = require("multer");
const path = require("path");

const globPromise = util.promisify(glob);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

/**
 * This API Supports the following Endpoints:
 * GET /menu
 * GET /menu/:categories
 * GET /categories
 * GET /images
 *
 * POST /contact
 * POST /addItem
 */

const DEFAULT_IMAGE = "food.png";
const SERVER_ERROR = "Something went wrong on the server, please try again later.";

const app = express();

// To handle different POST formats
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

app.use(express.static("public"));

// Returns a collection of all categories and items served at the cafe
app.get("/menu", async (req, res) => {
  try {
    // let result = await getMenuData();
    let result = await readdir("categories/drinks");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(SERVER_ERROR);
  }
});

// Returns a JSON array of item folders for the given category name (ignoring letter-casing).
// Returns a 400 error if no category found for the given name
// Returns a 500 error if something goes wrong on the server.
app.get("/menu/:category", async (req, res) => {
  let categoryDir = req.params.category.toLowerCase();
  try {
    // add the slash at the end to only match directories
    let itemDirs = await readdir("categories/" + categoryDir);
    res.json(itemDirs);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(err);
      res.status(400).send("Category " + req.params.category + " not found.");
    } else {
      res.status(500).send(SERVER_ERROR);
    }
  }
});

// Returns a newline-separated list of image names in stock-img as a text/plain response.
// Example:
//   apple.png
//   aubergine.jpg
//   ...
app.get("/images", async (req, res) => {
  res.type("text");
  try {
    let result = "";
    let images = await globPromise("stock-img/*[png|jpg]");
    for (let i = 0; i < images.length; i++) {
      // stock-img/apple.png -> apple.png
      let imagePath = path.basename(images[i]);
      result += imagePath + "\n";
    }
    res.send(result);
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
});

// Returns an array of category names as a JSON response.
app.get("/categories", async (req, res) => {
  try {
    let categories = await readdir("categories");
    res.json(categories);
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
});

app.get("/messages", async (req, res) => {
  try {
    let messages = await readFile("messages.json", "utf8");
    res.json(JSON.parse(messages));
  } catch (err) {
    console.error(err);
    res.status(500).send(SERVER_ERROR);
  }
});

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

app.post("/contact", async (req, res) => {
  res.type("text"); // since _both_ success and error cases are plain text
  let newMsg = processMsgParams(req.body.name, req.body.email, req.body.message);
  if (!newMsg) {
    res.status(400).send("Required POST parameters for /contact: name, email, message.")
  }

  try {
    let messages = await readFile("messages.json", "utf8");
    messages = JSON.parse(messages);
    messages.push(newMsg);
    await writeFile("messages.json", JSON.stringify(messages), "utf8");
    res.send("Your message was received! We will send an email back soon.");
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
});

// Adds a new item to the menu.
// Required POST parameters:
//   category - item category
//   name - item name
//   description - item description
// Optional POST parameter:
//   image - defaults to food.png otherwise
app.post("/addItem", async (req, res) => {
  let newItemJSON = processItemParams(req.body.category, req.body.name,
                                        req.body.description, req.body.image);
  if (!newItemJSON) {
    res.type("text");
    res.status(400).send("Required POST parameters for /addItem: category, name, description.")
  }

  let dashedCategory = req.body.category.toLowerCase().replace(" ", "-");
  let newCategoryFile = "new-" + dashedCategory + ".json";
  let currentData = [];
  try {
    currentData = await readFile(newCategoryFile, "utf8");
    currentData = JSON.parse(currentData);
  } catch (err) {
    if (err.code !== "ENOENT") {
      res.type("text");
      res.status(500).send(SERVER_ERROR);
    } // else, continue
  }
  currentData.push(newItemJSON);
  await writeFile(newCategoryFile, JSON.stringify(currentData, null, 2), "utf8");
  res.send("Request to add " + req.body.name + " to menu successfully received!");
});

async function getMenuData() {
  let result = {};
  try {
    let categories = await readdir("categories");
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      let categoryData = [];
      let items = await globPromise("categories/" + category + "/*/");
      for (let j = 0; j < items.length; j++) {
        let itemDir = items[j];
        let itemData = await getItemData(itemDir);
        categoryData.push(itemData);
      }
      // drinks -> Drinks
      let formattedCategory = formatTitleCase(category);
      result[formattedCategory] = categoryData;
    }
    return { "categories" : result };
  } catch (err) {
    throw err;
  }
}

async function getItemData(itemDir) {
  let itemName = path.basename(itemDir);
  let formattedName = formatTitleCase(itemName);
  // readfile error will be caught all the way up in /menu endpoint 
  let contents = await readFile(itemDir + "/info.txt", "utf8");
  let lines = contents.split("\n");
  let description = lines[0];
  let qty = lines[1];
  let img = lines[2];
  return {
    "name" : formattedName,
    "image" : img,
    "description" : description,
    "in-stock" : qty > 0
  };
}

function processItemParams(category, name, description, image) {
  let result = null;
  if (category && name && description) {
    if (!image) {
      image = DEFAULT_IMAGE;
    }
    result = {
      "name" : name,
      "description" : description,
      "image" : image,
      "approved" : false,
      "timestamp" : new Date().toUTCString()
    };
  }
  return result;
}

/**
 * Takes a dash-separated directory name and converts it to a Title Case name.
 * Example: formatTitleCase("classic-coffee") returns "Classic Coffee".
 */
function formatTitleCase(dirName) {
  let words = dirName.split("-");
  let firstWord = words[0];
  let result = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  for (let i = 1; i < words.length; i++) {
    let nextWord = words[i];
    result += " " + nextWord.charAt(0).toUpperCase() + nextWord.slice(1);
  }
  return result;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
