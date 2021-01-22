-- Lecture 23 Example setup.sql file for the WPL queue! We can use this to
-- import to phpMyAdmin, which is preferred than manual creation in phpMyAdmin
-- so others can use the same setup.sql file (e.g. as in Thursday's section examples)

-- Remember to create a db, such as wpldb. You can do this in the phpMyAdmin interface
-- or in a setup.sql file:
--   CREATE DATABASE IF NOT EXISTS wpldb;
--   use wpldb;

-- Review: What's the difference between a database and a table?
-- A database contains a collection of tables. Here, we want a 'wpldb' that contains
-- a single table called 'queue'. In a more complex example, we could add more tables
-- such as 'tas' (for tas staffing the queue) and 'courses' (for courses using the queue)

USE wpldb;

CREATE TABLE queue(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   student_id INT NOT NULL,
   time TINYINT NOT NULL, -- could also be INT
   question TEXT,
   PRIMARY KEY(id)
);

-- Can you think of other columns you could add to the queue?


-- INSERT statements from lecture
INSERT INTO queue(id, name, email, student_id, time, question)
VALUES (1, "Gilly I. Fuchs", "gif@uw.edu",
        1234567, 2, "MAMP MySQL won't start");

-- Example omitting the id value, which was defined as an AUTO_INCREMENT value
-- in the table's CREATE statement
INSERT INTO queue(name, email, student_id, time, question)
VALUES ("Jeff I. Frea", "jif@uw.edu",
        9876543, 10, "I don't understand fat arrow functions");

-- Example INSERTing many rows (omitting AUTO_INCREMENTEd id value)
INSERT INTO queue(name, email, student_id, time, question)
VALUES
  ("Jacki", "jb@uw.edu", 1111111, 10, "My code doesn't work"),
  ("Cassian P.", "cp@uw.edu", 2222222, 2, "Why is my header incorrect?"),
  ("R. Ducky", "quack@uw.edu", 33333333, 10, "Can I help?"),
  ("Matthew", "mbm@uw.edu", 44444444, 10, "How can I insert into a DB?");
