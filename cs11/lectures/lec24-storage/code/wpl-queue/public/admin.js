/**
 * CSE 154 - Summer 2019
 * Author: Melissa Hovik, Emmanuel Munoz
 * 1. Login to POST /login (returns JSON queue { "2-min" : [...], "10-min" : [...]})
 * - if validated, hide login, show queue
 * - else show error message in #results
 * 2. Dequeue marks student in queue table as "dequeued"
 * 3. Add admin interface to add new students/tas?
 */
"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Override the default submission behavior for the form's submit event.
   */
  function init() {

    login(true /* initial login attempt with cookies */); // attempt to login with cookies
    // getQueueIfLoggedIn(); -- cookie solution
    // 1. Login
    // - If validated, return queue as JSON with all student data (filter by status = "waiting").
    id("login-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      login(false); /* no cookies to log in with */
    });
  }

  /**
   * Makes a POST fetch request to the server to login, if successfull loads the queue else displays
   * error
   */
  async function login(checkCookies) {
    let loginInfo = new FormData(id("login-form"));
    try {
      id("results").textContent = "Loading...";
      let response = await fetch("/login", {body: loginInfo, method: "POST"});
      let ok = response.ok; // 200 status code
      let text = await response.text();
      if (ok) {
        await fetchQueue();
        hideLogin();
        id("queue-mgmt").classList.remove("hidden");
        id("logout").classList.remove("hidden");
        id("logout").addEventListener("click", () => {
          if (confirm("Are you sure you want to logout?")) {
            logout();
          }
        });
      }
      // show result text whether or not it was successful.
      if (!checkCookies || ok) {
        id("results").textContent = text;
      } else {
        id("results").textContent = ""; // clear Loading text
      }
    } catch (err) {
      handleLoginError();
    }
  }

  async function logout() {
    try {
      let response = await fetch("/logout", { method : "POST" });
      response = checkStatus(response);
      document.location.reload(); // refresh page.
    } catch (err) {
      handleError();
    }
  }

  /**
   * Fetches for the current WPL queue
   */
  async function fetchQueue() {
    let response = await fetch("/queue");
    response = checkStatus(response);
    let data = await response.json();
    loadQueue(data);
  }

  /**
   * Hides the login form after a successful login
   */
  function hideLogin() {
    id("login-form").classList.add("hidden");
  }

  // Just plop the response on the page for now. Can you make a more user-friendly solution?
  function showResponse(responseText) {
    id("results").textContent = responseText;
  }

  /*
   * @param {String} err - The error message of the error that was encountered
   */
  function handleError(responseText) {
    id("results").textContent = responseText;
  }

  /**
   * Displays whatever error has occurred visually on the page
   */
  function handleLoginError() {
    id("results").textContent = "Invalid log-in credentials.";
  }

  /**
   * Clears each queue table.
   */
  function clearQueue() {
    clearTable("2-min-queue");
    clearTable("10-min-queue");
  }

  /**
   * Clears a given table by removing all of its rows excluding the header row
   * @param {String} tableName - The ID of the table we are removing
   */
  function clearTable(tableName) {
    let tableRows = id(tableName).children;
    for (let i = 1; i < tableRows.length; i++) {
      id(tableName).removeChild(tableRows[i]);
      i--;
    }
  }

  /**
   * Displays all of the queue members from both queues and clears previous meme
   * @param {JSON[]} responseData - JSON object of all of the people inside both queues in an array
   */
  function loadQueue(responseData) {
    clearQueue();
    for (let i = 0; i < responseData.length; i++) {
      genRow(responseData[i]["length"] + "-min-queue", responseData[i], "Dequeue");
    }
    id("results").textContent = ""; // clear loading text
  }

  /**
   * Creates a row of a student in the queue and populates with relevant info
   * @param {String} tableId - The ID of the table being added to
   * @param {JSON} student - The JSON object of the student we are adding to the table
   */
  function genRow(tableId, student, action) {
    let tr = gen("tr");
    let name = gen("td");
    name.textContent = student.name;

    let question = gen("td");
    question.textContent = student.question;

    let dq = gen("button");
    dq.textContent = action;
    tr.appendChild(name);
    tr.appendChild(question);
    tr.appendChild(dq);

    dq.addEventListener("click", function() {
      //updateQueueMember(student.qid, student.name);
      dequeue(student.qid);
      this.parentNode.remove();
    });
    id(tableId).appendChild(tr);
  }

  /**
   * Makes a fetch call to update the status of queue member
   * @param {String} id - The queueID of the student being updated
   */
  async function updateQueueMember(id) {
    let response = await fetch("/update-status?qid=" + id);
    response = await checkStatus(response);
    let data = await response.text();
    id("results").textContent = data;
  }

  /**
   * Makes a fetch call to de-queues a student currently in the queue
   * @param {String} id - The queueID of the student being de-queue'd
   */
  async function dequeue(qid) {
    let params = new FormData();
    params.append("qid", qid);
    let response = await fetch("/dequeue", {method: "POST", body: params});
    checkStatus(response);
    let result = await response.text();
    id("results").textContent = result;
    // genRow("in-progress", student.name, "Mark Completed")
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
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
