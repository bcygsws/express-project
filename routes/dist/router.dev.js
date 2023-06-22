"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 引入express
var express = require('express'); // express.Router()得到route的一个实例，用于处理子路由


var route = express.Router();
route.get('/', function (req, res) {
  // 在回调函数中调用响应对象res的send方法，发送响应给客户端
  // res.send('hello world');
  // 请求成功，返回一个对象
  res.send({
    id: 1,
    title: '三国演义'
  });
}); // 6.创建post服务，需要中间件的辅助
// post创建新的资源，一般会自带请求体（即：req.body），请求体一般是json格式，为了使得Express能够识别json格式，
// 需要使用中间件express.json()来扩展express的功能

route.post('/', function (req, res) {
  // 可在postman工具中测试
  // console.log(req.body);
  console.log('收到请求体是：', req.body); // res.status(201).send();
  // 保存文章

  res.status(201).send(_objectSpread({
    id: 2
  }, req.body));
}); // 7.测试put服务
// /:id 路径中的:id整体，都会成为参数，例如：/1 /2
// 地址栏：http://localhost:3000/1 ,请求体与post一样，也可以设置，req.params.id拿到请求参数，req.body拿到请求体

route.put('/:id', function (req, res) {
  console.log('收到的请求参数,文章id是：', req.params.id);
  console.log('收到的请求体是：', req.body); // 返回响应，状态码默认是200
  // res.send();
  // 更新数据库中的文章

  res.send(_objectSpread({
    id: req.params.id
  }, req.body));
}); // 8.测试delete服务

route["delete"]('/:id', function (req, res) {
  console.log('删除的文章的id：', req.params.id); // 链式写法
  // res.status(204).send();
  // 从数据库中删除了某条数据

  res.status(204).send();
}); // 导出route变量，在app.js文件中引入

module.exports = route;