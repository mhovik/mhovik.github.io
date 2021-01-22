CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL
);

INSERT INTO users(username, password) values
('foo', 'bar')
('bar', 'baz');
