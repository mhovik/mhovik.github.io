<?php
  /**
   * CSE 154
   * @author Melissa Hovik and Lauren Bricker
   *
   * wpl-insert.php
   * API to add people in the WPL queue database. We'll learn more about this in Week 9!
   */

  # We can use include to load common PHP code, which is useful to reduce redundancy
  # when you have multiple PHP services! (See lecture slides)
  include 'wpl-common.php';
  # Also include some handy validation functions for our WPL queue POST parameters!
  include 'wpl-validation.php';

  # Check the parameters (using check_param_errors() included in wpl-validation.php),
  # ensure they're all ok
  $error_msgs = check_param_errors();
  if ($error_msgs !== "") {
     handle_request_error($error_msgs); # this function will die (stop the program) with a 400 error message response.
  }

  # If we get here, we're good! Let's connect to the SQL DB so we can add a student :)
  $db = get_PDO();

  # If we get here, the $db was constructed successfully (note that die is used in the catch statement of
  # get_PDO() in wpl-common.php, which will terminate this program with a 503 error response)
  $output = insert_into_queue($db, $_POST["name"], $_POST["email"], $_POST["sid"],
                                  $_POST["minutes"], $_POST["question"]);

  if (isset($output)) {
    header("Content-Type: application/json");

    #encode the output array as json
    print(json_encode($output));
    # And success! Let's print out the result with a nice JSON message in the format:
    # { "success" : "Successfully added <info> to the wpl database!" }
  }

  /**
   * Insert a student in the queue connected with $db.
   * @param {object} $db - the PDO object representing the db connection to the WPL database.
   * @param {string} $name - validated student name
   * @param {string} $email - validated student email
   * @param {number} $student_id - validated student id
   * @param {number} $time - validated minutes for queue
   * @param {string} $question - validated question text
   * @return {array} success message in format ( "success" : "message" )
   */
  function insert_into_queue($db, $name, $email, $sid, $minutes, $question) {
    # Insert a new row into the database.
    try {
      # insecure: Only uncomment if you want to try SQL injection
      # end of question');DROP TABLE queue; --
       // $str = "INSERT INTO queue (name, email, student_id, time, question) " .
       //         "VALUES ('$name', '$email', '$sid', '$minutes', '$question');";
       // $rows = $db->exec($str);

      # secure (more in Week 9)
      $sql = "INSERT INTO queue(name, email, student_id, time, question) " .
            "VALUES (:name, :email, :student_id, :time, :question);";
      $stmt = $db->prepare($sql);
      # create the associative array between the variables in the
      # insert SQL statement with the actual values
      $params = array("name" => $name,
                     "email" => $email,
                     "student_id" => $sid,
                     "time" => $minutes,
                     "question" => $question);
      $stmt->execute($params);

      return array("success" =>
                   "Successfully added {$name}, {$email}, {$sid}, {$minutes}, {$question} into the wpl database!");

    }
    catch (PDOException $ex) {
      handle_db_error("Sorry, I could not insert the student into the database");
    }
  }
?>
