/**
 * @author Melissa Hovik
 * CSE154 Summer 2019
 * Lecture 17: More Node.js and File I/O
 *
 * A lecture example to show serving static files
 * in a Node.js project and fetch from a webservice (see ../app.js).
 */
"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Make a request to the Greeter API when the hello button is clicked.
   */
  function init() {
    id("hello-btn").addEventListener("click", sayHello);
  }

  /**
   * Make a request to the Greeter API, passing in a name parameter
   * if the name input is non-empty, and displaying the response on the page.
   */
  function sayHello() {
    let url = "/";
    let nameInput = id("name").value;
    if (nameInput) {
      url += nameInput;
    }
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(outputResponse)
      .catch(handleError);
  }

  /**
   * Displays the response on the page.
   * @param {string} responseText - text to display.
   */
  function outputResponse(responseText) {
    id("response").textContent = responseText;
  }

  /**
   * Displays an error message on the page using the message given to the Error.
   * @param {Error} - error object with error message.
   */
  function handleError(err) {
    id("response").textContent = "Something went wrong: " + err.message;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @return {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Checks the status of the response, throwing an Error if it has a non-200
   * status code, otherwise returning back the response.
   * @param {Response} Response object to check
   * @return {Response} unmodified Response object if successful
   * @throws {Error} if Response has non-200 error code
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in Request: " + response.statusText);
    }
    return response;
  }
})();
