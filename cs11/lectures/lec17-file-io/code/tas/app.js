/**
 * @author Melissa Hovik
 * CSE154 Summer 2019
 * Lecture 17: More Node.js and File I/O
 *
 * A lecture example to show a more interesting CSE154 TA API to motivate
 * file I/O (not yet implemented!). We implemented /tas and /tas/:section endpoints
 * in lecture, but the solution with sections/ and /sections/:ta endpoints are also included.
 * Next week, we'll see how to add API Documentation to an API like this!
 */
"use strict";
const express = require("express");
const app = express();

// Try factoring this out as a .json file and use fs.readFile to implement a new version of this API!
const SECTIONS = {
  "AA" : "Tal",
  "AB" : "Hudson",
  "AC" : "Sven",
  "AD" : "Manny-Theresa"
};

app.get("/tas", (req, res) => {
  console.log("Test");
  let names = Object.values(SECTIONS);
  res.json(names); // same as res.type("json"); res.send(names);
});

app.get("/tas/:section", (req, res) => {
  let section = req.params.section.toUpperCase();
  if (SECTIONS[section]) {
    res.type("text");
    res.send(SECTIONS[section]);
  } else {
    res.status(400).send("No TA found for section: " + section);
  }
});

app.get("/sections", (req, res) => {
  let sections = Object.keys(SECTIONS);
  res.json(sections); // same as res.type("json"); res.send(sections);
});

app.get("/sections/:ta", (req, res) => {
  let taName = req.params.ta;
  let section = getSection(taName);
  res.type("text");
  if (section) {
    res.send(section);
  } else {
    res.status(400).send("No section found for TA: " + taName);
  }
});

/**
 * A helper function to return the name of the TA associated with the section
 * (case-insensitive).
 * @param {String} taName - name of TA to retrieve section for (e.g. "Tal")
 * @return {String} section code (e.g. "AA") or null if TA not found
 */
function getSection(taName) {
  taName = taName.toLowerCase();
  for (let key in SECTIONS) {
    if (SECTIONS[key].toLowerCase() === taName) {
      return key;
    }
  }
  return null; // indicates no section for given TA
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
