<?php
  /**
   * CSE 154
   * @author Melissa Hovik and Lauren Bricker
   *
   * wpl-delete.php
   * API delete something from the the WPL queue database.
   */

  # We can use include to load common PHP code, which is useful to reduce redundancy
  # when you have multiple PHP services! (See lecture slides)
  include 'wpl-common.php';

  # If we get here, we're good! Let's connect to the SQL DB so we can add a student :)
  $db = get_PDO();

  # If we get here, the $db was constructed successfully (note that die is used in the catch statement of
  # get_PDO() in wpl-common.php, which will terminate this program with a 503 error response)
  if (isset($_POST["id"])) {
    $output = delete_from_queue_id($db, $_POST["id"]);
  }
  else if (isset($_POST["name"])) {
      $output = delete_from_queue_name($db, $_POST["name"]);
  }
  else {
    handle_request_error("Missing your name or id parameters!");
  }

  if (isset($output)) {
    header("Content-Type: application/json");

    #encode the output array as json
    print(json_encode($output));
    # And success! Let's print out the result with a nice JSON message in the format:
    # { "success" : "Successfully removed <info> to the wpl database!" }
  }

  /**
   * Delete a student from the queue connected with $db.
   * @param {object} $db - the PDO object representing the db connection to the WPL database.
   * @param {string} $id - The ID of the row in the datbase.
   */
  function delete_from_queue_id($db, $id) {
    try {
      $sql = "DELETE FROM queue WHERE id = :id;";
      $stmt = $db->prepare($sql);
      $params = array("id" => $id);
      $stmt->execute($params);

      return array("success" =>
                   "Successfully removed {$id} from the wpl database!");

    }
    catch (PDOException $ex) {
      handle_db_error("Sorry, I could not delete the student from the database");
    }
  }


  /**
   * Delete a student from the queue connected with $db.
   * @param {object} $db - the PDO object representing the db connection to the WPL database.
   * @param {string} $name - validated student name
   */
  function delete_from_queue_name($db, $name) {
    try {
      $sql = "DELETE FROM queue WHERE name = :name;";
      $stmt = $db->prepare($sql);
      $params = array("name" => $name);
      $stmt->execute($params);

      return array("success" =>
                   "Successfully removed {$name} from the wpl database!");

    }
    catch (PDOException $ex) {
      handle_db_error("Sorry, I could not delete the student from the database");
    }
  }
?>
