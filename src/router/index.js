import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import index from '@/components/index/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: {title: '紫夕商城管理系统'}
    },
    {
      name: 'index',
      path: '/',
      component: index,
      meta: {title: '紫夕商城管理系统'}
    }
  ]
})
