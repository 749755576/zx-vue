import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import index from '@/views/index/index'
import welcome from '@/views/index/welcome'
import user from '@/views/user/user'
import menu from '@/views/menu/menu'

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
      redirect: '/welcome',
      children: [
        {name: 'welcome',path: '/welcome',component: welcome,},
        {name: 'user',path: '/user',component: user},
        {name: 'menu',path: '/menu',component: menu}
      ],
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