// console.log('ok');
// 1.首先引入express库
const express=require('express');
// 2.创建express的实例，代表服务器
const app=express();
// 3.设置监听端口
const port=3000;
// 4.启动app服务器，并监听port端口，打印日志
app.listen(port,()=>{
  // 打印log
console.log(`Express server is listening at http://localhost:${port}`);
})