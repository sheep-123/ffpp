// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
  // 初始化请求配置
  uni.$u.http.setConfig((config) => {
    //#ifdef MP-WEIXIN || APP-PLUS
    // config.baseURL = "http://192.168.3.36:8001";
    // config.baseURL = "http://192.168.3.46:8001";
    config.baseURL = "https://testfeifanpaopao.jireplayer.com/wjapi";
    //#endif

    // 设置默认请求头
    config.header = {
      "X-Requested-With": "XMLHttpRequest",
    };

    // 设置超时时间
    config.timeout = 5000;
    return config;
  });

  // 请求拦截器
  uni.$u.http.interceptors.request.use(
    (config) => {
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认值
      config.data = config.data || {};

      // 获取并设置 Token
      const token = uni.getStorageSync("token");
      if (token) {
        config.header["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // 请求错误处理
      console.error("请求拦截器错误:", error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  uni.$u.http.interceptors.response.use(
    (response) => {
      const data = response.data;

      // 如果响应数据为空，返回空对象
      if (!data) {
        console.warn("响应数据为空");
        return {};
      }

      return data;
    },
    (error) => {
      // 响应错误处理
      console.error("响应拦截器错误:", error);
      if (error.statusCode === 401) {
        uni.removeStorageSync("token");
        uni.removeStorageSync("user");
        // 记录登录前的页面路径
        const pages = getCurrentPages();
        if (pages.length > 0) {
          uni.setStorageSync("loginPage", pages[pages.length - 1].route);
        }
        uni.navigateTo({ url: "/else/user/login" });
      }
      return Promise.reject(error);
    }
  );
};
