-- Author: Melissa Hovik
-- Last updated: 08.13.19
-- Creates a queue table of questions for the WPL database, wpldb.
CREATE TABLE queue(
   id             INT PRIMARY KEY AUTO_INCREMENT,
   name           VARCHAR(255),
   email          VARCHAR(255),
   student_id     INT,
   length         TINYINT,
   question       VARCHAR(255),
   creation_time  DATETIME DEFAULT NOW()
);
