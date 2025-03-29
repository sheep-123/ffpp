// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
  // 初始化请求配置
  uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置 */
    const to = require("@/config");

    //#ifdef MP-WEIXIN || APP-PLUS
    config.baseURL = `${to.url}`; /* 根域名 */
    //#endif

    //#ifdef H5
    config.baseURL = "/uni"; /* 根域名 */
    //#endif

    // 设置默认请求头
    config.header = {
      "X-Requested-With": "XMLHttpRequest",
    };
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

      // 检查 Token 是否过期
      if (data.status === 401) {
        console.warn("Token 已过期，跳转到登录页面...");
        handleTokenExpired(); // 处理 Token 过期
        return Promise.reject(data); // 阻止后续逻辑
      }

      return data;
    },
    (error) => {
      // 响应错误处理
      console.error("响应拦截器错误:", error);

      // 提示用户网络错误或其他异常
      if (error.statusCode === 401) {
        uni.showToast({
          title: "登录已过期，请重新登录",
          icon: "none",
        });
        handleTokenExpired(); // 处理 Token 过期
      } else {
        uni.showToast({
          title: "网络错误，请稍后重试",
          icon: "none",
        });
      }

      return Promise.reject(error);
    }
  );

  /**
   * 处理 Token 过期逻辑
   */
  function handleTokenExpired() {
    // 清除本地存储的 Token
    uni.removeStorageSync("token");
    uni.removeStorageSync("user");

    // 跳转到登录页面
    uni.navigateTo({
      url: "/pages/user/login",
    });
  }
};
