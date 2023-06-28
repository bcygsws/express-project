/* if exists 表示表不存在，也能顺利支持哪个sql，但是会有warning */
DROP TABLE IF EXISTS student;
/* 创建表student */
CREATE TABLE student
(
  id INT(11) NOT NULL
  AUTO_INCREMENT,
name VARCHAR(256) NULL,
age INT(11) NULL,
gender VARCHAR(256) NULL,
class_id INT(11) NOT NULL,
PRIMARY KEY(id,class_id),
FOREIGN KEY(class_id) REFERENCES class(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 CHARACTER SET=utf8;
INSERT INTO student (name,age,gender,class_id) values('雪无痕',21,'男',1);
INSERT INTO student (name,age,gender,class_id) values('李红袖',20,'女',3);
INSERT INTO student (name,age,gender,class_id) values('扁素问',21,'女',2);