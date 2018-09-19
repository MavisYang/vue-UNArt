import fetch from '../../utils/fetch'

export default {
  UsePro(obj) {
    return fetch('/user/paint', obj)
  },
  historyPro(obj) {
    return fetch('user/history', obj)
  }
}
