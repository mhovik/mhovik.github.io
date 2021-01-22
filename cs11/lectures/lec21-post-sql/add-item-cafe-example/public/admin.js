"use strict";
(function() {
  const IMG_URL = "img/";

  window.addEventListener("load", init);

  /**
   * Retrieves the cafe menu dynamically using fetch! If something goes
   * wrong with the request (e.g. the data is missing or there is no network
   * connection) will display an error message on the page instead.
   */
  function init() {
    id("login").addEventListener("click", adminLogin);
    // todo: add a form to add an item!
    id("item-form").addEventListener("submit", (evt) => {
      // This evt only fires if the HTML5 validation checks have passed.
      // prevent default page-refresh behavior
      evt.preventDefault();
      addItem();
    });
    id("item-name").addEventListener("input", function(evt) {
      id("item-template").querySelector("h3").textContent = this.value;
    });
    id("description").addEventListener("input", function(evt) {
      id("item-template").querySelector("p").textContent = this.value;
    });
    loadImages();
  }

  // An example of a simple POST request with a test admin account.
  function adminLogin() {
    let username = id("username").value;
    let pw = id("password").value;
    let params = new FormData();
    params.append("username", username);
    params.append("password", pw);

    fetch("/menu", { method : "POST", body : params })
      .then(checkStatus)
      .then(resp => resp.text())
      .then(displaySuccess)
      .then(loadImages)
      .catch(handleError);
  }

  function addItem() {
    let params = new FormData(id("item-form"));
    fetch("/addItem", { method : "POST", body : params })
      .then(checkStatus)
      .then(resp => resp.text())
      .then(displaySuccess)
      .catch(handleError);
  }

  function loadImages() {
    fetch("/images")
      .then(checkStatus)
      .then(resp => resp.text())
      .then(populateDropdown)
      .catch(handleError)
  }

  function populateDropdown(responseText) {
    let lines = responseText.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let imageName = lines[i];
      if (imageName) {
        let option = gen("option");
        option.textContent = imageName;
        option.value = imageName;
        id("images").appendChild(option);
      }
    }
    id("images").addEventListener("change", changeImage);
    id("admin-section").classList.remove("hidden");
    id("login-section").classList.add("hidden");
  }

  function changeImage() {
    if (this.value) {
      id("item-image").src = IMG_URL + this.value;
      id("item-image").alt = this.value.split("img/")[1];
    }
  }

  function displaySuccess(responseText) {
    id("results").textContent = responseText;
  }


  function handleError(message) {
    id("results").textContent = "Something went wrong in the kitchen service...";
  }

  /**
   * A user-friendly error message when something goes wrong in a fetch request.
   */
  function handleError() {
    id("results").textContent = "Something's wrong in the cafe kitchen... Please try again later!";
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
