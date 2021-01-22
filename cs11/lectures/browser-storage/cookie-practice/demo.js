"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.get("/makeLoginCookie", (req, res) => {
  res.cookie("logged-in", "true", { expires: new Date(Date.now() + 5000)});
  res.type("text");
  res.send("You're logged in!");
});

app.get("/cart", (req, res) => {
  if (req.cookies["logged-in"] && req.cookies["logged-in"] === "true") {
    res.json({ "msg" : "Here's your cart!"});
  } else {
    res.status(400).send("You're not logged in");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
