/**
 *
 * 因为项目中可能有多个子路由，为了不使app.js文件过于庞大，在routes文件下，
 * 新建一个index.js文件，统一处理路由的挂载
 *
 * 在app.js文件中引入导出的app.use所在的函数
 *
 */
const route = require('./router');
module.exports = (app) => {
	app.use('/article', route);
};
