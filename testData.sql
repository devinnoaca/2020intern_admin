-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for osx10.15 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Career`
--

DROP TABLE IF EXISTS `Career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Career` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_USN` int(11) NOT NULL,
  `content` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user_USN` (`user_USN`),
  CONSTRAINT `career_ibfk_1` FOREIGN KEY (`user_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Career`
--

LOCK TABLES `Career` WRITE;
/*!40000 ALTER TABLE `Career` DISABLE KEYS */;
INSERT INTO `Career` VALUES (1,1,'NAVER - CTO'),(2,1,'KAKAO - CEO');
/*!40000 ALTER TABLE `Career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Security');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Keyword`
--

DROP TABLE IF EXISTS `Keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Keyword` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `category_ID` (`category_ID`),
  CONSTRAINT `keyword_ibfk_1` FOREIGN KEY (`category_ID`) REFERENCES `Category` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Keyword`
--

LOCK TABLES `Keyword` WRITE;
/*!40000 ALTER TABLE `Keyword` DISABLE KEYS */;
INSERT INTO `Keyword` VALUES (1,'SQL Injection',1),(2,'XSS',1);
/*!40000 ALTER TABLE `Keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Matching`
--

DROP TABLE IF EXISTS `Matching`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Matching` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `mentee_USN` int(11) NOT NULL,
  `mentor_USN` int(11) NOT NULL,
  `request_time` datetime DEFAULT current_timestamp(),
  `request_message` text DEFAULT NULL,
  `is_checked` tinyint(1) NOT NULL DEFAULT 0,
  `state` int(11) NOT NULL DEFAULT 0,
  `response_message` text DEFAULT NULL,
  `response_time` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `mentee_USN` (`mentee_USN`),
  KEY `mentor_USN` (`mentor_USN`),
  CONSTRAINT `matching_ibfk_1` FOREIGN KEY (`mentee_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matching_ibfk_2` FOREIGN KEY (`mentor_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Matching`
--

LOCK TABLES `Matching` WRITE;
/*!40000 ALTER TABLE `Matching` DISABLE KEYS */;
INSERT INTO `Matching` VALUES (1,2,1,'2020-07-28 17:22:21','this is request message',1,1,NULL,'2017-07-29 10:58:32');
/*!40000 ALTER TABLE `Matching` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Matching_keyword`
--

DROP TABLE IF EXISTS `Matching_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Matching_keyword` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `matching_ID` int(11) NOT NULL,
  `keyword_name` text NOT NULL,
  `category_name` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `matching_ID` (`matching_ID`),
  CONSTRAINT `matching_keyword_ibfk_1` FOREIGN KEY (`matching_ID`) REFERENCES `Matching` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Matching_keyword`
--

LOCK TABLES `Matching_keyword` WRITE;
/*!40000 ALTER TABLE `Matching_keyword` DISABLE KEYS */;
INSERT INTO `Matching_keyword` VALUES (1,1,'React','Web');
/*!40000 ALTER TABLE `Matching_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Notification` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES (1,0,NULL);
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend_keyword`
--

DROP TABLE IF EXISTS `Recommend_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recommend_keyword` (
  `user_USN` int(11) NOT NULL,
  `keyword_ID` int(11) NOT NULL,
  PRIMARY KEY (`user_USN`,`keyword_ID`),
  KEY `keyword_ID` (`keyword_ID`),
  CONSTRAINT `recommend_keyword_ibfk_1` FOREIGN KEY (`user_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recommend_keyword_ibfk_2` FOREIGN KEY (`keyword_ID`) REFERENCES `Keyword` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend_keyword`
--

LOCK TABLES `Recommend_keyword` WRITE;
/*!40000 ALTER TABLE `Recommend_keyword` DISABLE KEYS */;
INSERT INTO `Recommend_keyword` VALUES (1,1);
/*!40000 ALTER TABLE `Recommend_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `USN` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `ID` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `image_url` text DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `company` text DEFAULT NULL,
  `permission` int(11) NOT NULL DEFAULT -1,
  `noti_count` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`USN`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'SuperAdmin','ImAdmin','admin@e.mail','d!e#tdDqa!12!@','https://t1.daumcdn.net/cfile/blog/2778C3345902CAD121','Hello, I\'m Admin','Innovation Academy',2,0,2),(2,'Edsger Wybe Dijkstra','ImMentor','mentor@e.mail','q1w2e3r4','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/600px-Edsger_Wybe_Dijkstra.jpg','Go To Statement Considered Harmful','BaekSoo',0,1,1),(3,'Cho Ding Kim','ImMentee','mentee@e.mail','1234','https://upload3.inven.co.kr/upload/2020/05/11/bbs/i13789520996.jpg','I wanna be a adult!!!','Elementary school',0,0,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_notification`
--

DROP TABLE IF EXISTS `User_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_notification` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `noti_ID` int(11) NOT NULL,
  `receiver_USN` int(11) NOT NULL,
  `sender_USN` int(11) NOT NULL,
  `is_checked` tinyint(1) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `noti_ID` (`noti_ID`),
  KEY `receiver_USN` (`receiver_USN`),
  KEY `sender_USN` (`sender_USN`),
  CONSTRAINT `user_notification_ibfk_1` FOREIGN KEY (`noti_ID`) REFERENCES `Notification` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_notification_ibfk_2` FOREIGN KEY (`receiver_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_notification_ibfk_3` FOREIGN KEY (`sender_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_notification`
--

LOCK TABLES `User_notification` WRITE;
/*!40000 ALTER TABLE `User_notification` DISABLE KEYS */;
INSERT INTO `User_notification` VALUES (1,1,2,1,0,'2020-08-12 17:23:41');
/*!40000 ALTER TABLE `User_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_total_keyword`
--

DROP TABLE IF EXISTS `User_total_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_total_keyword` (
  `user_usn` int(11) NOT NULL,
  `keyword_ID` int(11) NOT NULL,
  PRIMARY KEY (`user_usn`,`keyword_ID`),
  KEY `keyword_ID` (`keyword_ID`),
  CONSTRAINT `user_total_keyword_ibfk_1` FOREIGN KEY (`user_usn`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_total_keyword_ibfk_2` FOREIGN KEY (`keyword_ID`) REFERENCES `Keyword` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_total_keyword`
--

LOCK TABLES `User_total_keyword` WRITE;
/*!40000 ALTER TABLE `User_total_keyword` DISABLE KEYS */;
INSERT INTO `User_total_keyword` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `User_total_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `get_all_keyword`
--

DROP TABLE IF EXISTS `get_all_keyword`;
/*!50001 DROP VIEW IF EXISTS `get_all_keyword`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `get_all_keyword` (
  `keyword_name` tinyint NOT NULL,
  `keyword_id` tinyint NOT NULL,
  `category_id` tinyint NOT NULL,
  `category_name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `get_matching_mentee`
--

DROP TABLE IF EXISTS `get_matching_mentee`;
/*!50001 DROP VIEW IF EXISTS `get_matching_mentee`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `get_matching_mentee` (
  `USN` tinyint NOT NULL,
  `user_name` tinyint NOT NULL,
  `matching_id` tinyint NOT NULL,
  `request_message` tinyint NOT NULL,
  `response_message` tinyint NOT NULL,
  `mentee_USN` tinyint NOT NULL,
  `state` tinyint NOT NULL,
  `is_checked` tinyint NOT NULL,
  `request_time` tinyint NOT NULL,
  `response_time` tinyint NOT NULL,
  `keyword_name` tinyint NOT NULL,
  `category_name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `get_matching_mentor`
--

DROP TABLE IF EXISTS `get_matching_mentor`;
/*!50001 DROP VIEW IF EXISTS `get_matching_mentor`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `get_matching_mentor` (
  `USN` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `matching_id` tinyint NOT NULL,
  `request_message` tinyint NOT NULL,
  `response_message` tinyint NOT NULL,
  `mentor_USN` tinyint NOT NULL,
  `state` tinyint NOT NULL,
  `is_checked` tinyint NOT NULL,
  `request_time` tinyint NOT NULL,
  `response_time` tinyint NOT NULL,
  `keyword_name` tinyint NOT NULL,
  `category_name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `get_mentor_list`
--

DROP TABLE IF EXISTS `get_mentor_list`;
/*!50001 DROP VIEW IF EXISTS `get_mentor_list`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `get_mentor_list` (
  `USN` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `category_name` tinyint NOT NULL,
  `keyword_name` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `image_url` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `career` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `get_recommend_keyword`
--

DROP TABLE IF EXISTS `get_recommend_keyword`;
/*!50001 DROP VIEW IF EXISTS `get_recommend_keyword`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `get_recommend_keyword` (
  `mentee_USN` tinyint NOT NULL,
  `keyword_ID` tinyint NOT NULL,
  `keyword_Name` tinyint NOT NULL,
  `category_ID` tinyint NOT NULL,
  `category_Name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `get_total_keyword`
--

DROP TABLE IF EXISTS `get_total_keyword`;
/*!50001 DROP VIEW IF EXISTS `get_total_keyword`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `get_total_keyword` (
  `user_usn` tinyint NOT NULL,
  `keyword_ID` tinyint NOT NULL,
  `keyword_Name` tinyint NOT NULL,
  `category_ID` tinyint NOT NULL,
  `category_Name` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `get_all_keyword`
--

/*!50001 DROP TABLE IF EXISTS `get_all_keyword`*/;
/*!50001 DROP VIEW IF EXISTS `get_all_keyword`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_all_keyword` AS select `k`.`name` AS `keyword_name`,`k`.`ID` AS `keyword_id`,`c`.`ID` AS `category_id`,`c`.`name` AS `category_name` from (`keyword` `k` join `category` `c` on(`k`.`category_ID` = `c`.`ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `get_matching_mentee`
--

/*!50001 DROP TABLE IF EXISTS `get_matching_mentee`*/;
/*!50001 DROP VIEW IF EXISTS `get_matching_mentee`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_matching_mentee` AS select `u`.`USN` AS `USN`,`u`.`name` AS `user_name`,`m`.`ID` AS `matching_id`,`m`.`request_message` AS `request_message`,`m`.`response_message` AS `response_message`,`m`.`mentee_USN` AS `mentee_USN`,`m`.`state` AS `state`,`m`.`is_checked` AS `is_checked`,`m`.`request_time` AS `request_time`,`m`.`response_time` AS `response_time`,`mk`.`keyword_name` AS `keyword_name`,`mk`.`category_name` AS `category_name` from ((`user` `u` join `matching` `m` on(`u`.`USN` = `m`.`mentee_USN`)) join `matching_keyword` `mk` on(`m`.`ID` = `mk`.`matching_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `get_matching_mentor`
--

/*!50001 DROP TABLE IF EXISTS `get_matching_mentor`*/;
/*!50001 DROP VIEW IF EXISTS `get_matching_mentor`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_matching_mentor` AS select `u`.`USN` AS `USN`,`u`.`name` AS `name`,`m`.`ID` AS `matching_id`,`m`.`request_message` AS `request_message`,`m`.`response_message` AS `response_message`,`m`.`mentor_USN` AS `mentor_USN`,`m`.`state` AS `state`,`m`.`is_checked` AS `is_checked`,`m`.`request_time` AS `request_time`,`m`.`response_time` AS `response_time`,`mk`.`keyword_name` AS `keyword_name`,`mk`.`category_name` AS `category_name` from ((`user` `u` join `matching` `m` on(`u`.`USN` = `m`.`mentor_USN`)) join `matching_keyword` `mk` on(`m`.`ID` = `mk`.`matching_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `get_mentor_list`
--

/*!50001 DROP TABLE IF EXISTS `get_mentor_list`*/;
/*!50001 DROP VIEW IF EXISTS `get_mentor_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_mentor_list` AS select `u`.`USN` AS `USN`,`u`.`name` AS `name`,`c`.`name` AS `category_name`,`k`.`name` AS `keyword_name`,`u`.`email` AS `email`,`u`.`image_url` AS `image_url`,`u`.`description` AS `description`,`cr`.`content` AS `career` from ((((`category` `c` join `keyword` `k` on(`c`.`ID` = `k`.`category_ID`)) join `user_total_keyword` `utk` on(`k`.`ID` = `utk`.`keyword_ID`)) join `user` `u` on(`utk`.`user_usn` = `u`.`USN`)) join `career` `cr` on(`u`.`USN` = `cr`.`user_USN`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `get_recommend_keyword`
--

/*!50001 DROP TABLE IF EXISTS `get_recommend_keyword`*/;
/*!50001 DROP VIEW IF EXISTS `get_recommend_keyword`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_recommend_keyword` AS select `t`.`user_USN` AS `mentee_USN`,`t`.`keyword_ID` AS `keyword_ID`,`k`.`name` AS `keyword_Name`,`k`.`category_ID` AS `category_ID`,`c`.`name` AS `category_Name` from ((`keyword` `k` join `category` `c` on(`k`.`category_ID` = `c`.`ID`)) join `recommend_keyword` `t` on(`k`.`ID` = `t`.`keyword_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `get_total_keyword`
--

/*!50001 DROP TABLE IF EXISTS `get_total_keyword`*/;
/*!50001 DROP VIEW IF EXISTS `get_total_keyword`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_total_keyword` AS select `r`.`user_usn` AS `user_usn`,`r`.`keyword_ID` AS `keyword_ID`,`k`.`name` AS `keyword_Name`,`k`.`category_ID` AS `category_ID`,`c`.`name` AS `category_Name` from ((`keyword` `k` join `category` `c` on(`k`.`category_ID` = `c`.`ID`)) join `user_total_keyword` `r` on(`k`.`ID` = `r`.`keyword_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-12 17:25:03
