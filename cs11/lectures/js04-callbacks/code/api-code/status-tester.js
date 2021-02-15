/**
 * @author Melissa Hovik
 * A status tester to test differenet status codes and simulate result
 * responses (inspect the Response object returned in the fetch promise!).
 * Remember that a status code of 200-299 is ok, but other codes will
 * be indicative of request errors. HOWEVER, these errors will not cause
 * the catch statement of a fetch call to be reached, unless we throw the
 * error in checkStatus.
 *
 * This example also includes a demo with 5 asynchronous responses using
 * the optional sleep parameter for the status code tester!
 */
"use strict";
(function() {
  const URL = "https://httpstat.us/";

  window.addEventListener("load", init);

  /**
   * init comment here
   */
  function init() {
    id("fetch-btn").addEventListener("click", getStatusData);
  }

  /**
   * If the status code input text has a value, will fetch data
   * about that status code. Otherwise, will fetch 5 random status
   * codes with random sleep (delay) values to demonstrate asynchronous
   * requests (check out the Network tab!)
   */
  function getStatusData() {
    // fetchStatus(200, 0); // demo calls from lecture
    // fetchStatus(201, 1000);
    // fetchStatus(418, 2000);
    // fetchStatus(500, 500);
    let statusCode = parseInt(id("status-code").value);
    if (statusCode) {
      fetchStatus(statusCode)
    } else {
      fetch5Random();
    }
  }

  /**
   * Fetches from the HTTP services to simulate a status code response
   * and optional delay (sleep). Note that this is an example of setting
   * default parameters in JS (if no second argument is passsed to this function,
   * sleep is set to 0 for no delay).
   * @param {Number} statusCode - status code to fetch response/simulate status code in Response
   * @param {Number} sleep (optional) - millesconds to force a delay in the service fetch call.
   */
  function fetchStatus(statusCode, sleep=0) {
    fetch(URL + statusCode + "?sleep=" + sleep)
      // uncommented so that we can add results when Responses are non-200 codes
      // .then(checkStatus)
      .then(addResult)
      .catch(handleError);
  }

  /**
   * A function to simulate 5 fetch calls with random status codes and delays.
   * Checkout the Network tab to see asynchronous requests in action!
   */
  function fetch5Random() {
    for (let i = 1; i <= 5; i++) {
      let randomDelay = Math.floor(Math.random() * 5000);
      fetchStatus(i * 100, randomDelay);
    }
  }

  /**
   * Inspects the Response object returned by the fetch call, adding an li
   * to the results list on the page with information about the response.status (e.g. 200)
   * and response.statusText (e.g. "OK").
   * @param {Response} - response object from a fetch request.
   */
  function addResult(response) {
    let li = document.createElement("li");
    li.textContent = "Request status: " + response.status + ", " +
                     "Status text: " + response.statusText;
    id("results").appendChild(li);
  }

  /**
   * This page intentially does not catch errors (we want to add information from different
   * status codes, including ones that are not "ok") but this function is included to
   * help students better understand why we use response.statusText to provide a bit more information
   * about the thrown Response Error in other fetch programs.
   */
  function checkStatus(response) {
    if (response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /**
   * A very trivial handleError function to handle an error. This will only be
   * called if we throw an Error or there is no network connection.
   */
  function handleError() {
    console.error("There was an error.");
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
