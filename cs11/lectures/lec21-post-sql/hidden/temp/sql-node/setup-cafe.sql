CREATE TABLE menu(
  id           INT  PRIMARY KEY AUTO_INCREMENT,
  category     VARCHAR(100) NOT NULL,
  name         VARCHAR(100) NOT NULL,
  description  VARCHAR(256) NOT NULL,
  image        VARCHAR(100) DEFAULT "food.png",
  qty          INT DEFAULT 0
);
