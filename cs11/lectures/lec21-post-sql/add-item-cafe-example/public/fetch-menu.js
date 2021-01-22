"use strict";
/**
 * File comment needed. 
 */
(function() {
  const IMG_URL = "img/";
  window.addEventListener("load", init);

  /**
   * Retrieves the cafe menu dynamically using AJAX! If something goes
   * wrong with the request (e.g. the data is missing or there is no network
   * connection) will display an error message on the page instead.
   */
  function init() {
    requestMenu();
  }

  /**
   * Requests menu JSSON from the Cafe API, populating the page with categories and items.
   * Displays an error on the page if something goes wrong during the request.
   */
  function requestMenu() {
    fetch('/menu')
      .then(checkStatus)
      .then(response => response.json())
      .then(populateMenu)
      .catch(handleError);
  }

  /**
   * Populates the #menu-container with the menu JSON with the following structure
   * for each menu category:
   * <section>
   *   <h3>Category</h3>
   *   <div class="item-container">
   *     <article>...</article>
   *     <article>...</article>
   *   </div>
   * </section>
   */
  function populateMenu(menu) {
    // to get collection of keys in JSON
    let categories = Object.keys(menu.categories);

    // categories === { "Drinks" : [{item}, {item}], "Foods" : [{item, ...}]}
    for (let category of categories) { // "Drinks"
      let categorySection = genCategorySection(category);
      let itemContainer = gen("div");
      itemContainer.classList.add("item-container");

      // categoryItems === [{coffeeData}, {bubbleTeaData}, ...]
      let categoryItems = menu.categories[category];

      for (let i = 0; i < categoryItems.length; i++) {
        let item = categoryItems[i];
        if (item["in-stock"]) {
          let itemArticle = genItemCard(categoryItems[i]);
          itemContainer.appendChild(itemArticle);
        }
      }
      categorySection.appendChild(itemContainer);
      id("menu-container").appendChild(categorySection);
    }
  }

  /**
   * Returns a section container for a category.
   * @param {string} categoryName - category name (e.g. "Drinks")
   * @return {object} - section with heading for category container.
   * Example: <section><h3>Drinks</h3></section>
   */
  function genCategorySection(categoryName) {
    let section = gen("section");
    let h3 = gen("h3");
    h3.textContent = categoryName;
    section.appendChild(h3);
    return section;
  }

  /**
   * Returns an article with product data for an item.
   * @param {object} itemData - JSON object for itemData.
   * Example:
   * { name : "Classic Coffee",
   *   description: "The classic.",
   *   image : "coffee.png",
   *   "in-stock": true }
   * @return {DOMObject} - DOM object as article for item card, e.g.:
   * <article>
   *   <h3>Classic Coffee</h3>
   *   <img src="img/coffee.png" alt="Classic Coffee" />
   *   <hr />
   *   <p>The classic.</p>
   * </article>
   */
  function genItemCard(itemData) {
    let article = gen("article");
    let h3 = gen("h3");
    let img = gen("img");
    let hr = gen("hr");
    let p = gen("p");
    h3.textContent = itemData.name;
    img.src = IMG_URL + itemData.image;
    img.alt = itemData.name;
    p.textContent = itemData.description;
    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(hr);
    article.appendChild(p);
    return article;
  }

  /**
   * A user-friendly error message when something goes wrong in a fetch request.
   */
  function handleError() {
    let p = id("results");
    p.textContent = "Something's wrong in the cafe kitchen... Please try again later!";
  }

  /**
   * This function needs documentation.
   * @returns {} response
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
