import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'
import FastClick from 'fastclick'
import VueTimeago from 'vue-timeago'
import infiniteScroll from 'vue-infinite-scroll'
import { AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin, WechatPlugin } from 'vux'
import 'font-awesome/css/font-awesome.css'
import '@/assets/css/main.less'
import 'normalize.css'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: localStorage.language,
  locales: {
    // you will need json-loader in webpack 1
    'cn': require('vue-timeago/locales/zh-CN.json'),
    'en': require('vue-timeago/locales/en-US.json')
  }
})
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(infiniteScroll)

Vue.config.productionTip = false

//快速点击
FastClick.attach(document.body)

new Vue({
  store,
  i18n: i18n,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
