import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'

// // ...其他导入保持不变...
// const request = require("./service/request");

// // 在 Vue 实例化前初始化
// request.init();

// import uView from 'uview-ui'

// Vue.use(uView);

import uView from "vk-uview-ui";
Vue.use(uView);
// Vue.use(vkUView, {
//   componentPrefix: "vk", // 添加组件前缀
// });

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})



app.$mount()
