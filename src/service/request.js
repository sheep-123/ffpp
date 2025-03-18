// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
  // 初始化请求配置
  uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置*/

    //#ifdef MP-WEIXIN || APP-PLUS
    config.baseURL = "http://192.168.3.36:8001/"; /* 根域名 */
    //#endif

    //#ifdef H5
    config.baseURL = "/uni"; /* 根域名 */
    //#endif

    //设置默认请求头 异步的
    config.header = {
      "X-Requested-With": "XMLHttpRequest",
    };
    return config;
  });

  // 请求拦截
  uni.$u.http.interceptors.request.use(
    (config) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {};

      // const token = uni.getStorageSync("token");
      // if (token) {
      //   config.header["Authorization"] = `Bearer ${token}`;
      // }
      config.header[
        "Authorization"
      ] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiJlNGUwM2MwMmE2NTk0NjJkOTQ5MjJiYmQwMzk2ZGM2ZCIsInVuaW9uaWQiOiJvcEZ2ZTZFNUREWFNkcmdmLWhnYm5DbzFhU1FZIiwib3BlbmlkIjoib0RXYVA3ZEluczZxaHd3NXpVbG00WHJwbzE0MCIsInNlc3Npb25fa2V5IjoiMGNqS1E5NE13dm1YTWhrMHRtTUtydz09IiwiaWQiOjMzMDMxNzgzMiwiaWF0IjoxNzQxOTE0NzQ1fQ.LAgk1VxIjXOBMiMhSPzUiPOKLWkeXNsXIHiGAwuQrT36Zk3lVdrHW8b7KF1eDqtfj95pcPVT9_A7vaggIwR4Bg`;

      return config;
    },
    (config) => {
      // 可使用async await 做异步操作
      return Promise.reject(config);
    }
  );

  // 响应拦截
  uni.$u.http.interceptors.response.use(
    (response) => {
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      const data = response.data;

      return data === undefined ? {} : data;
    },
    (response) => {
      // 对响应错误做点什么 （statusCode !== 200）
      return Promise.reject(response);
    }
  );
};
