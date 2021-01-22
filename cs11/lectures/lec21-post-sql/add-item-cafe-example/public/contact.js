"use strict";
(function() {
  window.addEventListener("load", init);

  function init() {
    id("contact-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      postMsg();
    });
  }

  function postMsg() {
    let data = new FormData(id("contact-form"));

    fetch("/contact", { method : "POST", body : data })
      .then(checkStatus)
      .then(resp => resp.text())
      .then(showSuccess)
      .catch(handleError);
  }

  function showSuccess(responseText) {
    id("results").textContent = responseText;
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
