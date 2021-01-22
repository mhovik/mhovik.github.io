<?php
  ## CS 154
  ## quickcheck.php
  ##

  print("1");

  # Variables for connections to the database.
  $host     = 'localhost';
  $port     = '8889';
  $user     = 'root';
  $password = 'root';
  $dbname   = 'wpldb';

  # Make a data source string that will be used in creating the PDO object
  $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

  print("2");

  # connect to the wpldb database and set some attributes
  try {
    $db = new PDO($ds, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    print("3");
 }
  catch (PDOException $ex) {
    die("4");
  }

  print("5");
?>
