import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/admin/api'    //真正的接口地址
    // baseURL:'http://localhost:3000/admin/api'    不会限制死主机名
    // 但是在本地开发的时候一定要指定一个地址，如env这个文件
})

// 增加一个请求拦截，关于是否登录
http.interceptors.request.use(function (config) {
    //请求头
    if( localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 

// 前端发生的错误都会走这个响应拦截器
// 给http请求增加拦截器，前端通用的错误处理
http.interceptors.response.use(res=>{
     return res
},err=>{
    //这里可以直接返回一个错误提示，但是有一个可以使用Vue来操作，更好的方法
    // console.log(err.response.data.message)
    if(err.response.data.message){
        //这里有原因是element message方法 注入了Vue
        Vue.prototype.$message({
            type:'error',
            message: err.response.data.message
        })
        if(err.response.status===401){
           router.push('/login')
        }
    }
    //方法返回一个带有拒绝原因的Promise对象。
    return Promise.reject(err)
})
//导出
export default http