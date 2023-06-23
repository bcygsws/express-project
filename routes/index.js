/**
 *
 * @exports和module.exports的区别
 * 
 * 因为项目中可能有多个子路由，为了不使app.js文件过于庞大，在routes文件下，
 * 新建一个index.js文件，统一处理路由的挂载
 *
 * 然后，在app.js文件中引入导出的app.use所在的函数
 * 
 * 参考文档：https://blog.csdn.net/Jin_Kwok/article/details/119716549
 * 总结：
 * 1.exports暴露变量或函数，这个模式下：
 * 如；
 * let a="fagf";
 * function sayHello(){
 * 		console.log('hello！');
 * }
 * exports.a=a;
 * exports.sayHello=Hello;
 * exports和module.exports里面的内容完全一致 exports==module.exports
 * 
 * 2.module.exports统一暴露某个对象时，这个模式下：
 * module.exports里面有内容，而exports是空的，此时module.exports不等于exports
 * 本项目中的一系列的
 * route.use()
 * route.use()
 * route.use()
 * 
 * 最后统一暴露出去
 * module.exports=route;
 * 
 * 3.exports指向module.exports，exports是module.exports的一个引用
 * 4.不要对exports直接赋值，这样会导致exports和module.exports的联系中断
 * 
 * 
 * 
 *
 */
const route = require('./router');
module.exports = (app) => {
	app.use('/article', route);
};
