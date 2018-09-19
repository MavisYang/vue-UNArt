import fetch from '../../utils/fetch'

export default {
  forget(obj) {
    return fetch('user/forget', obj)
  }
}
