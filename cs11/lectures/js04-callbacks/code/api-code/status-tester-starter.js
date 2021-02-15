"use strict";
(function() {
  const URL = "https://httpstat.us/";

  window.addEventListener("load", init);

  /**
   * init comment here
   */
  function init() {
    id("fetch-btn").addEventListener("click", () => {
      fetchStatus(200, 0);
      fetchStatus(201, 1000);
      fetchStatus(418, 2000);
      fetchStatus(500, 500);
    });
  }

  function fetchStatus(statusCode, sleep) {
    // If sleep is passed, delay
    let url = URL + statusCode;
    if (sleep > 0) {
      url += "?sleep=" + sleep;
    }
    fetch(url)
      .then(checkStatus)
      .then(addResult)
      .catch(handleError);

  }

  function handleError(errMsg) {
    let li = document.createElement("li");
    li.textContent = errMsg;

    id("results").appendChild(li);
  }

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Request error: " + response.statusText);
    }
    return response;
  }

  function addResult(response) {
    let li = document.createElement("li");
    li.textContent = "Request status: " + response.status + " " +
                     "(status text: " + response.statusText + ")";
    id("results").appendChild(li);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }
})();
