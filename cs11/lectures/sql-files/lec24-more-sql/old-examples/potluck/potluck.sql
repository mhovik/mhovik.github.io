-- Drop the database if it exists: otherwise demo will give an error
-- Most of the time students won't do this.
DROP DATABASE IF EXISTS potluck;

-- Create the potluck database
CREATE DATABASE potluck;
USE potluck;

-- Again, use with caution, trying to avoid errors in a demo
DROP TABLE IF EXISTS PotluckDishes;

-- create a Potluck table in the potluck database
CREATE TABLE PotluckDishes (
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   dish VARCHAR(255) NOT NULL,
   serves INT,
   temperature VARCHAR(255),
   -- we can set default values if it makes sense to have "optional" values for some columns (e.g. a comment)
   comment VARCHAR(255) DEFAULT NULL, 
   PRIMARY KEY(id)
);

-- Insert three values into the Potluck database
INSERT INTO PotluckDishes (name, dish, serves, temperature) VALUES 
  ("Lauren", "Paleo Apple Tart", 8, "room");

INSERT INTO PotluckDishes (name, dish, serves, temperature) VALUES 
  ("Stephen", "Balsamic Brussels Sprouts", 8, "hot");

INSERT INTO PotluckDishes (name, dish, serves, temperature) VALUES 
  ("Elias", "Apple Pie", 8, "room");

INSERT INTO PotluckDishes (name, dish, serves, temperature) VALUES
  ("Kristina", "Broccoli Salad", 16, "cold"),
  ("Ron and Jacki", "Turkey", 20, "hot"),
  ("Ron and Jacki", "Stuffing", 16, "hot"),
  ("Matthew", "Drinks", 16, "cold"),
  ("Ron", "Mashed Potatoes", 12, "hot"),
  ("Ron", "Green Bean Casserole", 16, "hot"),
  ("Audrey", "Baked Brie", 10, "hot"),
  ("Sadie", "Dog food", 1, "room");

UPDATE PotluckDishes
  SET dish = "Mashed Potato Casserole", name = "Stephen"
  WHERE dish = "Mashed Potatoes";

-- DELETE FROM PotluckDishes
--  WHERE name = "Sadie";
