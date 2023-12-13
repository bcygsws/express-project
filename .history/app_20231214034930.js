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
 * req.method.toLowerCase==='option';
 * 其余处，都是res响应对象的header方法
 * res.header()
 *
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
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderField'
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
 * @Express框架知识点
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
 * @外键策略
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
 * @mysql各种算术符
 * count(*) as whole_num
 * sum(if(gender='男',1,0)) as boy
 *
 * sql完整教程
 * 参考文档：
 * https://zhuanlan.zhihu.com/p/381433715
 * 关键知识点
 * 1.1 select distinct 查询不同行
 * 例如：一个student学生表中，有1、2、3班学生的记录
 * Navicat工具中： MyBook连接/数据库 book_database/表 student
 * 为了只得到不同班级的记录，使用sql语句：
 * select distinct class_id from student;
 *
 * 1.2 操作符:operator
 * > < = != (不等于 <>)
 * select column_name1,column_name2,…… from table_name where column_name operator value;
 *
 * select id,name,age,class_id from student where name='扁素问';
 * 1.3 insert插入sql语句
 * insert into student values(null,'张无忌',22,'男',2);
 * 或者
 * insert into student (id,name,age,gender,class_id) values(null,'张无忌',22,'男',2);
 *
 * 1.4 update更改记录中的某个value值
 * update student set name='医者圣女扁素问' where id=3;
 *
 * 1.5 delete删除某条记录
 * delete from student where id=6;
 *
 * 1.6 sql算术运算符和比较运算符
 * 参考文档：https://blog.csdn.net/weixin_44216392/article/details/107701999
 * 参考文档1：https://blog.51cto.com/u_15127507/4540672
 * 参考文档2：https://blog.csdn.net/qq_44111805/article/details/124403278
 *
 *
 * 1.6.1 sql的算术运算符:加+、减-、乘*、除/
 * 可以像数学中运算一样，和列名进行运算
 * select id,name,age,age*2 as age_x2 from student;
 *
 * 参考文档：https://blog.csdn.net/qq_44111805/article/details/124403278
 * SELECT 100,100+0,100-0,100+10,100-10,100+10.1,100-10.1,100-10+20 from student;
 *
 * 三条结论：
 * 整数和整数进行加或者减运算,结果仍然为整数
 * 整数和浮点数进行加、减运算，结果会成为浮点数
 * 加法和减法的运算优先级相同，先算加法或先算减法不影响结果
 *
 * select 100,100*1,100*1.0,100/1,100/2,100+2*5/2,100/3,100/0,0/0 from student;
 * 一个整数乘以1或者除以1，还是整数，数值与原数相等
 * 一个整数乘以浮点数1.0或者除以浮点数1.0，其结果是浮点数，值为原数相等
 * 一个数除以整数后，不论是否除尽，其结果都是浮点数
 * 一个数除以另外一个数，除不尽时，其结果是浮点数，且保留到小数点后4位
 * 乘法和乘法的优先级相同，先乘后除还是先除后乘，结果是一样的
 * 数学中0不能作为分母，sql中任何数除以0，结果是null
 *
 * 1.6.2 sql的比较运算符
 * 大于，>
 * 小于，<
 * 大于等于，>=
 * 小于等于，<=
 * 不等于 <> 或 使用!=
 * 等于 =
 * 安全相等运算符 <=> 安全地判断两个值、字符串和表达式是否相等
 *
 * 在join 的on条件或者常用的where 条件中经常使用比较不等式，作为条件判断
 * 字符串也能使用比较运算符
 * 比如：在student表的birthday字段中,sql子句 where birthday>'2004-1-22' 表示出生生日在2004年1月22日之后的记录
 *
 * select id,name,age,birthday from student where birthday>'2004-1-22';
 * 特别注意：
 * 字符串类型的数据，按照不等式进行比较时，原则上是按照字段顺序进行排序的，而不是字符串中数值大小
 *
 * 2003-9-20
 * 2004-1-1
 * 2004-1-22
 * 2005-3-16
 * 2006-2-1
 *
 * 在birthday>'2004-1-22'后面的数据，是2005-3-16和2006-2-1所在行的数据
 * 更进一步，观察student表中chars_dic列的数据
 * 使用以下sql语句查询时
 * select id,name,age,birthday,chars_dic from student where chars_dic>'2';
 *
 * chars_dic的字典顺序是
 * 1
 * 10
 * 2
 * 22
 * 3
 *
 * 验证：使用order by对表中的记录，按照chars_dic进行排序，可以同样得出上面的字典顺序
 * select * from student order by chars_dic;
 *
 * 上述sql语句查询结果：（第6列数据就是按照上面的字典顺序进行排列的）
 * 1	雪无痕	21	男	1	2004-1-22	1
 * 4	宋甜儿	18	女	1	2004-1-1	10
 * 2	李红袖	20	女	3	2005-3-16	2
 * 5	张无忌	22	男	2	2003-9-20	22
 * 3	医者圣女扁素问	21	女	2	2006-2-1	3
 *
 * 1.6.3 不能对某字段值为null的记录，使用比较运算符进行操作，而需要使用is null
 *
 * student原表
 * 1	雪无痕	21	男	1	2004-1-22	1	3800
 * 4	宋甜儿	18	女	1	2004-1-1	10	null
 * 2	李红袖	20	女	3	2005-3-16	2	4500
 * 5	张无忌	22	男	2	2003-9-20	22	2200
 * 3	医者圣女扁素问	21	女	2	2006-2-1	3 null
 *
 * select * from student where worth <>3800;
 * 上述不等于3800的记录，只能检索出4500、2200所在行的记录，而worth为null的记录检索不出来
 *
 * select *from student where worth=NULL;
 * 上述sql语句，不能检索到null所在行的记录
 *
 * 上述两种情况，都能验证，当某个字段中值为null时，不能使用比较运算符，使用了也无效
 * 需要使用is null或者is not null语句  来直接来进行查询
 * select *from student where worth is null;
 * select *from student where worth is not null;
 *
 * 1.6.4 关于sql中的隐式转换
 * 参考文档：https://blog.csdn.net/weixin_44388689/article/details/125251033
 *
 * select 'a'=0 from  student;
 * 上述语句，结果是1；原因：当比较运算符一边是一个数字，另外一边是字符串时，字符串会转换为数字进行比较
 * 注意：SQL中隐式的将字符串'a'转换成了数字0，上述sql语句也验证了这一结果
 * SELECT 1=2,1!=2,1='1',2='2',1='a',0='a',1='b',0='abc','a'='a',''=NULL,NULL=NULL FROM student;
 *
 * 等号比较运算符，如果=两侧的值、字符串和表达式相等，则结果为1；否则为0
 * 等号比较运算符，如果=两侧都是数字，两侧数字相等为1，不等为0（特殊：如果1='1'，其结果仍然是相等，sql隐式将'1'转化成了数字1）
 * 等号比较运算符，如果=两侧都是字符串，比较的时候，是比较字符对应的ASCII码
 * 等号比较运算符，如果=两侧，一边为字符串，一边为数字，sql会隐式将字符串转化成数字，两种重要的情形：
 * 'a'=0 ,注意：字符串'b'并不等于1
 * 1='1' 2='2'
 * 等号比较运算符，如果=两侧的值、字符串或者表达式，有结果为null,则这个表达式对的结果就是null（其他非等号运算符也适用）
 * 安全等号比较运算符和等号比较运算符，有些许差异；
 * 例如：''<=>NULL 结果为0
 * NULL<=>NULL 结果为1
 *
 * 1.6.5 非符号运算符
 * 参考文档：
 * https://blog.csdn.net/qq_44111805/article/details/124403278
 *
 * 空字符或非空字符的三种方式：
 * 方式一：IS NULL/IS NOT NULL
 * SQL的例句：
 * select *from student where worth IS NULL;
 * select *from student where worth IS NOT NULL;
 *
 * 方式二：ISNULL(exp) / NOT ISNULL(exp)
 * SQL的例句：
 * select *from student where ISNULL(worth);
 * select *from student where NOT ISNULL(worth);
 *
 * 方式三：列名<=>NULL / NOT 列名<=>NULL
 * sql例句：
 * select *from student where worth<=>NULL;
 * select *from student where NOT worth<=>NULL;
 *
 * 1.6.6 LEAST(exp) GREATEST(exp)
 * least(1,2,34)  结果：1
 * least('a','k','m') 结果：a
 * least(1,2,NULL) 结果：NULL
 *
 * greatest(1,2,34)  结果：34
 * greatest('a','k','m') 结果：m
 * greatest(1,2,NULL) 结果：NULL
 *
 * 1.6.7 between……and用法
 * where worth between 2000 and 3000;
 * where worth not between 2000 and 3000;
 *
 * 1.6.8 in/not in
 * where age in(18,20,22)
 * where age not in(18,20,22)
 *
 * 'a' in('a','b','c') 结果是1
 * 1 in(1,2) 结果是1
 * null in(1,2) 结果是null
 * null in (1,null) 结果仍然是null
 *
 * 1.6.9 like
 *
 *  % 能匹配0个或者多个字符
 *  _下划线，只能匹配1个字符
 * select * from student;
 * 查询名字中包含 “无”字的记录
 * select *from student where name like '%无%';
 *
 * 1.6.10 REGEXP正则表达式的运用
 *
 * 'language' REGEXP '^l' 结果是1
 * 'skhstart' REGEXP 'e$' 结果是0
 * 'skhstart' REGEXP 'an' 结果是0
 * 'atguigu' REGEXP 'gu.gu' 结果是1， .可以匹配任意单个字符
 * 'atguigu' REGEXP '[ab]',字符串 atguigu中是否包含a或者b字符？显然，包含a，结果是1
 *
 * 1.7 逻辑运算符
 * 参考文档：https://blog.csdn.net/qq_44111805/article/details/124403278
 * 与 AND 或者&&
 * 或 OR 或者 ||
 * 非 not 或者!
 * 异或 XOR
 * 逻辑异或真值表
 * 两个数都为0，或者都不为0，则异或结果是0
 * 两个数，一个是0，一个是1，结果一定是1
 * 简单记忆：
 * 两数字相同为0，两数字不同为1
 *
 * 实例：
 * 0 XOR 0 XOR 0 结果是0
 * 1 XOR 1 XOR 1 结果是1
 *
 * @二、MYSQL数据库之事务
 *
 * 参考文档1：
 * https://blog.csdn.net/Trong_/article/details/128224148
 * 2.1 概念
 * 在数据库中，事务（transaction）把多个sql语句打包成一个整体，这些sql语句要么全部执行，要么全部不执行
 * 2.2 使用场景
 * 转账例子
 * 2.3 事务的使用
 * 如何保证事务的完整性？
 * 如果事务执行过程中，出现了错误，只需要将这些操作恢复到之前的样子就好了，这就是回滚（rollback）操作
 *
 * 语法：
 * # 开始事务
 * start transaction;
 *
 * # 执行多条sql语句
 *
 * # 提交/回滚
 * commit/rollback;
 *
 * 报错以后，回滚语句恢复原状
 * rollback;
 * 然后查询student表
 * select *from student;
 * 特别注意：
 * 事务也不是无所不能的，记录数据操作也是需要开销的，数据库中要是有上亿条数据，要使用几百G甚至多少T的空间，来记录这些
 * 额外的东西
 *
 * 参考文档：
 * https://mbd.baidu.com/newspage/data/landingsuper?sid_for_share&isBdboxFrom=1&pageType=1&urlext=%7B%22cuid%22%3A%22g8Hia_ax28_eP2aCgu2dal832ulza289_av5agawSuloav8Zg8SOt0is3R0OfWOKbIUmA%22%7D&context=%7B%22nid%22%3A%22news_9265701224382405676%22,%22sourceFrom%22%3A%22search%22%7D
 * 
 * 事务的ACID特性
 * a.原子性 atomicity
 * 一个事务是一个最小的不可分割的单位，事务中所有操作，要么全部执行，要么全部未执行，没有中间状态
 * 原子性:主要是通过事务日志中的回滚日志（undo log）来实现的;事务对数据库进行修改时，InnoDB会根据操作生成相反的操作
 * undo log（undo log日志来保证事务的原子性）
 *
 * b.一致性 consistency
 * 事务执行前、后，保持数据的一致性状态；即使发生异常，也不会因为异常破坏数据的完整性约束,比如:数据的唯一性约束等
 *
 * c.隔离性 isolation
 * 一个数据库服务器，同时执行多个事务，多个事务之间的相互影响程度
 * 一个服务器可以为多个客户端提供服务，多个客户端中每一个都执行多个事务，多个事务操作同一张表，很容易会出现数据相互影响
 * 的的情况
 *
 * 事务的隔离性越高，就意味着事务之间的并发程度越低，执行效率越慢，数据的准确性越高
 * 事务的隔离性越低，就意味着事务之间的并发程度越高，执行效率越快，但数据的准确性越低
 * 事务的隔离性，是通过隔离级别来定义的，并用锁机制来实现写操作的隔离性，用MVCC来保证读操作的隔离性
 *
 * d.持久性 duration
 * 事务一旦提交，对数据的修改是持久性的，即使数据库宕机数据也不会丢失，这种持久性是通过redo log日志来保证的
 * @三、MySQL中的锁机制
 * 参考文档：https://blog.csdn.net/be_racle/article/details/126566613
 * 参考文档1：https://blog.csdn.net/weixin_43844718/article/details/127508389?spm=1001.2101.3001.6650.16&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-16-127508389-blog-118862400.235%5Ev38%5Epc_relevant_anti_vip_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-16-127508389-blog-118862400.235%5Ev38%5Epc_relevant_anti_vip_base&utm_relevant_index=17
 * 参考文档2：https://blog.csdn.net/weixin_45480785/article/details/118862400?utm_medium=distribute.pc_feed_404.none-task-blog-2~default~BlogCommendFromBaidu~Rate-3-118862400-blog-null.262^v1^pc_404_mixedpudn&depth_1-utm_source=distribute.pc_feed_404.none-task-blog-2~default~BlogCommendFromBaidu~Rate-3-118862400-blog-null.262^v1^pc_404_mixedpud
 * 3.1 锁粒度
 * 表锁 				表级锁：开销小、加锁块、不会出现死锁的现象；锁粒度最大，发生锁冲突的概率最大，并发度最低
 * 行锁         行级锁：开销大、加锁慢、会出现死锁的现象；锁粒度最小，发生锁冲突的概率最小，并发度高
 * 页锁         页面锁：开销和加锁时间介于表级锁和行级锁之间，会出现死锁现象；锁粒度介于表锁和行锁之间，并发度一般
 *
 * 3.2 兼容性
 * 共享锁（S）
 * 排他锁（X）
 *
 * 3.3 加锁模式
 * 简明记忆：“记 间 临 意 插”
 * a.记录锁
 * 记录锁-record locks
 * 记录锁两大要点：
 * 一、必须是主键列或者唯一索引列，否则退化为临键锁
 * 二、必须是精准匹配，不能出现> < like 等符号，否则也会退化为临键锁
 * select * from student where id=1 for update;  // 对表中的记录加记录锁，也叫行锁
 * update student set name='张虎' where id=1;  // 在通过主键索引或唯一索引，为update语句也会为记录，加上 记录锁
 * 	a1.记录锁，锁住的是索引，而非真正的数据记录
 *  a2.如果要锁的列没有索引，将锁住全表的记录
 *  a3.记录锁是排它锁，会阻塞其他事务对其的添加、删除或修改
 *
 * b.间隙锁（gap locks）
 * 间隙锁-gap locks
 * b1.间隙锁是InnoDB在可重复读（RR）隔离级别为解决幻读问题而引入的机制
 * b2.间隙锁是行级锁的一种
 * b2.务必牢记：间隙锁锁定的是一个区间，而不仅仅是区间中的每一条数据
 * 
 * 举例：emp表中有101条数据（原始数据：最大的emp_id是101）
 * select *from emp where emp_id>100 for update;
 * 分析：条件检索，是一条排他（for update是排它锁）间隙锁
 * 当我们使用条件检索记录并使用共享锁和排它锁时，InnoDB不仅会对符合条件的记录加锁，也会对在锁定区间内不存在的记录加锁
 * 具体举例：
 * 1.如果向表emp中插入一条数据emp_id为102，间隙锁区间(100,正无穷]
 * 则emp_id为103的这条记录也被添加了间隙锁
 * 2.这个时候，如果插入emp_id为102的记录，如果那边的事务还没有提交，那就处于完全等待状态，不能插入记录
 * 3.注意一种情况：上述条件检索中的排它锁，如果当前事务还没有提交；那么其他事务就处于等待状态，无法插入添加emp_id为102这条记录
 *
 * c.临键锁（next-key）
 * 临键锁：是记录锁和间隙锁的组合，它是在某一条记录或某条记录的间隙上加锁
 * 一张表stu：
 * id	age	name
 * 1	10	zhangsan
 * 3	24	lisi
 * 5	32	wangwu
 * 7	45	zhaoliu
 * 
 * sql语句：
 * c1.根据非唯一索引列update某条数据（如果是唯一索引列就是记录锁了，退化成了临键锁）
 * update name='zhangsanfeng' where age=24;
 * age是非索引列，潜在的临键锁有(负无穷，10],(10,24],(24,32],(32,45],(45,正无穷]
 * 
 * c2.根据非唯一索引列，锁住某条记录
 * select *from stu where id=24 for update; 
 * 
 * 无论是上面的哪条sql执行后，之后在事务B中执行下面语句都会被阻塞
 * insert into stu values(9,26,'Hannah');
 * 原因是：事务A中update操作进行时，也获取了(10,32]这个区间内的临键锁
 * 
 * d.意向锁 intension locks
 * 四点注意：
 * 1.意向共享锁和意向排他锁都是表级锁
 * 2.意向锁是一种不会与行级锁冲突的表级锁，这点非常重要
 * 3.意向锁是InnoDB自动加的，不需要用户主动干预
 * 4.意向锁是InnoDB下存在的内部锁，MyISAM中没有意向锁的概念
 * 
 * 意向锁也分为意向共享锁(IS)和意向排它锁(IX)
 * 场景：
 * 事务A获取了id=6的排它锁，未提交
 * select *from users where id=6 for update;
 * 事务B想要获取users表的表锁
 * lock table users read;
 * 
 * 表的读锁，就是共享锁
 * 1.共享锁和排它锁时互斥的，不可能同时存在于一个事务中
 * 2.事务B必须确认是否有其他事务中有users表的排它锁
 * 3.事务B也必须确认是否有其他事务用于表users中任意一行的排它锁
 * 
 * 逐行排查其他事务中是否有users表中任意一行的排它锁，效率极其低下；
 * 解决：引入意向共享锁
 * 场景联系实际：孩童刚进入幼儿园，先在小本上写上自己的名字，出游乐场时划掉自己的名字
 * 意向锁的目的：
 * 引入意向锁，是为了使得行锁和表锁高效的共存
 * 
 * e.插入意向锁
 * 参考文档：
 * 1.定义：
 * 
 * 2.使用场合：
 * 
 * 3.4 加锁机制
 * 乐观锁和悲观锁
 * 
 * 3.4.1 乐观锁
 * 认为别的线程不会修改数据，所以不会上锁；但在更新的时候会判断在此期间有没有别的线程更新这个数据
 * 
 * 乐观锁使用场景：
 * 适用于读多写少的情况，减少[锁操作冲突]，也是减少[锁竞争的开销]，提高系统的吞吐量。
 *
 * 3.4.2 悲观锁
 * 认为别的线程会修改数据，所以每次在拿数据时都会上锁，其他线程修改数据的操作会被阻塞直到自己拿到锁
 * 
 * 悲观锁的适用场景：
 * 适用于写多读少的场景；因为，此时如果使用乐观锁的话，就会出现大量的锁操作冲突，会导致应用层不断地retry,反而
 * 降低系统性能
 * 
 * 【总结】MySQL事务和加锁机制
 * 总结：事务
 * 
 * 总结：锁机制
 * 
 * 四、SQL基本语法
 * 创建一张表的基本语法：
 * create table tb(
 * id int not null primary key auto_increment,
 * t_name varchar(20) not null,
 * t_age int(10) check(t_age>18 and t_age<40),
 * t_sex enum('男'，'女') default null,
 * )ENGINE=InnoDB default CHARSET=utf8;
 * 
 * navicat创建的表，从图形界面导出sql文件时，primary key(s_id) using BTREE
 * 参考文档：https://blog.51cto.com/u_15127632/4856441
 * BTREE是一种索引
 * 1.索引的好处：
1.1.使用索引可以减少存储引擎所需要扫描的数据量，加快查询速度
-- 1.2.使用索引可以将随机I/O变成顺序I/O
-- 1.3.索引可以帮助我们将搜索结果排序，以避免使用磁盘临时表

-- 2.索引的分类：
-- 2.1 引擎的索引包括两种方式：BTREE和HASH
-- 2.2 MYISAM和InnoDB引擎只可以使用btree这种索引方式
-- 2.2 memory和heap（堆）存储引擎可以使用btree和hash两种索引方式
-- 参考文档：https://blog.csdn.net/qq_24654501/article/details/105973223
 * 4.1 sql语句中的约束 关键字
 * 参考文档：https://blog.csdn.net/qq_24654501/article/details/105973223
 * 识记：非空 唯一 查 默认，外、主两键
 * a. not null 非空约束
 * b. unique 唯一性约束
 * c. check 检查约束，MySQL 5.7不支持该关键字，新版mysql8.0支持check
 * 举例：check(age>0 and age<100)
 * MySQL 5.7 不支持check关键字，如何补救?
 * 答案：使用枚举关键字enum
 * sex ENUM('男','女') default null;
 * 
 * d.默认值约束 default，当没有插入值时，会自动使用默认值 
 * 
 * e. foreign key 外键约束：两个一致，从表主键和主表外键有同一引用类型（例如：都是int）,同一编码方式，例如：都是utf8
 * 给一张表添加外键的四种方式
 * 参考文档：https://www.cnblogs.com/qisong178878915/p/4435488.html
 *  e1.都可以通过第四种方式演化：
 *  命令：alter table 表名tb1 add constraint fk_id foreign key(id) references 外键表名class_tb(c_id);
 *  e2.第四种方式，也用于为已创建过的表，添加外键
 *  上述命令可简化为：alter table 表名 tb1 add foreign key(id) references 外键表名class_tb(c_id);
 * 
 * f. primary key 主键约束
 * 
 * cmd黑窗口如何进入mysql命令行模式？
 * 1.mysql -u root -p
 * 会有提示输入密码，密码为123456
 * 
 * 2.即可进入mysql模式界面
 * 备注：如果要退出mysql界面模式，使用命令号，包含后面的分号
 * quit;
 * 
 * 五、外键父表删除记录（当前表或者叫从表的记录依赖父表的记录）
 * 有两种解决策略：置空法和级联法
 * 5.1 置空法，先将当前表中c_id等于3的记录值修改为null,再使用delete语句删除主表（父表、参照表）中c_id等于的那条记录
 * update stu_table set c_id=null where c_id=3;
 * delete from class_table where c_id=3;
 * 评价：但是这种方式，可以删除主表中c_id=3的记录确实被清除了，但是当前表或叫从表中的c_id=3变成null,这条记录本身仍然存在
 * 
 * 5.2 更为彻底的方法，是使用 更新级联+删除级联
 * 步骤：
 * 先删除原有的外键约束
 * 再次添加带有级联更新和级联删除的外键约束
 * 两行命令：
 * alter table stu_table drop foreign key fk_c_id;
 * 
 * alter table add constraint myfk_c_id foreign key(c_id) references class_table(c_id) on update cascade
 * on delete cascade;
 * 
 * 
 */
