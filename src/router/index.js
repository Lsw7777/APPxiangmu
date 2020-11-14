import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login.vue')
}, {
  path: '/',
  component: () => import('@/views/layout/layout.vue'),
  children: [{
      path: '', // 默认子路由
      name: 'home',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/qa',
      name: 'qa',
      component: () => import('@/views/qa/qa.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/video/video.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my/my.vue')
    }
  ]
}]

const router = new VueRouter({
  routes
})

export default router