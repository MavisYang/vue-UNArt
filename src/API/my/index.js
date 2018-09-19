import fetch from '../../utils/fetch'

export default {
  userInfo(obj) {
    return fetch('/user/info', obj)
  },
  updateUse(obj) {
    return fetch('user/update', obj)
  },
  profile(obj) {
    return fetch('user/profile', obj)
  }
}
