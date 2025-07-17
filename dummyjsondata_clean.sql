-- Cleaned MySQL dump for free online databases
-- Compatible with PlanetScale, Railway, Aiven, and other free MySQL providers
-- Removed database creation and MySQL version-specific syntax

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int NOT NULL,
  `products` json DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `discounted_total` decimal(10,2) DEFAULT NULL,
  `total_products` int DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `user_id` int DEFAULT '45',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL,
  `body` text,
  `post_id` int DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `user` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `http_msg_and_code`
--

DROP TABLE IF EXISTS `http_msg_and_code`;
CREATE TABLE `http_msg_and_code` (
  `status` int NOT NULL,
  `message` varchar(50) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `reactions` json DEFAULT NULL,
  `views` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `body` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_percentage` float DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `warranty_information` text,
  `shipping_information` text,
  `return_policy` text,
  `minimum_order_quantity` int DEFAULT NULL,
  `dimensions` json DEFAULT NULL,
  `category` json DEFAULT NULL,
  `availability_status` varchar(20) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `reviews` json DEFAULT NULL,
  `meta` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- NOTE: This file contains only table structure
-- For the complete dataset with INSERT statements, 
-- extract the data from your original dummyjsondata.sql file
