import Vue from "vue";
import App from "./App.vue";
import "./uni.promisify.adaptor";
import utils from "./utils/utils";
import api from "./api";
import uView from "uview-ui";
import minxi from "@/mixins/index.js";
import img from "./api/img";
import jk from "./api/api";
import store from "@/store/index.js";
import tabar from "@/components/tabbar";
Vue.component("tabar-view", tabar);
Vue.use(uView);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$requestAll = api;
Vue.prototype.$api = jk;
Vue.prototype.$img = img;
Vue.mixin(minxi);
App.mpType = "app";
const app = new Vue({
  store,
  ...App,
});

require("./service/request.js")(app);
app.$mount();
