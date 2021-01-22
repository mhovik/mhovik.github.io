<?php
  ## Lauren Bricker
  ## CSE 154
  ## pizza.php
  ## Version 1.0
  ## API to get the information for the pizza example
  header("Access-Control-Allow-Origin: *");
  if (isset($_POST["username"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $pw = $_POST["password"];
    if ($username === "cse154" && $pw === "c0ffee" || $pw === "coffee") {
      echo "Successfully logged in!";
    die();
    }
  } else if (isset($_POST["name"]) && isset($_POST["description"]) && isset($_POST["category"])) {
    $name = $_POST["name"];
    if (strlen($name) > 0) {
      $name = strtoupper($name[0]) . substr($name, 1, strlen($name));
    }
    $description = $_POST["description"];
    $category = $_POST["category"];
    if (strlen($category) > 0) {
      $category = strtoupper($category[0]) . substr($category, 1, strlen($category));
    }
    $images = glob("img/*");
    $img = $images[array_rand($images)];
    if (isset($_POST["image"])) {
      $img = $_POST["image"];
    }
    $menu = json_decode(file_get_contents("cafe-menu.json"), true);
    $menu2 = $menu["categories"];
    if (array_key_exists($name, $menu2)) {
      error_message("${name} already on the menu!");
    } else {
      $result = array("name" => $name, "description" => $description, "image" => $img, "in-stock" => true);
      $current = array();
      if (array_key_exists($category, $menu2)) {
        $current = $menu2[$category];
      }
      array_push($current, $result);
      $menu["categories"][$category] = $current;
      header("Content-type: text/plain");
      print "Success! {$name} added to the Cafe Menu.";
      file_put_contents("cafe-menu.json", json_encode($menu, JSON_PRETTY_PRINT));
      die();
    }
  }
  if (isset($_GET["list"])) {
    $list = strtolower($_GET["list"]);
    if ($list === "menu") {
      header("Content-Type: text/plain");
      $output = "menu:pizzeria\nmenu:cafe";
      die($output);
    } else if ($list === "images") {
      header("Content-Type: text/plain");
      $images = glob("img/*");
      $output = "";
      foreach ($images as $img) {
        $output .= $img . "\n";
      }
      die($output);
    } else {
      error_message("Please pass list of menu or images.");
    }
  } else if ($_GET["menu"] == "pizza-menu" || $_GET["menu"] == "cafe-menu") {
      header("Content-Type: application/json");
      $menu = $_GET["menu"];
      $output = file_get_contents("${menu}.json");
    } else {
      header("Content-Type: text/plain");
      header("HTTP/1.1 400 Invalid Request");
      $output = "Invalid menu.";
    }
    sleep(2);
    print($output);


  # Function to print an error message for an invalid request to our
  # randomizer.php webservice. Note that this is a different error type than that of catching
  # an error for a PDOException, which is unique to an internal database error (not an
  # invalid request sent from a client).
  #
  # param $msg The 400 error message to print as plain text
  function error_message($msg) {
    header("HTTP/1.1 400 Invalid Request");
    header("Content-Type: text/plain");
    die($msg);
  }


?>
