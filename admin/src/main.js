import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

//加载进去后，直接通过this.$http就能获取
import http from './http'
Vue.prototype.$http = http

//让每个Vue都有这个信息,但是需要调用 混用  如：ItemEdit的上传    代码块的意思  需要在全局、局部的地方定义
Vue.mixin({
  computed:{
    uploadUrl(){
    return this.$http.defaults.baseURL + '/upload'
  }
  },
    methods:{
      getAuthHeaders(){
        return{
          Authorization:`Bear ${localStorage.token || ''}`
        }
}
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
