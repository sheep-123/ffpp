const config = require("@/config");

class HttpRequest {
	// 默认配置
	static defaultConfig = {
		baseUrl: config.url,
		timeout: 60000,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	constructor(config = {}) {
		// 合并配置
		this.config = {
			...HttpRequest.defaultConfig,
			...config
		};

		// 拦截器
		this.interceptors = {
			request: null,
			response: null
		};
	}

	/**
	 * 设置请求拦截器
	 * @param {function} callback - 拦截函数
	 */
	setRequestInterceptor(callback) {
		this.interceptors.request = callback;
	}

	/**
	 * 设置响应拦截器
	 * @param {function} callback - 拦截函数
	 */
	setResponseInterceptor(callback) {
		this.interceptors.response = callback;
	}

	/**
	 * 基础请求方法
	 * @param {string} method - 请求方法
	 * @param {string} url - 请求地址
	 * @param {object} data - 请求参数
	 * @param {object} customConfig - 自定义配置
	 */
	async request(method, url, data = {}, customConfig = {}) {
		// 合并配置
		const mergedConfig = {
			...this.config,
			...customConfig
		};

		// 处理完整URL
		const fullUrl = url.startsWith('http') ? url : `${mergedConfig.baseUrl}${url}`;

		// 请求配置
		let requestConfig = {
			url: fullUrl,
			method: method.toUpperCase(),
			data,
			timeout: mergedConfig.timeout,
			header: {
				...mergedConfig.headers
			}
		};

		// 请求拦截器处理
		if (this.interceptors.request) {
			requestConfig = this.interceptors.request(requestConfig) || requestConfig;
		}

		try {
			const response = await this._uniRequest(requestConfig);

			// 响应拦截器处理
			if (this.interceptors.response) {
				return this.interceptors.response(response);
			}

			return this._handleResponse(response);
		} catch (error) {
			return this._handleError(error);
		}
	}

	// 执行uni.request
	_uniRequest(config) {
		return new Promise((resolve, reject) => {
			uni.request({
				...config,
				success: (res) => resolve(res),
				fail: (err) => reject(err)
			});
		});
	}

	// 处理成功响应
	_handleResponse(response) {
		const {
			statusCode,
			data
		} = response;
		if (statusCode >= 200 && statusCode < 300) {
			return data;
		}
		return Promise.reject(response);
	}

	// 处理错误
	_handleError(error) {
		uni.showToast({
			title: '网络请求失败',
			icon: 'none'
		});
		return Promise.reject(error);
	}

	// GET请求
	get(url, params = {}, config = {}) {
		return this.request('GET', url, params, config);
	}

	// POST请求
	post(url, data = {}, config = {}) {
		return this.request('POST', url, data, config);
	}

	
}



export default HttpRequest

