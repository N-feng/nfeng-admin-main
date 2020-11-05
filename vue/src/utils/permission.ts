import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Progress 进度条样式
import router from '../router'
// import store from './store'

NProgress.configure({ showSpinner: false })

// 判断路由权限是否允许role
// function hasPermission(roles, permissionRoles) {
//   // admin权限
//   if (roles.indexOf('admin') >= 0) return true
//   // 页面没有限制
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// const whiteList = ['/login', '/signup'] // no redirect whitelist

router.beforeEach((to: any, from: any, next: any) => {
  // 进度条开始走起
  NProgress.start()
  // 如果有token
  // if (store.getters.token) {
  //   if (to.path === '/login') {
  //     next({ path: '/admin' })
  //     NProgress.done()
  //   } else {
  //     next()
  //   }
  // } else if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //   next()
  // } else { // 组装多个查询参数登陆地址
  //   const { name, query } = to
  //   const url = `/login?name=${name}&query=${JSON.stringify(query)}`
  //   next(url)
  //   NProgress.done()
  // }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
