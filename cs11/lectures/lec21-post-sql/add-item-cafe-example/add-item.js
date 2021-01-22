"use strict";
/**
 * This Cafe API Supports the following Endpoints:
 * GET /menu
 * GET /menu/:categories
 * GET /categories
 * GET /images
 *
 * POST /contact
 * POST /addItem
 * This program just focuses on POST /addItem.
 *
 * You can find more information and examples in the official documentation.
 * https://documenter.getpostman.com/view/8370820/SVYtPJZM?version=latest
 */
const express = require("express");
const fs = require("fs");
const util = require("util");
const glob = require("glob");
const multer = require("multer");
const path = require("path");

const globPromise = util.promisify(glob);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const DEFAULT_IMAGE = "food.png";
const SERVER_ERROR = "Something went wrong on the server, please try again later.";

const app = express();

// To handle different POST formats
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

app.use(express.static("public"));

/**
 * Adds a new item to the <category>-proposals.json file to be approved later.
 * If no <category>-proposals.json yet exists, will add a new file.
 * Required POST parameters: name, category, description.
 * Optional POST parameter: image - defaults to food.png otherwise.
 * Response type: text/plain
 * Sends a 400 error if missing one of the 3 required params.
 * Sends a 500 error if something goes wrong in file-processing.
 * Sends a success message otherwise.
 */
app.post("/addItem", async (req, res) => {
  res.type("text");
  let name = req.body.name;
  let category = req.body.category;
  let description = req.body.description;
  let image = req.body.image;
  if (!(name && category && description)) {
    res.status(400).send("Missing POST parameter: category, name, and/or description");
  }

  let result = { "name" : name, "description" : description, "image" : image };
  let dashedCategory = req.body.category.toLowerCase().replace(" ", "-");
  let jsonFile = dashedCategory + "-proposals.json";
  let contents = [];
  try {
    contents = await readFile(jsonFile, "utf8");
    contents = JSON.parse(contents);
  } catch (err) {
    if (err.code !== "ENOENT") {
      res.status(500).send(SERVER_ERROR);
    } // else, continue
  }
  contents.push(result);
  try {
    await writeFile(jsonFile, JSON.stringify(contents), "utf8");
  } catch (err) {
    res.status(500).send(SERVER_ERROR);
  }
  res.send(req.body.name + " proposal successfully added to " + jsonFile + "!");
});

/**
 * Helper function to pre-process /addItem POST parameters.
 * @param {string} category - category name of new item
 * @param {string} name - name of new item
 * @param {string} description - description for new item.
 * @param {string} image - stock image for new item (e.g. tea.png)
 * @returns {Object} JSON object with new item data if required parameters are non-null,
 * otherwise null.
 */
function processItemParams(category, name, description, image) {
  let result = null;
  if (category && name && description) {
    if (!image) {
      image = DEFAULT_IMAGE;
    }
    result = {
      "name" : name,
      "description" : description,
      "image" : image
    };
  }
  return result;
}

/**
 * Returns a newline-separated list of image names in stock-img as a text/plain response.
 * Example:
 *   apple.png
 *   asparagus.jpg
 *   ...
 */
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
