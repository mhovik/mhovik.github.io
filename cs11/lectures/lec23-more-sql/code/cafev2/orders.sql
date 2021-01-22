DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  phone_number VARCHAR(20),
  email VARCHAR(63),
  item_name VARCHAR(63) NOT NULL,
  qty INTEGER NOT NULL,
  total_price DECIMAL(6,2) NOT NULL,
  order_time DATETIME DEFAULT NOW()
);