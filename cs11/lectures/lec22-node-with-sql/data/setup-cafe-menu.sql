-- Melissa Hovik
-- Last updated: 08.13.19
CREATE TABLE cafemenu(
  id           INT  PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(100) NOT NULL,
  category     VARCHAR(100) NOT NULL,
  description  VARCHAR(256) NOT NULL,
  image        VARCHAR(100) DEFAULT "food.png",
  qty          INT DEFAULT 0
);

INSERT INTO cafemenu (name, category, description)
VALUES ("Banana", "Fresh Fruit", "A fresh test banana.");
