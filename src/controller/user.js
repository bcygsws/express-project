/**
 *
 * @写入sql语句，操作数据库
 *
 */
const { exec } = require('../db/mysql');
// 查询所有用户的sql
// 由于请求参数data,要依赖路由中的req获取，因此，data必须作为userList(data)函数的参数

// 1.查询所有book表中的书籍信息
const userList = (data) => {
	const sql = 'select *from book';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};

// 2.查询student表中，id为某值的学生信息
const idItem = (data) => {
	const sql = 'select *from student where id=?';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};
// 3.1根据图片分类（cat_id），获取图片列表
const getImagesList = (data,sql) => {
	// sql随着获取的id不同，id=0时获取所有分类图片，sql语句写法不同，故而getImagesList方法保留(data,sql)两个参数
	// const sql = 'select *from images where cat_id=?';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};
// 3.2 获取图片分类
const getImagesCat = (data) => {
	const sql = 'select *from category';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};
// 4.根据id获取图片详情
const getImageInfo = (data) => {
	const sql =
		'select images_info.id,images.title,images_info.click,images_info.add_time,images_info.content from images_info LEFT JOIN images on images_info.id=images.img_id where images_info.id=?';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};
// 暴露控制器函数给路由处理文件夹router
module.exports = { userList, idItem, getImagesList, getImageInfo, getImagesCat };
