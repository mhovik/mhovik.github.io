/**
 * @author Melissa Hovik
 * CSE154 Summer 2019
 * Lecture 17: More Node.js and File I/O
 *
 * The Greeter API says hello! An example to show serving static files
 * in a Node.js project and fetch from a webservice (see public/greeter.js).
 */
"use strict";
const express = require("express");
const app = express();

// Use static midddleware to set the directory to serve static files
app.use(express.static("foo"));

app.get("/", (req, res) => {
  res.type("text"); // equivalent to res.set("Content-type", "text/plain");
  res.send("Hello!");
});

app.get("/:name", (req, res) => {
  let name = req.params.name;
  let type = req.query.type;
  if (type) {
    if (type === "text") {
      res.type("text");
      res.send("Hello " + name + "!");
    } else if (type === "json") {
      res.json({ "msg" : "Hello " + name + "!"});
    } else {
      res.type("text");
      res.status(400).send("Type query parameter must be text or json"); 
    }
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
