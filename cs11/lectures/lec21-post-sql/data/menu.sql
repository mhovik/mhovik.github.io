-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 22, 2019 at 10:17 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `154_menu`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `mid` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `subcategory` varchar(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `cost` float DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`mid`, `name`, `category`, `subcategory`, `price`, `cost`) VALUES
(1, 'Blueberry Scone', 'Bakery', 'Scones', 3.5, 0.75),
(2, 'Blueberry Scone (Vegan)', 'Bakery', 'Scones', 3.5, 0.85),
(3, 'Chocolate Chip Scone', 'Bakery', 'Scones', 3.7, 0.75),
(4, 'Cinnamon Sugar Scone', 'Bakery', 'Scones', 3, 0.75),
(5, 'Espresso Mocha Scone', 'Bakery', 'Scones', 3.5, 0.95),
(6, 'Plain Bagel', 'Bakery', 'Bagels', 3.5, 0.85),
(7, 'Blueberry Bagel', 'Bakery', 'Bagels', 4, 1.05),
(8, 'Cinnamon Sugar Bagel', 'Bakery', 'Bagels', 4, 0.9),
(9, 'Everything Bagel', 'Bakery', 'Bagels', 4, 1.15),
(10, 'Chocolate Chip Cookie', 'Bakery', 'Cookies', 1.25, 0.5),
(11, 'Chocolate Chip Cookie (Gluten-Free)', 'Bakery', 'Cookies', 1.25, 0.6),
(12, 'Oatmeal Cookie', 'Bakery', 'Cookies', 1.25, 0.4),
(13, 'Snickerdoodle', 'Bakery', 'Cookies', 1.25, 0.5),
(14, 'Snickerdoodle (Gluten-Free)', 'Bakery', 'Cookies', 1.25, 0.6),
(15, 'Tea Loaf', 'Bakery', 'Breads', 4, 1.85),
(16, 'Honey Toast', 'Bakery', 'Breads', 4, 1.85),
(17, 'Cinnamon Sugar Toast', 'Bakery', 'Breads', 2, 0.75),
(18, 'Plain Toast', 'Bakery', 'Breads', 1.5, 0.65),
(19, 'Avocado Toast', 'Bakery', 'Breads ', 6.5, 1.55),
(20, 'Banana Bread', 'Bakery', 'Breads', 3.5, 1.25),
(21, 'Coffee Cake', 'Bakery', 'Breads', 3.5, 1.35),
(22, 'Coffee Cake (Vegan)', 'Bakery', 'Breads', 3.5, 1.55),
(23, 'Coffee Cake (Vegan)', 'Bakery', 'Breads', 3.5, 1.55),
(24, 'Chocolate Brownie', 'Bakery', 'Brownies ', 5.5, 0.05),
(25, 'Chocolate Brownie (Gluten-Free)', 'Bakery', 'Brownies', 7.5, 0.1),
(26, 'Chocolate Brownie with Gold', 'Bakery', 'Brownies', 30, 1),
(27, 'Blackberry Pie (Slice)', 'Bakery', 'Pies', 4, 1),
(28, 'Chocolate Poptarts', 'Bakery', 'Sandwiches', 2, 1),
(29, 'Blueberry Poptarts', 'Bakery', 'Sandwiches', 2, 1),
(30, 'Strawberry Poptarts', 'Bakery', 'Sandwiches', 2, 1),
(31, 'Brewed Coffee (Black)', 'Drinks', 'Coffee', 1.25, 0.65),
(32, 'Brewed Coffee (With Cream)', 'Drinks', 'Coffee', 1.5, 0.85),
(33, 'Brewed Coffee (With Cream and Sugar)', 'Drinks', 'Coffee', 2, 1.05),
(34, 'Americano', 'Drinks', 'Coffee', 3.75, 1.1),
(35, 'Espresso', 'Drinks', 'Coffee', 3.75, 1.15),
(36, 'Cappuccino', 'Drinks', 'Coffee', 2.5, 1.05),
(37, 'Latte', 'Drinks', 'Coffee', 3, 1.1),
(38, 'Unicorn Frappe', 'Drinks', 'Coffee', 8, 2.75),
(39, 'White Chocolate Mocha', 'Drinks', 'Coffee', 6, 2.45),
(40, 'Green Tea (Hot)', 'Drinks', 'Tea', 2, 1.25),
(41, 'Green Tea (Iced)', 'Drinks', 'Tea', 2, 1.25),
(42, 'Teriyaki Chicken and Chicken Katsu Combo', 'Entrees', 'Hawaiian', 9.99, 3.5),
(43, 'Black Tea (Hot)', 'Drinks', 'Tea', 2, 1.25),
(44, 'Black Tea (Iced)', 'Drinks', 'Tea', 2, 1.25),
(45, 'Milk Tea (Hot)', 'Drinks', 'Tea', 2.5, 1.35),
(46, 'Milk Tea (Iced)', 'Drinks', 'Tea', 2.5, 1.35),
(47, 'Apple Cider', 'Drinks', 'Other', 3, 1.25),
(48, 'Hot Cocoa', 'Drinks', 'Other', 3, 0.75),
(49, 'Iced Water', 'Drinks', 'Other', 1, 0.35),
(50, 'Iced Tea', 'Drinks', 'Other', 3, 1.25),
(51, 'Unsweetened Iced Tea', 'Drinks', 'Other', 3, 0.25),
(52, 'Pink Drink', 'Drinks', 'Other', 5.45, 1.23),
(53, 'GIF-and-Jelly Sandwich', 'Entrees', 'Sandwiches', 4, 4),
(54, 'JIF-and-Jelly Sandwich', 'Entrees', 'Sandwiches', 4, 4),
(55, 'Caesar Salad', 'Salad', 'Salad', 5.5, 2.5),
(56, 'Greek Salad', 'Salad', 'Salad', 7, 2.55),
(57, 'Kale Salad', 'Salad', 'Salad', 10, 5),
(58, 'House Salad', 'Salad', 'Salad', 5.5, 2.25);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`mid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=59;
