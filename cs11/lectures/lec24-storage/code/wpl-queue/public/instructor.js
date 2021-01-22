"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * Override the default submission behavior for the form's submit event.
   */
  function init() {
    id("login-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      login();
    });

    id("ta-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      addTA();
    });
  }

  /**
   * Makes a GET fetch request to the server to TERMINATE all TAs. Status of operation appears as
   * text
   */
  async function terminateAll() {
    try {
      id("results").textContent = "Loading...";
      let response = await fetch("/terminate-all");
      response = checkStatus(response);
      let outcome = await response.text();
      id("results").textContent = outcome;
    } catch (error) {
      id("results").textContent = "Unable to terminate everyone.";
    }
  }

  /**
   * Makes a POST fetch request to the server to login, if successfull loads the queue else displays
   * error
   */
  async function login() {
    let loginInfo = new FormData(id("login-form"));
    try {
      id("results").textContent = "Loading...";
      let response = await fetch("/login-admin", {body: loginInfo, method: "POST"});
      response = checkStatus(response);
      let data = await response.json();
      loadStaff(data);
      hideLogin();
      id("terminate-all").addEventListener("click", terminateAll);
      id("terminate-all").classList.remove("hidden");
      id("staff-data-view").classList.remove("hidden");
      id("ta-form").classList.remove("hidden");
    } catch (err) {
      handleLoginError(err);
    }
  }

  /**
   * Makes a POST fetch request to the server to add a new TA
   */
  async function addTA() {
    let taInfo = new FormData(id("ta-form"));
    try {
      id("results").textContent = "Loading...";
      let response = await fetch("/add-ta", {body: taInfo, method: "POST"});
      response = checkStatus(response);
    } catch (err) {
      handleTAError(err);
    }
  }

  /**
   * Displays to the user that an error has occurred and was not able to add the new TA
   */
  function handleTAError(err) {
    id("results").textContent = "Was not able to add TA :(";
  }

  /**
   * Displays whatever error has occurred visually on the page
   * @param {String} err - The error message of the error that was encountered
   */
  function handleLoginError(err) {
    id("results").textContent = "You are not an admin!";
  }

  /**
   * Displays all of staff members and their information
   * @param {JSON[]} data - JSON object of all of the staff members
   */
  function loadStaff(data) {
    for (let i = 0; i < data.length; i++) {
      let newRow = gen("tr");
      let newId = gen("td");
      newId.textContent = data[i]["uwid"];
      let newUsername = gen("td");
      newUsername.textContent = data[i]["username"];
      let newSection = gen("td");
      newSection.textContent = data[i]["section"];
      let newAction = gen("td");
      let newButton = gen("button");
      newButton.textContent = "TERMINATE";
      newButton.addEventListener("click", function() {
        terminateStaff(data[i]["uwid"]);
      });
      newRow.appendChild(newId);
      newRow.appendChild(newUsername);
      newRow.appendChild(newSection);
      newAction.appendChild(newButton);
      newRow.appendChild(newAction);
      id("staff-table").appendChild(newRow);
    }
    id("results").textContent = ""; // clear loading text
  }

  /**
   * Makes a POST fetch request to the server to terminate a TA
   * @param {String} id - The userID of the staff to terminate
   */
  async function terminateStaff(id) {
    try {
      let data = new FormData();
      data.append("id", id);
      let response = await fetch("/terminate-staff", {method: "POST", body: data});
      response = await checkStatus(response);
      id("results").textContent = await response.text();
    } catch (err) {
      id("results").textContent = "Unable to terminate staff member.";
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Hides the login form after a successful login
   */
  function hideLogin() {
    id("login-form").classList.add("hidden");
  }

  /**
   * This function needs documentation.
   * @returns {} response
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response);
    }
    return response;
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
