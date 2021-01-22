<?php
  ## Lauren Bricker
  ## CSE 154
  ## potluckdelete.php
  ## Version 2.0
  ## API to delete items from the potluck database

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

  # Check if the post parameters are set!
  $name = "";
  $dish = "";
  $serves = "";
  $temp = "";
  $comment = "";

  if (!isset($_POST["name"]) ||
      !isset($_POST["dish"]) ||
      !isset($_POST["serves"]) ||
      !isset($_POST["temperature"]) ||
      !isset($_POST["comment"])) {
    error_message("Missing at least one of your parameters!");
  }
  else {
    $name = $_POST["name"];
    $dish = $_POST["dish"];
    $serves = $_POST["serves"];
    $temp = $_POST["temperature"];
    $comment = $_POST["comment"];
  }

  # Insert a new row into the database.
  try {

    $sql = "DELETE FROM PotluckDishes " .
           "WHERE `name` = :name " .
           "AND `dish` = :dish " .
           "AND `serves` = :serves ".
           "AND `temperature` = :temp " .
           "AND `comment` = :comment;";
    $stmt = $db->prepare($sql);
    $params = array("name" => $name,
                    "dish" => $dish,
                    "serves" => $serves,
                    "temp" => $temp,
                    "comment" => $comment);
    $stmt->execute($params);

    header("Content-type: application/json");
    $result = Array("success" =>
    "Successfully deleted {$name}, {$dish}, {$serves}, {$temp}, {$comment} from the potluck database");
    print(json_encode($result));

  }
  catch (PDOException $ex) {
    db_error_message("Sorry, I could not delete the dish {$dish} from the database", $ex);
  }

?>
