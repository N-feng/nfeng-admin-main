import './public-path'
import Vue from 'vue'
import axios from 'axios'
// import VueRouter from 'vue-router'
// import vueNcform from '@ncform/ncform'

// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import ncformStdComps from '@ncform/ncform-theme-elementui'
// import axios from 'axios'

// import MyCustomComp from './components/MyCustomComp.vue' // Your custom form widget
// import MyCustomRule from './rules/MyCustomRule' // Your custom rule

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import './utils/permission' // 权限控制
// import NfengUI, { pcComps, utils } from 'nfeng-ui-vue'
import './plugins/element'
import './plugins/avue'
// import './plugins/ant-design'
import './assets/style/index.scss'
import App from './App.vue'
import router from './router'
// import store from './store'
// import bus from './utils/bus'

// import NfengForm from 'nfeng-form'
// import NfengUtils from 'nfeng-utils'

// window.myBus = bus
Vue.config.productionTip = false

// const { get, post } = utils
// Vue.prototype.$get = get
// Vue.prototype.$post = post
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})
Vue.prototype.$httpajax = http
Vue.prototype.$http = http

// Vue.use(Element)
// Vue.use(vueNcform, {
//   extComponents: Object.assign(ncformStdComps, pcComps),
//   // extRules: [{ myCustom: MyCustomRule }],
//   lang: 'zh_cn', // you can try 'en' or 'zh-cn'
// })
// Vue.use(Antd)
// Vue.use(NfengForm)
// Vue.use(NfengUtils, {
//   network: {
//     showError: (msg: any) => { console.log(msg) },
//   },
// })

// 调用更方便
// Vue.prototype.$get = Vue.prototype.$nfUtils.network.get
// Vue.prototype.$post = Vue.prototype.$nfUtils.network.post
// Vue.prototype.$http = Vue.prototype.$nfUtils.network.http

// new Vue({
//   router,
//   // store,
//   render: (h: any) => h(App),
// }).$mount('#app')

// let router = null
let instance: any = null

function render(props: any) {
  const { container } = props
  // router = new VueRouter({
  //   base: window.__POWERED_BY_QIANKUN__ ? '/micro-vue' : '/',
  //   mode: 'history',
  //   routes,
  // })

  instance = new Vue({
    router,
    // store,
    render: (h: any) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

function storeTest(props: any) {
  props.onGlobalStateChange((value: any, prev: any) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true)
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  })
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props: any) {
  console.log('[vue] props from main framework', props)
  storeTest(props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  // router = null
}
