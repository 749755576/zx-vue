//插件模块

import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {

  axios.defaults.baseURL = 'http://localhost:7799/'
  axios.interceptors.request.use(
  config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = sessionStorage.getItem('Authorization')
    config.headers['Authorization'] = token
    return config;
  },
  error => {
    return Promise.reject(error);
  });

  // 4. 添加实例方法
  //  axios.defaults.withCredentials=true;//让axios携带cookie
  Vue.prototype.$http = axios
}

export default MyHttpServer