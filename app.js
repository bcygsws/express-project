// console.log('ok');
// 1.首先引入express库
const express = require('express');
// 2.创建express的实例，代表服务器
const app = express();
// 引入route
// const route = require('./routes/router');
const routes = require('./routes');
app.use(express.json());
// 将子路由都放在/article路径下
// app.use('/article', route);
routes(app);
// post请求一般带有请求体，为了让Express能够识别json格式，使用中间件express.json()
//
// 3.设置监听端口
const port = 3000;
// 5.创建get服务
/**
 *
 * 第一个参数：路径
 * 第二个参数：回调函数，处理响应
 *
 * 状态码：
 * 200，put请求中默认，表示 已更新
 * 201,post请求中返回，表示 创建资源成功
 * 204，delete请求中默认返回，表示 已删除
 *
 */
// app.get('/', (req, res) => {
// 	// 在回调函数中调用响应对象res的send方法，发送响应给客户端
// 	res.send('hello world');
// });

// // 6.创建post服务，需要中间件的辅助
// // post创建新的资源，一般会自带请求体（即：req.body），请求体一般是json格式，为了使得Express能够识别json格式，
// // 需要使用中间件express.json()来扩展express的功能
// app.post('/', (req, res) => {
// 	// 可在postman工具中测试
// 	// console.log(req.body);
// 	console.log('收到请求体是：', req.body);
// 	res.status(201).send();
// });
// // 7.测试put服务
// // /:id 路径中的:id整体，都会成为参数，例如：/1 /2
// // 地址栏：http://localhost:3000/1 ,请求体与post一样，也可以设置，req.params.id拿到请求参数，req.body拿到请求体
// app.put('/:id', (req, res) => {
// 	console.log('收到的请求参数：', req.params.id);
// 	console.log('收到的请求体是：', req.body);
// 	// 返回响应，状态码默认是200
// 	res.send();
// });

// // 8.测试delete服务
// app.delete('/:id', (req, res) => {
// 	console.log('删除的请求参数的id：', req.params.id);
// 	// 链式写法
// 	res.status(204).send();
// });

// 4.启动app服务器，并监听port端口，打印日志
app.listen(port, () => {
	// 打印log
	console.log(`Express server is listening at http://localhost:${port}`);
});
/**
 *
 * @Express框架
 * 参考文档1：https://www.bilibili.com/video/BV1e54y1D7cS/?spm_id_from=333.337.search-card.all.click&vd_source=2806005ba784a40cae4906d632a64bd6
 * 参考文档2：https://zxuqian.cn/videos/express/express-get-started/
 *
 * 接上面，来到第9步：
 * 对于多个各种不同类型请求，单独抽离到放在routes文件夹下的router.js文件中
 * 9.1 复制各种请求代码.到router.js文件
 * 9.2 在router.js文件中再次引入express包，然后拿到route实例，express.Router();将app替换成route
 *
 *
 *
 *
 *
 */
