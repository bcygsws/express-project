/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : book_database

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 28/06/2023 23:24:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of images
-- ----------------------------
INSERT INTO `images` VALUES (1, '锡塔德足球俱乐部', '经过多轮角逐，最终锡塔德U16女足获得22/23赛季U16联赛冠军', 'https://s1.imagehub.cc/images/2023/06/28/img1.jpeg');
INSERT INTO `images` VALUES (2, '荷兰女足', '范德东克和布鲁赫茨骑车，到达训练基地', 'https://s1.imagehub.cc/images/2023/06/28/img2.jpeg');
INSERT INTO `images` VALUES (3, '青年风采', '荷兰U19女足在取得进球后，激动拥抱庆祝胜利', 'https://s1.imagehub.cc/images/2023/06/28/img3.jpeg');
INSERT INTO `images` VALUES (4, '元宵节', '元宵佳节，融合天气，次第岂无风雨', 'https://s1.imagehub.cc/images/2023/06/28/img4.jpeg');
INSERT INTO `images` VALUES (5, '兹沃洛女足', 'Noordman进球，赛后与球迷亲切合影留念', 'https://s1.imagehub.cc/images/2023/06/28/img5.jpeg');
INSERT INTO `images` VALUES (6, '希望之星', 'PSV埃因霍温女足潜力新星-阿尼克-扬森球衣照', 'https://s1.imagehub.cc/images/2023/06/28/img6.jpeg');

SET FOREIGN_KEY_CHECKS = 1;
