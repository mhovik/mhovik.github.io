"use strict";

/**
 * Author: Melissa Hovik
 * An example that uses localStorage and cookies to store notes for a user, demoed in 08.17.19 OH.
 * To practice with, make sure to import setup-notes.sql in phpMyAdmin, which creates two tables and adds some initial
 * rows with two users. Try adding a createAccount form and POST endpoint to practice! Remember you can change
 * localStorage to sessionStorage to store data on a specific browser session - local storage will be saved even when
 * the browser is closed, whereas session storage will be cleared when the browser is closed.
 *
 * This code is NOT fully documented.
 */
(function() {

  window.addEventListener("load", init);

  function init() {
    // Remember that cookies are used to pass information between client/server.
    // Your browser can access its cookies set by the website like this:
    getNotesIfLoggedIn();
    id("login-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      login();
    });
    id("notes-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      addNote();
      if (id("local-notes").children.length <= 1) {
        id("local-notes").innerHTML = ""; // Removes "no note in local storage yet"
      }
    });
    id("clear-notes").addEventListener("click", clearAllNotes);
    loadSavedNotes();
  }

  // Makes a request to the server to get notes if the user has a cookie set, populating the
  // #server-notes list if so so that a user doesn't have to login to the #login-form again.
  function getNotesIfLoggedIn() {
    fetch("/login", { method : "POST" })
      .then(checkStatus) // notes-app.js returns 200 if the user was logged in, returning their username.
      // You could also add a SQL query in the /login to get the user's name, which would be more user-friendly.
      .then(resp => resp.text())
      .then(result => {
        id("results").textContent = result; // e.g. "Welcome back mehovik!"
        id("login-view").classList.add("hidden");
        id("notes-view").classList.remove("hidden");
        getServerNotes();
      })
      .catch(() => {
        id("results").text = "The server says you haven't logged successfully in within 3 days. Please login!";
      });
  }

  function login() {
    let data = new FormData(id("login-form"));
    fetch("/login", { method : "POST", body : data})
      .then(checkStatus)
      .then(resp => resp.text())
      .then((result) => {
        id("results").textContent = result;
        id("notes-view").classList.remove("hidden");
        id("login-view").classList.add("hidden");
      })
      .catch(handleError);
  }

  function addNote() {
    // Try implementing a POST request to the POST /newNote endpoint for more practice.

    // local storage practice
    let tag = id("tag-input").value;
    let note = id("note-input").value;
    if (tag && note) {
      let newNote = { "tag" : tag, "note" : note};
      // [{ tag : "Personal", note : "Feed Mowgli." }]
      let notes = window.localStorage.getItem("notes");
      if (notes) {
        notes = JSON.parse(notes);
      } else { // start new notes collection if one doesn't yet exist.
        notes = [];
      }
      notes.push(newNote);
      let noteLi = document.createElement("li");
      noteLi.textContent = note + " (" + tag  + ")";
      id("local-notes").appendChild(noteLi);
      // window.localStorage always expects keys and values ass Strings, so if you want to store collections, you need
      // to convert between JSON and strings with JSON.parses/JSON.stringify.
      window.localStorage.setItem("notes", JSON.stringify(notes));
    }
  }

  function addNoteLi(noteListId, note) {
    let noteLi = document.createElement("li");
    noteLi.textContent = note.note + " (" + note.tag  + ")";
    id(noteListId).appendChild(noteLi);
  }

  function loadSavedNotes() {
    let notes = window.localStorage.getItem("notes");
    if (notes) {
      notes = JSON.parse(notes);
      for (let i = 0; i < notes.length; i++) {
        addNoteLi("local-notes", notes[i]);
      }
    } else {
      let noteLi = document.createElement("li");
      noteLi.textContent = "No notes in localStorage yet.";
      id("local-notes").appendChild(noteLi);
    }
  }

  // Fetches notes stored on db using client's cookie username.
  function getServerNotes() {
    fetch("/notes")
      .then(checkStatus)
      .then(resp => resp.json())
      .then(addServerNotes)
      .catch(handleError);
  }

  // Populates #server-notes with notes stored on db.
  function addServerNotes(data) {
    let notes = data.notes;
    if (!notes || notes.length === 0) {
      let noteLi = document.createElement("li");
      noteLi.textContent = "No notes returned by server.";
      id("server-notes").appendChild(noteLi);
    } else {
      for (let i = 0; i < notes.length; i++) {
        addNoteLi("server-notes", notes[i]);
      }
    }
  }

  // Clears localStorage notes.
  function clearAllNotes() {
    if (confirm("Are you sure you want to clear all of your local notes?")) {
      window.localStorage.removeItem("notes");
      id("local-notes").innerHTML = "";
      id("results").textContent = "All notes removed!";
    }
  }

  function handleError() {
    id("results").textContent = "There was an error.";
  }

  /**
    *  Shortcut to get the document element by id
    *  @param the string value of the ID of the DOM element you are getting
    *  @return the DOM element with that particular ID
    */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
    *  Shortcut to get the all of the document elements by query selector
    *  @param the string value of the query selector of the DOM elements you are getting
    *  @return the DOM elements with that particular query selector
    */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} response - response to check for success/error
    * @returns {object} - Response if status code is ok (200-level)
    */
   function checkStatus(response) {
     if (!response.ok) {
       throw Error("Error in request: " + response.statusText)
     }
     return response;
   }
})();
