/**
 * CSE 154 - Summer 2019
 * Author: Melissa Hovik
 * 1. Login to POST /login (returns JSON queue { "2-min" : [...], "10-min" : [...]})
 * - if validated, hide login, show queue
 * - else show error message in #results
 * 2. Dequeue marks student in queue table as "dequeued"
 * 3. Add admin interface to add new students/tas?
 */
(function() {
  "use strict";

  window.addEventListener("load", init);

  /**
   * Override the default submission behavior for the form's submit event.
   */
  function init() {
    // 1. Login
    // - If validated, return queue as JSON with all student data (filter by status = "waiting").
    id("login-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      login();
    });
  }

  async function login() {
    let loginInfo = new FormData(id("login-form"));
    try {
      id("results").textContent = "Loading...";
      let response = await fetch("/login", { body : loginInfo, method : "POST" });
      response = checkStatus(response);
      let data = await response.json();
      loadQueue(data);
    } catch (err) {
      handleLoginError(err);
    }
    //setInterval(loadQueue, 500);    // load the queue again every second in case someone
                                      // else updates it.
  }

  function handleLoginError(err) {
    // id("results").textContent = "Invalid log-in credentials.";
    id("results").textContent = err;
  }

  // { "2-min" : [{name : Larry Page, qid : 4, question : "Halp plz." }]}
  function loadQueue(responseData) {
    genTable("two-min-queue", responseData["2-min"]);
    genTable("ten-min-queue", responseData["10-min"]);
    id("results").textContent = ""; // clear loading text
  }

  function genTable(tableId, students) {

    for (let i = 0; i < students.length; i++) {
      let tr = gen("tr");
      let student = students[i];
      let name = gen("td");
      name.textContent = student.name;

      let question = gen("td");
      question.textContent = student.name;

      let dq = gen("button");
      dq.textContent = "Dequeue";
      tr.appendChild(name);
      tr.appendChild(question);
      tr.appendChild(dq);

      dq.addEventListener("click", async () => {
        try {
          await changeStatus(student.qid);
          this.parentNode.parentNode.remove();
        } catch {
          id("results").textContent = "There was an error dequeueing the student.";
        }
      });
      id(tableId).appendChild(tr);
    }
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

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
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
