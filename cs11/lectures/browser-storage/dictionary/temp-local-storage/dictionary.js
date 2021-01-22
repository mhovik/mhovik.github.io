//
// Section: CSE 154
// Dictionary example, Spring 2019
// This version for the file uses local storage to store the definitions.
//
(function() {

  /**
   * Connect the add-entry button with the event handler
   */
  window.addEventListener("load", init);

  /**
   *  Initialize the add entry button as well as other things on the page
   */
  function init() {
    id("add-entry").addEventListener("click", addEntry);

    // if we were to do this right we would go through all of the terms and definitions
    // that are currently stored in the localStorage and re-load them into #current-entries
    loadSavedEntries();
  }

  function loadSavedEntries() {
    let entries = window.localStorage.getItem("entries");
    if (entries) {
      entries = JSON.parse(entries);
      for (let i = 0; i < entries.length; i++) {
        let li = document.createElement("li");
        let entry = entries[i]; // { Parrot : "A bird." }
        let term = Object.keys(entry)[0];
        let definition = entry[term];
        li.textContent = term + ": " + definition;
        id("entries").appendChild(li);
      }
    }
  }

  /**
   * Function to handle adding an entry to the database.
   */
  function addEntry() {
    let term = id("term").value;
    let definition = id("definition").value;
    if (term && definition) {

      let li = document.createElement("li");
      li.textContent = term + ": " + definition;

      // add the information to localStorage
      //window.localStorage.setItem(term, definition);
      let entries = [];
      if (window.localStorage.getItem("entries")) {
        entries = JSON.parse(window.localStorage.getItem("entries"));
      }
      let entry = {};
      entry[term] = definition;
      entries.push(entry);
      console.log(entries);
      window.localStorage.setItem("entries", JSON.stringify(entries));


      id("entries").appendChild(li);
      id("current-entries").classList.remove("hidden");

      li.addEventListener("dblclick", removeEntry);
      id("term").value = "";
      id("definition").value = "";

    }
  }

  /**
   * Function call when the item is double clicked to remove it.
   */
  function removeEntry() {
    let term = this.textContent.split(":")[0];

    // remove item from local storage
    window.localStorage.removeItem(term, false);

    id("entries").removeChild(this);
    hideEntries();
  }

  /**
   * Function to handle adding an entry to the database.
   */
  function hideEntries() {
    // no entries in current-entries
    if (!(qsa("li").length || id("current-entries").classList.contains("hidden"))) {
      id("current-entries").classList.add("hidden");
    }
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

})();
