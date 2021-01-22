CREATE TABLE blog_posts(
  id                    INT  PRIMARY KEY AUTO_INCREMENT,
  author                VARCHAR(100) DEFAULT "anonymous",
  category              VARCHAR(100) DEFAULT "other",
  text                  TEXT NOT NULL,
  creation_time         DATETIME
);
