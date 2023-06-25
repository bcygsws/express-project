/**
 *
 * @ 连接mysql数据库
 * 参考文档：https://blog.csdn.net/weixin_47284756/article/details/118460060?spm=1001.2101.3001.6650.9&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-118460060-blog-121008927.235%5Ev38%5Epc_relevant_anti_vip_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-118460060-blog-121008927.235%5Ev38%5Epc_relevant_anti_vip_base&utm_relevant_index=17
 *
 *
 */

const mysql = require('mysql');
const MYSQLCONF = require('../config/db');
// 1.创建数据库的链接对象connection
//2.创建一个new Promise并返回，处理输入的sql语句后的promise实例
let conn;
const handleDisconnect = () => {
  // 创建数据库连接
	const connection = mysql.createConnection(MYSQLCONF);
  // 处理连接错误，连接错误重连数据库
  connection.on('error',(err)=>{
    if(err.code==='PROTOCOL_CONNECTION_LOST'){
      console.log('重连数据库');
    }
  })
};
