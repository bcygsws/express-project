/**
 *
 * @ 将查询结果返回给前端时，响应状态成功或失败
 *
 *
 */
// 响应成功的提示信息构成
const success = (msg, data) => {
	if (!data) {
		data = '';
	}
	if (!msg) {
		msg = '';
	}
	return {
		msg,
		code: 1,
		data
	};
};
// 响应失败的提示信息
const fail = (msg, data) => {
	if (!data) {
		data = '';
	}
	if (!msg) {
		msg = '';
	}
	return {
		msg,
		code: 0,
		data
	};
};
// 暴露两个函数
module.exports = {
	success,
	fail
};
