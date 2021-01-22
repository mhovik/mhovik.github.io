"use strict";
const express = require("express");
const app = express();
const multer = require("multer");
const mysql = require("promise-mysql");

// To handle different POST formats
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

const SERVER_ERROR = "Something went wrong on the server... Please try again later.";

app.use(express.static("public"));

// Logs the user in, returns text, checks if the login information is valid or not
// Sends 400 if login information incorrect
// Sends 500 if there was a database error
app.post("/login", async (req, res) => {
  let db;
  let username = req.body.username;
  let password = req.body.password;
  if(username && password) {
    try {
      db = await getDB();
      let loggedIn = await checkLogin(username, password, db);
      if(loggedIn) {
        let queueData = await getQueue(db);
        res.json(queueData);
      } else {
        res.type("text");
        res.status(400).send("Invalid login information!");
      }
    } catch(error) {
      res.type("text");
      res.status(500).send(SERVER_ERROR);
    }
  } else {
    res.type("text");
    res.status(400).send("I need a username and a password!");
  }
  if (db) {
    db.end();
  }
});

// Logs the user in, returns text, checks if the login information is valid or not
// Sends 400 if login information incorrect
// Sends 500 if there was a database error
app.post("/login-admin", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let db;
  if(username && password) {
    try {
      db = await getDB();
      let loggedIn = await checkLogin(username, password, db);
      if(loggedIn) {
        let adminLogin = await checkAdminLogin(username, db);
        if(adminLogin) {
          let staffData = await getStaff();
          res.json(staffData);
        } else {
          res.type("text");
          res.status(400).send("You are not an admin!");
        }
      } else {
        res.type("text");
        res.status(400).send("Invalid login information!");
      }
    } catch (error) {
      res.type("text");
      res.status(500).send(SERVER_ERROR);
    }
  } else {
    res.type("text");
    res.status(400).send("Missing required username and password.");
  }
  if (db) {
    db.end();
  }
});

// endpoint to return JSON array of everyone in the queue
// 500 error if something happened with the database.
app.get("/queue", async (req, res) => {
  let db;
  try {
    db = await getDB();
    let queueData = await getQueue(db);
    res.json(queueData);
  } catch (error) {
    res.type("text");
    res.status(500).send(SERVER_ERROR);
  }
  if (db) {
    db.end();
  }
});

app.post("/enqueue", async (req, res) => {
  res.type("text");
  let name = req.body.name;
  let studentid = req.body.sid;
  let question = req.body.question;
  let minutes = req.body.minutes;
  let db;
  if (name && studentid && question && minutes) {
    try {
      db = await getDB();
      let success = await addToQueue(studentid, question, minutes, db);
      if (success) {
        let waiting = await getWaitingCount(db);
        res.send("Thank you " + name + ", you've successfully been added to the queue!\n" +
                 "There are currently " + waiting + " students waiting.");
      } else {
        res.status(500).send("Unable to add to the queue.");
      }
    } catch (error) {
      res.status(500).send(SERVER_ERROR);
    }
  } else {
    res.status(400).send("Missing required POST parameters: name, email, sid, question, and/or minutes.");
  }
  if (db) {
    db.close();
  }
});

app.get("/update-status", async (req, res) => {
  let qid = req.query.id;
  res.type("text");
  if (qid) {
    let status = await updateQueueMember(qid);
    if (status) {
      res.send("Queue updated!");
    } else {
      res.status(500).send("Unable to update queue.");
    }
  } else {
    res.status(400).send("I need a queueId.");
  }
});

// dequeues a person from the queue, if no queueId is passed, 400 error
// if something occurs with the database, 500 error
app.post("/dequeue", async (req, res) => {
  let qid = req.body.qid;
  if (qid) {
    try {
      res.type("text");
      let successfulResult = await removeFromQueue(qid);
      if (successfulResult) {
        res.send("Successfully removed from queue!");
      } else {
        res.send("Person not found in the queue.");
      }
    } catch (error) {
      res.status(500).send("Something has occurred with the database. Error: " + error);
    }
  } else {
    res.type("text");
    res.status(400).send("I need a valid queueId.");
  }
});

app.post("/terminate-staff", async (req, res) => {
  let id = req.body.id;
  res.type("text");
  if (id) {
    let result = await removeStaff(id);
    if (result) {
      res.send("Successfully terminated staff member :)");
    } else {
      res.status(500).send("Unable to remove staff member.");
    }
  } else {
    res.status(400).send("I need a valid UWID to remove.");
  }
});

app.get("/terminate-all", async (req, res) => {
  res.type("text");
  let result = await removeAllStaff();
  if (result) {
    res.send("Successfully terminated everyone.");
  } else {
    res.status(400).send("Unable to terminate everyone.");
  }
});

/**
 * Queries the database to add a student to the queue
 * @param {String} studentid - The ID of the student being added
 * @param {String} question - The question itself that is being asked
 * @param {String} minutes - The length of the question being asked
 * @return {Boolean} - TRUE if successful, FALSE otherwise
 */
async function addToQueue(studentid, question, minutes, db) {
  let query = "INSERT INTO queue(length, student_id, question) VALUES (?, ?, ?);";
  let result = await db.query(query, [minutes, studentid, question]);
  return result.affectedRows > 0;
}

/**
 * Queries the database to add a new user
 * @param {String} studentid - The ID of the student being added
 * @param {String} name - The name of the student being added
 * @param {String} email - The email of the student being added
 * @return {Boolean} - TRUE if successful, FALSE otherwise
 */
async function addToUsers(studentid, name, email) {
  let db;
  try {
    db = await getDB();
    let query = "INSERT INTO users VALUES(?, ?, ?);";
    let result = await db.query(query, [studentid, name, email]);
    db.end();
    return result.affectedRows > 0;
  } catch (error) {
    if (db) {
      db.end();
    }
    throw error;
  }
}

/**
 * Returns the number of students with a "waiting" status in the queue.
 * @returns {Number} - Count of students currently waiting in the queue.
 */
 async function getWaitingCount(db) {
   let qry = "SELECT * FROM queue WHERE status='waiting'";
   let result = await db.query(qry);
   return result.length;
 }


/**
 * Queries the database to remove all staff members
 * @return {Boolean} - TRUE if successful, FALSE otherwise
 */
async function removeAllStaff() {
  let db;
  try {
    db = await getDB();
    let query = "DELETE FROM staff WHERE role = 'TA';";
    let result = await db.query(query);
    return result.affectedRows > 0;
  } catch (error) {
    if (db) {
      db.end();
    }
    throw error;
  }
}

/**
 * Queries the database to remove a staff member from the database
 * @param {String} id - The id of the staff member to remove
 * @param {Boolean} - TRUE if successful, FALSE otherwise
 */
async function removeStaff(id) {
  let db;
  try {
    db = await getDB();
    let query = "DELETE FROM staff WHERE uwid = ?";
    let result = await db.query(query, [id]);
    db.end();
    return result.affectedRows > 0;
  } catch (error) {
    if (db) {
      db.end();
    }
    throw error;
  }
}

/**
 * Queries the database to remove someone from the queue
 * @param {String} id - The id of queue member to remove
 * @param {Boolean} - TRUE if successful, FALSE otherwise
 */
async function removeFromQueue(id) {
  let db;
  try {
    db = await getDB();
    let query = "DELETE FROM queue WHERE qid = ?";
    let result = await db.query(query, [id]);
    db.end();
    return result.affectedRows > 0;
  } catch (error) {
    if (db) {
      db.end();
    }
    throw error;
  }
}

/**
 * Queries the database to update the status of a queue member
 * @param {String} id - The id of queue member to updates
 * @param {Boolean} - TRUE if successful, FALSE otherwise
 */
async function updateQueueMember(id) {
  let db;
  try {
    let query = 5;
  } catch (error) {
    if (db) {
      db.end();
    }
    throw error;
  }
}

/**
 * Queries the database to see if login information provided is correct
 * @param {String} username - The username of the user provided
 * @param {String} password - The password of the user provided
 * @returns {Boolean} - TRUE if login information is valid, FALSE otherwise
 */
async function checkLogin(username, password, db) {
  let query = "SELECT * FROM staff WHERE username = ? AND password = ?";
  let result = await db.query(query, [username, password]);
  return !(result.length === 0);
}

/**
 * Queries the database to get list of all staff information
 * @returns {JSON[]} - An array of objects, each object being a staff member and their info
 */
async function getStaff() {
  let db;
  try {
    db = await getDB();
    let query = "SELECT uwid, username, section " +
                "FROM staff " +
                "WHERE role='TA' " +
                "ORDER BY section;";
    let output = db.query(query);
    return output;
  } catch (error) {
    if (db) {
      db.end();
    }
    throw error;
  }
}

/**
 * Queries the database to see if username provided is admin level
 * @param {String} username - The username of the user provided
 * @returns {Boolean} - TRUE if username is admin level, FALSE otherwise
 */
async function checkAdminLogin(username) {
  let db;
  try {
    db = await getDB();
    let query = "SELECT username FROM admins WHERE username = ?";
    let result = await db.query(query, username);
    db.end();
    return !(result.length === 0);
  } catch (error) {
    if (db) {
      db.end();
      throw error;
    }
  }
}

/**
 * Queries the database for the queue information
 * @param {String} username - The username of the user provided
 * @param {String} password - The password of the user provided
 * @returns {Boolean} - TRUE if login information is valid, FALSE otherwise
 */
async function getQueue(db) {
  let query = "SELECT qid, status, student_id, assigned_ta, question, u.name, length " +
              "FROM users u, queue " +
              "WHERE u.uwid = student_id";
  let rows = await db.query(query);
  return rows;
}

/**
 * Establishes a database connection to the wpldb and returns the database object.
 * Any errors that occur during connection should be caught in the function
 * that calls this one.
 * @returns {Object} - The database object for the connection.
 */
async function getDB() {
  let db = await mysql.createConnection({
    // Variables for connections to the database.
    host: "localhost",      // fill in with server name
    port: "8889",           // fill in with a port (will be different mac/pc)
    user: "root",           // fill in with username
    password: "root",       // fill in with password
    database: "wpldb"       // fill in with db name
  });
  return db;
}


const PORT = process.env.PORT || 8000;
app.listen(PORT);
