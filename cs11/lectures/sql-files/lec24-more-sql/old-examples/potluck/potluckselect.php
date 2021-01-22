<?php
  ## Lauren Bricker
  ## CSE 154
  ## potluckselect.php
  ## Version 2.0
  ## API to serve up the items in the Potluck database.

  include 'common.php';

  # NOTE: This solution is not a solution you should imitate. It is for demo purposes only.
  # It has a lot of repetition that you should think how to refactor.

  # Connect to the potluck database and set some attributes
  try {
    $db = new PDO($ds, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch (PDOException $ex) {
    db_error_message("Can not connect to the database.", $ex);
  }

  # Select all rows from the Potluck table
  try {
    $rows = $db->query("SELECT * FROM PotluckDishes;");
  }
  catch (PDOException $ex) {
    db_error_message("Can not query the database.", $ex);
  }

  header("Content-Type: application/json");
  $output = array();

  # loop through each row of data from the select
  # adding it to the output array
  foreach($rows as $row){
    $id = $row["id"];
    $output[$id] = array();
    $output[$id]["name"] = $row["name"];
    $output[$id]["dish"] = $row["dish"];
    $output[$id]["serves"] = $row["serves"];
    $output[$id]["temperature"] = $row["temperature"];
    $output[$id]["comment"] = $row["comment"];
  }

  #encode the output array as json
  print(json_encode($output));
?>
