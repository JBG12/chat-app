-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2023 at 02:11 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodelogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `logged_in` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `logged_in`) VALUES
(1, 'test', 'test', 'test@test.com', 'true'),
(2, 'test2', 'test2', 'test@test.com', 'true'),
(3, 'test3', 'test3', 'test@test.com', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `chat-1-2`
--

CREATE TABLE `chat-1-2` (
  `id` int(11) NOT NULL,
  `message` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `user` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat-1-2`
--

INSERT INTO `chat-1-2` (`id`, `message`, `date`, `user`) VALUES
(1, 'Hello', '2023-01-09 11:40:46', '1'),
(2, 'Hello2', '2023-01-09 11:40:46', '2'),
(3, 'abc', '2023-01-08 14:16:19', '1'),
(4, '1121111', '2023-01-08 14:31:33', '1'),
(5, 'abc', '2023-01-08 14:31:48', '2'),
(6, 'xxx', '2023-01-08 14:54:25', '1'),
(7, 'eeee', '2023-01-08 15:06:14', '1'),
(8, 'vcvvv', '2023-01-08 15:06:40', '1'),
(9, 'cvcv', '2023-01-08 15:06:48', '2'),
(10, 'haha', '2023-01-08 15:25:05', '2'),
(11, 'ahah', '2023-01-08 16:50:24', '1'),
(12, 'Hallo there', '2023-01-09 10:12:05', '2'),
(13, 'general kenobi', '2023-01-09 10:12:20', '1'),
(14, 'aaaaa', '2023-01-09 12:42:17', '2'),
(15, 'test', '2023-01-09 12:42:38', '1'),
(16, 'Hallo', '2023-01-09 12:43:41', '1'),
(17, 'aaa', '2023-01-09 21:08:06', '1'),
(18, 'aaaaa', '2023-01-09 21:08:51', '1'),
(19, 'aaa', '2023-01-09 21:24:18', '1'),
(20, 'ddddd', '2023-01-09 21:27:57', '1'),
(21, 'SSS', '2023-01-09 21:28:18', '1'),
(22, 'AAAA', '2023-01-09 21:28:55', '1'),
(23, '1111', '2023-01-09 21:29:53', '1'),
(24, '2222', '2023-01-09 21:30:09', '1'),
(25, 'aaaaa', '2023-01-09 21:30:28', '1'),
(26, 'aaaaa', '2023-01-09 21:32:16', '1'),
(27, '1234532', '2023-01-09 21:33:05', '1'),
(28, 'sdasdasdasd', '2023-01-09 21:33:55', '1'),
(29, 'assdsfgdsa', '2023-01-09 21:33:59', '1'),
(30, 'aaa', '2023-01-09 21:47:08', '1'),
(31, 'ssss', '2023-01-09 21:47:15', '1'),
(32, 'dddd', '2023-01-09 21:49:53', '1'),
(33, 'ddd', '2023-01-09 21:51:53', '1'),
(34, '1111', '2023-01-09 21:52:12', '1'),
(35, 'aaaaaaaaa', '2023-01-09 21:54:02', '1'),
(36, 'ddd', '2023-01-09 21:54:04', '1'),
(37, 'd', '2023-01-09 21:54:19', '1'),
(38, 'd', '2023-01-09 22:03:34', '1'),
(39, 'd', '2023-01-09 22:03:34', '1'),
(40, 'd', '2023-01-09 22:03:34', '1'),
(41, 'd', '2023-01-09 22:03:34', '1'),
(42, 'd', '2023-01-09 22:06:11', '1'),
(43, 's', '2023-01-09 22:07:30', '1'),
(44, '???', '2023-01-09 22:07:44', '2'),
(45, 'ss', '2023-01-09 22:07:58', '1'),
(46, 'd', '2023-01-09 22:13:00', '1'),
(47, 'asddsasd', '2023-01-09 22:13:56', '1'),
(48, 'aaaa', '2023-01-09 22:14:04', '2'),
(49, 'ssss', '2023-01-09 22:22:35', '1'),
(50, '1111', '2023-01-09 22:22:40', '1'),
(51, 'ssss', '2023-01-09 22:30:25', '1'),
(52, '1111', '2023-01-09 22:32:15', '1'),
(53, '111', '2023-01-09 22:33:31', '1'),
(54, '????', '2023-01-09 22:33:43', '2'),
(55, 'ddd', '2023-01-09 22:43:31', '1'),
(56, '???', '2023-01-09 22:45:59', '2'),
(57, 'sss', '2023-01-09 22:46:44', '1'),
(58, 'aaaa', '2023-01-09 22:50:46', '2'),
(59, 'd', '2023-01-09 22:52:20', '1'),
(60, 'aaaa', '2023-01-10 10:43:30', '1'),
(61, '???', '2023-01-10 10:43:51', '2'),
(62, 'd', '2023-01-10 10:43:52', '2'),
(63, 'd', '2023-01-10 10:43:53', '2'),
(64, 'a', '2023-01-10 10:44:03', '1'),
(65, 'a', '2023-01-10 10:44:04', '1'),
(66, 'fghjj', '2023-01-10 14:01:42', '1'),
(67, 'aaaaaaaaaaaaaaaaa', '2023-01-10 14:02:04', '2'),
(68, 'aaaa', '2023-01-10 14:11:19', '1');

-- --------------------------------------------------------

--
-- Table structure for table `chat-1-3`
--

CREATE TABLE `chat-1-3` (
  `id` int(11) NOT NULL,
  `message` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `user` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat-1-2`
--
ALTER TABLE `chat-1-2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat-1-3`
--
ALTER TABLE `chat-1-3`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `chat-1-2`
--
ALTER TABLE `chat-1-2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `chat-1-3`
--
ALTER TABLE `chat-1-3`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
