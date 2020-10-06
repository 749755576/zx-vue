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

// // 挂载路由守卫
// router.beforeEach((to,from,next) =>{
//   if(to.path === '/login'){
//     return next
//   }
//   const tokenStr = sessionStorage.getItem('Authorization')
//   if(!tokenStr) {
//     return next('/login')
//   }else{
//     next()
//   }
// })

// export default router