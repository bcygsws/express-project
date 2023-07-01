/**
 *
 * @ 设置app的相关选项
 * 参考文档：https://blog.csdn.net/weixin_47284756/article/details/118460060?spm=1001.2101.3001.6650.9&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-118460060-blog-121008927.235%5Ev38%5Epc_relevant_anti_vip_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-9-118460060-blog-121008927.235%5Ev38%5Epc_relevant_anti_vip_base&utm_relevant_index=17
 *
 * a. post请求，解析json格式，使用中间件express.json()
 * b. 跨域的相关设置
 *
 */
// 测试代码
// console.log('ok');
// 1.首先引入express库
// const express = require('express');
// 引入app对象
const app = require('./bin/www');
// 引入处理post请求参的组件body-parser
const bodyParser = require('body-parser');
// 引入user路由对象
const user = require('./src/router/user');
// 2.创建express的实例，代表服务器
// const app = express();
// 引入route
// const route = require('./routes/router');
// const routes = require('./routes');

// 将图片静态资源托管在服务器上
// 注意：浏览器中http://localhost:3001/img/img1.jpg就可以访问，不需要叠加app.use('/api',router)中的api路径
// 本项目使用图仓软件-ImageHub，不使用express托管静态资源的方式，图仓软件中上传图片并转化为网络链接
// app.use('/img', express.static('./public/images'));

// 防止跨域设置
/**
 * @ res.setHeader
 * res.header
 * 1.上述两者，都是用来设置标头的http响应
 * 2.res.setHeader是node.js中就有的，只能设置单个的标头；然后
 * res.header()是res.setHeader()在express框架中的名称，可以设置多个标头
 *
 * app.all()方法，可以 用于路由不同类型的请求，可能是get,也可能是post
 * 即：app.all()可能是app.get()，也可能是app.post(),也可能是其他
 *
 */
// 跨域是针对不同类型的请求的，故而使用app.all()
app.all('*', function (req, res, next) {
	console.log('有跨域请求');
	// 设置允许跨域的路径，也是用通配符 *；表示所有请求路径都可以
	res.header('Access-Control-Allow-Origin', '*');
	// 设置Content-Type
	res.header('Content-Type', 'application/json;charset=utf-8');
	res.header(
		'Content-Type',
		'application/x-www-form-urlencoded;charset=utf-8'
	);
	// 配置响应标头的请求方式
	res.header(
		'Access-Control-Allow-Methods',
		'PUT, POST, GET, DELETE, OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
	);
	// 这里为options请求方式，单独做了处理
	if (req.method.toLowerCase() == 'options')
		res.send(200); //让options尝试请求快速结束
	else {
		next();
	}
});
// app.use(express.json());
// 二、使用bodyParser对post请求参数进行处理
// 2.1 获得一个application/www-x-form-urlencoded格式的请求体的解析器
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
// 2.2 获得一个application/json格式的请求体的解析器,json方法里面可以传入参数
app.use(bodyParser.json());
// 2.3 bodyParser后面还可以跟raw或者text
// bodyParser.raw({type: 'application/vnd.custom-type'}); // 把一些常用的东西转换成buffer形式
// bodyParser.text({type:'text/html'});// 把html的body解析成一个字符串
// 使用引入的user路由
app.use('/api', user);

// 将子路由都放在/article路径下
// app.use('/article', route);
// routes(app);

// post请求一般带有请求体，为了让Express能够识别json格式，使用中间件express.json()
//
// 3.设置监听端口
// const port = 3000;
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
// app.listen(port, () => {
// 	// 打印log
// 	console.log(`Express server is listening at http://localhost:${port}`);
// });
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
 * @node.js后端实现图片接口，返回路径
 * @Mysql  
 * 参考文档：https://blog.csdn.net/xiaoxiaoguailou/article/details/121990026
 * 外键策略
 * 1.手动置空
 * 思路：是先切断从表中的外键c_id与主表中c_id的联系，再从class_table表中删除c_id=2
 * 1.1 先使用命令：更改从表stu_table中c_id等于2的所有记录的c_id值
 * sql语句：
 * update stu_table set c_id=NULL where c_id=2;
 * 1.2 再使用删除命令，删除主表中c_id等于2的记录
 * 
 * 2.级联操作
 * 2.1 先删除添加的旧的约束,再添加带有级联的新的约束（当然一开始，创建表时就可以为stu_table添加带有级联的约束）
 * 2.2 上述文档中，是先为从表stu_table添加了不带级联的约束
 * alter table stu_table add constraint fk_c_id foreign key (c_id) references class_table(c_id);
 * 
 * 2.3 那么，要想表2中c_id等于3的记录值变更为c_id等于2时，从表中跟随这种变化
 * 需要先删除旧的不带级联的约束
 * alter table stu_table drop foreign key fk_c_id;
 * 然后为从表stu_table添加新的带级联的约束,只需要2.2 中不带级联的约束sql语句，稍作修改就可以
 * alter table stu_table add constraint fk_c_id foreign key (c_id) references class_table(c_id) on update 
 * cascade on delete cascade;
 * 
 */
