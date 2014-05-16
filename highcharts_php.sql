/*
SQLyog Community Edition- MySQL GUI v8.05 
MySQL - 5.5.16-log : Database - bfsdemo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `highcharts_php` */

CREATE TABLE `highcharts_php` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timespan` varchar(200) DEFAULT NULL,
  `visits` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

/*Data for the table `highcharts_php` */

insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (1,'Friday, July 1, 2011 01:00:00',1288);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (2,'Friday, July 1, 2011 02:00:00',1275);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (3,'Friday, July 1, 2011 03:00:00',1270);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (4,'Friday, July 1, 2011 04:00:00',1279);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (5,'Friday, July 1, 2011 05:00:00',1268);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (6,'Friday, July 1, 2011 06:00:00',1267);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (7,'Friday, July 1, 2011 07:00:00',1271);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (8,'Friday, July 1, 2011 08:00:00',1287);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (9,'Friday, July 1, 2011 09:00:00',1276);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (10,'Friday, July 1, 2011 10:00:00',1278);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (11,'Friday, July 1, 2011 11:00:00',1272);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (12,'Friday, July 1, 2011 12:00:00',1288);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (13,'Friday, July 1, 2011 13:00:00',1264);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (14,'Friday, July 1, 2011 14:00:00',1280);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (15,'Friday, July 1, 2011 15:00:00',1277);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (16,'Friday, July 1, 2011 16:00:00',1278);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (17,'Friday, July 1, 2011 17:00:00',1279);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (18,'Friday, July 1, 2011 18:00:00',1277);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (19,'Friday, July 1, 2011 19:00:00',1270);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (20,'Friday, July 1, 2011 20:00:00',1264);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (21,'Friday, July 1, 2011 21:00:00',1278);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (22,'Friday, July 1, 2011 22:00:00',1284);
insert  into `highcharts_php`(`id`,`timespan`,`visits`) values (23,'Friday, July 1, 2011 23:00:00',1272);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;