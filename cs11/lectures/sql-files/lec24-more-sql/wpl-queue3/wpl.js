/**
 * CSE 154 - Spring 2019
 * Author: Melissa Hovik
 *
 * JS to demo basic submission using AJAX/fetch. Remember to prevent the default submit
 * behavior and use FormData to send form elements as POST parameters! Each element
 * in the form tag should have a name attribute which defines the parameter name sent.
 * For example, <input name="sid" ... /> will be sent in the request with the key/value
 * pair: sid=1234567 (if the value in the text box is entered as 1234567)
 */
(function() {
  "use strict";

  const SELECT_URL = "wpl-select.php";
  const INSERT_URL = "wpl-insert.php";
  const DELETE_URL = "wpl-delete.php";


  window.addEventListener("load", initialize);

  /**
   * Override the default submission behavior for the form's submit event.
   */
  function initialize() {
    loadQueue();
    //setInterval(1000, loadQueue); // load the queue again every second in case someone
                                  // else updates it.
    id("input-form").addEventListener("submit", function(e) {
      // if we've gotten in here, all HTML5 validation checks have passed
      e.preventDefault();
      submitRequest();
    });
  }

  /**
   * Send form data to the WPL web service. Note that this function is called only
   * after all HTML5 validation constraints (e.g. required attributes) have passed!
   */
  function submitRequest() {
    let formData = new FormData(id("input-form"));

    // Note that unlike GET requests, no url parameters passed in a POST request!
    fetch(INSERT_URL, { method : "POST", body : formData })
      .then(checkStatus)
      .then(loadQueue)
      .catch(handleError);
  }



  /**
   *  Make a query request the API to get everyone currently in the queue.
   */
  function loadQueue() {
   // display loading text and disable button while ajax call is loading
   id("results").innerText = "Loading...";
   id("submit-btn").disabled = true;

   //start ajax call
   fetch(SELECT_URL)
      .then(checkStatus)
      .then(JSON.parse)
      .then(showResponse)
      .catch(handleError);
  }


  function showResponse(data) {
    id("submit-btn").disabled = false;

    id("results").classList.add("hidden");
    id("queue").innerHTML = "";
    let ol = document.createElement("ol");
    for (let i = 0; i < data.length; i++) {
      let li = document.createElement("li");
      li.innerText = "(" + data[i]["time"] + ") "
                      + data[i]["name"] + ":  "
                      + data[i]["question"] ;
      li.id = "row=" + data[i]["id"];
      li.addEventListener("dblclick", function() {removeItem(this);});
      ol.appendChild(li);
    }
    id("queue").appendChild(ol);
  }

  function removeItem(item) {
    // ids are stored as row-# so strip off the row-
    let id = item.id.substring(4);
    item.parentNode.removeChild(item);

    let formData = new FormData();
    formData.append("id", id);

    fetch(DELETE_URL, { method : "POST", body : formData })
       .then(checkStatus)
       // .then(JSON.parse)
       // .then(showResponse)
       .catch(handleError);

  }

  // For now, also just plop the error on the page. Can you make a more user-friendly solution?
  function handleError(responseText) {
    id("results").classList.remove("hidden");
    id("results").innerText = "Check out the Network tab for the response details!";
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
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();
