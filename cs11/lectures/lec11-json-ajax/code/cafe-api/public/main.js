
"use strict";

(function() {
  window.addEventListener("load", callbackExample2);

  function callbackExample2() {
    fetchCallback("/getAllData", function(data) {
      console.log(data);
    });
  }

  function callbackExample() {
    fetchCallback("/getRandomName", function(name) {
      capitalizeFirstLetterCallback(name, function(capitalizedName) {
        fetchCallback("/getGreeting/" + capitalizedName, function(greeting) {
          addPuncutationCallback(greeting, "!", function(greetingWithPunctuation) {
            id("greeting").textContent = greetingWithPunctuation;
          })
        })
      });
    });
  }

  function promiseExample() {
    fetch("/getRandomName")
      .then(checkStatus)
      .then(capitalizeFirstLetter)
      .then(function(capitalizedName) {
        return fetch("/getGreeting/" + capitalizedName)
      })
      .then(checkStatus)
      .then(function (greeting) {
        return addPuncutation(greeting, "!");
      })
      .then(function(greetingWithPunctuation) {
        id("greeting").textContent = greetingWithPunctuation;
      })

  }

  function capitalizeFirstLetterCallback(originalStr, callback) {
    callback(capitalizeFirstLetter(originalStr));
  }

  function capitalizeFirstLetter(originalStr) {
    return originalStr.charAt(0).toUpperCase() + originalStr.slice(1)
  }

  function addPuncutationCallback(originalStr, puncuation, callback) {
    callback(addPuncutation(originalStr, puncuation));
  }

  function addPuncutation(originalStr, puncuation) {
    return originalStr + puncuation;
  }

  function fetchCallback(url, callback) { // Hidden from students
    fetch(url)
      .then(checkStatus)
      .then(function (response) {
        callback(response)
      })
  }


  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    const OK = 200;
    const ERROR = 300;
    let responseText = response.text();
    if (response.status >= OK && response.status < ERROR || response.status === 0) {
      return responseText;
    } else {
      return responseText.then(Promise.reject.bind(Promise));
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();
