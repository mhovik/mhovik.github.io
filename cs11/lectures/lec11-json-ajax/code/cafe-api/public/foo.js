"use strict";

const PUBLIC_PORT = 8000;
const INVALID_PARAM_ERROR_CODE = 400;
// const FOOD_DATA = {
//     "categories": {
//         "drinks": [{
//                 "name": "Classic coffee",
//                 "description": "The classic.",
//                 "image": "img/coffee-4.png",
//                 "in-stock": true
//             },
//             {
//                 "name": "Bubble Tea",
//                 "description": "Bubbles.",
//                 "image": "img/tea.png",
//                 "in-stock": true
//             }
//         ],
//         "foods": [{
//                 "name": "Cereal",
//                 "description": "To complement the most important drink of the day",
//                 "image": "img/cereals.png",
//                 "in-stock": true
//             },
//             {
//                 "name": "Noodles",
//                 "description": "To complement the most important drink of the day",
//                 "image": "img/cereals.png",
//                 "in-stock": true
//             },
//             {
//                 "name": "Dougnut",
//                 "description": "We don’t have bagels.",
//                 "image": "img/doughnut.png",
//                 "in-stock": false
//             }
//         ]
//     }
// };

const FOOD_DATA = {
  "categories": {
    "drinks": {
      "Classic Coffee": {
        "description": "The classic.",
        "image": "img/coffee-4.png",
        "in-stock": true
      },
      "Bubble Tea": {
        "description": "Bubbles.",
        "image": "img/tea.png",
        "in-stock": true
      }
    },
    "foods": {
      "Cereal": {
        "description": "To complement the most important drink of the day",
        "image": "img/cereals.png",
        "in-stock": true
      },
      "Noodles": {
        "name": "Noodles",
        "description": "To complement the most important drink of the day",
        "image": "img/cereals.png",
        "in-stock": true
      },
      "Dougnut": {
        "name": "Dougnut",
        "description": "We don’t have bagels.",
        "image": "img/doughnut.png",
        "in-stock": false
      }
    }
  }
};

const express = require('express');
const app = express();

app.get('/getAllData', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json(FOOD_DATA);
});

app.get('/getCategories', async (req, res) => {
  res.set('Content-Type', 'application/json');
  res.json(Object.keys(FOOD_DATA["categories"]));
});

app.get('/getItems/:category', async (req, res) => {
  res.set('Content-Type', 'application/json');
  if (FOOD_DATA["categories"][req.params["category"]]) {
    res.json(Object.keys(FOOD_DATA["categories"][req.params["category"]]));
  } else {
    res.status(INVALID_PARAM_ERROR_CODE).send("Error: Invalid Category");
  }
});

app.get('/getItemInfo/:category/:item', async (req, res) => {
  res.set('Content-Type', 'application/json');
  if (FOOD_DATA["categories"][req.params["category"]]) {
    if (FOOD_DATA["categories"][req.params["category"]][req.params["item"]]) {
      res.json(FOOD_DATA["categories"][req.params["category"]][req.params["item"]]);
    } else {
      res.status(INVALID_PARAM_ERROR_CODE).send("Error: Invalid Item");
    }
  } else {
    res.status(INVALID_PARAM_ERROR_CODE).send("Error: Invalid Category");
  }
});


app.use(express.static("public"));
app.listen(PUBLIC_PORT);
