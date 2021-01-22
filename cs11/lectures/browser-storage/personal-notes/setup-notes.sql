-- Example database for storing users and notes in 08.17.19 OH
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;

-- Users for keeping track of notes.
CREATE TABLE users(
  username VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created DATETIME DEFAULT NOW()
);

-- Notes belong to users (refering the users table) and have text and optional tag/label.
-- tags are useful for categorizing notes.
CREATE TABLE notes(
  note_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  note TEXT NOT NULL,
  tag VARCHAR(255), -- optional
  FOREIGN KEY (username) REFERENCES users(username)
);

INSERT INTO users(username, password, email, name) VALUES
("mehovik", "coffee", "medskm@cs.washington.edu", "Melissa Hovik"),
("twolman", "bagel", "twolman@uw.edu", "Tal Wolman");


INSERT INTO notes(username, note, tag) VALUES
("mehovik", "Write Pre-Check", "cse154"),
("mehovik", "Saturday OH", "cse154"),
("mehovik", "Buy Coffee", "personal"),
("twolman", "Check Piazza", "cse154");
