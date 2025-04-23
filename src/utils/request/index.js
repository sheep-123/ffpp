import HttpRequest from './request.js';
import utils from '../utils.js';

// // 创建实例并导出
const defHttp = new HttpRequest();

// 示例请求拦截器：添加token
defHttp.setRequestInterceptor(config => {
	const token = uni.getStorageSync('token');
	if (token) {
		config.header.Authorization = `Bearer ${token}`;
	}
	return config;
});

// 示例响应拦截器：处理通用错误状态码
defHttp.setResponseInterceptor(response => {
	const {
		data, 
		statusCode
	} = response;
	
	
	if (data.status === 401) {
		utils.toast('登录过期');
		setTimeout(()=>{
			utils.toPath.navigateTo('/else/user/login')
		},1500)
	}
	return data;
});

export {
	defHttp
};