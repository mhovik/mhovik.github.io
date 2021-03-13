/**
 * @author Melissa Hovik
 *
 * An example of using Node.js and Express with a few different GET endpoints
 * and parameters. Note that each get endpoint should be commented in your
 * web services!
 */
"use strict";
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("I got your request!");
  res.set("Content-type", "application/json");
  res.send({ "msg" : ["Hello", "world"] })
});

app.get("/:name", (req, res) => {
  res.set("Content-type", "text/plain");
  let name = req.params["name"];
  res.send("Hello " + name + "!");
});

app.get("/cityInfo", (req, res) => {
  res.set("Content-type", "text/plain");
  let state = req.query["state"];
  let city = req.query["city"];
  if (state && city) {
    res.send("State: " + state + ", city: " + city);
  } else {
    res.status(400).send("Missing required state and city parameters.");
  }
});

app.get("/states/:state/cities/:city", (req, res) => {
  res.set("Content-type", "application/json");
  let state = req.params["state"];
  let city = req.params["city"];
  res.send({"state" : state, "city" : city});
});


// /wa/98104
app.get("/:state/:city/:zip", (req, res) => {
    res.json(req.params);
    let test = new RegExp(/[0-9]{5}/).match(req.url.split("/")[2]);
});

app.get("/cityInfo", (req, res) => {
  let state = req.query["state"];
  let city = req.query["city"];
  if (state && city) {
    res.set("Content-type", "text/plain");
    res.send("State: " + state + ", city: " + city);
  } else {
    res.status(400).send("Missing required state and city parameters");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
