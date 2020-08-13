-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for osx10.15 (x86_64)
--
-- Host: 10.19.247.204    Database: innoacca
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `Authorization`
--

DROP TABLE IF EXISTS `Authorization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Authorization` (
  `ID` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `salt` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authorization`
--

LOCK TABLES `Authorization` WRITE;
/*!40000 ALTER TABLE `Authorization` DISABLE KEYS */;
INSERT INTO `Authorization` VALUES ('hi','fc2155e136db2cf8ebe5305a3effd72d488d61c8b4cb55ec63035b66381cb262807e665e4d89ca0806ead96315e1223191697e9e5d44338ba930ea1d26f4e469','334459280071'),('hihihihihi','1234','1246169757152'),('hihihihihihi','1234','265106103970'),('hihihihihihihi','1234','835542105067'),('hihihihihihihihi','1234','800152677529'),('hihihihihihihihihi','1234','913624313304'),('hihihihihihihihihihi','1234','639039714531');
/*!40000 ALTER TABLE `Authorization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Career`
--

DROP TABLE IF EXISTS `Career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Career` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `content` varchar(45) NOT NULL,
  `user_USN` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `career_USN_idx` (`user_USN`),
  CONSTRAINT `user_USN` FOREIGN KEY (`user_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Career`
--

LOCK TABLES `Career` WRITE;
/*!40000 ALTER TABLE `Career` DISABLE KEYS */;
INSERT INTO `Career` VALUES (1,'NAVER - CTO', 1),(2,'KAKAO - CEO', 1);
/*!40000 ALTER TABLE `Career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `name` varchar(45) NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES ('Security', 1);
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
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
  `keyword_ID` tinyint NOT NULL,
  `category_ID` tinyint NOT NULL,
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
  `matching_ID` tinyint NOT NULL,
  `request_message` tinyint NOT NULL,
  `response_message` tinyint NOT NULL,
  `mentor_USN` tinyint NOT NULL,
  `matching_state` tinyint NOT NULL,
  `is_checked` tinyint NOT NULL,
  `matching_request_time` tinyint NOT NULL,
  `matching_response_time` tinyint NOT NULL,
  `matching_keyword_name` tinyint NOT NULL,
  `matching_category_name` tinyint NOT NULL
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
  `user_name` tinyint NOT NULL,
  `matching_ID` tinyint NOT NULL,
  `request_message` tinyint NOT NULL,
  `response_message` tinyint NOT NULL,
  `mentee_USN` tinyint NOT NULL,
  `matching_state` tinyint NOT NULL,
  `is_checked` tinyint NOT NULL,
  `matching_request_time` tinyint NOT NULL,
  `matching_response_time` tinyint NOT NULL,
  `matching_keyword_name` tinyint NOT NULL,
  `matching_category_name` tinyint NOT NULL
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
  `total` tinyint NOT NULL,
  `mentor_USN` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `email` tinyint NOT NULL,
  `image_url` tinyint NOT NULL,
  `description` tinyint NOT NULL,
  `company` tinyint NOT NULL,
  `career_ID` tinyint NOT NULL,
  `career` tinyint NOT NULL,
  `keyword_ID` tinyint NOT NULL,
  `keyword_name` tinyint NOT NULL,
  `category_ID` tinyint NOT NULL,
  `category_name` tinyint NOT NULL
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
  `category_ID` tinyint NOT NULL,
  `category_name` tinyint NOT NULL,
  `keyword_ID` tinyint NOT NULL,
  `keyword_name` tinyint NOT NULL,
  `mentee_USN` tinyint NOT NULL
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
  `category_name` tinyint NOT NULL,
  `keyword_name` tinyint NOT NULL,
  `keyword_ID` tinyint NOT NULL,
  `user_USN` tinyint NOT NULL,
  `category_ID` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Keyword`
--

DROP TABLE IF EXISTS `Keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Keyword` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_ID` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `category_ID_idx` (`category_ID`),
  CONSTRAINT `fk_category_ID` FOREIGN KEY (`category_ID`) REFERENCES `Category` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `ID` int NOT NULL AUTO_INCREMENT,
  `mentee_USN` int ,
  `mentor_USN` int ,
  `request_message` text NOT NULL,
  `response_message` text,
  `is_checked` tinyint NOT NULL DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  `request_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `response_time` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `mentee_USN_idx` (`mentee_USN`),
  KEY `mentor_USN_idx` (`mentor_USN`),
  CONSTRAINT `mentee_USN` FOREIGN KEY (`mentee_USN`) REFERENCES `User` (`USN`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mentor_USN` FOREIGN KEY (`mentor_USN`) REFERENCES `User` (`USN`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Matching`
--

LOCK TABLES `Matching` WRITE;
/*!40000 ALTER TABLE `Matching` DISABLE KEYS */;
INSERT INTO `Matching` VALUES (1,2,1,'this is request message',NULL,1,1,'2020-07-28 17:22:21',NULL);
/*!40000 ALTER TABLE `Matching` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Matching_keyword`
--

DROP TABLE IF EXISTS `Matching_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Matching_keyword` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `matching_ID` int NOT NULL,
  `keyword_name` tinytext NOT NULL,
  `category_name` tinytext NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `mk_matching_ID_idx` (`matching_ID`),
  CONSTRAINT `mk_matching_ID` FOREIGN KEY (`matching_ID`) REFERENCES `Matching` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `ID` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `message` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
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
  `user_USN` int NOT NULL,
  `keyword_ID` int NOT NULL,
  PRIMARY KEY (`user_USN`,`keyword_ID`),
  KEY `rk_USN_idx` (`user_USN`),
  KEY `rk_keyword_ID_idx` (`keyword_ID`),
  CONSTRAINT `rk_keyword_ID` FOREIGN KEY (`keyword_ID`) REFERENCES `Keyword` (`ID`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `rk_user_USN` FOREIGN KEY (`user_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `USN` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `ID` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `image_url` text,
  `description` text,
  `company` text,
  `permission` int NOT NULL DEFAULT '-1',
  `noti_count` int NOT NULL DEFAULT '0',
  `type` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`USN`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `ID` int NOT NULL AUTO_INCREMENT,
  `noti_ID` int DEFAULT NULL,
  `receiver_USN` int,
  `sender_USN` int,
  `is_checked` tinyint(1) NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `matching_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `sender_USN_idx` (`sender_USN`),
  KEY `receiver_USN_idx` (`receiver_USN`),
  KEY `noti_ID_idx` (`noti_ID`),
  KEY `matching_ID_idx` (`matching_ID`),
  CONSTRAINT `matching_ID` FOREIGN KEY (`matching_ID`) REFERENCES `Matching` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `noti_ID` FOREIGN KEY (`noti_ID`) REFERENCES `Notification` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `receiver_USN` FOREIGN KEY (`receiver_USN`) REFERENCES `User` (`USN`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `sender_USN` FOREIGN KEY (`sender_USN`) REFERENCES `User` (`USN`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_notification`
--

LOCK TABLES `User_notification` WRITE;
/*!40000 ALTER TABLE `User_notification` DISABLE KEYS */;
INSERT INTO `User_notification` VALUES (1,1,2,1,0,'2020-08-12 17:23:41',NULL);
/*!40000 ALTER TABLE `User_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_total_keyword`
--

DROP TABLE IF EXISTS `User_total_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_total_keyword` (
  `user_USN` int NOT NULL,
  `keyword_ID` int NOT NULL,
  PRIMARY KEY (`user_USN`,`keyword_ID`),
  KEY `utk_keyword_ID_idx` (`keyword_ID`),
  CONSTRAINT `utk_keyword_ID` FOREIGN KEY (`keyword_ID`) REFERENCES `Keyword` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `utk_USN` FOREIGN KEY (`user_USN`) REFERENCES `User` (`USN`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Final view structure for view `get_all_keyword`
--

/*!50001 DROP TABLE IF EXISTS `get_all_keyword`*/;
/*!50001 DROP VIEW IF EXISTS `get_all_keyword`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_all_keyword` AS select `a`.`name` AS `keyword_name`,`a`.`ID` AS `keyword_ID`,`b`.`ID` AS `category_ID`,`b`.`name` AS `category_name` from (`keyword` `a` join `category` `b`) where (`a`.`category_ID` = `b`.`ID`) */;
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
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_matching_mentee` AS select `U`.`USN` AS `USN`,`U`.`name` AS `user_name`,`M`.`ID` AS `matching_ID`,`M`.`request_message` AS `request_message`,`M`.`response_message` AS `response_message`,`M`.`mentor_USN` AS `mentor_USN`,`M`.`state` AS `matching_state`,`M`.`is_checked` AS `is_checked`,`M`.`request_time` AS `matching_request_time`,`M`.`response_time` AS `matching_response_time`,`K`.`keyword_name` AS `matching_keyword_name`,`K`.`category_name` AS `matching_category_name` from ((`user` `U` join `matching` `M`) join `matching_keyword` `K`) where ((`U`.`USN` = `M`.`mentee_USN`) and (`M`.`ID` = `K`.`matching_ID`)) */;
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
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_matching_mentor` AS select `U`.`USN` AS `USN`,`U`.`name` AS `user_name`,`M`.`ID` AS `matching_ID`,`M`.`request_message` AS `request_message`,`M`.`response_message` AS `response_message`,`M`.`mentee_USN` AS `mentee_USN`,`M`.`state` AS `matching_state`,`M`.`is_checked` AS `is_checked`,`M`.`request_time` AS `matching_request_time`,`M`.`response_time` AS `matching_response_time`,`K`.`keyword_name` AS `matching_keyword_name`,`K`.`category_name` AS `matching_category_name` from ((`user` `U` join `matching` `M`) join `matching_keyword` `K`) where ((`U`.`USN` = `M`.`mentor_USN`) and (`M`.`ID` = `K`.`matching_ID`)) */;
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
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_mentor_list` AS select found_rows() AS `total`,`u`.`USN` AS `mentor_USN`,`u`.`name` AS `name`,`u`.`email` AS `email`,`u`.`image_url` AS `image_url`,`u`.`description` AS `description`,`u`.`company` AS `company`,`car`.`ID` AS `career_ID`,`car`.`content` AS `career`,`utk`.`keyword_ID` AS `keyword_ID`,`k`.`name` AS `keyword_name`,`cat`.`ID` AS `category_ID`,`cat`.`name` AS `category_name` from ((((`category` `cat` join `keyword` `k`) join `user_total_keyword` `utk`) join `user` `u`) join `career` `car`) where ((`cat`.`ID` = `k`.`category_ID`) and (`k`.`ID` = `utk`.`keyword_ID`) and (`utk`.`user_USN` = `u`.`USN`) and (`u`.`USN` = `car`.`user_USN`)) */;
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
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_recommend_keyword` AS select `c`.`ID` AS `category_ID`,`c`.`name` AS `category_name`,`b`.`ID` AS `keyword_ID`,`b`.`name` AS `keyword_name`,`a`.`user_USN` AS `mentee_USN` from ((`recommend_keyword` `a` join `keyword` `b`) join `category` `c`) where ((`a`.`keyword_ID` = `b`.`ID`) and (`b`.`category_ID` = `c`.`ID`)) */;
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
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `get_total_keyword` AS select `c`.`name` AS `category_name`,`b`.`name` AS `keyword_name`,`b`.`ID` AS `keyword_ID`,`a`.`user_USN` AS `user_USN`,`c`.`ID` AS `category_ID` from ((`user_total_keyword` `a` join `keyword` `b`) join `category` `c`) where ((`a`.`keyword_ID` = `b`.`ID`) and (`b`.`category_ID` = `c`.`ID`)) */;
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

-- Dump completed on 2020-08-13 11:09:03
