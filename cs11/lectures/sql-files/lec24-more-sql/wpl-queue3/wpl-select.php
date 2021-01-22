<?php
  /**
   * CSE 154
   * @author Melissa Hovik and Lauren Bricker
   *
   * wpl-select.php
   * API to serve up the people in the WPL queue database.
   */

  # We can use include to load common PHP code, which is useful to reduce redundancy
  # when you have multiple PHP services!
  include 'wpl-common.php';

  # We can now use a get_PDO() function defined in wpl-common.php here. We may want to eventually
  # support GET parameters here, but for now, just demo printing JSON with our queue SQL table
  # whenever a request is made to this wpl-select.php service.
  $db = get_PDO();

  if (isset($db)) {
    $output = fetch_queue($db);

    if (isset($output)) {
      header("Content-Type: application/json");

      # encode the output array as json
      echo json_encode($output);
    }
  }

  /**
   *  Return all of the entries currently in the WPL queue.
   *  @param {object} $db - the PDO object representing the db connection
   *  @return {array} of the queue table rows with all of the information
   *  in each row (note to students: in practice, we wouldn't include all of this information
   *  but this demonstrates how to return information from your SQL table using a PDO object).
   */
  function fetch_queue($db) {
    # select all rows from the queue table in the wpl database.
    $output = null;

    try {
      # This is the PHP/SQL connection! :)
      $rows = $db->query("SELECT * FROM queue;");
    }
    catch (PDOException $ex) {
      error_db_message("Can not query the database.");
    }

    $output = array();

    # loop through each row of data from the select
    # adding it to the output array
    foreach($rows as $row){
      $person = array();
      $person["id"] = $row["id"];
      $person["name"] = $row["name"];
      $person["email"] = $row["email"];
      $person["student_id"] = $row["student_id"];
      $person["time"] = $row["time"];
      $person["question"] = $row["question"];
      array_push($output, $person);
    }

    return $output;

  }
?>
