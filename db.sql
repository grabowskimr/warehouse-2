-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 13, 2020 at 07:57 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `service`
--

-- --------------------------------------------------------

--
-- Table structure for table `w_actions`
--

CREATE TABLE `w_actions` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `count` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `w_orders`
--

CREATE TABLE `w_orders` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `order_products` text NOT NULL,
  `type` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `user_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `w_products`
--

CREATE TABLE `w_products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `product_index` varchar(50) NOT NULL,
  `price` varchar(10) NOT NULL,
  `supplier` varchar(40) NOT NULL,
  `quantity` int(11) NOT NULL,
  `quantityType` varchar(8) NOT NULL,
  `quantityAlert` int(11) NOT NULL,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `w_sessions`
--

CREATE TABLE `w_sessions` (
  `id` int(11) NOT NULL,
  `session_id` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `w_users`
--

CREATE TABLE `w_users` (
  `id` int(11) NOT NULL,
  `login` varchar(40) NOT NULL,
  `password` varchar(128) NOT NULL,
  `profile` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `w_actions`
--
ALTER TABLE `w_actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `w_orders`
--
ALTER TABLE `w_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `w_products`
--
ALTER TABLE `w_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `w_sessions`
--
ALTER TABLE `w_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `w_users`
--
ALTER TABLE `w_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `w_actions`
--
ALTER TABLE `w_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `w_orders`
--
ALTER TABLE `w_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `w_products`
--
ALTER TABLE `w_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `w_sessions`
--
ALTER TABLE `w_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `w_users`
--
ALTER TABLE `w_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
