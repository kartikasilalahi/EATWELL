-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: eatwell
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idtoko` int(11) DEFAULT NULL,
  `taxservice` varchar(45) DEFAULT NULL,
  `takeaway` varchar(45) DEFAULT NULL,
  `refund` varchar(45) DEFAULT NULL,
  `weekday` varchar(45) DEFAULT NULL,
  `weekend` varchar(45) DEFAULT NULL,
  `holiday` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detail_1_idx` (`idtoko`),
  CONSTRAINT `fk_detail_1` FOREIGN KEY (`idtoko`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES (2,2,'yes','no','no','08:00 - 17.00','12:00 -22:00','OFF'),(5,8,'yes','yes','yes','08:00 - 22:00','12:00 -22:00','OFF'),(7,7,'yes','yes','no','08:00 - 22:00','12:00 -22:00','OFF'),(9,9,'yes','yes','yes','08:00 - 17.00','08:00 - 20:00','OFF'),(10,6,'yes','yes','yes','08:00 - 20:00','12:00 - 20:00','10:00 - 24:00'),(11,5,'no','yes','no','12:00 - 20:00','10:00 - 24:00','10:00 - 24:00'),(39,50,NULL,NULL,NULL,NULL,NULL,NULL),(40,51,NULL,NULL,NULL,NULL,NULL,NULL),(41,52,NULL,NULL,NULL,NULL,NULL,NULL),(42,53,NULL,NULL,NULL,NULL,NULL,NULL),(43,54,NULL,NULL,NULL,NULL,NULL,NULL),(44,55,NULL,NULL,NULL,NULL,NULL,NULL),(45,56,NULL,NULL,NULL,NULL,NULL,NULL),(46,57,NULL,NULL,NULL,NULL,NULL,NULL),(47,58,NULL,NULL,NULL,NULL,NULL,NULL),(48,59,NULL,NULL,NULL,NULL,NULL,NULL),(49,60,NULL,NULL,NULL,NULL,NULL,NULL),(50,61,NULL,NULL,NULL,NULL,NULL,NULL),(51,62,NULL,NULL,NULL,NULL,NULL,NULL),(52,63,NULL,NULL,NULL,NULL,NULL,NULL),(53,64,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproduk` int(11) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `cover` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_1_idx` (`idproduk`),
  CONSTRAINT `fk_images_1` FOREIGN KEY (`idproduk`) REFERENCES `produk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,'/toko/produk/IMAGEPRODUK1583886467269.jpeg',1),(2,1,'/toko/produk/IMAGEPRODUK1581602264776.jpeg',NULL),(55,20,'/toko/produk/IMAGEPRODUK1582948268225.jpeg',1),(56,20,'/toko/produk/IMAGEPRODUK1581611648104.jpeg',NULL),(57,20,'/toko/produk/IMAGEPRODUK1583026010168.jpeg',NULL),(58,20,'/toko/produk/IMAGEPRODUK1583916990873.jpeg',NULL),(59,21,'/toko/produk/IMAGEPRODUK1581611722839.jpeg',1),(60,21,'/toko/produk/IMAGEPRODUK1581611722840.jpeg',NULL),(66,27,'/toko/produk/IMAGEPRODUK1581999483629.jpeg',1),(67,27,'/toko/produk/IMAGEPRODUK1581999483630.jpeg',0),(68,27,'/toko/produk/IMAGEPRODUK1581999483633.jpeg',0),(69,27,'/toko/produk/IMAGEPRODUK1581999483634.jpeg',0),(70,28,'/toko/produk/IMAGEPRODUK1581999590794.jpeg',1),(71,28,'/toko/produk/IMAGEPRODUK1581999590795.jpg',0),(72,28,'/toko/produk/IMAGEPRODUK1581999590798.jpeg',0),(73,28,'/toko/produk/IMAGEPRODUK1581999590800.jpeg',0),(74,29,'/toko/produk/IMAGEPRODUK1582011814428.jpeg',1),(75,29,'/toko/produk/IMAGEPRODUK1582011814430.jpeg',0),(76,29,'/toko/produk/IMAGEPRODUK1582011814432.jpeg',0),(77,29,'/toko/produk/IMAGEPRODUK1582011814432.jpeg',0),(78,29,'/toko/produk/IMAGEPRODUK1582011814434.jpeg',0),(81,31,'/toko/produk/IMAGEPRODUK1582281801132.jpeg',1),(82,31,'/toko/produk/IMAGEPRODUK1582281801137.jpeg',0),(83,31,'/toko/produk/IMAGEPRODUK1582281801138.jpeg',0),(84,32,'/toko/produk/IMAGEPRODUK1582283222995.jpeg',1),(85,32,'/toko/produk/IMAGEPRODUK1582283222997.jpeg',0),(86,32,'/toko/produk/IMAGEPRODUK1582283222999.jpeg',0),(87,33,'/toko/produk/IMAGEPRODUK1583245213776.jpeg',1),(88,33,'/toko/produk/IMAGEPRODUK1583887315390.jpeg',0),(89,34,'/toko/produk/IMAGEPRODUK1583887258913.jpeg',1),(91,34,'/toko/produk/IMAGEPRODUK1583244574163.jpeg',0),(92,34,'/toko/produk/IMAGEPRODUK1583244574165.jpeg',0),(94,35,'/toko/produk/IMAGEPRODUK1583245647627.jpeg',1),(95,35,'/toko/produk/IMAGEPRODUK1583245631594.jpeg',0),(96,35,'/toko/produk/IMAGEPRODUK1583245616954.jpeg',0),(97,35,'/toko/produk/IMAGEPRODUK1583245616955.jpeg',0),(98,36,'/toko/produk/IMAGEPRODUK1583245828787.jpeg',1),(99,36,'/toko/produk/IMAGEPRODUK1583245828787.jpeg',0),(103,38,'/toko/produk/IMAGEPRODUK1583302660324.jpeg',1),(104,38,'/toko/produk/IMAGEPRODUK1583302660327.jpeg',0),(105,38,'/toko/produk/IMAGEPRODUK1583302660329.jpeg',0),(106,39,'/toko/produk/IMAGEPRODUK1583312279926.jpeg',1),(107,39,'/toko/produk/IMAGEPRODUK1583312279927.jpeg',0),(108,39,'/toko/produk/IMAGEPRODUK1583312279928.jpeg',0),(111,41,'/toko/produk/IMAGEPRODUK1583812524296.jpeg',1),(112,41,'/toko/produk/IMAGEPRODUK1583920104719.jpeg',0),(115,42,'/toko/produk/IMAGEPRODUK1583812626728.jpeg',1),(116,42,'/toko/produk/IMAGEPRODUK1583812626729.jpeg',0),(117,42,'/toko/produk/IMAGEPRODUK1583916123253.jpeg',0),(118,43,'/toko/produk/IMAGEPRODUK1583832443707.jpeg',1),(119,43,'/toko/produk/IMAGEPRODUK1583832443708.jpeg',0),(120,43,'/toko/produk/IMAGEPRODUK1583832443709.jpeg',0),(121,43,'/toko/produk/IMAGEPRODUK1583832443712.jpeg',0),(122,44,'/toko/produk/IMAGEPRODUK1583832528689.jpeg',1),(123,44,'/toko/produk/IMAGEPRODUK1583832528701.jpeg',0),(124,44,'/toko/produk/IMAGEPRODUK1583832528704.jpg',0),(125,45,'/toko/produk/IMAGEPRODUK1583836502625.jpeg',1),(126,45,'/toko/produk/IMAGEPRODUK1583836502626.jpeg',0),(127,45,'/toko/produk/IMAGEPRODUK1583836502627.jpeg',0),(128,45,'/toko/produk/IMAGEPRODUK1583836502628.jpeg',0),(129,46,'/toko/produk/IMAGEPRODUK1583836602339.jpeg',1),(130,46,'/toko/produk/IMAGEPRODUK1583836602340.jpeg',0),(131,46,'/toko/produk/IMAGEPRODUK1583836602341.jpeg',0),(132,47,'/toko/produk/IMAGEPRODUK1583836679280.jpeg',1),(133,47,'/toko/produk/IMAGEPRODUK1583836679280.jpeg',0),(134,47,'/toko/produk/IMAGEPRODUK1583836679281.jpeg',0),(135,48,'/toko/produk/IMAGEPRODUK1583839411525.jpeg',1),(136,48,'/toko/produk/IMAGEPRODUK1583838759091.jpeg',0),(137,48,'/toko/produk/IMAGEPRODUK1583838759097.jpeg',0),(138,49,'/toko/produk/IMAGEPRODUK1583838881237.jpeg',1),(140,49,'/toko/produk/IMAGEPRODUK1583838881239.jpeg',0),(141,50,'/toko/produk/IMAGEPRODUK1583838928718.jpeg',1),(142,50,'/toko/produk/IMAGEPRODUK1583838928719.jpeg',0),(143,51,'/toko/produk/IMAGEPRODUK1583839310371.jpeg',1),(144,51,'/toko/produk/IMAGEPRODUK1583839310372.jpeg',0),(145,51,'/toko/produk/IMAGEPRODUK1583839310373.jpeg',0),(146,52,'/toko/produk/IMAGEPRODUK1583839473362.jpeg',1),(149,53,'/toko/produk/IMAGEPRODUK1583839737235.jpeg',1),(150,53,'/toko/produk/IMAGEPRODUK1583840150346.jpeg',0),(151,53,'/toko/produk/IMAGEPRODUK1583840175832.jpeg',0),(152,53,'/toko/produk/IMAGEPRODUK1583840190275.jpeg',0),(153,54,'/toko/produk/IMAGEPRODUK1583880915235.jpeg',1),(154,54,'/toko/produk/IMAGEPRODUK1583880915238.jpeg',0),(155,54,'/toko/produk/IMAGEPRODUK1583880915240.jpeg',0),(156,55,'/toko/produk/IMAGEPRODUK1583880995190.jpeg',1),(157,55,'/toko/produk/IMAGEPRODUK1583880995191.jpeg',0),(159,56,'/toko/produk/IMAGEPRODUK1583881142075.jpeg',1),(160,56,'/toko/produk/IMAGEPRODUK1583929733649.jpeg',0),(163,57,'/toko/produk/IMAGEPRODUK1583881418947.jpeg',1),(164,57,'/toko/produk/IMAGEPRODUK1583881270610.jpeg',0),(165,58,'/toko/produk/IMAGEPRODUK1583881641019.jpeg',1),(166,58,'/toko/produk/IMAGEPRODUK1583881641027.jpeg',0),(167,58,'/toko/produk/IMAGEPRODUK1583881641031.jpeg',0),(168,59,'/toko/produk/IMAGEPRODUK1583881726347.jpeg',1),(169,59,'/toko/produk/IMAGEPRODUK1583881726349.jpeg',0),(170,59,'/toko/produk/IMAGEPRODUK1583881726349.jpeg',0),(172,60,'/toko/produk/IMAGEPRODUK1583929846732.jpeg',1),(173,60,'/toko/produk/IMAGEPRODUK1583929846734.jpeg',0),(177,61,'/toko/produk/IMAGEPRODUK1583930348363.jpeg',1),(178,61,'/toko/produk/IMAGEPRODUK1583930348371.jpeg',0),(182,62,'/toko/produk/IMAGEPRODUK1583930890128.jpeg',1),(183,62,'/toko/produk/IMAGEPRODUK1583930890129.jpeg',0),(184,62,'/toko/produk/IMAGEPRODUK1583930890130.jpeg',0),(185,62,'/toko/produk/IMAGEPRODUK1583930907096.jpeg',0),(186,62,'/toko/produk/IMAGEPRODUK1583931034053.jpeg',0),(187,63,'/toko/produk/IMAGEPRODUK1583987451993.jpeg',1),(188,63,'/toko/produk/IMAGEPRODUK1583987451994.jpeg',0),(190,63,'/toko/produk/IMAGEPRODUK1583987451997.jpeg',0),(191,63,'/toko/produk/IMAGEPRODUK1583987479056.jpeg',0),(192,64,'/toko/produk/IMAGEPRODUK1584012456865.jpeg',1),(193,64,'/toko/produk/IMAGEPRODUK1584012456867.jpeg',0),(194,64,'/toko/produk/IMAGEPRODUK1584012456869.jpeg',0),(195,64,'/toko/produk/IMAGEPRODUK1584012456870.jpeg',0),(196,64,'/toko/produk/IMAGEPRODUK1584012456872.jpeg',0),(197,65,'/toko/produk/IMAGEPRODUK1584083281590.jpeg',1),(198,65,'/toko/produk/IMAGEPRODUK1584083281592.jpeg',0),(199,65,'/toko/produk/IMAGEPRODUK1584083281594.jpeg',0),(200,65,'/toko/produk/IMAGEPRODUK1584083281595.jpeg',0),(201,66,'/toko/produk/IMAGEPRODUK1584083399910.jpeg',1),(202,66,'/toko/produk/IMAGEPRODUK1584083399914.jpeg',0),(203,66,'/toko/produk/IMAGEPRODUK1584083399915.jpeg',0),(204,66,'/toko/produk/IMAGEPRODUK1584083399917.jpeg',0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jadwaltoko`
--

DROP TABLE IF EXISTS `jadwaltoko`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jadwaltoko` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tokoid` varchar(45) DEFAULT NULL,
  `idday` int(11) DEFAULT NULL,
  `idschedule` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jadwaltoko`
--

LOCK TABLES `jadwaltoko` WRITE;
/*!40000 ALTER TABLE `jadwaltoko` DISABLE KEYS */;
INSERT INTO `jadwaltoko` VALUES (1,'2',1,2),(2,'2',2,4),(3,'2',3,9);
/*!40000 ALTER TABLE `jadwaltoko` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategoriproduk`
--

DROP TABLE IF EXISTS `kategoriproduk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kategoriproduk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namakategori` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategoriproduk`
--

LOCK TABLES `kategoriproduk` WRITE;
/*!40000 ALTER TABLE `kategoriproduk` DISABLE KEYS */;
INSERT INTO `kategoriproduk` VALUES (1,'Aneka Ayam/Daging'),(2,'Aneka Mie'),(3,'Aneka Nasi'),(4,'Bakso'),(5,'Buble Tea and Tea'),(6,'Burger'),(7,'Jus'),(8,'Kopi'),(9,'Pizza'),(10,'Salad'),(11,'Lainnya..'),(16,'makanan tradisional');
/*!40000 ALTER TABLE `kategoriproduk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namaproduk` varchar(100) NOT NULL,
  `idtoko` int(11) NOT NULL,
  `harganormal` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `tanggalmulai` date NOT NULL,
  `tanggalakhir` date NOT NULL,
  `idkategoriproduk` int(11) DEFAULT NULL,
  `kuota` int(100) NOT NULL,
  `terjual` int(11) DEFAULT NULL,
  `maxbeli` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk`
--

LOCK TABLES `produk` WRITE;
/*!40000 ALTER TABLE `produk` DISABLE KEYS */;
INSERT INTO `produk` VALUES (1,'Pizza',2,80000,15,'2020-03-03','2020-03-20',9,40,11,7),(20,'Juice',2,20000,10,'2020-03-02','2020-03-27',7,50,2,5),(21,'Kopi',2,28000,10,'2020-03-01','2020-03-21',8,45,1,3),(27,'Burger Kudeta',5,45000,40,'2020-03-01','2020-03-28',6,50,5,5),(28,'Boba Kudeta',5,25000,25,'2020-02-18','2020-04-03',5,25,3,3),(29,'Saladdd',7,50000,40,'2020-02-18','2020-03-21',10,42,0,3),(31,'Juice Kudeta',5,25000,40,'2020-02-21','2020-03-27',7,40,0,5),(32,'Ice Cafetaria',7,30000,25,'2020-03-08','2020-04-21',11,65,0,5),(33,'test',2,12000,12,'2020-01-18','2020-04-18',8,56,3,5),(34,'Mie Wuenak ',2,35000,40,'2020-03-07','2020-03-28',2,45,0,5),(35,'Coffee Promise',2,30000,30,'2020-03-04','2020-04-25',8,60,0,3),(36,'Testtt',2,45000,35,'2020-03-03','2020-03-28',11,55,0,3),(38,'Makan',2,45000,25,'2020-03-04','2020-04-04',3,50,0,5),(39,'Kopi kopian',2,40000,30,'2020-03-04','2020-04-04',8,50,0,3),(41,'Tsstt',2,40000,35,'2020-03-10','2020-03-28',3,45,0,7),(42,'glkhjlj',2,67000,40,'2020-03-10','2020-03-29',1,35,0,8),(43,'Fore',7,30000,20,'2020-03-09','2020-04-16',8,50,0,7),(44,'Milk Tea Boba',7,28000,30,'2020-03-07','2020-04-05',5,60,0,8),(45,'Pizza Kudeta',5,78000,45,'2020-03-03','2020-04-23',9,35,0,10),(46,'Burger Queen',5,45000,50,'2020-03-05','2020-04-02',6,57,0,5),(47,'Ice Kudeta',5,27000,35,'2020-03-01','2020-03-01',7,45,0,4),(48,'Mie Ayam Komplit',6,35000,25,'2020-03-10','2020-03-27',2,45,0,8),(49,'Nasi Padang Sederhana``',6,30000,15,'2020-03-10','2020-04-09',3,50,0,8),(50,'Juice patlapan',6,30000,30,'2020-03-10','2020-03-26',7,67,0,7),(51,'Saladstop',2,40000,50,'2020-03-10','2020-03-28',10,45,4,5),(52,'Mie lagi',6,30000,25,'2020-03-09','2020-04-04',2,39,0,5),(53,'Nasi goreng gila',7,25000,20,'2020-03-09','2020-04-11',3,40,0,7),(54,'Salad Foodpedia',2,50000,42,'2020-03-11','2020-04-11',10,52,0,7),(55,'Ayam yummy',2,60000,45,'2020-03-11','2020-04-23',1,53,0,10),(56,'Ayam Kaefci',6,48000,35,'2020-03-11','2020-04-17',1,56,0,8),(57,'Juice Seger Patlapan',6,30000,30,'2020-03-08','2020-04-08',7,40,0,7),(58,'asddff',7,56000,45,'2020-03-10','2020-05-22',3,42,0,6),(59,'Juice sehat cafetaria',7,32000,25,'2020-03-05','2020-04-16',7,46,0,7),(60,'adssdfdfg',6,68000,45,'2020-03-11','2020-04-17',3,50,0,9),(61,'bnhgs',6,65000,50,'2020-03-10','2020-04-16',1,45,0,10),(62,'cobalagi',6,48000,35,'2020-03-11','2020-04-04',10,53,0,8),(63,'Indomie Seleraku',2,30000,30,'2020-03-12','2020-04-17',2,60,0,9),(64,'asddafkj',2,56000,30,'2020-03-12','2020-04-17',4,45,0,8),(65,'ashfg',5,50000,30,'2020-03-13','2020-04-04',2,34,0,8),(66,'asdfghj',2,45000,28,'2020-03-12','2020-04-24',6,45,0,8);
/*!40000 ALTER TABLE `produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,'08:00 - 17 : 00'),(2,'08:00 - 20:00'),(3,'08:00 - 22:00'),(4,'10:00 - 20:00'),(5,'10:00 - 22:00'),(6,'10:00 - 24:00'),(7,'12:00 - 20:00'),(8,'12:00 - 22:00'),(9,'OFF');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toko`
--

DROP TABLE IF EXISTS `toko`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `toko` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usertokoid` int(11) NOT NULL,
  `namatoko` varchar(45) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `iddetail` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_toko_1_idx` (`usertokoid`),
  CONSTRAINT `fk_toko_1` FOREIGN KEY (`usertokoid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toko`
--

LOCK TABLES `toko` WRITE;
/*!40000 ALTER TABLE `toko` DISABLE KEYS */;
INSERT INTO `toko` VALUES (1,2,'Food Pedia','Jln. Mampang Prapatan No.100, Jakarta Selatan','1'),(2,5,'Kudeta','Jln. Mampang Prapatan No.100, Jakarta Selatan',NULL),(3,6,'Patlapan Coffee','Jln. Mampang Prapatan No.100, Jakarta Selatan',NULL),(4,7,'Cafetaria Jakarta','Jln. Mampang Prapatan No.100, Jakarta Selatan',NULL),(5,8,'Burgushi Jakarta','Jln. Mampang Prapatan No.100, Jakarta Selatan',NULL),(6,9,'SaladStop!','Jln. Mampang Prapatan No.100, Jakarta Selatan',NULL),(7,10,'zzz','Jln. Mampang Prapatan No.100, Jakarta Selatan',NULL),(38,50,'kartika','123',NULL),(39,51,'tika','123',NULL),(40,52,'kartika','123',NULL),(41,53,'adsd','dagdb',NULL),(42,54,'sabd','xnjls',NULL),(43,55,'sadsad','123',NULL),(44,56,'sad','sad',NULL),(45,57,'sa','xsc',NULL),(46,58,'adasD','adcoaci agukanwcin',NULL),(47,59,'mn','sfcs',NULL),(48,60,'mn','sfcs',NULL),(49,61,'a','a',NULL),(50,62,'a','123',NULL),(51,63,'fghC','sads',NULL),(52,64,'caS hu','ASDC gyu  ',NULL);
/*!40000 ALTER TABLE `toko` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `idtransaction` int(11) NOT NULL AUTO_INCREMENT,
  `idtoko` int(11) DEFAULT NULL,
  `idproduk` int(11) DEFAULT NULL,
  `iduser` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `idpayment` int(11) DEFAULT NULL,
  `totalharga` int(50) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `tanggalpesan` datetime DEFAULT NULL,
  `tanggalexp` datetime DEFAULT NULL,
  `kodetransaksi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idtransaction`)
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (224,2,1,1,1,41,68000,'FINISH','2020-03-09 18:02:28','2020-03-09 19:02:28','gktQY-gMrtQ-wX2f1-vBlse'),(225,2,20,1,1,NULL,18000,'CANCELED','2020-03-09 18:03:21','2020-03-09 19:03:21','F4nX1-aDuWC-9gFKv-iQoNW'),(226,2,21,1,2,NULL,50400,'CANCELED','2020-03-09 18:03:44','2020-03-09 19:03:44','k5NrW-cwiQV-Kxg2F-T73Lf'),(227,2,33,1,3,42,31680,'FINISH','2020-03-09 18:08:51','2020-03-09 19:08:51','7AFPj-Aw7gT-gn168-XRmJ1'),(228,5,27,12,2,NULL,54000,'WAITING PAYMENT','2020-03-09 20:19:07','2020-03-09 21:19:07','4ia4E-nOt4c-DA5Lm-oONfA'),(229,5,28,12,3,43,56250,'FINISH','2020-03-09 20:19:24','2020-03-09 21:19:24','JuM28-tmfKp-5FZzZ-K5oPb'),(230,2,1,12,7,44,476000,'FINISH','2020-03-09 20:20:56','2020-03-09 21:20:56','7yCxK-ofbkV-SzIeO-EgKtK'),(231,7,58,17,3,NULL,92400,'CANCELED','2020-03-11 06:13:16','2020-03-11 07:13:16','2Gha0-wS9bf-f4rQC-qH5np'),(232,2,51,17,4,45,80000,'FINISH','2020-03-11 06:13:45','2020-03-11 07:13:45','zKgRA-Jy50z-P2g9b-wnZXi'),(233,7,58,17,1,NULL,30800,'CANCELED','2020-03-11 15:14:01','2020-03-11 16:14:01','2mF6c-Wld1c-wM1pF-HYnfh');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  `deleted` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kartika','tikasilalahi.test@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','082166486977',1,NULL,'verified'),(2,'foodpedia','tikasilalahi.test@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','082166486977',2,'','verified'),(3,'admin','tikasilalahi89@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','082166486977',3,NULL,'verified'),(5,'kudeta','tikasilalahi1602@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','081122334455',2,NULL,'verified'),(6,'patlapan','tikasilalahi89@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123456',2,NULL,'verified'),(7,'cafetaria','tikasilalahi89@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'verified'),(8,'burgushi','tikasilalahi8@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'verified'),(9,'saladstop','tikasilalahi89@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'verified'),(10,'XX','tikasilalahi89@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','1',2,NULL,'verified'),(11,'lukas','tikasilalahi.test@gmail.com','2fda84ffe30efa66362cb40b9aca7c2f75205acd3be5e8b036a7f758abd32bd5','081235786554',1,NULL,'unverified'),(12,'Niko','tikasilalahi89@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',1,NULL,'verified'),(17,'kartini','tikasilalahi.test@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123123',1,NULL,'verified'),(36,'ayu','ayu@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123456789',1,NULL,'unverified'),(50,'kartika1','kartika@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(51,'tika','tika@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(52,'tika1','kartika@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(53,'absj','sab@mai.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','saSII',2,NULL,'unverified'),(54,'sda','sa@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','78576',2,NULL,'unverified'),(55,'dasgbja`','asghj@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(56,'sda1','asdd@mail.com','344b31d53b529830bd7c3daef76dd4910630f53a61fced0277534f80ee47b2d7','sdaa',2,NULL,'unverified'),(57,'sad','sad@amial.xom','4f80606f1071557d6db41c106834c5318a293658805ba3f767354bef80579d71','wdw',2,NULL,'unverified'),(58,'ASSAD','a@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','88646',2,NULL,'unverified'),(59,'nm','nm@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(60,'nm1','nm@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(61,'a','a@gmail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(62,'a1','a@mail.com','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified'),(63,'DF','GF@MAIL.COM','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','SAD',2,NULL,'unverified'),(64,'ASVH','AV@MAIL.COM','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','123',2,NULL,'unverified');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpayment`
--

DROP TABLE IF EXISTS `userpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) DEFAULT NULL,
  `idproduk` int(11) DEFAULT NULL,
  `totalharga` int(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `status` varchar(60) DEFAULT NULL,
  `tanggalbayar` datetime DEFAULT NULL,
  `idtransaction` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpayment`
--

LOCK TABLES `userpayment` WRITE;
/*!40000 ALTER TABLE `userpayment` DISABLE KEYS */;
INSERT INTO `userpayment` VALUES (41,1,1,68000,'/user/payment/IMGPAYMENT1583751765002.png','FINISH','2020-03-09 18:02:45',224),(42,1,33,31680,'/user/payment/IMGPAYMENT1583752159697.png','FINISH','2020-03-09 18:09:19',227),(43,12,28,56250,'/user/payment/IMGPAYMENT1583759980177.png','FINISH','2020-03-09 20:19:40',229),(44,12,1,476000,'/user/payment/IMGPAYMENT1583760074654.png','FINISH','2020-03-09 20:21:14',230),(45,17,51,80000,'/user/payment/IMGPAYMENT1583882060648.png','FINISH','2020-03-11 06:14:20',232);
/*!40000 ALTER TABLE `userpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kodevoucher` varchar(100) DEFAULT NULL,
  `expvoucher` datetime DEFAULT NULL,
  `idpayment` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (34,'1vAMXObHY2','2020-03-10 18:02:45','41','EXPIRED'),(35,'VuHO3Ib8zp','2020-03-10 18:09:19','42','USED'),(36,'cfcbdOOina','2020-03-10 20:19:40','43','EXPIRED'),(37,'R3mhpjv3oJ','2020-03-10 20:21:14','44','USED'),(38,'FdAjp7otu3','2020-03-12 06:14:20','45','USED');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idproduk` int(11) DEFAULT NULL,
  `iduser` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (11,1,'1'),(12,31,'12'),(13,55,'17');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-15  9:26:05
