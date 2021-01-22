const fs = require("fs");

fs.readdir("data", (err, contents) => {
  if (err) {
    console.error(err);
  } else {
    console.log("data directory contents: ");
    console.log(contents);
  }
});
