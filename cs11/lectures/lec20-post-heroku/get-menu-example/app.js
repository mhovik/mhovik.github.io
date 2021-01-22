"use strict";
const express = require("express");
const fs = require("fs");
const util = require("util");
const glob = require("glob");
const path = require("path");

const globPromise = util.promisify(glob);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

// A file that just includes the /menu endpoint of the CSE154 Cafe. 
// Used to help study with the Monday Pre-Check.
const SERVER_ERROR = "Something went wrong on the server, please try again later.";

const app = express();

/**
 * Returns a JSON collection of all categories and items served at the cafe.
 * Each category holds an array of item data, with each item having information
 * about the name, description, image, and whether it is in stock.
 * You can find an example result here:
 * https://fathomless-badlands-58662.herokuapp.com/menu
 * A 500 status error will be thrown if anything goes wrong during file-processing.
 */
app.get("/menu", async (req, res) => {
  try {
    let result = await getMenuData();
    res.json(result);
  } catch (err) { // this error comes from anywhere inside the getMenuData function.
    res.status(500).send(SERVER_ERROR);
  }
});

/**
 * Returns a generated menu object using the categories and categories/item-directory
 * information.
 * @returns {Object} menu data for each category as shown in the API Documentation.
 */
async function getMenuData() {
  let result = {};
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
}

/**
 * Buggy getItemData - you can work through this on your own if you would like.
 *
 * This function should builds and return the item JSON given an item directory path relative to this file.
 *
 * @param {String} itemPath - full path for item in format categories/<category>/<item-name>.
 * where item-name is a directory name for an item within the respective <category>.
 * Example: getItemData("categories/drinks/bubble-tea")
 * @returns {Object} - result item data, if the itemPath exists.
 * Example:
 * { "name" : "Bubble Tea", "description" : "Bubbles.",
 *   "image" : "tea.png", "in-stock" : true }
 */
function getItemData(itemPath) {
  let itemName = await path.basename(itemPath);
  let formattedName = formatTitleCase(itemName);
  let contents = await fs.readFile(itemPath + "/info.txt");
  /* Example info.txt file:
   
Bubbles.
10
tea.png

  */
  let lines = contents;
  let description = lines[0]; // Bubbles.
  let qty = lines[1];         // 10
  let img = lines[2];         // tea.png
  let in-stock = qty > 0;
  let result = {
    "name" : formattedName,
    "image" : img,
    "description" : description,
    "in-stock" : in-stock
  };
  return result;
}

/**
 * A helper function that takes a dash-separated directory name and converts it to a 
 * Title Case name. Example: formatTitleCase("classic-coffee") returns "Classic Coffee".
 */
function formatTitleCase(dirName) {
  let words = dirName.split("-");
  let firstWord = words[0];
  // str.slice(n) returns a substring of str starting at index n (inclusive)  
  // This line just upper-cases the first letter of a string.
  let result = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  for (let i = 1; i < words.length; i++) {
    let nextWord = words[i];
    result += " " + nextWord.charAt(0).toUpperCase() + nextWord.slice(1);
  }
  return result;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
