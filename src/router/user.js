/**
 *
 * @路由地址请求，将查询得到的结果，返回到客户端
 *
 *
 */
const express = require('express');
const { userList, idItem } = require('../controller/user');
const user = express.Router();
const { success, fail } = require('../model/resModel');
// 测试时，postman或Apifox中网址栏：localhost:3001/books 请求方式：get
user.get('/books', async (req, res) => {
	// 由于其中的data,要从req中拿到，因此data这个参数，要放在userList函数中；即：userList(data)
	// query(sql,data,(err,result)=>{

	// })
	const result = await userList(null);
	// 返回给前端
	res.send(success('返回的数据', result));
});
// 相当于修改某本书的详情，去到该书的详情页面的这步操作
// 注意区分：params参数和query参数
// students/:id是params参数，req.params.id可以拿到值
// /students?id=1,这里的id才是查询参数，req.query.id可以拿到值
user.post('/students/:id', async (req, res) => {
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
 *
 *
 */
// 托管静态资源的图片路由处理

user.get('/img', (req, res) => {
	res.send([
		success('返回的数据', [
			{
				id: 1,
				title: '锡塔德足球俱乐部',
				info: '经过多轮角逐，最终锡塔德U16女足获得22/23赛季U16联赛冠军',
				//路径为本地服务器 + 托管前缀 + 文件夹下的图片路径名
				img_url: 'https://s1.imagehub.cc/images/2023/06/28/img1.jpeg'
			},
			{
				id: 2,
				title: '荷兰女足',
				info: '范德东克和布鲁赫茨骑车，到达训练基地',
				img_url: 'https://s1.imagehub.cc/images/2023/06/28/img2.jpeg'
			},
			{
				id: 3,
				title:'青年风采',
				info: '荷兰U19女足在取得进球后，激动拥抱庆祝胜利',
				img_url: 'https://s1.imagehub.cc/images/2023/06/28/img3.jpeg'
			},
			{
				id: 4,
				title:'元宵节',
				info: '元宵佳节，融和天气 ',
				img_url: 'https://s1.imagehub.cc/images/2023/06/28/img4.jpeg'
			},
			{
				id: 5,
				title:'兹沃洛女足',
				info: 'Noordman进球，赛后与球迷亲切合影留念',
				img_url: 'https://s1.imagehub.cc/images/2023/06/28/img5.jpeg'
			},
			{
				id: 6,
				title:'希望之星',
				info: 'PSV埃因霍温女足潜力新星-阿尼克-扬森球衣照',
				img_url: 'https://s1.imagehub.cc/images/2023/06/28/img6.jpeg'
			}
		])
	]);
});
module.exports = user;
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
