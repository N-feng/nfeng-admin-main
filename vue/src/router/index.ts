import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import('@/views/default/layout.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'admin',
    meta: {
      title: 'admin',
    },
    component: Layout,
    children: [
      {
        path: 'user/list',
        name: '用户列表',
        component: () => import('@/views/admin/user/list.vue'),
      },
      {
        path: 'user/create',
        name: '创建用户',
        component: () => import('@/views/admin/user/create copy.vue'),
      },
      {
        path: 'role/list',
        name: '角色列表',
        component: () => import('@/views/admin/role/list.vue'),
      },
      {
        path: 'role/create',
        name: '创建角色',
        component: () => import('@/views/admin/role/create.vue'),
      },
      {
        path: 'access/list',
        name: '权限列表',
        component: () => import('@/views/admin/access/list.vue'),
      },
      {
        path: 'access/create',
        name: '创建权限',
        component: () => import('@/views/admin/access/create.vue'),
      },
      {
        path: 'role-access/create',
        name: '授权',
        component: () => import('@/views/admin/role-access/create.vue'),
      },
      {
        path: 'focus/create',
        name: '创建轮播图',
        component: () => import('@/views/admin/focus/create.vue'),
      },
      {
        path: 'focus/list',
        name: '轮播图列表',
        component: () => import('@/views/admin/focus/list.vue'),
      },
      {
        path: 'goodsType/create',
        name: '创建商品类型',
        component: () => import('@/views/admin/goods-type/create.vue'),
      },
      {
        path: 'goodsType/list',
        name: '商品类型列表',
        component: () => import('@/views/admin/goods-type/list.vue'),
      },
      {
        path: 'goodsTypeAttribute/create',
        name: '创建商品类型属性',
        component: () => import('@/views/admin/goods-type-attribute/create.vue'),
      },
      {
        path: 'goodsTypeAttribute/list',
        name: '商品类型属性列表',
        component: () => import('@/views/admin/goods-type-attribute/list.vue'),
      },
      {
        path: 'goodsCate/create',
        name: '创建商品分类',
        component: () => import('@/views/admin/goods-cate/create.vue'),
      },
      {
        path: 'goodsCate/list',
        name: '商品分类',
        component: () => import('@/views/admin/goods-cate/list.vue'),
      },
      {
        path: 'goods/list',
        name: '商品列表',
        component: () => import('@/views/admin/goods/list.vue'),
      },
      {
        path: 'goods/create',
        name: '创建商品',
        component: () => import('@/views/admin/goods/create.vue'),
      },
      {
        path: 'goodsColor/create',
        name: '创建商品颜色',
        component: () => import('@/views/admin/goods-color/create.vue'),
      },
      {
        path: 'goodsColor/list',
        name: '商品颜色列表',
        component: () => import('@/views/admin/goods-color/list.vue'),
      },
    ],
  }, {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/admin/user/login.vue'),
  },
  {
    path: '/',
    name: 'web',
    meta: {
      title: 'The front desk',
    },
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/index',
        name: 'webIndex',
        meta: {
          title: 'Landing',
        },
        component: () => import('@/views/default/index.vue'),
      },
      {
        path: '/translate',
        name: 'translate',
        component: () => import('@/views/default/translate.vue'),
      },
      {
        name: 'home',
        path: '/home',
        component: () => import('@/views/Home.vue'),
      },
      {
        name: 'courses-list',
        path: '/:resource/list',
        component: () => import('@/views/courses/CourseCrud.vue'),
        props: true,
      },
    ],
  },
  {
    path: '*',
    name: 'error-404',
    meta: {
      title: '404-页面不存在',
    },
    component: () => import('@/views/default/404.vue'),
  },
]

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/micro-vue' : '/',
  mode: 'history',
  routes,
})

export default router
