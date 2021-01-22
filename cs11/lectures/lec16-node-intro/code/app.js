const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello!");
    console.log(process);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT + "...");
});
