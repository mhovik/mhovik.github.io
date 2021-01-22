"use strict";
(function() {
let menu = {
  "categories" : {
    "Drinks" : [
      {
        "name" : "Classic coffee",
        "description" : "The classic.",
        "image" : "img/coffee-4.png",
        "in-stock" : true
      },
      {
        "name" : "Bubble Tea",
        "description" : "Bubbles.",
        "image" : "img/tea.png",
        "in-stock" : true
      },
      {
        "name" : "The Sippy",
        "description" : "The classic. In a sippy cup.",
        "image" : "img/coffee-3.png",
        "in-stock" : false
      }
    ],
    "Foods" : [
      {
        "name" : "Cereal",
        "description" : "To complement the most important drink of the day",
        "image" : "img/cereals.png",
        "in-stock" : true
      },
      {
        "name" : "Coffee Noodles",
        "description" : "The next big thing.",
        "image" : "img/noodles.png",
        "in-stock" : true
      },
      {
        "name" : "Dougnut",
        "description" : "We don't have bagels.",
        "image" : "img/doughnut.png",
        "in-stock" : false
      }
    ]
 }
};

  window.addEventListener("load", init);

  function init() {
    populateMenu();
    //addCoffeeItem();
  }

  function populateMenu() {
    let categories = Object.keys(menu.categories);
    for (let category of categories) {
      let section = gen("section");
      let itemContainer = gen("div");
      itemContainer.classList.add("item-container");
      let h3 = gen("h3");
      h3.textContent = category;

      let categoryItems = menu.categories[category];
      for (let i = 0; i < categoryItems.length; i++) {
        addItem(section, categoryItems[i]);
      }
      id("menu-container").appendChild(section);
    }
  }

  function addItem(categorySection, itemData) {
    let article = gen("article");
    let h3 = gen("h3");
    let img = gen("img");
    let hr = gen("hr");
    let p = gen("p");
    h3.textContent = itemData.name;
    img.src = itemData.image;
    img.alt = itemData.name;
    p.textContent = itemData.description;
    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(hr);
    article.appendChild(p);
    categorySection.appendChild(article)
    return article;
  }

  function addCoffeeItem() {
    /*
    Goal: Create the following article using JS and add it to #item-container!
    <article>
      <h3>Classic Coffee</h3>
      <img src="img/coffee-4.png" alt="Classic Coffee" />
      <hr>
      <p>The classic.</p>
    </article>
    */
    let article = gen("article");
    let h3 = gen("h3");
    let img = gen("img");
    let hr = gen("hr");
    let p = gen("p");
    h3.textContent = "Classic Coffee";
    img.src = "img/coffee-4.png";
    img.alt = "Classic Coffee";
    p.textContent = "The classic.";
    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(hr);
    article.appendChild(p);
    id("item-container").appendChild(article);
  }

  function id(idName) {
    return document.getElementById(idName);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
