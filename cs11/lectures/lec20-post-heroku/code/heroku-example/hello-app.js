"use strict";
/**
 * An example starter app to test your first Heroku deployment.
 * Refer to https://courses.cs.washington.edu/courses/cse154/19su/resources/assets/node/deploying-heroku-app.pdf for more details.
 * Don't forget to add "start" : "node hello-app.js" to package.json!
 */
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.type("text");
  res.send("Testing on Heroku!"); 
});

// On public servers like Heroku's, process.env.PORT will now be important!
// We will want to include the local port option when developing on our own machines though.
const PORT = process.env.PORT || 8000;
app.listen(PORT);
