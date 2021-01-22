"use strict";
/**
 * Demo to show code execution after res.send(). Remember that res.send does not
 * have any ability to terminate your JS program, but does close the HTTP connection, meaning
 * cannot modify the Response object any further - if you try, an error will be logged to the terminal.
 */
const express = require("express");
const app = express();

/**
 * Says hello given a required name query parameter.
 * Example: /hello?name=dubs returns "Hello dubs!"
 * Sends a 400 plain text error if missing the required name parameter.
 */
app.get("/hello", (req, res) => {
  if (!req.query.name) {
    res.status(400).send("Missing required name query parameter.");
  }
  // this is logged after the 400 error
  console.log("After missing parameter check.");
  // this doesn't send, but will log an error in the terminal because we're trying to use res.
  res.send("Hello " + req.query.name + "!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
