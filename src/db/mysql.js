/**
 *
 * @ 连接mysql数据库
 * 参考文档：https://blog.csdn.net/weixin_47284756/article/details/118460060?spm=1001.2101.3001.6650.9&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-118460060-blog-121008927.235%5Ev38%5Epc_relevant_anti_vip_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-118460060-blog-121008927.235%5Ev38%5Epc_relevant_anti_vip_base&utm_relevant_index=17
 *
 * controller文件夹下的user.js文件会引入exec 这一个sql执行函数
 *
 */

const mysql = require('mysql');
const MYSQLCONF = require('../config/db');
// 定义数据库连接对象conn
let conn;
// handleDisconnect函数，用以获得数据库连接对象conn
const handleDisconnect = () => {
	// 创建数据库连接
	// 1.创建数据库的链接对象connection
	const connection = mysql.createConnection(MYSQLCONF);
	// 2. 处理连接错误，连接错误码为"PROTOCOL_CONNECTION_LOST"(协议连接丢失)则重连数据库
	connection.on('error', (err) => {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.log('重连数据库');
			// 协议连接丢失时，还能挽救，尝试【递归调用】这个方法，重新连接数据库
			handleDisconnect();
		} else {
			// err.code不等于协议连接丢失，直接抛出异常
			throw err;
		}
	});
	conn = connection;
};

// 执行sql的函数
// 2.创建一个new Promise并返回，处理输入的sql语句后的promise实例
const exec = (sql, data) => {
	// 1.每一次执行sql语句前，都要事先生成数据库连接的对象conn
	handleDisconnect();
	// 返回一个Promise对象
	return new Promise((resolve, reject) => {
		// 2.连接数据库
		conn.connect();
		// 3.数据库查询结果
		conn.query(sql, data, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
		// 4.数据库连接，很占用资源，查询完成后，关闭数据库连接
		conn.end();
	});
};
// 暴露数据库查询函数，exec；返回值是一个Promise
module.exports = {
	exec
};
