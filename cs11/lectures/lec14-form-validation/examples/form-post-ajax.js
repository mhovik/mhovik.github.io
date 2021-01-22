(function() {
  "use strict";
  const URL = "submitter.php";

  window.addEventListener("load", initialize);

  function initialize() {
    qs("form").addEventListener("submit", function(e) {
      // if we've gotten in here, all html5 validation checks have passed
      e.preventDefault(); // submit action on forms by default redirect page, so prevent that behavior
      submitRequest();
    });
  }

  function submitRequest() {
    // Ideally, we'd also use JS to validate before submitting to server
    // Can use form DOM element as parameter to FormData!
    let data = new FormData(id("input-form"));
    fetch(URL, { method : "POST", body : data })
      .then(checkStatus)
      .then(showResponse)
      .catch(console.log);
  }

  function showResponse(responseText) {
    id("result").innerText = responseText;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /*
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();
