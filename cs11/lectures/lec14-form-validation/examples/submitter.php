<?php
  if ($_POST["city"] && $_POST["state"] && $_POST["zip"]) {
    $city = $_POST["city"];
    $state = $_POST["state"];
    $zip = $_POST["zip"];
    header("Content-type: text/plain");
    echo "Congratulations! You submitted your data to our database! We promise to keep it secret :)";
  } else {
    header("HTTP/1.1 400 Invalid Request");
    echo "Error: Missing required POST parameters: city, state, zip";
  }
?>
