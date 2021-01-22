//
// Section: CSE 154
// Sample Dictionary code (used in 18sp midterm)
// This is the original file that did not store data
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
  }

  /**
   * Function to handle adding an entry to the database.
   */
  function addEntry() {
    let term = id("term").value;
    let definition = id("definition").value;
    if (term && definition) {

      let li = document.createElement("li");
      li.innerHTML = term + ": " + definition;
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
    let term = this.innerText.split(":")[0];

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
