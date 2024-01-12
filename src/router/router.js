/**
 *
 * @路由地址请求，将查询得到的结果，返回到客户端
 *
 */
const express = require('express');
const {
	userList,
	idItem,
	getImagesList,
	getImagesCat,
	getImageInfo
} = require('../controller/user');
const router = express.Router();
const { success, fail } = require('../model/resModel');
// 测试时，postman或Apifox中网址栏：localhost:3001/books 请求方式：get
router.get('/books', async (req, res) => {
	// 由于其中的data,要从req中拿到，因此data这个参数，要放在userList函数中；即：userList(data)
	// query(sql,data,(err,result)=>{

	// })
	const result = await userList(null);
	// 返回给前端
	res.send(success('返回的数据', result));
});
// 相当于修改某本书的详情，去到该书的详情页面的这步操作
// 注意区分两种参数：params参数和query参数
// students/:id是params参数，req.params.id可以拿到值
// /students?id=1,这里的id才是查询参数，req.query.id可以拿到值
router.post('/students/:id', async (req, res) => {
	const id = req.params.id;
	console.log(id); // 1
	console.log(typeof id); // string
	const data = [id];
	const result = await idItem(data);
	res.send(success('返回的数据', result));
});
/**
 *
 * @ 图片接口的开发
 * 一、使用express框架的静态托管资源功能
 * app.use(express.static('./public/images'));
 * 路由的基本地址是：
 * app.use('/api',router);
 * 托管的静态资源的访问地址是：
 * http://localhost:3001/img/img1.jpg
 *
 * 前端访问接口的地址是：
 * http://localhost:3001/api/img
 *
 * 特别注意：两者的区别
 * 二、使用各种图仓
 * 2.1 例如：ImageHub,用户：bcygsws
 * 可以拿到url链接、缩略图等一系列满足需求的图片格式
 *
 * 2.2 采用采用的是Github+jsDelivr+PicGo来搭建，完全免费
 * 参考文档：https://zhuanlan.zhihu.com/p/349756454
 *
 */
// 3.1 托管静态资源的图片路由处理

router.get('/img/:cat_id', async (req, res) => {
	// 查询操作,根据分类cat_id，求取sql中的id
	// 路径中是/:cat_id，故而id的值是req.params.cat_id
	const id = req.params.cat_id;
	console.log(id);
	console.log(typeof id);
	const data = [id];
	if (parseInt(id) === 0) {
		const sql = 'select *from images';
		const result = await getImagesList(data, sql);
		console.log(result);
		res.send(success('返回的图片数据', result));
	} else {
		const sql = 'select *from images where cat_id=?';
		const result = await getImagesList(data, sql);
		console.log(result);
		res.send(success('返回的图片数据', result));
	}
});
// 3.2 获取图片分类
router.get('/imgcategory', async (req, res) => {
	const data = null;
	const result = await getImagesCat(data);
	console.log(result);
	res.send(success('返回的图片分类', result));
});
/*
图仓ImageHub网络地址： 
https://s1.imagehub.cc/images/2023/06/28/img1.jpeg
https://s1.imagehub.cc/images/2023/06/28/img2.jpeg
https://s1.imagehub.cc/images/2023/06/28/img3.jpeg
https://s1.imagehub.cc/images/2023/06/28/img4.jpeg
https://s1.imagehub.cc/images/2023/06/28/img5.jpeg

https://www.imagehub.cc/image/img1.f7oruZ
https://www.imagehub.cc/image/img2.f7odbJ
https://www.imagehub.cc/image/img3.f7ofEe
https://www.imagehub.cc/image/img4.f7o1Ss
https://www.imagehub.cc/image/img5.f7oCNI

*/
/**
 *
 * @点击图片-进入图片详情页
 * 通过id访问图片详情页
 * 地址：/img/:id
 * 请求方式：get
 * 作用：用于获取图片详情页的详情
 * 传入图片的参数：图片id,id的写法 :img/2
 * 返回数据格式：json
 *
 * 特别注意：send中发送的对象，在前端请求时，挂载在axios请求后，响应结果的result.data属性下面
 * 即result.data展开后
 * {
 *   code:
 *   info:
 *   message:
 * }
 */
// 根据id获取图片详情
router.get('/img/:id', async (req, res) => {
	const id = req.params.id;
	const result = await getImageInfo([id]);
	console.log(result);
	res.send(success('当前图片详情数据', result[0]));
});
module.exports = router;
