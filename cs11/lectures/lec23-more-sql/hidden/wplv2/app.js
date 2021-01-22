"use strict";
const express = require("express");
const app = express();
const multer = require("multer");

// To handle different POST formats
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

app.use(express.static("public"));

app.post("/login", (req, res) => {
  res.send({
    "2-min" : [{
      "name" : "Larry Page",
      "question" : "MAMP doesn't work. Please halp.",
      "qid" : 4
    }],
    "10-min" : [{
     "name" : "Dubs II",
     "question" : "I wanna learn PHP!",
     "qid" : 5
    }]
  });
});

app.get("/queue", (req, res) => {
  res.send({
    "2-min" : [{
      "name" : "Larry Page",
      "question" : "MAMP doesn't work. Please halp.",
      "qid" : 4
    }]
  });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT);
