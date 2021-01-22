-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 22, 2019 at 08:11 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cafedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE menu (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(40) DEFAULT NULL,
  `category` varchar(7) DEFAULT NULL,
  `subcategory` varchar(10) DEFAULT NULL,
  `price` decimal(4,2) DEFAULT NULL,
  `cost` decimal(3,2) DEFAULT NULL
) 

--
-- Dumping data for table `menu`
--

INSERT INTO menu(`name`, `category`, `subcategory`, `price`, `cost`) VALUES
('Blueberry Scone', 'Bakery', 'Scones', '3.50', '0.75'),
('Blueberry Scone (Vegan)', 'Bakery', 'Scones', '3.50', '0.85'),
('Chocolate Chip Scone', 'Bakery', 'Scones', '3.70', '0.75'),
('Cinnamon Sugar Scone', 'Bakery', 'Scones', '3.00', '0.75'),
('Espresso Mocha Scone', 'Bakery', 'Scones', '3.50', '0.95'),
('Plain Bagel', 'Bakery', 'Bagels', '3.50', '0.85'),
('Blueberry Bagel', 'Bakery', 'Bagels', '4.00', '1.05'),
('Cinnamon Sugar Bagel', 'Bakery', 'Bagels', '4.00', '0.90'),
('Everything Bagel', 'Bakery', 'Bagels', '4.00', '1.15'),
('Chocolate Chip Cookie', 'Bakery', 'Cookies', '1.25', '0.50'),
('Chocolate Chip Cookie (Gluten-Free)', 'Bakery', 'Cookies', '1.25', '0.60'),
('Oatmeal Cookie', 'Bakery', 'Cookies', '1.25', '0.40'),
('Snickerdoodle', 'Bakery', 'Cookies', '1.25', '0.50'),
('Snickerdoodle (Gluten-Free)', 'Bakery', 'Cookies', '1.25', '0.60'),
('Tea Loaf', 'Bakery', 'Breads', '4.00', '1.85'),
('Honey Toast', 'Bakery', 'Breads', '4.00', '1.85'),
('Cinnamon Sugar Toast', 'Bakery', 'Breads', '2.00', '0.75'),
('Plain Toast', 'Bakery', 'Breads', '1.50', '0.65'),
('Avocado Toast', 'Bakery', 'Breads ', '6.50', '1.55'),
('Banana Bread', 'Bakery', 'Breads', '3.50', '1.25'),
('Coffee Cake', 'Bakery', 'Breads', '3.50', '1.35'),
('Coffee Cake (Vegan)', 'Bakery', 'Breads', '3.50', '1.55'),
('Coffee Cake (Vegan)', 'Bakery', 'Breads', '3.50', '1.55'),
('Chocolate Brownie', 'Bakery', 'Brownies ', '5.50', '0.05'),
('Chocolate Brownie (Gluten-Free)', 'Bakery', 'Brownies', '7.50', '0.10'),
('Chocolate Brownie with Gold', 'Bakery', 'Brownies', '30.00', '1.00'),
('Blackberry Pie (Slice)', 'Bakery', 'Pies', '4.00', '1.00'),
('Chocolate Poptarts', 'Bakery', 'Sandwiches', '2.00', '1.00'),
('Blueberry Poptarts', 'Bakery', 'Sandwiches', '2.00', '1.00'),
('Strawberry Poptarts', 'Bakery', 'Sandwiches', '2.00', '1.00'),
('Brewed Coffee (Black)', 'Drinks', 'Coffee', '1.25', '0.65'),
('Brewed Coffee (With Cream)', 'Drinks', 'Coffee', '1.50', '0.85'),
('Brewed Coffee (With Cream and Sugar)', 'Drinks', 'Coffee', '2.00', '1.05'),
('Americano', 'Drinks', 'Coffee', '3.75', '1.10'),
('Espresso', 'Drinks', 'Coffee', '3.75', '1.15'),
('Cappuccino', 'Drinks', 'Coffee', '2.50', '1.05'),
('Latte', 'Drinks', 'Coffee', '3.00', '1.10'),
('Unicorn Frappe', 'Drinks', 'Coffee', '8.00', '2.75'),
('White Chocolate Mocha', 'Drinks', 'Coffee', '6.00', '2.45'),
('Green Tea (Hot)', 'Drinks', 'Tea', '2.00', '1.25'),
('Green Tea (Iced)', 'Drinks', 'Tea', '2.00', '1.25'),
('Black Tea (Hot)', 'Drinks', 'Tea', '2.00', '1.25'),
('Black Tea (Iced)', 'Drinks', 'Tea', '2.00', '1.25'),
('Milk Tea (Hot)', 'Drinks', 'Tea', '2.50', '1.35'),
('Milk Tea (Iced)', 'Drinks', 'Tea', '2.50', '1.35'),
('Apple Cider', 'Drinks', 'Other', '3.00', '1.25'),
('Hot Cocoa', 'Drinks', 'Other', '3.00', '0.75'),
('Iced Water', 'Drinks', 'Other', '1.00', '0.35'),
('Iced Tea', 'Drinks', 'Other', '3.00', '1.25'),
('Unsweetened Iced Tea', 'Drinks', 'Other', '3.00', '0.25'),
('Pink Drink', 'Drinks', 'Other', '5.45', '1.23'),
('Teriyaki Chicken and Chicken Katsu Combo', 'Entrees', 'Hawaiian', '9.99', '3.50'),
('GIF-and-Jelly Sandwich', 'Entrees', 'Sandwiches', '4.00', '4.00'),
('JIF-and-Jelly Sandwich', 'Entrees', 'Sandwiches', '4.00', '4.00'),
('Caesar Salad', 'Salad', 'Salad', '5.50', '2.50'),
('Greek Salad', 'Salad', 'Salad', '7.00', '2.55'),
('Kale Salad', 'Salad', 'Salad', '10.00', '5.00'),
('House Salad', 'Salad', 'Salad', '5.50', '2.25');

