<?php
    ## Lauren Bricker
    ## CSE 154
    ## potluckselect.php
    ## API to serve up the items in the Potluck database.

    include 'common.php';

    # connect to the Potluck database and set some attributes
    try {
        $db = new PDO($ds, $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $ex) {
      error_message("Can not connect to the database.\n Error details: $ex \n");
    }

    #
    # Helper function to do a query, since we do it so many times...
    #
    # param $db The PDO database object that is already open and ready to use
    function do_query($db) {
      #select all rows from the Potlucks table
      try {
          $rows = $db->query("SELECT * FROM PotluckDishes LIMIT 2;");
          $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          // Error query! Uncomment to see the kaboom!
          // $rows = $db->query("SEELECT * FROM PotluckDishes;");

          return $rows;
      }
      catch (PDOException $ex) {
        error_message("Can not query the database.", $ex);
      }
      return null;
    }

    header("Content-Type: text/plain");

    $rows = do_query($db);
    # The foreach statement is masquerading a series of fetch calls to get each row.
    print ("Printing using the foreach loop\n");
    foreach($rows as $row){
      print_r($row) . "\n";
    }

    $rows = do_query($db);
    print ("\nPrinting using the for loop/fetch()\n");
    while ($row = $rows->fetch()) {           #PDO::FETCH_BOTH is the default;
      print_r($row) . "\n";
    }

    $rows = do_query($db);
    print ("\nPrinting using the for loop/fetch(PDO::FETCH_ASSOC)\n");
    while ($row = $rows->fetch(PDO::FETCH_ASSOC)) {
      print_r($row) . "\n";
    }

    $rows = do_query($db);
    print ("\nPrinting using the for loop/fetch(PDO::FETCH_NUM)\n");
    while ($row = $rows->fetch(PDO::FETCH_NUM)) {
       print_r($row) . "\n";
    }

?>
