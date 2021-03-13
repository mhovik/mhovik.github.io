/**
 * @author Melissa Hovik
 *
 * A program to fetch and display the Astronomy Picture of the Day from the NASA API.
 * This version compares the standard fetch then/catch chain with async/await.
 */
"use strict";
(function(){
  //get api key here: https://api.nasa.gov
  const API_KEY = "DEMO_KEY";
  const URL = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;

  window.addEventListener("load", init);

  /**
   * Initialize the ajax button to call the correct function when pressed.
   */
  function init() {
    id("apod-btn").addEventListener("click", () => {
      // The APOD API supports an optional date parameter
      // A valid date is 10 characters (YYYY-MM-DD)
      let date = "2019-08-05";
      // fetchAPOD(date);
      // fetchAPODAsync(date);

      // Chekc out the network tab with each solution to see synchronous vs. asynchronous requests in action!
      multiFetchRequest();
      // multiRequest();
      // multiRequestParallel();
    });
  }

  /**
   * Example 1: Function to start the ajax fetch call to APOD API for given date.
   * Upon success, shows the Astronomy Photo of the Day on the page. This is very close
   * to the function in the original APOD solution from Module 3.
   */
  function fetchAPOD(date) {
    let url = URL + "&date=" + date;
    //start fetch call chain
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(processApodJson)
      .catch(handleRequestError);
  }

  /**
   * Example 2: Async version of fetchAPOD function.
   */
  async function fetchAPODAsync(date) {
    let url = URL + "&date=" + date;
    try {
      let resp = await fetch(url)
      resp = checkStatus(resp);
      let data = await resp.json();
      processApodJson(data);
    } catch (err) {
      handleRequestError(err);
    }
  }

  /**
   * Helper function for Examples 3-5 to demonstrate async/await vs. standard fetch chain,
   * returning a Promise that resolves to the response JSON and rejects with any
   * possible request error.
   */
  async function fetchOneDay(date) {
    let url = URL + "&date=" + date;
    try {
      let resp = await fetch(url);
      resp = checkStatus(resp);
      let data = await resp.json();
      return data;
    } catch (err) {
      handleRequestError(err);
    }
  }

  /**
   * Example 3: 5 requests that are all initiated "simultaneously", but without
   * guaranteed order.
   */
  function multiFetchRequest() {
    let date = "2019-08-0";
    let results = [];
    for (let i = 1; i <= 5; i++) {
      fetchOneDay(date + i)
        .then(data => console.log("fetch request returned for " + data["date"]))
        .catch(handleRequestError);
    }
  }

  /**
   * Example 4: Using aysnc/await to control order of responses, but using await
   * within the for loop causes a synchronous solution (slower than Example 3)
   */
  async function multiRequest() {
    let date = "2019-08-0";
    for (let i = 1; i <= 5; i++) {
      try {
        let data = await fetchOneDay(date + i);
        console.log("async/await request returned for " + data["date"]);
      } catch (err) {
        handleRequestError(err);
      }
    }
  }

  /**
   * Example 5 (best): Using aysnc/await to control order of responses, and Promise.all
   * with await to resolve only when all requests are received, blocking only once.
   * In this solution, we get both the efficiency of sending requests all at once,
   * as well as collecting the result data in the 5-day order.
   */
  async function multiRequestParallel() {
    let promises = [];
    let date = "2019-08-0";
    for (let i = 1; i <= 5; i++) {
      let apodPromise = fetchOneDay(date + i);
      promises.push(apodPromise);
    }
    try {
      let results = await Promise.all(results);
      for (let i = 0; i < results.length; i++) {
        let data = results[i];
        console.log("Promise.all requests returned for " + data["date"]);
      }
    } catch (err) {
      handleRequestError(err);
    }
  }

  /**
   * This is just the same function as the one we used in the original APOD lecture demo in Module 3.
   */
  function processApodJson(apodJson){
    //clear response box
    id("response-message").textContent = "Response";

    let title = gen("h2");
    title.textContent = apodJson.title;

    let image = gen("img");
    image.src = apodJson.url;
    image.alt = apodJson.title;

    let explanation = gen("p");
    explanation.textContent = apodJson.explanation;
    id("response").appendChild(title);
    id("response").appendChild(image);
    id("response").appendChild(explanation);

    if (apodJson.copyright) {
      let p = gen("p");
      p.textContent = "Copyright: " + apodJson.copyright;
      id("response").appendChild(p);
    }

    //re-enable button
    id("apod-btn").disabled = false;
  }

  /**
   * This function is called when an error occurs in the fetch call chain (e.g. the request
   * returns a non-200 error code, such as when the APOD service is down). Displays a user-friendly
   * error message on the page and re-enables teh APOD button.
   * @param {Error} err - the err details of the request.
   */
  function handleRequestError(err) {
    // ajax call failed! show error, place text, and re-enable the button
    let response = gen("p");
    let msg = "There was an error requesting data from the APOD service " +
              "(it's possible the DEMO_KEY rate limit is used up!) Please try again later.";
    response.textContent = msg;
    id("response").appendChild(response);
    id("response-message").textContent = "Response";
    id("apod-btn").disabled = false;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }

  function checkStatus(response) {
     if (!response.ok) {
       throw Error("Request error: " + response.statusText);
     }
     return response;
   }

})();
