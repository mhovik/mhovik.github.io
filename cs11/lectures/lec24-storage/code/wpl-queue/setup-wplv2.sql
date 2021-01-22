-- CREATE DATABASE IF NOT EXISTS wpldb;
-- USE wpldb;

-- The following is an attempt to add more data to the queue table in the wpldb, but quickly becomes hard to manage
-- in different applications.
/*
CREATE TABLE old_queue(
   id INT PRIMARY KEY AUTO_INCREMENT,
   status VARCHAR(10) DEFAULT "waiting",
   name VARCHAR(255) NOT NULL,           -- name of student
   email VARCHAR(255) NOT NULL,          -- email of student
   student_id INT NOT NULL,              -- 1000000
   length TINYINT NOT NULL,              -- e.g. 2 or 10
   question TEXT,
   assigned_ta VARCHAR(255),             -- username of TA (e.g. em66)
   creation_date DATETIME DEFAULT NOW()
);
*/

-- These clear the database so we can easily repopulate if needed.
DROP TABLE IF EXISTS queue; -- one record per queue entry
DROP TABLE IF EXISTS staff; -- tas, instructors, admin
DROP TABLE IF EXISTS users; -- students, tas, instructors

-- Represents users of the wpl queue system, including students, staff, and administrators
CREATE TABLE users(
  uwid INT PRIMARY KEY, -- 1000000
  name VARCHAR(255),    -- Austin Jenchi
  email VARCHAR(255)    -- ajenchi@uw.edu
);

-- Insert a few users
INSERT INTO users(uwid, name, email) VALUES
(1000001, "Larry Page", "larry@uw.edu"),
(1000002, "Brendan Eich", "eich@gmail.com"),
(1861114, "Dubs", "dubs@dubs.uw.edu"),
(2019154, "Tal Wolman", "twolman@uw.edu"),
(1400000, "Hudson Gilmore", "hdsnglmr@uw.edu"),
(1500000, "Theresa Tran", "ttran123@uw.edu"),
(1600000, "Manny Munoz", "em66@uw.ed"),
(1000300, "Austin Jenchi", "ajenchi@uw.edu"),
(1011010, "Sven Hansen", "svenhans@uw.edu"),
(1542019, "Melissa Hovik", "medskm@cs.washington.edu");

-- This table is a bit more detailed - only staff have username/passwords.
-- But all staff have a uwid.
CREATE TABLE staff(
  -- A PRIMARY KEY isn't required to be INT
  username VARCHAR(255) PRIMARY KEY,
  uwid INT,
  password VARCHAR(255) NOT NULL,
  section VARCHAR(2),              -- Optional
  role VARCHAR(10) DEFAULT "TA",   -- TA, Head TA, or Instructor
  -- FOREIGN KEY must reference an existing table,
  -- otherwise an error occurs
  FOREIGN KEY (uwid) REFERENCES users(uwid)
);

INSERT INTO staff(uwid, username, password, section, role) VALUES
(1542019, "medskm", "coffee", NULL, "Instructor"),
(2019154, "twolman", "bagels", "AB", "Head TA"),
(1400000, "hudsongil123", "monster", "AC", "TA"),
(1500000, "ttran123", "c00k1es", "AD", "TA"),
(1600000, "em66", "mochi", "AD", "TA"),
(1011010, "svenhans", "o_o", "AE", "TA"),
(1000300, "ajenchi", "pkmn4ever", NULL, "TA");

-- Represents useful information for each record in the queue.
CREATE TABLE queue(
  qid INT PRIMARY KEY AUTO_INCREMENT,
  length TINYINT NOT NULL, -- 2 or 10
  status VARCHAR(10) DEFAULT "waiting",
  student_id INT,
  question TEXT,
  assigned_ta VARCHAR(255) DEFAULT NULL, -- staff
  creation_date DATETIME DEFAULT NOW(),
  -- We can have multiple FOREIGN KEYS
  FOREIGN KEY (student_id) REFERENCES users(uwid),
  FOREIGN KEY (assigned_ta) REFERENCES staff(username)
);

-- This example includes creation date, for consistency in testing queries. In practice,
-- we can calculate the insertion date automatically with the DEFAULT NOW() constraint.
INSERT INTO queue(status, length, student_id, assigned_ta, question, creation_date) VALUES
("waiting", 10, 1000001, NULL, "I want to learn PHP plz Halp.", "2019-08-14 11:51:42"), -- note that you need '' to escape ' quotes in SQL
("assigned", 2, 1000002, "em66", "Weird JS bug.", "2019-08-14 11:51:55"),
("completed", 10, 1000002, "twolman", "GIF or JIF?", "2019-08-14 12:00:00"),
("waiting", 2, 1000002, NULL, "How to make .gitignore?", "2019-08-14 13:01:00"),
("waiting", 2, 1861114, NULL, "Why doesn't glob throw an error?", "2019-08-14 13:02:30");

INSERT INTO queue(length, student_id, question)
(2, 1861114, "Why doesn't glob throw an error?");
