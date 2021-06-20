-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2021 at 06:37 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `copytrade_setting`
--

-- --------------------------------------------------------

--
-- Table structure for table `follower_sender_setting`
--

CREATE TABLE `follower_sender_setting` (
  `id` int(11) NOT NULL,
  `follower_id` varchar(36) NOT NULL,
  `sender_login` int(11) NOT NULL,
  `sender_server` varchar(20) NOT NULL,
  `multiplier` double(5,2) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `follower_settings`
--

CREATE TABLE `follower_settings` (
  `id` varchar(36) NOT NULL,
  `login` int(11) NOT NULL,
  `server` varchar(20) NOT NULL,
  `suffix` varchar(256) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follower_sender_setting`
--
ALTER TABLE `follower_sender_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follower_settings`
--
ALTER TABLE `follower_settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follower_sender_setting`
--
ALTER TABLE `follower_sender_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
