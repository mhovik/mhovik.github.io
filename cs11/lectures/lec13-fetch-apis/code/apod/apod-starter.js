/**
 * CSE 154 | Spring 2019
 *
 * A program to fetch and display the Astronomy Picture of the Day from the NASA API.
 */
"use strict";
(function(){
  const URL = "https://api.nasa.gov/planetary/apod?";
  //const API_KEY = "DEMO_KEY";
  //get your own api key here: https://api.nasa.gov

  window.addEventListener("load", init);

  /**
   * Initialize the ajax button to call the correct function when pressed.
   */
  function init() {
    id("apod-btn").addEventListener("click", fetchAPOD);
  }

  function fetchAPOD() {
    // TODO: fetch from the NASA API!
  }

  /*
  Sample Response from url: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
  // get your own key from: https://api.nasa.gov
  {
  "copyright":"Ruslan MerzlyakovRMS Photography",
  "date":"2019-07-24",
  "explanation":"What's that strange light down the road? Dust orbiting the Sun. ...
  "hdurl":"https://apod.nasa.gov/apod/image/1907/ZodiacalRoad_Merzlyakov_1080.jpg",
  "media_type":"image",
  "service_version":"v1",
  "title":"Zodiacal Road",
  "url":"https://apod.nasa.gov/apod/image/1907/ZodiacalRoad_Merzlyakov_960.jpg"
  }
  */

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Request error: " + response.statusText);
    }
    return response;
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
})();
