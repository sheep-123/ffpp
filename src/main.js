import Vue from 'vue'
import App from './App.vue'
import './uni.promisify.adaptor'
// import '@/assets/styles/fonts.css'
import uView from "uview-ui";
Vue.use(uView);


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

require('./service/request.js')(app)
app.$mount()
