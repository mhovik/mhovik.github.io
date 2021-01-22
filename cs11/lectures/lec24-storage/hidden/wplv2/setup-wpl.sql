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
(1000002, "Brendan Eich", "eich@uw.edu"),
(1988888, "Bill Gates", "gates@apple.com"),
(1500000, "Manny Munoz", "em66@uw.ed"),
(1000300, "Austin Jenchi", "ajenchi@uw.edu"),
(2019154, "Tal Wolman", "twolman@uw.edu"),
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
(2019154, "twolman", "bagels", "AA", "Head TA"),
(1500000, "em66", "mochi", "AD", "TA");

-- Represents useful information for each record in the queue.
CREATE TABLE queue(
  qid INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(10) DEFAULT "waiting",
  length TINYINT NOT NULL, -- 2 or 10
  student_id INT,
  assigned_ta VARCHAR(255), -- staff
  question TEXT,
  creation_date DATETIME DEFAULT NOW(),
  -- We can have multiple FOREIGN KEYS
  FOREIGN KEY (student_id) REFERENCES users(uwid),
  FOREIGN KEY (assigned_ta) REFERENCES staff(username)
);

INSERT INTO queue(length, assigned_ta, question) VALUES
(2, "em66", "MAMP won''t start. Please Halp."), -- note that you need '' to escape ' quotes in SQL
(10, "em66", "Can I have a cookie?"),
(2, "em66", "I want to learn PHP plz Halp.");
