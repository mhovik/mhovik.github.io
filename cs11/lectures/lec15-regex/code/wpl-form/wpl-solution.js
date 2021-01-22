/**
 * CSE 154 - Summer 2019
 * Author: Melissa Hovik
 *
 * JS to demo basic submission using AJAX/fetch. Remember to prevent the default submit
 * behavior and use FormData to send form elements as POST parameters! Each element
 * in the form tag should have a name attribute which defines the parameter name sent.
 * For example, <input name="sid" ... /> will be sent in the request with the key/value
 * pair: sid=1234567 (if the value in the text box is entered as 1234567)
 */
"use strict";
(function() {

  const URL = "https://courses.cs.washington.edu/courses/cse154/webservices/wpl/wpl.php";

  window.addEventListener("load", init);

  /**
   * Override the default submission behavior for the form's submit event.
   */
  function init() {

    id("input-form").addEventListener("submit", function(e) {
      // if we've gotten in here, all HTML5 validation checks have passed
      e.preventDefault();
      submitRequest();
    });

    id("log-queue").addEventListener("click", logQueue);
  }

  /**
   * Send form data to the WPL web service. Note that this function is called only
   * after all HTML5 validation constraints (e.g. required attributes) have passed!
   */
  function submitRequest() {
    let formData = new FormData(id("input-form"));

    // Solution 2: Can alternatively append only the elements we want
    // (ignoring email, for example), which happen to be
    // student id, name, minutes, and question for the wpl.php POST request:

    /*
    let formData = new FormData();

    // Build the 4 parameters for our POST request
    formData.append("sid", qs("input[name='sid']").value);
    formData.append("name", qs("input[name='name']").value);
    formData.append("minutes", qs("textarea").value);
    formData.append("question", qs("input[name='minutes']:checked").value);
     */

    // Note that unlike GET requests, no url parameters passed in a POST request!
    fetch(URL, { method : "POST", body : formData })
      .then(checkStatus)
      .then(resp => resp.text())
      .then(showResponse) // The wpl.php will return plain text for this demo, no JSON
      .catch(handleError);
  }

  // Just plop the response on the page for now. Can you make a more user-friendly solution?
  function showResponse(responseText) {
    id("results").textContent = responseText;
  }

  function logQueue() {
    fetch(URL + "?mode=list")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(showQueue)
      .catch(handleError);
  }

  function showQueue(responseData) {
    let h2 = gen("h2");
    h2.textContent = "Current Queue:";
    id("current-queue").appendChild(h2);
    let queue = responseData.queue;
    for (let i = 0; i < queue.length; i++) {
      let queueType = queue[i];
      if (queueType["students"].length > 0) {
        addQueueList(queueType["minutes"], queueType["students"]);
      }
    }
  }

  function addQueueList(mins, students) {
    let p = gen("p");
    let ul = gen("ul");
    p.textContent = mins + " minute queue:";
    for (let i = 0; i < students.length; i++) {
      let li = gen("li");
      li.textContent = students[i].name + ": " + students[i].question;
      ul.appendChild(li);
    }
    id("current-queue").appendChild(p);
    id("current-queue").appendChild(ul);
  }

  // For now, also just plop the error on the page. Can you make a more user-friendly solution?
  function handleError(responseText) {
    id("results").textContent = "Check out the Network tab for the response details!";
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

  function gen(tagName) {
    return document.createElement(tagName);
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

})();
