import fetch from '../../utils/fetch'
import Vue from 'vue'

export default {
  /*微信配置*/
  wxConfig(obj) {
    //encodeURIComponent(location.href.split('#')[0])
    return fetch('/wx/jssdk', obj)
  }
//   check_user(target_url) {
//     /*检查登录状态*/
//     let params = { target_url }
//     return fetch('/index/check_user_info', params)
//   }
}

  // res.data.debug = false
  // Vue.wechat.config(res.data)
  // Vue.wechat.error(err => {
  //   console.log(err)
  // })
