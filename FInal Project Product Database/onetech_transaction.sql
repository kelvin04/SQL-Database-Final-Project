-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: onetech
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transaction` (
  `idTransaction` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `Date` varchar(45) DEFAULT NULL,
  `Time` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Address` mediumtext,
  `Courier` varchar(45) DEFAULT NULL,
  `TotalPrice` int(11) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTransaction`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (134,'anthony04','2018-12-02','20:35:00','Anthony','Green Office Park 9','T&T',12649000,'Waiting for Admin Confirmation'),(135,'anthony04','2018-12-02','20:43:14','Sherly Smith','Green Office Park 10','T&T',9349000,'Shipping'),(136,'Johanes','2018-12-02','20:59:15','Johanes Chandra','Jl. Setiabudi no. 20, Bandung','T&T',3099000,'Shipping'),(137,'anthony04','2018-12-03','15:28:34','Anthony Smith','Green Office Park 9','JNA',14900000,'Waiting for Payment'),(138,'vincent12','2018-12-05','19:47:48','Vincent Valentine','Serpong, Tangerang','T&T',9900000,'Shipping'),(139,'a','2018-12-06','08:38:26','aa bb','aaa street','T&T',3099000,'Shipping'),(140,'a','2018-12-06','09:39:34','aa bb','aa street','T&T',26550000,'Waiting for Admin Confirmation'),(141,'a','2018-12-06','10:02:02','aa bb','aa street','JNA',8750000,'Waiting for Payment'),(142,'a','2018-12-06','10:08:58','aa bb','aa street','JNA',8750000,'Waiting for Payment'),(143,'a','2018-12-06','10:30:07','aa bb','aa street','T&T',19778000,'Waiting for Admin Confirmation'),(144,'a','2018-12-06','10:48:35','aa bb','aa street','T&T',2599000,'Waiting for Payment'),(145,'a','2018-12-06','11:07:50','aa bb','aa street','T&T',12398000,'Waiting for Payment'),(146,'a','2018-12-06','11:42:03','aa bb','aa street','T&T',4375000,'Waiting for Payment'),(147,'a','2018-12-06','11:57:58','aa bb','aa street','JNA',4375000,'Waiting for Payment'),(148,'a','2018-12-06','12:07:55','aa bb','aa street','T&T',29800000,'Waiting for Payment'),(149,'a','2018-12-06','12:34:30','aa bb','aa street','Samurai Express',14900000,'Waiting for Admin Confirmation'),(150,'a','2018-12-06','12:46:35','aa bb','aa street','T&T',9889000,'Waiting for Payment'),(151,'a','2018-12-06','13:49:43','aa bb','aa street','T&T',9900000,'Shipping'),(152,'a','2018-12-06','14:43:55','aa bb','aa street','Samurai Express',8750000,'Waiting for Payment'),(153,'a','2018-12-06','14:59:40','aa bb','aa street','T&T',9199000,'Waiting for Payment'),(154,'a','2018-12-06','15:55:05','aa bb','aa street','T&T',8750000,'Waiting for Payment');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-06 21:05:07
