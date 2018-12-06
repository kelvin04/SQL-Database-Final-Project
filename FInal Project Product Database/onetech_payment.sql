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
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment` (
  `idPayment` int(11) NOT NULL AUTO_INCREMENT,
  `idTransaction` varchar(45) DEFAULT NULL,
  `Method` varchar(45) DEFAULT NULL,
  `FromBankAccount` varchar(45) DEFAULT NULL,
  `FromNumAccount` tinytext,
  `FromNameAccount` varchar(45) DEFAULT NULL,
  `AccountDestination` varchar(45) DEFAULT NULL,
  `AmountPaid` varchar(45) DEFAULT NULL,
  `PaymentSlip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPayment`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (45,'134','ATM Transfer','Mandiri','123668953346','Anthony','Mandiri - PT.ONETech','12649000','paymentSlip-1543757728736.jpg'),(46,'135','Internet Banking','BCA','23232323','Anthony Smith','BCA - PT.ONETech','9349000','paymentSlip-1543758275295.jpg'),(47,'136','ATM Transfer','BNI','3434343434','Johannes','BNI - PT.ONETech','3099000','paymentSlip-1543759176940.jpg'),(48,'138','ATM Transfer','Mandiri','120320928','Vincent','Mandiri - PT.ONETech','9900000','paymentSlip-1544014749780.jpg'),(49,'139','Mobile Banking','BCA','122122332','AA','BCA - PT.ONETech','3099000','paymentSlip-1544060338533.jpg'),(50,'140','ATM Transfer','BCA','121211','JEFRI','BCA - PT.ONETech','16','paymentSlip-1544064017289.jpg'),(51,'143','Internet Banking','OCBC NISP','212121','121212121','OCBC NISP - PT.ONETech','197778000','paymentSlip-1544067074110.jpg'),(52,'149','ATM Transfer','BCA','1212','aaa','BCA - PT.ONETech','14900000','paymentSlip-1544074504142.jpg'),(53,'151','Mobile Banking','CIMB','12121323','aa','CIMB Niaga - PT.ONETech','99000000','paymentSlip-1544079014892.jpg');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-06 21:05:11
