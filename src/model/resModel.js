/**
 *
 * @ 将查询结果返回给前端时，响应状态成功或失败
 *
 *
 */
// 响应成功的提示信息构成
const success = (info, message) => {
	if (!message) {
		message = '';
	}
	if (!info) {
		info = '';
	}
	/**
	 *
	 * 状态码
	 * 200 服务器处理了请求
	 * 201 请求成功，并且创建了新的资源
	 * 204 服务器成功处理了请求，但没有返回任何内容
	 *
	 */
	return {
		info,
		code: 201,
		message
	};
};
// 响应失败的提示信息
const fail = (info, message) => {
	if (!message) {
		message = '';
	}
	if (!info) {
		info = '';
	}
	return {
		info,
		code: 204,
		message
	};
};
// 暴露两个函数
module.exports = {
	success,
	fail
};
