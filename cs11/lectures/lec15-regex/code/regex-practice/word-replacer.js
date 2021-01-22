/*
 * @author Melissa Hovik
 * CSE154 Summer 2019
 * Validation and Regex Examples
 *
 * Example for using regular expressions to find and replace strings
 * in a basic search/replace webpage tool. Try adding more features
 * like a checkbox for ignoring letter-casing, displaying the number
 * of strings replaced, etc.!
 */
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Set up the click event handler for finding/replacing input text
   * and displaying the result on the page.
   */
  function init() {
    id("replace-btn").addEventListener("click", replaceText);
  }

  /**
   * Replaces all occurrences of the input "find" text with the input "replace"
   * text in the value of the textarea and outputs the result on the page.
   */
  function replaceText() {
    let search = id("find").value;
    // "ig" are optional flags:
    // "i" - ignore case in search
    // "g" - 'global' search to replace all occurrences (otherwise only one match is replaced)
    // More information here: https://eloquentjavascript.net/09_regexp.html
    let searchRegex = new RegExp(search, "ig");
    let replace = id("replace").value;
    let input = id("input-text").value;
    if (search && replace && input) {
      let output = input.replace(searchRegex, replace);
      id("output").textContent = output;
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }
})();
