CREATE TABLE pokedex(
  id           INT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  type         VARCHAR(15) NOT NULL,
  weakness     VARCHAR(15) NOT NULL,
  move1        VARCHAR(100) NOT NULL,
  move2        VARCHAR(100) DEFAULT NULL,
  move3        VARCHAR(100) DEFAULT NULL,
  move4        VARCHAR(100) DEFAULT NULL
);
