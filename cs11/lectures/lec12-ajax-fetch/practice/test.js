let URL = "https://icanhazdadjoke.com/"; 
let jsonData = null;
fetch(URL, {
  headers: {
    "Accept" : "application/json"
  }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Response status: " + response.statusText);
    }
  })
  .then((data) => {
    debugger;
  })
  .then((data) => {
    jsonData = data;
  })
  .catch(console.error);
