//
// CSE 154 Sample code
// Javascript to handle a Potluck organizer handler. Stores potluck information in a database
// Written by Lauren Bricker, 18au
//

(function(){
  "use strict";

  /**
   * Initialize the ajax button to call the correct function when pressed.
   */
  window.addEventListener("load", initialize);


  /**
   *  Initialize the page by adding the click event to the add potluck item button
   *  and display items
   */
  function initialize(){
    display();
    $("add-item").addEventListener("click", addItem);
  }

  /**
   *  Function to load the items on the page
   */
  function display(){
    callAjax("potluckselect.php", showItems);
  }

  /**
   *  Function to start add the items to the DB
   */
  function addItem(){
    //get the information from the page
    let data = new FormData();
    data.append("name", $("name").value);
    data.append("dish", $("dish").value);
    data.append("serves", $("serves").value);
    data.append("temp",  qs("input[name=temperature]:checked").value);
    data.append("comment", $("comment").value);
    fetch("potluckinsert.php", {method: "POST", body: data})
      .then(checkStatus)
      .then(JSON.parse)
      .then(display)
      .catch(handleFailure);
  }


  /**
   *  Function to start delete the items to the DB
   */
  function deleteItem(){
    //get the information from the page
    let data = new FormData();
    let row = this.querySelectorAll("td");
    data.append("name", row[0].innerText);
    data.append("dish", row[1].innerText);
    data.append("serves", row[2].innerText);
    data.append("temperature",  row[3].innerText);
    data.append("comment", row[4].innerText);
    fetch("potluckdelete.php", {method: "POST", body: data})
      .then(checkStatus)
      .then(JSON.parse)
      .then(display)
      .catch(handleFailure);
  }


  /**
  * Generic function to do an Ajax call to get the duck information. This takes a parameter
  * which is the function to call when the response comes back from the server and is
  * parsed into JSON
  * @param responseText - the text from the server.
  */
  function callAjax(url, response){
    // display loading text and disable button while ajax call is loading
    $("response").innerText = "Loading...";
    $("add-item").disabled = true;

    //start ajax call
    fetch(url)
       .then(checkStatus)
       .then(JSON.parse)
       .then(response)
       .catch(handleFailure);
  }

   /**
    * Function to handle the success fetching the URL with a get
    * @param the response from the as a result of the server call
    */
  function showItems(data) {
    let columnNames = ["Name", "Dish", "Serves", "Temperature", "Comment"];
     // Get all of the items and put them in a list
     $("response").innerHTML = "";
     let table = document.createElement("table");
     let row = document.createElement("tr");
     for (let i = 0; i < columnNames.length; i++) {
       let header = document.createElement("th");
       header.innerText = columnNames[i];
       row.appendChild(header);
     }
     table.appendChild(row);
     for(let item in data) {
         row = document.createElement("tr");
         let name = document.createElement("td");
         name.innerText = data[item]["name"];
         row.appendChild(name);
         let dish = document.createElement("td");
         dish.innerText = data[item]["dish"];
         row.appendChild(dish);
         let serves = document.createElement("td");
         serves.innerText = data[item]["serves"];
         row.appendChild(serves);
         let temp = document.createElement("td");
         temp.innerText = data[item]["temperature"];
         row.appendChild(temp);
         let comment = document.createElement("td");
         comment.innerText = data[item]["comment"];
         row.appendChild(comment);

         // What can we add here to add functionality so when we double click we remove a row?
         row.addEventListener("dblclick", deleteItem);
         table.appendChild(row);
     }
     $("response").appendChild(table);
     $("add-item").disabled = false;
   }

   // Add a function to remove an element here
   // by calling your potluckdelete.php webservice.


   /**
    * Function to handle the failure at any point during a fetch
    * @param the error message
    */
   function handleFailure(error) {
     // ajax call failed! alert, place text and re-enable the button
     $("response").innerText = "THERE WAS AN ERROR! " + error;
     $("add-item").disabled = false;
   }

   /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} response - response to check for success/error
    * @returns {object} - valid result text if response was successful, otherwise rejected
    *                     Promise result
    */

   function checkStatus(response) {
     let responseText = response.text();
     if (response.status >= 200 && response.status < 300 || response.status == 0) {
       return responseText;
     } else {
       return responseText.then(Promise.reject.bind(Promise));
     }
   }

  /**
   *  Shortcut to get the document element by id
   *  @param the string value of the ID of the DOM element you are getting
   *  @return the DOM element with that particular ID
   */
  function $(id) {
   return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();
