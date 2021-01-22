/**
 * CSE 154 | Spring 2019
 *
 * A program to fetch and display the Astronomy Picture of the Day from the NASA API.
 */
/*global fetch*/
(function(){
  "use strict";
  const URL = "https://api.nasa.gov/planetary/apod?";
  const API_KEY="YvKylVBsbxwoC17TqiiGIDeiLI8ghSqSwUm5lsBb";
  //get api key here: https://api.nasa.gov
  //const API_KEY = "DEMO_KEY";

  window.addEventListener("load", init);

  /**
   * Initialize the ajax button to call the correct function when pressed.
   */
  function init() {
    id("apod-btn").addEventListener("click", fetchAPOD);
  }

  /**
   * Function to start the ajax fetch call to APOD API once the button is hit.
   * Upon success, shows the Astronomy Photo of the Day on the page.
   */
  function fetchAPOD() {
    // display loading text and disable button while ajax call is loading
    id("response-message").innerText = "Response Loading ...";
    id("response").innerHTML = "";
    id("apod-btn").disabled = true;
    let url = URL;
    // The APOD API requires one parameter: api_key
    url += "api_key=" + API_KEY;
    // Note: We could also add an optional "date" parameter if we wanted to specify the date
    // of the astronomy photo (see APOD API documentation online)

    //start fetch call chain
    fetch(url)
    .then(checkStatus)
    .then(JSON.parse) // parse the json so the next "then" gets a JSON object
    .then(processApodJson)
    .catch(handleRequestError);
  }

  /**
   * Response when the fetching the information from NASA
   * so now set up the web page with the information we're getting out of JSON
   * @param {Object} apodJson - the JSON object that is was returned from the server
   */
  function processApodJson(apodJson){
    //clear response box
    id("response-message").innerText = "Response";

    //See sample json response below
    let title = document.createElement("h2");
    title.innerText = apodJson.title;

    let image = document.createElement("img");
    image.src = apodJson.url;

    let explanation = document.createElement("p");
    explanation.innerText = apodJson.explanation;

    id("response").appendChild(title);
    id("response").appendChild(image);
    id("response").appendChild(explanation);

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
    // ajax call failed! alert, place text and re-enable the button
    let response = document.createElement("p");
    let msg = "There was an error requesting data from the APOD service. Please try again later.";
    response.innerText = msg;
    id("response").appendChild(response);
    id("response-message").innerText = "Response";
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

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
   function checkStatus(response) {
     if (response.status >= 200 && response.status < 300 || response.status == 0) {
       return response.text();
     } else {
       return Promise.reject(new Error(response.status + ": " + response.statusText));
     }
   }

})();

//SAMPLE APOD JSON RESPONSE
// {
//   "date": "2017-10-25",
//   "explanation": "Could humans live beneath the surface of the Moon? This ...",
//   "hdurl": "https://apod.nasa.gov/apod/image/1710/MariusHills_LO2LRO_1673.jpg",
//   "media_type": "image",
//   "service_version": "v1",
//   "title": "Marius Hills and a Hole in the Moon",
//   "url": "https://apod.nasa.gov/apod/image/1710/MariusHills_LO2LRO_1080.jpg"
// }

// From url: https://api.nasa.gov/planetary/apod?api_key=YvKylVBsbxwoC17TqiiGIDeiLI8ghSqSwUm5lsBb
// get your own key from: https://api.nasa.gov
