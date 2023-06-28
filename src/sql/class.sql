/* 如果数据库中，加上IF EXISTS时，当数据表不存在时，sql语句可以顺利执行，但会有警告 */
DROP TABLE IF EXISTS class;
/* 创建表，表和引擎、自增步数以及默认字符的设置之前，create table表之后，不加分号 */
CREATE TABLE class
(
  id INT(11) NOT NULL
  AUTO_INCREMENT,
  title  VARCHAR
  (256) NULL,
  PRIMARY KEY
  (id)
)ENGINE = InnoDB AUTO_INCREMENT=1 CHARACTER
  SET=utf8;
  insert into class(title)values('一班');
  insert into class(title) values('二班');
  insert into class(title) values('三班');

