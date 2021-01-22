"use strict";

const express = require('express');
const muter = require('multer');
const upload = muter();
const app = express();
const morgan = require("morgan");

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(upload.none());

app.use(morgan("combined"));

app.post('/hello', function(req, res) {
  res.json(req.body);
});

app.get('/', (req, res) => {
  console.log("hello");
  res.send("hello");
});

app.use(express.static("public"));
app.listen(8000);
