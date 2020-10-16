// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import MyHttpServer from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import VueWechatTitle from 'vue-wechat-title';
import router from './router'
import SvgIcon from 'vue-svgicon'
Vue.use(SvgIcon, {
  tagName: 'svg-icon'
});

// register globally
Vue.component('svg-icon', SvgIcon)

// 引入Vue插件
Vue.use(ElementUI);
Vue.use(MyHttpServer)
Vue.use(VueWechatTitle)

Vue.config.productionTip = false
Vue.config.devtools = true


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
