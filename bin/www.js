/**
 *
 * @bin文件夹下www.js文件启动服务
 * 主要暴露app服务对象，和根目录下，app.js配合是一个完整的基本服务器
 *
 */
const express = require('express');
// express的实例对象，是app服务对象
const app = express();
// 端口变量port
const port = 3001;
 app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});
// 暴露app对象
module.exports = app;
