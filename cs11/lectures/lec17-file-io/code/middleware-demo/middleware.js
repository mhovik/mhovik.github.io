const express = require("express");
const app = express();

// defining middleware
// one middleware
function logger(req, res, next) {
  let requestTime = new Date();
  console.log("You sent a request at " + requestTime + "!");
  next(); // continue
}

// a second middleware
function hello(req, res, next) {
  res.write("Hello \n"); // use write when you want to output, but don't want to end
  next();
}

function bye(req, res, next) {
  res.write("Bye \n");
  res.end();
}

// using middleware
app.use(logger);
// app.use(bye);   // what happens?
// app.use(hello); // what happens?

app.get("/hello", hello, bye);

const PORT = process.env.PORT || 8000;
app.listen(PORT);
