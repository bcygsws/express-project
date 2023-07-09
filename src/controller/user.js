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
// 3.获取图片列表
const getImages = (data) => {
	const sql = 'select *from images';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};
// 4.根据id获取图片详情
const getImageInfo = (data) => {
	const sql = 'select images_info.id,images.title,images_info.click,images_info.add_time,images_info.content from images_info LEFT JOIN images on images_info.id=images.img_id where images_info.id=?';
	return exec(sql, data).then((rows) => {
		console.log(rows);
		return rows || {};
	});
};
// 暴露控制器函数给路由处理文件夹router
module.exports = { userList, idItem, getImages, getImageInfo };
