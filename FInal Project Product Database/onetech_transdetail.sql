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
-- Table structure for table `transdetail`
--

DROP TABLE IF EXISTS `transdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transdetail` (
  `idTransDetail` int(11) NOT NULL AUTO_INCREMENT,
  `idTransaction` varchar(45) DEFAULT NULL,
  `ProductName` varchar(45) DEFAULT NULL,
  `Image1` varchar(45) DEFAULT NULL,
  `SalePrice` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTransDetail`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transdetail`
--

LOCK TABLES `transdetail` WRITE;
/*!40000 ALTER TABLE `transdetail` DISABLE KEYS */;
INSERT INTO `transdetail` VALUES (64,'104','SAMSUNG Galaxy S9','s9-1.jpg',9889000,1),(65,'104','SONY Playstation 4','ps4-1.png',4575000,1),(66,'105','APPLE iPhone 8','iphone8-1.jpg',9900000,2),(67,'105','NINTENDO Switch','switch-1.jpg',4375000,1),(68,'105','SAMSUNG Chromebook 3','samsung-chromebook-3-1.jpg',6999000,1),(69,'106','NINTENDO Switch','switch-1.jpg',4375000,2),(70,'106','DELL Inspiron 14-3467','dell-inspiron-3467-1.jpg',9349000,1),(71,'106','OPPO F9','oppo-F9-1.jpeg',4999000,1),(72,'107','ACER Swift 3 SF314-54G','acer-swift-3-1.jpg',8199000,2),(73,'107','SAMSUNG Galaxy J6','J6-1.jpg',2265000,1),(74,'108','APPLE iPhone 8','iphone8-1.jpg',9900000,1),(75,'109','DELL Inspiron 14-7460','dell-inspiron-14-7460-1.jpg',10225000,3),(76,'110','OPPO Find X','oppo-Find-X-1.jpeg',13499000,2),(77,'111','APPLE iPhone 8','iphone8-1.jpg',9900000,2),(78,'112','APPLE iPhone XS','iPhoneXs-1.jpg',20000000,1),(79,'113','SONY Playstation 4','ps4-1.png',4575000,1),(80,'114','SAMSUNG Galaxy S9','s9-1.jpg',9889000,1),(81,'115','APPLE iPhone 8','iphone8-1.jpg',9900000,3),(82,'115','APPLE iPhone XS','iPhoneXs-1.jpg',20000000,7),(83,'116','APPLE iPhone 8','iphone8-1.jpg',9900000,2),(84,'116','SONY Playstation 4','ps4-1.png',4575000,2),(85,'116','NINTENDO New 2DS XL','2ds-xl-1.png',2599000,2),(86,'117','APPLE iPhone X','iphone-X-1.jpg',14900000,1),(87,'118','APPLE iPhone XS','iPhoneXs-1.jpg',20000000,2),(88,'119','DELL Inspiron 14-3467','dell-inspiron-3467-1.jpg',9349000,1),(89,'120','NINTENDO New 3DS XL','3dsxl-1.png',2825000,1),(90,'121','APPLE iPhone X','iphone-X-1.jpg',14900000,1),(91,'121','NINTENDO New 3DS XL','3dsxl-1.png',2825000,1),(92,'122','APPLE iPhone XS','iPhoneXs-1.jpg',20000000,3),(93,'123','SAMSUNG Galaxy S9','s9-1.jpg',9889000,1),(94,'124','LENOVO Ideapad 330S','lenovo-ideapad-330s-1.jpg',9999000,1),(95,'124','SONY Playstation 4','ps4-1.png',4575000,2),(96,'125','APPLE iPhone XS','iPhoneXs-1.jpg',20000000,1),(97,'126','APPLE iPhone 8','iphone8-1.jpg',9900000,1),(98,'127','OPPO Find X','oppo-Find-X-1.jpeg',13499000,1),(99,'128','SAMSUNG Galaxy S9','s9-1.jpg',9889000,1),(100,'129','NINTENDO Switch','switch-1.jpg',4375000,2),(101,'129','ACER Aspire 3 A315','acer-aspire-3-1.jpg',7349000,1),(102,'130','APPLE iPhone X','iphone-X-1.jpg',14900000,1),(103,'131','OPPO Find X','oppo-Find-X-1.jpeg',13499000,1),(104,'132','SAMSUNG Galaxy S9','s9-1.jpg',9889000,1),(105,'133','APPLE Macbook Air 2017','macbook-air-1.jpg',12399000,1),(106,'134','SAMSUNG Galaxy Note 9','note9-1.jpg',12649000,1),(107,'135','DELL Inspiron 14-3467','dell-inspiron-3467-1.jpg',9349000,1),(108,'136','XIAOMI Mi A1','xiaomi-mi-A1-1.jpeg',3099000,1),(109,'137','APPLE iPhone X','iphone-X-1.jpg',14900000,1),(110,'138','APPLE iPhone 8','iphone8-1.jpg',9900000,1),(111,'139','XIAOMI Mi A1','xiaomi-mi-A1-1.jpeg',3099000,1),(112,'140','APPLE iPhone X','iphone-X-1.jpg',14900000,1),(113,'140','Samsung Galaxy S8 Active','S8-Active-1.jpg',7275000,1),(114,'140','NINTENDO Switch','switch-1.jpg',4375000,1),(115,'141','NINTENDO Switch','switch-1.jpg',4375000,2),(116,'142','NINTENDO Switch','switch-1.jpg',4375000,2),(117,'143','SAMSUNG Galaxy S9','s9-1.jpg',9889000,2),(118,'144','NINTENDO New 2DS XL','2ds-xl-1.png',2599000,1),(119,'145','SONY Playstation 4 Pro','ps4-pro-1.jpg',6199000,2),(120,'146','NINTENDO Switch','switch-1.jpg',4375000,1),(121,'147','NINTENDO Switch','switch-1.jpg',4375000,1),(122,'148','APPLE iPhone X','iphone-X-1.jpg',14900000,2),(123,'149','APPLE iPhone X','iphone-X-1.jpg',14900000,1),(124,'150','SAMSUNG Galaxy S9','s9-1.jpg',9889000,1),(125,'151','APPLE iPhone 8','iphone8-1.jpg',9900000,1),(126,'152','NINTENDO Switch','switch-1.jpg',4375000,2),(127,'153','ASUS A442UR','asus-a442ur-1.jpg',9199000,1),(128,'154','NINTENDO Switch','switch-1.jpg',4375000,2);
/*!40000 ALTER TABLE `transdetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-06 21:05:09
