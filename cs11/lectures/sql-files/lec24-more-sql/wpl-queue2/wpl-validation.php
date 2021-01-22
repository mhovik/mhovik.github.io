<?php
  /**
   * CSE 154
   * @author Melissa Hovik and Lauren Bricker
   *
   * Helper functions for validating WPL Queue POST parameters for lecture code.
   * Version 05.24.19 - factored out for use in wpl-insert.php (with PHP's include statement!)
   */

   /**
    * Function to check all of the required POST parameters for validity.
    * @return {string} error message with descriptive information about the
    * invalid parameters, where passing all required POST parameters has higher
    * precedence than format of parameters.
    *
    * Required POST parameters in validation checks:
    *   - name, email, sid, minutes, question
    * See respective check_<param> function comments for more information on validity.
    */
   function check_param_errors() {
     if (!has_required_params()) {
       return "Missing at least one of your parameters!";
     }
     # each check_param function returns a non-empty string with an error message if
     # invalid, else an empty string.
     $error_msgs = check_name($_POST["name"])
                 . check_uw_email($_POST["email"])
                 . check_sid($_POST["sid"])
                 . check_mins($_POST["minutes"])
                 . check_question($_POST["question"]);
     return $error_msgs;
   }

  /**
   * @return {boolean} true iff all required POST parameters are passed as
   * non-empty values.
   */
  function has_required_params() {
    $required = array("name",  "email", "sid", "minutes", "question");
    foreach ($required as $param) {
      // Check that param is passed as a non-empty value
      if (!(isset($_POST[$param]) && $_POST[$param])) {
        return false;
      }
    }
    return true;
  }

  /* ------------------------------------------------------------------
   * Exercise 1: Check Name input Format: <First Last>
   * @param {string} $name - name parameter
   * Returns a String error message if name is not in the required format,
   * otherwise "".
   * ------------------------------------------------------------------ */
  function check_name($name) {
    $name_pattern = "/^[A-Z][a-z]+ [A-Z][a-z]+$/";
    if (preg_match($name_pattern, trim($name))) {
      return "";
    } else {
      return "Invalid name parameter {$name}. Please pass a name in <First Last> format.\n";
    }
  }

  /* ------------------------------------------------------------------
   * Exercise 2: Student ID Number
   * Required Student IDs are exactly 7 digits starting with 1
   * @param {number} $sid - student id number
   * @return {string} error message if ID is not in required format,
   * otherwise "".
   * ------------------------------------------------------------------ */
  function check_sid($sid) {
    $sid_pattern = "/^1\d{6}$/";
    if (preg_match($sid_pattern, $sid)) {
      return "";
    } else {
      return "Invalid SID format: {$sid}\n";
    }
  }

  /* ------------------------------------------------------------------
   * Exercise 3: Queue Length (2 or 10 minutes)
   * Required WPL queue length is 2 (two) or 10 (ten) minutes
   * @param {string} $minutes - minute representation for queue length
   * @return {string} error message if invalid queue length,
   * otherwise ""
   * ------------------------------------------------------------------ */
  function check_mins($minutes) {
    $minute_pattern = "/(2|10|ten|two)/i";
    if (preg_match($minute_pattern, $minutes)) {
      return "";
    } else {
      return "Invalid queue length: {$minutes}. The WPL Queue only accepts " .
             "2 or 10 min requests.\n";
    }
  }

  /* ------------------------------------------------------------------
   * Exercise 4: UW Email
   * Required email has the format username@uw.edu, where username must be
   * non-empty and may only contain letters, numbers, or _.
   * @param {string} $email - email for student entering WPL queue.
   * @return {string} error message if invalid email, otherwise ""
   *
   * Extra practice: What if we also want to allow username@u.washington.edu?
   * ------------------------------------------------------------------ */
  function check_uw_email($email) {
    $email_pattern = "/^[a-z_\d]+\@uw\.edu$/i"; # with ignore letter-casing flag
    if (preg_match($email_pattern, $email)) {
      return "";
    } else {
      return "Invalid uw.edu email: {$email}\n";
    }
  }

  /* ------------------------------------------------------------------
   * Exercise (Extra):
   * Write a regex(es) for "good" WPL questions that are at least 20 characters and...
   * ... what else makes a good question?
   *
   *  Could you write different patterns for different error messages?
   * (e.g. length, looking for certain good/bad words, etc.)
   * ------------------------------------------------------------------ */
  function check_question($question) {
    if (strlen($question) >= 20) {
      return "";
    } else {
      return "Question must be at least 20 characters long.\n";
    }
  }

 ?>
