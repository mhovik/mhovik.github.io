-- Melissa Hovik
-- Last updated: 08.13.19
-- Sets up a new blog_posts table in a blog database.
CREATE TABLE blog_posts(
  id              INT PRIMARY KEY AUTO_INCREMENT,
  title           VARCHAR(255) DEFAULT "Untitled Post",
  author          VARCHAR(100) DEFAULT "anonymous",
  category        VARCHAR(100) DEFAULT "other",
  creation_time   DATETIME DEFAULT NOW()
);
