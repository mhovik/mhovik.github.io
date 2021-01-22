<?php
  if (isset($_GET["mode"]) && strtolower($_GET["mode"]) === "list") {
    $result = array();
    $data = json_decode(file_get_contents("2min.json"), true);
    $twomin = array("minutes" => 2,
                    "students" => $data["students"]);
    array_push($result, $twomin);
    $data = json_decode(file_get_contents("10min.json"), true);
    $tenmin = array("minutes" => 10,
                    "students" => $data["students"]);
    array_push($result, $tenmin);
    header("Content-type: application/json");
    print(json_encode(array("queue" => $result)));
    die();
  } else if (isset($_POST["action"]) && $_POST["action"] === "clear") {
    clear_queue();
    die();
  }

  if (!has_required_params()) { # check for required POST parameters
    handle_error("Missing one or more required parameters: name, minutes, sid, question");
  } else {
    # All required parameters were passed, now check them for validity!
    $name = $_POST["name"];      # e.g. Tal Wolman
    $minutes = $_POST["minutes"];      # e.g. 2
    $sid = $_POST["sid"];        # student id number (e.g. 1549102)
    $qtext = $_POST["question"]; # e.g. Is a poptart a sandwich?

    /*
    # TODO: Check validity of these parameters!
    # 1. check that student-name is in valid format: First Last
    if (!preg_match("//", $name)) {
      handle_error("TODO");
    }

    # 2. check that minutes is 2, 10, two, or ten (ignoring letter-case)
    if (!preg_match("//", $minutes)) {
      handle_error("TODO");
    }

    # 3. check that sid (student id number) is 7 digits with the two digits being 10-19
    if (!preg_match("//", $sid)) {
      handle_error("TODO");
    }

    # Extra: check that question is at least 20 characters for now...
    if (strlen($qtext) < 20)) {
      handle_error("TODO");
    }
   */

    # Else, add to queue!
    add_to_queue($name, $sid, $minutes, $qtext);
  }


  /**
   * Outputs a descriptive error message.
   */
  function handle_error($msg) {
    header("Content-type: text/plain");
    header("HTTP/1.1 400 Invalid Request");
    die($msg); # die can be used to guarantee program termination (make sure to use with good program flow)
  }

  /**
   * Returns true if all required POST parameters are passed as non-empty values.
   */
  function has_required_params() {
    $required = array("name", "minutes", "sid", "question");
    foreach ($required as $param) {
      // Check that param is passed as a non-empty value
      if (!(isset($_POST[$param]) && $_POST[$param])) {
        return false;
      }
    }
    return true;
  }

  function clear_queue() {
    file_put_contents("2min.json", json_encode(array("students" => array())));
    file_put_contents("10min.json", json_encode(array("students" => array())));
  }

  # Adds the information to the WPL queue (either 2min.json or 10min.json)
  function add_to_queue($name, $sid, $minutes, $question) {
    $min_int = preg_replace("/two/i", 2, $minutes);
    $min_int = preg_replace("/ten/i", 10, $min_int);
    $file_string = file_get_contents("{$min_int}min.json");

    # Nuance: Use true as the second parameter to get array instead of object
    $data = json_decode($file_string, true);
    if (!array_key_exists("students", $data)) {
      $data["students"] = [];
    }
    $students = $data["students"];
    if (is_in_queue($students, $sid)) {
      echo "You're already in the {$min_int}-minute Queue!";
    } else {
      # Create student associative array (analogous to JSON key/value pairs)
      $result = array(
        "sid" => $sid,
        "name" => $name,
        "question" => $question
      );
      array_push($students, $result);
      $data["students"] = $students;

      file_put_contents("{$min_int}min.json", json_encode($data));
      echo "Thank you for Beta-testing the WPL Queue {$name}!\n";
      echo "You were successfully added to the {$min_int}-minute Queue!\n";
      $size = count($students);
      echo "There are {$size} students currently in the queue.";
    }
  }

  function is_in_queue($students, $sid) {
    # loop through each student object in queue
    for($i = 0; $i < count($students); $i++) {
      $student = $students[$i];
      if ($student["sid"] === $sid) {
        return true;
      }
    }
    return false;
  }
?>
