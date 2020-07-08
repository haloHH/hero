import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import router from './router'
import './assets/iconfont/iconfont.css'

import Card from './components/Card';
Vue.component('m-card',Card)

import ListCard from './components/ListCard';
Vue.component('m-list-card',ListCard)

import axios from 'axios';
Vue.prototype.$http=axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api'    //真正的接口地址
})

Vue.use(VueAwesomeSwiper, /* { default options with global component}*/)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
