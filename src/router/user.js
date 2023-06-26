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
module.exports = user;
