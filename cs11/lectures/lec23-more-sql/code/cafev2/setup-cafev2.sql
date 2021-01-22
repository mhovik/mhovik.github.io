CREATE TABLE menu(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  price DECIMAL(6, 2),
  cost DECIMAL(6, 2)
);

CREATE TABLE orders(
  id INT PRIMARY KEY AUTO_INCREMENT,
  mid INT NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(63),
  item_name VARCHAR(63) NOT NULL,
  qty INT DEFAULT 0,
  total_price DECIMAL(6,2) NOT NULL,
  order_time DATETIME DEFAULT NOW()
  FOREIGN KEY(id) REFERENCES orders (id)
);
