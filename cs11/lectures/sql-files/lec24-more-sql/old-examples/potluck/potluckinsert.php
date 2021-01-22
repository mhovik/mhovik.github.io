<?php
  ## Lauren Bricker
  ## CSE 154
  ## potluckselect.php
  ## Version 2.0
  ## API to insert items into the potluck database

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

  # Should do isset check!!!, also should be post!
  if (!isset($_POST["name"]) &&
      !isset($_POST["dish"]) &&
      !isset($_POST["serves"]) &&
      !isset($_POST["temp"]) &&
      !isset($_POST["comment"])) {
    error_message("Missing at least one of your parameters!");
  }

  $name = $_POST["name"];
  $dish = $_POST["dish"]; //
  $serves = $_POST["serves"]; //
  $temp = $_POST["temp"];
  $comment = $_POST["comment"];

  # Insert a new row into the database.
  try {
    # insecure: Only uncomment if you want to try SQL injection
    # Bobby Tables: bobby');DROP TABLE PotluckDishes; --
    // $str = "INSERT INTO PotluckDishes (name, dish, serves, temperature, comment) " .
    //         "VALUES ('$name', '$dish', '$serves', '$temp', '$comment');";
    // $rows = $db->exec($str);

    # secure
    $sql = "INSERT INTO PotluckDishes (name, dish, serves, temperature, comment) " .
           "VALUES (:name, :dish, :serves, :temp, :comment );";
    $stmt = $db->prepare($sql);
    $params = array("name" => $name,
                    "dish" => $dish,
                    "serves" => $serves,
                    "temp" => $temp,
                    "comment" => $comment);
    $stmt->execute($params);

    header("Content-type: application/json");
    $result = Array("success" =>
      "Successfully added {$name}, {$dish}, {$serves}, {$temp}, {$comment} into the potluck database");
    print(json_encode($result));

  }
  catch (PDOException $ex) {
    db_error_message("Sorry, I could not insert the dish into the database", $ex);
  }

?>
