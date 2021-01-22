"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * init comment here
   */
   function init() {
     id("set-local-storage").addEventListener("click", setLocalStorage);
     id("set-session-storage").addEventListener("click", setSessionStorage);
     id("clear-local-storage").addEventListener("click", clearLocalStorage);
     id("clear-session-storage").addEventListener("click", clearSessionStorage);
   }

   function setLocalStorage() {
     window.localStorage.setItem("color-mode", "dark");
     window.localStorage.setItem("language", "en");
     window.localStorage.setItem("favorite-drink", "coffee");
     window.localStorage.setItem("vegetarian", "true");
     id("results").textContent = "localStorage populated!";
   }

   function setSessionStorage() {
     window.sessionStorage.setItem("color-mode", "dark");
     window.sessionStorage.setItem("language", "en");
     window.sessionStorage.setItem("favorite-drink", "coffee");
     window.sessionStorage.setItem("vegetarian", "true");
     id("results").textContent = "sessionStorage populated!";
   }

   function clearLocalStorage() {
     window.localStorage.clear();
     id("results").textContent = "localStorage cleared!";
   }

   function clearSessionStorage() {
     window.sessionStorage.clear();
     id("results").textContent = "sessionStorage cleared!";
   }

   /** ------------------------------ Helper Functions  ------------------------------ */
   /**
    * Returns the element that has the ID attribute with the specified value.
    * @param {string} idName - element ID
    * @returns {object} DOM object associated with id.
    */
   function id(idName) {
     return document.getElementById(idName);
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
